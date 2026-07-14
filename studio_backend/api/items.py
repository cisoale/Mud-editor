"""
============================================================
Realm Studio Backend
Items API
============================================================
"""

from fastapi import APIRouter

from config import ITEMS_DIR
from services.json_service import JsonService

router = APIRouter(
    prefix="/api/items",
    tags=["Items"]
)

@router.get("/")
def get_items():

    return JsonService.load_directory(
        ITEMS_DIR
    )