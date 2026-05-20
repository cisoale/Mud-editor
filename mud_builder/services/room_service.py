import os
import json

# =========================================
# PATHS
# =========================================

BASE_DIR = os.path.dirname(
    os.path.abspath(__file__)
)

BUILDER_DIR = os.path.abspath(

    os.path.join(
        BASE_DIR,
        ".."
    )
)

ROOT_DIR = os.path.abspath(

    os.path.join(
        BUILDER_DIR,
        ".."
    )
)

AREAS_DIR = os.path.join(

    ROOT_DIR,

    "mud_server",

    "data",

    "areas"
)

# =========================================
# GET ROOMS
# =========================================

def get_rooms():

    rooms = []

    if not os.path.exists(
        AREAS_DIR
    ):

        print(
            "[ROOM SERVICE] areas dir missing"
        )

        return rooms

    # =====================================
    # AREA FILES
    # =====================================

    for filename in os.listdir(
        AREAS_DIR
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
                f"[ROOM SERVICE ERROR] "
                f"{filename}: {e}"
            )

            continue

        # =================================
        # ROOMS
        # =================================

        rooms_data = data.get(
            "rooms",
            {}
        )

        # =================================
        # DICT
        # =================================

        if isinstance(
            rooms_data,
            dict
        ):

            iterable = rooms_data.values()

        else:

            iterable = rooms_data

        # =================================
        # EXPORT
        # =================================

        for room in iterable:

            room["area_id"] = data.get(
                "area",
                {}
            ).get(
                "id",
                "unknown"
            )

            rooms.append(room)

    print(
        f"[ROOM SERVICE] "
        f"{len(rooms)} rooms loaded"
    )

    return rooms

# =========================================
# SAVE ROOM
# =========================================

def save_room(updated_room):

    vnum = str(
        updated_room.get("vnum")
    )

    if not vnum:

        print(
            "[SAVE ROOM] invalid vnum"
        )

        return False

    if not os.path.exists(
        AREAS_DIR
    ):

        print(
            "[SAVE ROOM] areas dir missing"
        )

        return False

    # =====================================
    # SEARCH AREA FILE
    # =====================================

    for filename in os.listdir(
        AREAS_DIR
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

                area_data = json.load(f)

        except Exception as e:

            print(
                f"[SAVE ROOM ERROR] "
                f"{filename}: {e}"
            )

            continue

        rooms_data = area_data.get(
            "rooms",
            {}
        )

        updated = False

        # =================================
        # DICT
        # =================================

        if isinstance(
            rooms_data,
            dict
        ):

            if vnum in rooms_data:

                rooms_data[vnum] = updated_room

                updated = True

        # =================================
        # LIST
        # =================================

        else:

            for i, room in enumerate(
                rooms_data
            ):

                if str(
                    room.get("vnum")
                ) == vnum:

                    rooms_data[i] = updated_room

                    updated = True

                    break

        # =================================
        # SAVE
        # =================================

        if updated:

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
                f"[SAVE ROOM] "
                f"{vnum}"
            )

            return True

    print(
        f"[SAVE ROOM] "
        f"room not found: {vnum}"
    )

    return False