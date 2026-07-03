# Enterprise DevOps CI/CD Pipeline with Kubernetes Monitoring

## Overview

This project demonstrates the implementation of a complete DevOps Continuous Integration and Continuous Deployment (CI/CD) pipeline for a containerized Node.js application. The objective is to automate application build, deployment, and monitoring using widely adopted DevOps tools and best practices.

The project simulates a real-world software delivery workflow where every code change committed to GitHub triggers an automated pipeline that builds the application, creates a Docker image, deploys it to a Kubernetes cluster running on Minikube, and monitors the deployed application using Prometheus and Grafana.

---

## Objectives

- Implement a complete CI/CD pipeline.
- Containerize an application using Docker.
- Automate build and deployment using Jenkins.
- Deploy workloads on Kubernetes using Minikube.
- Monitor infrastructure and application health using Prometheus.
- Visualize metrics through Grafana dashboards.
- Demonstrate industry-standard DevOps workflow.

---

## Technology Stack

| Category | Technology |
|----------|------------|
| Operating System | Ubuntu 26.04 LTS |
| Version Control | Git, GitHub |
| Programming Language | JavaScript |
| Runtime | Node.js |
| Web Framework | Express.js |
| Containerization | Docker |
| CI/CD | Jenkins |
| Container Orchestration | Kubernetes (Minikube) |
| Monitoring | Prometheus |
| Visualization | Grafana |

---

## Project Architecture

```
Developer
     │
     ▼
GitHub Repository
     │
     ▼
Jenkins Pipeline
     │
     ├── Source Code Checkout
     ├── Install Dependencies
     ├── Build Application
     ├── Build Docker Image
     └── Deploy to Kubernetes
                    │
                    ▼
             Minikube Cluster
                    │
              Running Application
                    │
                    ▼
               Prometheus
                    │
                    ▼
                Grafana
```

---

## Repository Structure

```
end-to-end-devops-pipeline/
│
├── app/
│   ├── Application source code
│   └── package.json
│
├── docker/
│   ├── Dockerfile
│   └── Docker related configuration
│
├── kubernetes/
│   ├── Deployment
│   ├── Service
│   ├── Namespace
│   └── Kubernetes manifests
│
├── jenkins/
│   └── Jenkinsfile
│
├── monitoring/
│   ├── Prometheus configuration
│   └── Grafana dashboards
│
├── scripts/
│   └── Utility scripts
│
├── docs/
│   └── Project documentation
│
├── screenshots/
│   └── Project screenshots
│
├── README.md
└── LICENSE
```

---

## CI/CD Workflow

The project follows the following workflow:

1. Developer pushes code to GitHub.
2. Jenkins detects repository changes.
3. Jenkins checks out the latest source code.
4. Application dependencies are installed.
5. Docker image is built.
6. Docker image is deployed to Kubernetes (Minikube).
7. Kubernetes creates and manages application Pods.
8. Prometheus collects infrastructure and application metrics.
9. Grafana displays real-time dashboards.

---

## Features

- Automated build pipeline
- Docker containerization
- Kubernetes deployment
- Continuous deployment using Jenkins
- Infrastructure monitoring
- Real-time dashboards
- Professional GitHub project structure

---

## Current Status

| Module | Status |
|---------|--------|
| Ubuntu Environment | Completed |
| Git & GitHub Setup | Completed |
| Project Structure | Completed |
| Docker | Pending |
| Jenkins | Pending |
| Kubernetes | Pending |
| Prometheus | Pending |
| Grafana | Pending |

---

## Future Enhancements

Future versions of this project may include:

- ArgoCD for GitOps deployment
- Trivy vulnerability scanning
- SonarQube code quality analysis
- NGINX Ingress Controller
- Horizontal Pod Autoscaler
- Deployment on Amazon EKS

---

## Author

**Divyanshu Ranjan**

GitHub: https://github.com/divyanshuranjan07

LinkedIn: https://www.linkedin.com/in/divyanshu-ranjan2807
