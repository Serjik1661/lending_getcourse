from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import os


class StaticRoutesHandler(SimpleHTTPRequestHandler):
    routes = {
        "/404": "/404.html",
        "/offline": "/offline.html",
        "/privacy": "/privacy.html",
        "/terms": "/terms.html",
        "/medical-disclaimer": "/medical-disclaimer.html",
        "/contacts": "/contacts.html",
        "/offer": "/offer.html",
        "/refund": "/refund.html",
        "/thank-you": "/thank-you.html",
    }

    def __init__(self, *args, **kwargs):
        self.range = None
        super().__init__(*args, **kwargs)

    def translate_path(self, path):
        clean_path = path.split("?", 1)[0].split("#", 1)[0]
        if clean_path in self.routes:
            path = self.routes[clean_path]
        return super().translate_path(path)

    def send_head(self):
        self.range = None
        path = self.translate_path(self.path)
        if os.path.isdir(path):
            return super().send_head()

        if os.path.exists(path):
            range_header = self.headers.get("Range")
            if range_header and range_header.startswith("bytes="):
                file_size = os.path.getsize(path)
                start, end = self.parse_range(range_header, file_size)
                if start is not None:
                    content_type = self.guess_type(path)
                    file = open(path, "rb")
                    file.seek(start)
                    self.range = (start, end)
                    self.send_response(HTTPStatus.PARTIAL_CONTENT)
                    self.send_header("Content-Type", content_type)
                    self.send_header("Accept-Ranges", "bytes")
                    self.send_header("Content-Range", f"bytes {start}-{end}/{file_size}")
                    self.send_header("Content-Length", str(end - start + 1))
                    self.end_headers()
                    return file
            return super().send_head()

        not_found = Path(__file__).resolve().parent / "404.html"
        if not_found.exists():
            self.send_response(HTTPStatus.NOT_FOUND)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(not_found.stat().st_size))
            self.end_headers()
            return not_found.open("rb")

        return super().send_head()

    @staticmethod
    def parse_range(range_header, file_size):
        try:
            range_value = range_header.split("=", 1)[1].split(",", 1)[0].strip()
            start_text, end_text = range_value.split("-", 1)
            if start_text:
                start = int(start_text)
                end = int(end_text) if end_text else file_size - 1
            else:
                suffix_length = int(end_text)
                start = max(file_size - suffix_length, 0)
                end = file_size - 1

            if start < 0 or start >= file_size:
                return None, None
            end = min(end, file_size - 1)
            if end < start:
                return None, None
            return start, end
        except (IndexError, TypeError, ValueError):
            return None, None

    def copyfile(self, source, outputfile):
        if not self.range:
            return super().copyfile(source, outputfile)

        start, end = self.range
        remaining = end - start + 1
        buffer_size = 64 * 1024

        while remaining > 0:
            chunk = source.read(min(buffer_size, remaining))
            if not chunk:
                break
            outputfile.write(chunk)
            remaining -= len(chunk)

    def end_headers(self):
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("Referrer-Policy", "strict-origin-when-cross-origin")
        super().end_headers()


def main():
    host = "127.0.0.1"
    port = int(os.environ.get("PORT", "8787"))
    web_root = Path(__file__).resolve().parent
    print(f"Serving {web_root}")
    print(f"URL: http://{host}:{port}/")
    ThreadingHTTPServer((host, port), StaticRoutesHandler).serve_forever()


if __name__ == "__main__":
    main()
