import Repository from "../services/repository.js";

export default class ItemRepository extends Repository {

    constructor() {

        super();

        this.items = [

            {
                id: 1001,
                name: "Long Sword",
                type: "Weapon",
                description: "Simple sword"
            },

            {
                id: 1002,
                name: "Leather Armor",
                type: "Armor",
                description: "Leather armor"
            },

            {
                id: 1003,
                name: "Healing Potion",
                type: "Consumable",
                description: "Restores HP"
            }

        ];

    }

}