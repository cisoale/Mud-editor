/**
 * ============================================================
 * Realm Studio
 * Item Repository
 * ============================================================
 *
 * Temporary repository used during migration to the new
 * ECS/Schema system.
 *
 * Schemas are no longer imported here. They will be supplied
 * by the SchemaLoader and the PropertyGrid.
 * ============================================================
 */

import Repository from "./repository.js";

export default class ItemRepository extends Repository {

    constructor() {

        super(

            [],

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
                    type: "consumable",
                    description: "Restores health.",
                    weight: 1,
                    value: 45
                }

            ]

        );

    }

}