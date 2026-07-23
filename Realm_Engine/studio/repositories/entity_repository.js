/**
 * ============================================================
 * Realm Studio
 * Entity Repository
 * ============================================================
 *
 * Repository used by the ECS editor.
 * ============================================================
 */

import Repository from "./repository.js";

export default class EntityRepository extends Repository {

    constructor() {

        super([

            {
                id: 1001,

                components: {
                    "core.identity": {
                        name: "Long Sword",
                        description: "A sturdy iron sword.",
                        category: "Item"
                    }
                }
            },

            {
                id: 1002,

                components: {
                    "core.identity": {
                        name: "Goblin",
                        description: "A small green creature.",
                        category: "Mob"
                    }
                }
            }

        ]);

    }

}