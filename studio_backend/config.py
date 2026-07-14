"""
============================================================
Realm Studio Backend
Configuration
============================================================
"""

from pathlib import Path


#
# Backend
#

BACKEND_ROOT = Path(__file__).resolve().parent


#
# Project
#

PROJECT_ROOT = BACKEND_ROOT.parent


#
# MUD Server
#

MUD_SERVER = PROJECT_ROOT / "mud_server"


#
# Data
#

DATA_DIR = MUD_SERVER / "data"

ITEMS_DIR = DATA_DIR / "items"
MOBS_DIR = DATA_DIR / "mobs"
ROOMS_DIR = DATA_DIR / "rooms"
AREAS_DIR = DATA_DIR / "areas"


#
# Backups
#

BACKUPS_DIR = BACKEND_ROOT / "backups"