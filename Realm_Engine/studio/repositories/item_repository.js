/**
 * ============================================================
 * Realm Studio
 * Item Repository
 * ============================================================
 */

import Repository from "./repository.js";
import itemSchema from "../schemas/item_schema.js";

export default class ItemRepository extends Repository {

    constructor() {

        super(

            itemSchema,

            [

                {
                    id: 1001,
                    name: "Long Sword",
                    type: "weapon",
                    description: "A sturdy iron sword.",
                    weight: 5,
                    value: 120
                },

                {
                    id: 1002,
                    name: "Leather Armor",
                    type: "armor",
                    description: "Simple leather armor.",
                    weight: 8,
                    value: 180
                },

                {
                    id: 1003,
                    name: "Healing Potion",
                    type: "food",
                    description: "Restores health.",
                    weight: 1,
                    value: 45
                }

            ]

        );

    }

}