/**
 * ============================================================
 * Realm Framework
 * List Column
 * ============================================================
 *
 * Describes a column displayed by ListView.
 *
 * Version
 * ----------------
 * 1.0
 * ============================================================
 */

export default class ListColumn {

    constructor(options = {}) {

        this.id = options.id ?? "";

        this.label = options.label ?? "";

        this.width = options.width ?? null;

        this.flex = options.flex ?? 1;

        this.minWidth = options.minWidth ?? 60;

        this.maxWidth = options.maxWidth ?? null;

        this.visible = options.visible ?? true;

        this.sortable = options.sortable ?? true;

        this.searchable = options.searchable ?? true;

        this.resizable = options.resizable ?? true;

        this.align = options.align ?? "left";

        this.getter = options.getter ?? null;

        this.renderer = options.renderer ?? null;

    }

}