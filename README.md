# Endpoint Load Tester

A lightweight, self-hosted web utility for stress testing HTTP endpoints and probing rate-limiting thresholds directly from your browser. 

Because requests originate from your browser's network stack, all traffic naturally routes through your active browser connection and VPN exit IP without requiring external proxy configurations.

---

## Features

- **Browser-Originated Traffic**: Test from your client network or VPN location.
- **Dual IP Auto-Detection**: Instant detection of your active IPv4 and IPv6 exit addresses.
- **1-Click Load Presets**:
  - `Burst`: 50 requests with concurrency 5 for peak capacity testing.
  - `Probe`: Rate-limit boundary discovery with instant halt on the first `429 Too Many Requests`.
  - `Paced`: Sustained pacing (e.g. 1 request every 15 seconds) over long durations.
  - `Smoke`: Quick 5-request health check.
- **Real-Time Analytics**:
  - Live throughput (requests/second) and progress indicators.
  - Interactive latency timeline with point hover inspection and error highlighting.
  - Latency percentiles calculation (`Min`, `Avg`, `p50`, `p90`, `p99`, `Max`).
  - Status code breakdown table.
- **Request Inspection**: Click any request in the live log to view full request/response headers, status codes, and formatted payloads.
- **cURL Exporter**: 1-click generation and clipboard copy of the exact `curl` command.
- **Data Export**: Download results as structured JSON or CSV.
- **High-Contrast Minimal UI**: Clean, distraction-free monochrome interface meeting WCAG AAA contrast standards (>9:1).
- **Persistent Configuration**: Test parameters save automatically to `localStorage`.

---

## Quick Start

### Requirements
- Node.js 18+ (zero external dependencies)

### Run the Server

```bash
# Default: UI served at http://localhost:8787
node server.js

# Custom port
PORT=9000 node server.js
```

Open `http://localhost:8787` in your browser.

---

## Configuration Reference

| Setting | Description |
|---|---|
| **Target URL** | The HTTP or HTTPS endpoint to test. |
| **Method** | Supported HTTP verbs: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`. |
| **CORS Mode** | `cors` allows response inspection; `no-cors` sends opaque requests if CORS headers are not present on the server. |
| **Headers** | Custom HTTP headers (`Name: value` format, one per line). |
| **Payload Body** | Formats supported: `None`, `JSON`, `Form` (urlencoded), `Multipart`, and `Raw`. |
| **Execution Mode** | `Fixed Count` (send $N$ requests) or `Timed Duration` (send continuously for $T$ seconds). |
| **Concurrency** | Number of parallel worker loops. |
| **Delay (ms)** | Pause between consecutive requests per worker for rate pacing. |
| **Timeout (ms)** | Abort signal threshold per individual request. |
| **Stop on first 429** | Immediately halts the test upon receiving a `429 Too Many Requests` response to identify rate limits. |

---

## Browser Execution & Constraints

- **CORS Headers**: To inspect HTTP status codes and response bodies from the browser, the target endpoint must permit the origin (e.g. `Access-Control-Allow-Origin: http://localhost:8787` or `*`). If CORS is not enabled on your server, select `no-cors` mode (traffic will still hit the endpoint, but responses will be opaque).
- **Forbidden Headers**: Headers such as `Host` or `X-Forwarded-For` cannot be overridden directly via browser `fetch` calls.
- **Connection Caps**: Modern browsers enforce a per-domain concurrent HTTP/1.1 socket limit (~6 connections). For high concurrency testing, HTTP/2 or HTTP/3 on the target is recommended.

---

## Authorization & Safety

Only test endpoints that you own or have explicit authorization to load-test. Testing requires confirming the authorization checkbox before each run session.

---

## License

MIT
