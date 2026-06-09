import os
import json

from config import ITEMS_DIR


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

                    if isinstance(
                        data,
                        dict
                    ):

                        items.append(data)

            except Exception as e:

                print(
                    "[ITEM LOAD ERROR]",
                    path,
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

    with open(
        path,
        "r",
        encoding="utf-8"
    ) as f:

        return json.load(f)


# =========================================
# SAVE ITEM
# =========================================

def save_item(item):

    item_id = item.get("id")

    if not item_id:

        return {
            "error":
            "Missing item id"
        }

    path = os.path.join(
        ITEMS_DIR,
        f"{item_id}.json"
    )

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

    return {
        "success": True
    }