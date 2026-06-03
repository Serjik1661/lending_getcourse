from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


class StaticRoutesHandler(SimpleHTTPRequestHandler):
    routes = {
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

    def end_headers(self):
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("Referrer-Policy", "strict-origin-when-cross-origin")
        super().end_headers()


def main():
    host = "127.0.0.1"
    port = 8787
    web_root = Path(__file__).resolve().parent
    print(f"Serving {web_root}")
    print(f"URL: http://{host}:{port}/")
    ThreadingHTTPServer((host, port), StaticRoutesHandler).serve_forever()


if __name__ == "__main__":
    main()
