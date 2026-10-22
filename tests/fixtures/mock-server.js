// Minimal mock for the OIDC token endpoint (ACTIONS_ID_TOKEN_REQUEST_URL)
// and the credential provider endpoint (provider-endpoint input).
// Usage: node mock-server.js <logfile> [port]
const http = require("http");
const fs = require("fs");

const logFile = process.argv[2] || "/tmp/mock-requests.log";
const port = parseInt(process.argv[3] || "18080", 10);

http
  .createServer((req, res) => {
    let body = "";
    req.on("data", (c) => (body += c));
    req.on("end", () => {
      let parsed = body;
      try {
        parsed = body ? JSON.parse(body) : "";
      } catch (e) {
        parsed = body;
      }
      fs.appendFileSync(
        logFile,
        JSON.stringify({
          method: req.method,
          url: req.url,
          auth: req.headers["authorization"] || "",
          body: parsed,
        }) + "\n",
      );
      res.setHeader("Content-Type", "application/json");
      if (req.url.startsWith("/health")) {
        res.end('{"ok":true}');
      } else if (req.method === "GET" && req.url.startsWith("/oidc")) {
        res.end(JSON.stringify({ value: "fake-oidc-jwt" }));
      } else if (req.method === "POST" && req.url.startsWith("/provider-error")) {
        res.statusCode = 403;
        res.end(JSON.stringify({ message: "mock provider denied access" }));
      } else if (req.method === "POST" && req.url.startsWith("/provider")) {
        res.end(
          JSON.stringify({
            github_token: "ghs_mocktoken1234567890",
            message: "hello from mock provider",
          }),
        );
      } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ message: "not found" }));
      }
    });
  })
  .listen(port, "127.0.0.1", () => {
    console.log(`mock server listening on ${port}`);
  });
