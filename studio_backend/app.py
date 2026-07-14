"""
============================================================
Realm Studio Backend
============================================================
Application Entry Point
============================================================
"""
from fastapi import FastAPI

from api.items import router as items_router

app = FastAPI(
    title="Realm Studio Backend",
    description="Backend API for Realm Studio",
    version="0.1.0"
)

app.include_router(items_router)

@app.get("/")
def root():
    return {
        "application": "Realm Studio Backend",
        "version": "0.1.0",
        "status": "running"
    }