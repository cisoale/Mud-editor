import os
import json

from config import ITEMS_DIR


# =========================================
# DEFAULT ITEM
# =========================================

def normalize_item(item):

    if not isinstance(item, dict):
        item = {}

    item.setdefault(
        "id",
        ""
    )

    item.setdefault(
        "name",
        "Unnamed Item"
    )

    item.setdefault(
        "short_desc",
        ""
    )

    item.setdefault(
        "long_desc",
        item.get(
            "description",
            ""
        )
    )

    item.setdefault(
        "type",
        "misc"
    )

    item.setdefault(
        "rarity",
        "common"
    )

    item.setdefault(
        "level",
        1
    )

    item.setdefault(
        "value",
        0
    )

    item.setdefault(
        "weight",
        0
    )

    item.setdefault(
        "stackable",
        False
    )

    item.setdefault(
        "max_stack",
        1
    )

    item.setdefault(
        "slot",
        ""
    )

    item.setdefault(
        "flags",
        []
    )

    item.setdefault(
        "scripts",
        []
    )

    # =====================================
    # REQUIREMENTS
    # =====================================

    item.setdefault(
        "requirements",
        {}
    )

    item["requirements"].setdefault(
        "level",
        1
    )

    # =====================================
    # STATS
    # =====================================

    item.setdefault(
        "stats",
        {}
    )

    item["stats"].setdefault(
        "damage_min",
        0
    )

    item["stats"].setdefault(
        "damage_max",
        0
    )

    item["stats"].setdefault(
        "armor",
        0
    )

    item["stats"].setdefault(
        "heal_hp",
        0
    )

    item["stats"].setdefault(
        "heal_mana",
        0
    )

    # =====================================
    # MODIFIERS
    # =====================================

    item.setdefault(
        "modifiers",
        {}
    )

    item["modifiers"].setdefault(
        "strength",
        0
    )

    item["modifiers"].setdefault(
        "dexterity",
        0
    )

    item["modifiers"].setdefault(
        "constitution",
        0
    )

    item["modifiers"].setdefault(
        "intelligence",
        0
    )

    item["modifiers"].setdefault(
        "wisdom",
        0
    )

    item["modifiers"].setdefault(
        "charisma",
        0
    )

    item["modifiers"].setdefault(
        "hp",
        0
    )

    item["modifiers"].setdefault(
        "mana",
        0
    )

    # =====================================
    # LEGACY SUPPORT
    # =====================================

    if "description" in item:

        del item["description"]

    return item


# =========================================
# GET ITEMS
# =========================================

def get_items():

    items = []

    for root, dirs, files in os.walk(
        ITEMS_DIR
    ):

        for file in files:

            if not file.endswith(".json"):
                continue

            path = os.path.join(
                root,
                file
            )

            try:

                with open(
                    path,
                    "r",
                    encoding="utf-8"
                ) as f:

                    data = json.load(f)

                if not isinstance(
                    data,
                    dict
                ):
                    continue

                items.append(
                    normalize_item(data)
                )

            except Exception as e:

                print(
                    "[ITEM LOAD ERROR]",
                    path,
                    e
                )

    try:

        items.sort(
            key=lambda i:
            str(
                i.get(
                    "id",
                    ""
                )
            ).lower()
        )

    except Exception as e:

        print(
            "[ITEM SORT ERROR]",
            e
        )

    return items


# =========================================
# GET ITEM
# =========================================

def get_item(item_id):

    path = os.path.join(
        ITEMS_DIR,
        f"{item_id}.json"
    )

    if not os.path.exists(path):

        return None

    try:

        with open(
            path,
            "r",
            encoding="utf-8"
        ) as f:

            item = json.load(f)

        return normalize_item(item)

    except Exception as e:

        print(
            "[GET ITEM ERROR]",
            e
        )

        return None


# =========================================
# SAVE ITEM
# =========================================

def save_item(item):

    item = normalize_item(item)

    item_id = item.get(
        "id"
    )

    if not item_id:

        return {
            "error":
            "Missing item id"
        }

    os.makedirs(
        ITEMS_DIR,
        exist_ok=True
    )

    path = os.path.join(
        ITEMS_DIR,
        f"{item_id}.json"
    )

    try:

        with open(
            path,
            "w",
            encoding="utf-8"
        ) as f:

            json.dump(
                item,
                f,
                indent=4,
                ensure_ascii=False
            )

        print(
            f"[SAVE ITEM] {item_id}"
        )

        return {
            "success": True
        }

    except Exception as e:

        print(
            "[SAVE ITEM ERROR]",
            e
        )

        return {
            "error":
            str(e)
        }


# =========================================
# DELETE ITEM
# =========================================

def delete_item(item_id):

    path = os.path.join(
        ITEMS_DIR,
        f"{item_id}.json"
    )

    if not os.path.exists(path):

        return {
            "error":
            "Item not found"
        }

    try:

        os.remove(path)

        print(
            f"[DELETE ITEM] {item_id}"
        )

        return {
            "success": True
        }

    except Exception as e:

        print(
            "[DELETE ITEM ERROR]",
            e
        )

        return {
            "error":
            str(e)
        }