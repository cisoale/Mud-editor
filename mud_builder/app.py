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
# GET ROOMS
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

            print(
                "[API] Nessuna cartella areas"
            )

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

            try:

                with open(
                    path,
                    "r",
                    encoding="utf-8"
                ) as f:

                    data = json.load(f)

            except Exception as e:

                print(
                    f"[AREA READ ERROR] "
                    f"{filename}: {e}"
                )

                continue

            # =================================
            # AREA META
            # =================================

            area_data = data.get(
                "area",
                {}
            )

            # =================================
            # ROOMS
            # =================================

            rooms_data = data.get(
                "rooms",
                {}
            )

            # =================================
            # DICT → LIST
            # =================================

            if isinstance(
                rooms_data,
                dict
            ):

                rooms = list(
                    rooms_data.values()
                )

            else:

                rooms = rooms_data

            # =================================
            # OUTPUT
            # =================================

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

                "recommended_level":
                    area_data.get(
                        "recommended_level",
                        [1, 1]
                    ),

                "room_count":
                    len(rooms),

                "rooms": [

                    {

                        "vnum":
                            room.get(
                                "vnum"
                            ),

                        "name":
                            room.get(
                                "name",
                                "Unnamed"
                            )

                    }

                    for room in rooms
                ]
            })

        print(
            f"[API] Areas: "
            f"{len(result)}"
        )

        return jsonify(result)

    except Exception as e:

        print(
            "[API AREAS ERROR]",
            e
        )

        return jsonify({
            "error": str(e)
        }), 500

# =========================================
# SAVE ROOM
# =========================================

@app.route(
    "/api/room",
    methods=["POST"]
)

def api_save_room():

    try:

        data = request.json

        save_room(data)

        print(
            f"[SAVE ROOM] "
            f"{data.get('vnum')}"
        )

        return jsonify({
            "ok": True
        })

    except Exception as e:

        print(
            "[SAVE ROOM ERROR]",
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
# DELETE ROOM
# =========================================

@app.route(
    "/api/delete_room",
    methods=["POST"]
)

def delete_room():

    try:

        data = request.json

        vnum = str(
            data.get("vnum")
        )

        deleted = False

        if not os.path.exists(
            AREAS_DIR
        ):

            return jsonify({

                "ok": False,

                "error":
                    "areas dir missing"
            })

        # =================================
        # SEARCH AREAS
        # =================================

        for filename in os.listdir(
            AREAS_DIR
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

                area_data = json.load(f)

            rooms_data = area_data.get(
                "rooms",
                {}
            )

            # =============================
            # DICT
            # =============================

            if isinstance(
                rooms_data,
                dict
            ):

                if vnum in rooms_data:

                    del rooms_data[vnum]

                    deleted = True

            # =============================
            # LIST
            # =============================

            else:

                new_rooms = []

                for room in rooms_data:

                    if str(
                        room.get("vnum")
                    ) == vnum:

                        deleted = True

                        continue

                    new_rooms.append(room)

                rooms_data = new_rooms

            area_data["rooms"] = rooms_data

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
            f"[DELETE ROOM] "
            f"{vnum}"
        )

        return jsonify({

            "ok": True,

            "deleted": deleted
        })

    except Exception as e:

        print(
            "[DELETE ROOM ERROR]",
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