import os
import json

from config import MOBS_DIR


def get_mobs():

    mobs = []

    print("MOBS_DIR =", MOBS_DIR)

    for root, dirs, files in os.walk(MOBS_DIR):

        for file in files:

            if not file.endswith(".json"):
                continue

            path = os.path.join(root, file)

            print("LOADING:", path)

            try:

                with open(path, "r", encoding="utf-8") as f:

                    data = json.load(f)

                    if not isinstance(data, dict):
                        continue

                    if data.get("vnum") is None:

                        print(
                            "MOB SENZA VNUM:",
                            path
                        )

                        data["vnum"] = 0

                    mobs.append(data)

            except Exception as e:

                print("ERRORE FILE:", path)

                print(e)

    try:

        mobs.sort(
          key=lambda m: str(
              m.get("vnum", "")
          ).lower()
        )

    except Exception as e:

          print(
            "[MOB SORT ERROR]",
            e
    )
    

    return mobs


def save_mob(mob):

    vnum = mob.get("vnum")

    if vnum is None:
        return {
            "error": "Missing vnum"
        }

    path = os.path.join(
        MOBS_DIR,
        f"{vnum}.json"
    )

    with open(path, "w", encoding="utf-8") as f:

        json.dump(
            mob,
            f,
            indent=4,
            ensure_ascii=False
        )

    return {
        "success": True
    }
    # =========================
    # DUPLICATE CHECK
    # =========================

    if os.path.exists(path):

        return {
            "error": f"Mob '{vnum}' already exists"
        }
        
    with open(path, "w", encoding="utf-8") as f:

        json.dump(
            mob,
            f,
            indent=4,
            ensure_ascii=False
        )

    return {
        "success": True
    }

# =========================================
# GET MOB
# =========================================

def get_mob(vnum):

    mobs = get_mobs()

    for mob in mobs:

        if str(
            mob.get("vnum")
        ) == str(vnum):

            return mob

    return None

# =========================================
# DELETE MOB
# =========================================

def delete_mob(vnum):

    path = os.path.join(
        MOBS_DIR,
        f"{vnum}.json"
    )

    if not os.path.exists(path):

        return {
            "error": f"Mob '{vnum}' not found"
        }

    os.remove(path)

    return {
        "success": True
    }