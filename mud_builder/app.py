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

MOBS_DIR = os.path.join(
    DATA_DIR,
    "mobs"
)

os.makedirs(
    AREAS_DIR,
    exist_ok=True
)

# =========================================
# SERVICES
# =========================================

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
# HELPERS
# =========================================

def normalize_room(room):

    room.setdefault(
        "vnum",
        0
    )

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
        "area_id",
        "unknown"
    )

    room.setdefault(
        "region_id",
        "default"
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
    # REMOVE LEGACY COORDS
    # =====================================

    room.pop("x", None)
    room.pop("y", None)
    room.pop("z", None)

    # =====================================
    # NORMALIZE EXITS
    # =====================================

    normalized_exits = {}

    for direction, exit_data in room["exits"].items():

        # =====================================
        # LEGACY INTEGER EXIT
        # =====================================

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
                    exit_data.get(
                        "to",
                        0
                    ),

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

    return room

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
                        filename.replace(
                            ".json",
                            ""
                        )
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

                "region":
                    area_data.get(
                        "region_id",
                        "default"
                    ),

                "room_count":
                    len(rooms)
            })

        print(
            f"[AREAS] {len(result)} loaded"
        )

        return jsonify(result)

    except Exception as e:

        print(
            "[AREAS ERROR]",
            e
        )

        return jsonify({
            "error": str(e)
        }), 500

# =========================================
# LOAD AREA BY ID
# =========================================

@app.route("/api/area/<area_id>")
def api_load_area(area_id):

    try:

        path = os.path.join(
            AREAS_DIR,
            f"{area_id}.json"
        )

        # =====================================
        # CREATE DEFAULT AREA
        # =====================================

        if not os.path.exists(path):

            default_area = {

                "schema_version": 2,

                "area": {

                    "id": area_id,

                    "name": area_id,

                    "author": "builder",

                    "region_id": "default"
                },

                "rooms": []
            }

            with open(
                path,
                "w",
                encoding="utf-8"
            ) as f:

                json.dump(

                    default_area,
                    f,

                    indent=4,

                    ensure_ascii=False
                )

        # =====================================
        # LOAD AREA
        # =====================================

        with open(
            path,
            "r",
            encoding="utf-8"
        ) as f:

            area_data = json.load(f)

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

        clean_rooms = []

        for room in area_data["rooms"]:

            clean_rooms.append(
                normalize_room(room)
            )

        area_data["rooms"] = clean_rooms

        print(

            f"[LOAD AREA] "
            f"{area_id} "
            f"({len(clean_rooms)} rooms)"
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

        if not area_data:

            return jsonify({

                "success": False,

                "error": "Missing area data"

            }), 400

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

        area_info = area_data["area"]

        area_id = area_info.get(
            "id",
            "unknown_area"
        )

        # =====================================
        # NORMALIZE ROOMS
        # =====================================

        clean_rooms = []

        for room in area_data["rooms"]:

            clean_rooms.append(
                normalize_room(room)
            )

        area_data["rooms"] = clean_rooms

        # =====================================
        # SAVE FILE
        # =====================================

        path = os.path.join(
            AREAS_DIR,
            f"{area_id}.json"
        )

        with open(
            path,
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
            f"{area_id} "
            f"({len(clean_rooms)} rooms)"
        )

        return jsonify({

            "success": True,

            "area_id": area_id,

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
# DELETE AREA
# =========================================

@app.route(
    "/api/delete_area/<area_id>",
    methods=["DELETE"]
)

def api_delete_area(area_id):

    try:

        path = os.path.join(
            AREAS_DIR,
            f"{area_id}.json"
        )

        if not os.path.exists(path):

            return jsonify({

                "success": False,

                "error": "Area not found"

            }), 404

        os.remove(path)

        print(
            f"[DELETE AREA] {area_id}"
        )

        return jsonify({

            "success": True
        })

    except Exception as e:

        print(
            "[DELETE AREA ERROR]",
            e
        )

        return jsonify({

            "success": False,

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
            f"[API MOBS] {len(safe_mobs)}"
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
