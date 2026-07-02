from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routes.analytics import router as analytics_router
from app.routes.tasks import router as tasks_router

app = FastAPI(
    title="Candidate Preparation Tracker API",
    description="A small learning API built to be easy to read.",
)

# CORS matters here because the Next.js app and the Python API run on different local ports.
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tasks_router)
app.include_router(analytics_router)


@app.get("/")
def read_root():
    return {
        "message": "Candidate Preparation Tracker API is running.",
        "tip": "Open /docs to inspect the endpoints in Swagger UI.",
    }

