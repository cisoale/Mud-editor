import os
import json

from flask import Flask
from flask import request
from flask import jsonify
from flask import send_from_directory

# =========================================
# PATHS
# =========================================

BASE_DIR = os.path.dirname(
    os.path.abspath(__file__)
)

SERVER_DIR = os.path.abspath(

    os.path.join(
        BASE_DIR,
        "..",
        "mud_server"
    )
)

DATA_DIR = os.path.join(
    SERVER_DIR,
    "data"
)

AREAS_DIR = os.path.join(
    DATA_DIR,
    "areas"
)

ROOMS_DIR = os.path.join(
    DATA_DIR,
    "rooms"
)

MOBS_DIR = os.path.join(
    DATA_DIR,
    "mobs"
)

DEFAULT_AREA_FILE = os.path.join(
    AREAS_DIR,
    "starting_village.json"
)

# =========================================
# SERVICES
# =========================================

from services.room_service import (
    get_rooms,
    save_room
)

from services.mob_service import (
    get_mobs,
    save_mob
)

# =========================================
# FLASK
# =========================================

app = Flask(

    __name__,

    static_folder="static",

    template_folder="templates"
)

# =========================================
# INDEX
# =========================================

@app.route("/")
def index():

    return send_from_directory(
        "static",
        "index.html"
    )

# =========================================
# LOAD AREA
# =========================================

@app.route("/api/area")
def api_load_area():

    try:

        if not os.path.exists(
            DEFAULT_AREA_FILE
        ):

            return jsonify({

                "schema_version": 2,

                "area": {

                    "id": "starting_village",

                    "name": "Starting Village",

                    "author": "Ale",

                    "region_id": "starting_zone"
                },

                "rooms": []
            })

        with open(

            DEFAULT_AREA_FILE,
            "r",
            encoding="utf-8"

        ) as f:

            area_data = json.load(f)

        print(

            f"[LOAD AREA] "
            f"{len(area_data.get('rooms', []))} rooms"
        )

        return jsonify(area_data)

    except Exception as e:

        print(
            "[LOAD AREA ERROR]",
            e
        )

        return jsonify({

            "error": str(e)

        }), 500

# =========================================
# SAVE AREA
# =========================================

@app.route(
    "/api/save_area",
    methods=["POST"]
)

def api_save_area():

    try:

        area_data = request.json

        area_data.setdefault(
            "schema_version",
            2
        )

        area_data.setdefault(
            "area",
            {}
        )

        area_data.setdefault(
            "rooms",
            []
        )

        # =====================================
        # CLEAN ROOMS
        # =====================================

        clean_rooms = []

        for room in area_data["rooms"]:

            room.setdefault(
                "name",
                "Unnamed Room"
            )

            room.setdefault(
                "short_desc",
                ""
            )

            room.setdefault(
                "long_desc",
                ""
            )

            room.setdefault(
                "region_id",
                "starting_zone"
            )

            room.setdefault(
                "items",
                []
            )

            room.setdefault(
                "mobs",
                []
            )

            room.setdefault(
                "flags",
                []
            )

            room.setdefault(
                "scripts",
                []
            )

            room.setdefault(
                "exits",
                {}
            )

            room.setdefault(
                "coords",
                {}
            )

            room["coords"].setdefault(
                "x",
                0
            )

            room["coords"].setdefault(
                "y",
                0
            )

            room["coords"].setdefault(
                "z",
                0
            )

            # =====================================
            # REMOVE OLD X/Y
            # =====================================

            room.pop("x", None)
            room.pop("y", None)
            room.pop("z", None)

            # =====================================
            # NORMALIZE EXITS
            # =====================================

            normalized_exits = {}

            for direction, exit_data in room["exits"].items():

                if isinstance(
                    exit_data,
                    int
                ):

                    normalized_exits[direction] = {

                        "to": exit_data,

                        "door": False,

                        "closed": False,

                        "locked": False,

                        "hidden": False,

                        "blocked": False,

                        "key": None
                    }

                else:

                    normalized_exits[direction] = {

                        "to":
                            exit_data.get("to"),

                        "door":
                            exit_data.get(
                                "door",
                                False
                            ),

                        "closed":
                            exit_data.get(
                                "closed",
                                False
                            ),

                        "locked":
                            exit_data.get(
                                "locked",
                                False
                            ),

                        "hidden":
                            exit_data.get(
                                "hidden",
                                False
                            ),

                        "blocked":
                            exit_data.get(
                                "blocked",
                                False
                            ),

                        "key":
                            exit_data.get(
                                "key",
                                None
                            )
                    }

            room["exits"] = normalized_exits

            clean_rooms.append(room)

        area_data["rooms"] = clean_rooms

        # =====================================
        # SAVE FILE
        # =====================================

        with open(

            DEFAULT_AREA_FILE,
            "w",
            encoding="utf-8"

        ) as f:

            json.dump(

                area_data,
                f,

                indent=4,

                ensure_ascii=False
            )

        print(

            f"[SAVE AREA] "
            f"{len(clean_rooms)} rooms"
        )

        return jsonify({

            "success": True,

            "rooms": len(clean_rooms)
        })

    except Exception as e:

        print(
            "[SAVE AREA ERROR]",
            e
        )

        return jsonify({

            "success": False,

            "error": str(e)

        }), 500

# =========================================
# GET ROOMS (LEGACY)
# =========================================

@app.route("/api/rooms")
def api_rooms():

    try:

        rooms = get_rooms()

        safe_rooms = []

        for room in rooms:

            clean = {}

            for key, value in room.items():

                try:

                    json.dumps(value)

                    clean[key] = value

                except Exception:

                    clean[key] = str(value)

            safe_rooms.append(clean)

        print(
            f"[API] Rooms: "
            f"{len(safe_rooms)}"
        )

        return jsonify(safe_rooms)

    except Exception as e:

        print(
            "[API ROOMS ERROR]",
            e
        )

        return jsonify({
            "error": str(e)
        }), 500

# =========================================
# GET MOBS
# =========================================

@app.route("/api/mobs")
def api_mobs():

    try:

        mobs = get_mobs()

        safe_mobs = []

        for mob in mobs:

            clean = {}

            for key, value in mob.items():

                try:

                    json.dumps(value)

                    clean[key] = value

                except Exception:

                    clean[key] = str(value)

            safe_mobs.append(clean)

        print(
            f"[API] Mobs: "
            f"{len(safe_mobs)}"
        )

        return jsonify(safe_mobs)

    except Exception as e:

        print(
            "[API MOBS ERROR]",
            e
        )

        return jsonify({
            "error": str(e)
        }), 500

# =========================================
# GET AREAS
# =========================================

@app.route("/api/areas")
def api_areas():

    try:

        result = []

        if not os.path.exists(
            AREAS_DIR
        ):

            return jsonify([])

        for filename in sorted(
            os.listdir(AREAS_DIR)
        ):

            if not filename.endswith(".json"):
                continue

            path = os.path.join(
                AREAS_DIR,
                filename
            )

            with open(
                path,
                "r",
                encoding="utf-8"
            ) as f:

                data = json.load(f)

            area_data = data.get(
                "area",
                {}
            )

            rooms = data.get(
                "rooms",
                []
            )

            result.append({

                "id":
                    area_data.get(
                        "id",
                        "unknown"
                    ),

                "name":
                    area_data.get(
                        "name",
                        "Unknown Area"
                    ),

                "author":
                    area_data.get(
                        "author",
                        "Unknown"
                    ),

                "room_count":
                    len(rooms)
            })

        return jsonify(result)

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500

# =========================================
# SAVE MOB
# =========================================

@app.route(
    "/api/mob",
    methods=["POST"]
)

def api_save_mob():

    try:

        data = request.json

        save_mob(data)

        print(
            f"[SAVE MOB] "
            f"{data.get('vnum')}"
        )

        return jsonify({
            "ok": True
        })

    except Exception as e:

        print(
            "[SAVE MOB ERROR]",
            e
        )

        return jsonify({
            "error": str(e)
        }), 500

# =========================================
# STATIC FILES
# =========================================

@app.route('/<path:path>')
def static_proxy(path):

    return send_from_directory(
        'static',
        path
    )

# =========================================
# START
# =========================================

if __name__ == "__main__":

    print("\n=== REALM BUILDER ===\n")

    print(
        f"[BASE] {BASE_DIR}"
    )

    print(
        f"[SERVER] {SERVER_DIR}"
    )

    print(
        f"[DATA] {DATA_DIR}"
    )

    print(
        f"[AREAS] {AREAS_DIR}"
    )

    print(
        "\n[BUILDER] Flask start...\n"
    )

    app.run(

        host="0.0.0.0",

        port=5000,

        debug=True
    )