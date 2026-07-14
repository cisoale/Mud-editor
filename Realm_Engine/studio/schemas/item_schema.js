/**
 * ============================================================
 * Realm Studio
 * Item Schema
 * ============================================================
 */

export default [

    {
        id: "id",
        label: "ID",
        type: "number",
        default: 0
    },

    {
        id: "name",
        label: "Name",
        type: "text",
        default: ""
    },

    {
        id: "type",
        label: "Type",
        type: "select",
        options: [
            "weapon",
            "armor",
            "shield",
            "helmet",
            "boots",
            "gloves",
            "food",
            "drink",
            "container",
            "key",
            "quest",
            "misc"
        ],
        default: "misc"
    },

    {
        id: "description",
        label: "Description",
        type: "textarea",
        default: ""
    },

    {
        id: "weight",
        label: "Weight",
        type: "number",
        default: 0
    },

    {
        id: "value",
        label: "Value",
        type: "number",
        default: 0
    }

];