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

    def translate_path(self, path):
        clean_path = path.split("?", 1)[0].split("#", 1)[0]
        if clean_path in self.routes:
            path = self.routes[clean_path]
        return super().translate_path(path)

    def send_head(self):
        path = self.translate_path(self.path)
        if os.path.isdir(path):
            return super().send_head()

        if os.path.exists(path):
            return super().send_head()

        not_found = Path(__file__).resolve().parent / "404.html"
        if not_found.exists():
            self.send_response(HTTPStatus.NOT_FOUND)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(not_found.stat().st_size))
            self.end_headers()
            return not_found.open("rb")

        return super().send_head()

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
