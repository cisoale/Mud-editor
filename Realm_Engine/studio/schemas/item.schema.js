export default [

    {
        id: "id",
        label: "ID",
        type: "number"
    },

    {
        id: "name",
        label: "Name",
        type: "text"
    },

    {
        id: "type",
        label: "Type",
        type: "select",

        options: [

            "Weapon",

            "Armor",

            "Consumable"

        ]

    },

    {
        id: "description",
        label: "Description",
        type: "textarea"
    }

];