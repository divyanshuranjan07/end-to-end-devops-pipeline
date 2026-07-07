const http = require("http");
const os = require("os");

// Environment Variables (from Kubernetes ConfigMap)
const PORT = process.env.PORT || 3000;
const VERSION = "1.0.0";
const APP_NAME = process.env.APP_NAME || "End-to-End DevOps Pipeline";
const ENVIRONMENT = process.env.ENVIRONMENT || "development";

let requestCount = 0;

const server = http.createServer((req, res) => {

    requestCount++;

    // Home Page
    if (req.url === "/") {

        const hostname = os.hostname();
        const currentTime = new Date().toLocaleString();

        res.writeHead(200, {
            "Content-Type": "text/html"
        });

        res.end(`
<!DOCTYPE html>
<html>

<head>

    <title>${APP_NAME}</title>

    <style>

        body{
            font-family: Arial, sans-serif;
            background:#f4f6f9;
            margin:40px;
        }

        .container{
            max-width:850px;
            margin:auto;
            background:white;
            padding:30px;
            border-radius:10px;
            box-shadow:0 0 12px rgba(0,0,0,0.15);
        }

        h1{
            color:#2c3e50;
        }

        p{
            color:#555;
        }

        table{
            width:100%;
            border-collapse:collapse;
            margin-top:20px;
        }

        th,td{
            border:1px solid #ddd;
            padding:12px;
            text-align:left;
        }

        th{
            background:#2c3e50;
            color:white;
        }

        footer{
            margin-top:30px;
            text-align:center;
            color:#777;
        }

    </style>

</head>

<body>

<div class="container">

<h1>${APP_NAME}</h1>

<p>
A lightweight Node.js application developed to demonstrate a complete
End-to-End DevOps pipeline using GitHub, Docker, Jenkins,
Kubernetes (Minikube), Prometheus and Grafana.
</p>

<table>

<tr>
<th>Property</th>
<th>Value</th>
</tr>

<tr>
<td>Application Status</td>
<td>Running</td>
</tr>

<tr>
<td>Version</td>
<td>${VERSION}</td>
</tr>

<tr>
<td>Environment</td>
<td>${ENVIRONMENT}</td>
</tr>

<tr>
<td>Hostname</td>
<td>${hostname}</td>
</tr>

<tr>
<td>Current Time</td>
<td>${currentTime}</td>
</tr>

<tr>
<td>Total Requests</td>
<td>${requestCount}</td>
</tr>

<tr>
<td>Pipeline</td>
<td>GitHub → Jenkins → Docker → Kubernetes → Prometheus → Grafana</td>
</tr>

</table>

<footer>

Created by Divyanshu Ranjan

</footer>

</div>

</body>

</html>
`);

        return;
    }

    // Health Endpoint
    if (req.url === "/health") {

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            application: APP_NAME,
            status: "UP",
            version: VERSION,
            environment: ENVIRONMENT
        }, null, 2));

        return;
    }

    // Metrics Endpoint
    if (req.url === "/metrics") {

        res.writeHead(200, {
            "Content-Type": "text/plain"
        });

        res.end(`
# HELP app_status Application status
# TYPE app_status gauge
app_status 1

# HELP app_requests_total Total number of HTTP requests
# TYPE app_requests_total counter
app_requests_total ${requestCount}

# HELP app_version Application version
# TYPE app_version gauge
app_version{version="${VERSION}"} 1

# HELP app_environment Application environment
# TYPE app_environment gauge
app_environment{environment="${ENVIRONMENT}"} 1
`);

        return;
    }

    // 404 Page
    res.writeHead(404, {
        "Content-Type": "application/json"
    });

    res.end(JSON.stringify({
        error: "404 Not Found"
    }));

});

server.listen(PORT, "0.0.0.0", () => {

    console.log("--------------------------------------------");
    console.log(`${APP_NAME} is running`);
    console.log(`Environment : ${ENVIRONMENT}`);
    console.log(`URL         : http://localhost:${PORT}`);
    console.log(`Health      : http://localhost:${PORT}/health`);
    console.log(`Metrics     : http://localhost:${PORT}/metrics`);
    console.log("--------------------------------------------");

});
