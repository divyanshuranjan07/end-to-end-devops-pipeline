# End-to-End DevOps Pipeline on Kubernetes

## Overview

This project demonstrates a complete End-to-End DevOps pipeline that automates application build, testing, deployment, and monitoring using industry-standard DevOps tools. The application is containerized with Docker, deployed on Kubernetes (Minikube), automated through Jenkins CI/CD, and monitored using Prometheus and Grafana.

The pipeline showcases Continuous Integration (CI), Continuous Deployment (CD), container orchestration, infrastructure automation, and observability in a local Kubernetes environment.

---

## Architecture

```
Developer
    │
    │ Git Push
    ▼
GitHub Repository
    │
    ▼
Jenkins Pipeline
    │
    ├── Checkout Source Code
    ├── Build Docker Image
    ├── Run Test Container
    ├── Perform Health Check
    ├── Remove Test Container
    ├── Load Image into Minikube
    ├── Deploy to Kubernetes
    └── Verify Deployment
            │
            ▼
     Kubernetes Cluster
            │
    ┌───────┴────────┐
    ▼                ▼
Deployment      ConfigMap
    │
ReplicaSet
    │
 ┌──┴──┐
 ▼     ▼
Pod    Pod
    │
    ▼
Service (NodePort)
    │
    ▼
Node.js Application
    │
    ├── /health
    └── /metrics
            │
            ▼
      Prometheus
            │
            ▼
        Grafana
```

---

## Technology Stack

| Category | Technology |
|----------|------------|
| Version Control | Git, GitHub |
| CI/CD | Jenkins |
| Containerization | Docker |
| Container Orchestration | Kubernetes (Minikube) |
| Runtime | Node.js |
| Monitoring | Prometheus |
| Visualization | Grafana |

---

## Project Structure

```
end-to-end-devops-pipeline/
│
├── app/
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── docker/
│
├── jenkins/
│
├── kubernetes/
│   ├── namespace.yaml
│   ├── configmap.yaml
│   ├── deployment.yaml
│   └── service.yaml
│
├── monitoring/
│   ├── prometheus.yml
│   ├── prometheus-configmap.yaml
│   ├── prometheus-deployment.yaml
│   ├── prometheus-service.yaml
│   ├── grafana-deployment.yaml
│   └── grafana-service.yaml
│
├── Dockerfile
├── Jenkinsfile
├── docker-compose.yml
├── README.md
└── .gitignore
```

---

## Features

- Automated Continuous Integration pipeline using Jenkins
- Automated Docker image creation
- Application testing using a temporary Docker container
- Automated health check validation
- Continuous Deployment to Kubernetes
- Kubernetes Namespace isolation
- Externalized configuration using ConfigMap
- NodePort service for application access
- Prometheus metrics collection
- Grafana dashboard for real-time monitoring
- Rolling deployment verification

---

## CI/CD Workflow

1. Developer pushes code to GitHub.
2. Jenkins checks out the latest source code.
3. Docker builds the application image.
4. Jenkins launches a temporary container.
5. Health endpoint is verified.
6. Temporary container is removed.
7. Docker image is loaded into Minikube.
8. Kubernetes manifests are applied.
9. Deployment rollout is verified.
10. Application becomes available through a Kubernetes Service.

---

## Kubernetes Resources

The project deploys the following Kubernetes resources:

- Namespace
- Deployment
- ReplicaSet
- Pods
- ConfigMap
- NodePort Service

---

## Monitoring

### Prometheus

Prometheus scrapes application metrics from the `/metrics` endpoint every 15 seconds.

Available metrics include:

```text
app_status
app_requests_total
app_version
```

### Grafana

Grafana visualizes the metrics collected by Prometheus through interactive dashboards.

Example dashboard panels include:

- Application Status
- Total Requests
- Requests per Second
- Application Version

---

## Running the Project

### Clone the Repository

```bash
git clone https://github.com/divyanshuranjan07/end-to-end-devops-pipeline.git
cd end-to-end-devops-pipeline
```

### Start Minikube

```bash
minikube start --driver=docker
```

### Build Docker Image

```bash
docker build -t end-to-end-devops-pipeline:v1 .
```

### Load the Image into Minikube

```bash
minikube image load end-to-end-devops-pipeline:v1
```

### Deploy Kubernetes Resources

```bash
kubectl apply -f kubernetes/
```

### Deploy Monitoring Components

```bash
kubectl apply -f monitoring/prometheus-configmap.yaml
kubectl apply -f monitoring/prometheus-deployment.yaml
kubectl apply -f monitoring/prometheus-service.yaml
kubectl apply -f monitoring/grafana-deployment.yaml
kubectl apply -f monitoring/grafana-service.yaml
```

---

## Access the Application

Application

```bash
minikube service devops-service -n devops-pipeline --url
```

Prometheus

```bash
minikube service prometheus -n devops-pipeline --url
```

Grafana

```bash
minikube service grafana -n devops-pipeline --url
```

---

## Monitoring Dashboard

Grafana is configured to use Prometheus as its data source and provides visualization for:

- Application Health
- Request Count
- Request Rate
- Application Version

---

## Screenshots

The `screenshots/` directory can include:

- Jenkins successful pipeline execution
- Kubernetes Pods
- Kubernetes Services
- Application homepage
- Prometheus Targets page
- Prometheus Metrics page
- Grafana Dashboard

---

## Future Enhancements

- GitHub Webhooks for automatic pipeline triggering
- Dynamic Docker image tagging
- Trivy container image scanning
- SonarQube code quality analysis
- Helm chart packaging
- Argo CD GitOps deployment
- Persistent Volumes for Prometheus and Grafana
- NGINX Ingress Controller
- Horizontal Pod Autoscaler
- Kubernetes Secrets integration

---

## Author

**Divyanshu Ranjan**

Bachelor of Technology (Computer Science Engineering)

Interests: DevOps, Cloud Computing, Kubernetes, Docker, AWS

GitHub: https://github.com/divyanshuranjan07

---

## License

This project is intended for educational and learning purposes.
