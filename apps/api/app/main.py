import logging
import time
from fastapi import FastAPI, Depends, HTTPException, status, Request
from fastapi.middleware.cors import CORSMiddleware
from prometheus_client import make_asgi_app
from pythonjsonlogger import jsonlogger

# Logger setup
logger = logging.getLogger("finops-dashboard-api")
logHandler = logging.StreamHandler()
formatter = jsonlogger.JsonFormatter()
logHandler.setFormatter(formatter)
logger.addHandler(logHandler)
logger.setLevel(logging.INFO)

app = FastAPI(title="Cloud FinOps Dashboard API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Metrics
metrics_app = make_asgi_app()
app.mount("/metrics", metrics_app)

@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    duration = time.time() - start_time
    logger.info(f"Path: {request.url.path} Duration: {duration:.4f}s Status: {response.status_code}")
    return response

@app.get("/health")
def health():
    return {"status": "healthy"}

@app.get("/costs/summary")
def get_costs_summary():
    # Mock data for demonstration
    return {
        "monthly_spend": 124500.00,
        "forecasted_spend": 131000.00,
        "active_budgets": 12,
        "budget_variance": -5.2,
        "anomalies_detected": 2
    }

@app.get("/recommendations")
def get_recommendations():
    return [
        {"id": 1, "type": "Rightsizing", "resource": "vm-prod-db", "saving": 450.00, "cloud": "Azure"},
        {"id": 2, "type": "Idle", "resource": "eks-test-cluster", "saving": 1200.00, "cloud": "AWS"},
        {"id": 3, "type": "Reservation", "resource": "sql-shared-instance", "saving": 890.00, "cloud": "GCP"}
    ]

@app.get("/dashboard/summary")
def get_dashboard_summary():
    return {
        "total_spend": 4500000.00,
        "total_savings_identified": 245000.00,
        "tagging_coverage": 88.5
    }
