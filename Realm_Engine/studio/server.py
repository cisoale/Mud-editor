from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import json


ROOT = Path(__file__).resolve().parent
print(f"[Realm Studio] ROOT: {ROOT}")
print((ROOT / "schemas" / "component_registry.json").read_text(encoding="utf-8"))

class RealmStudioHandler(SimpleHTTPRequestHandler):

    def do_POST(self):
        if self.path != "/api/save":
            self.send_error(404, "Not Found")
            return

        try:
            length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(length)
            request = json.loads(body)

            path = request.get("path")
            data = request.get("data")

            if not path:
                self.send_error(400, "Missing path")
                return

            target = (ROOT / path).resolve()

            # Prevent writing outside the Studio directory.
            if ROOT not in target.parents and target != ROOT:
                self.send_error(403, "Forbidden path")
                return

            target.parent.mkdir(parents=True, exist_ok=True)

            with target.open("w", encoding="utf-8") as file:
                json.dump(data, file, indent=4, ensure_ascii=False)
                file.write("\n")

            response = {
                "success": True,
                "path": path
            }

            payload = json.dumps(response).encode("utf-8")

            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(payload)))
            self.end_headers()
            self.wfile.write(payload)

            print(f"[Realm Studio] Saved: {path}")

        except json.JSONDecodeError:
            self.send_error(400, "Invalid JSON")

        except Exception as error:
            print(f"[Realm Studio] Save error: {error}")
            self.send_error(500, "Internal Server Error")


if __name__ == "__main__":
    print("========================================")
    print(" Realm Studio Server")
    print(" http://localhost:8000")
    print("========================================")
    print()

    server = ThreadingHTTPServer(
        ("localhost", 8000),
        RealmStudioHandler
    )

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
        server.server_close()