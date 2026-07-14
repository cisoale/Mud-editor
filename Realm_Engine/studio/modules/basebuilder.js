/**
 * ============================================================
 * Realm Studio
 * Base Builder
 * ============================================================
 */

import Panel from "../framework/panel.js";
import Editor from "./editor.js";

export default class BaseBuilder {

    constructor(title, schema, repository, columns) {

        this.title = title;
        this.schema = schema;
        this.repository = repository;
        this.columns = columns;

        this.panel = null;
        this.editor = null;

    }

    render() {

        this.panel = new Panel(this.title);

        const panel = this.panel.render();

        this.editor = new Editor();

        this.panel.body.appendChild(
            this.editor.render()
        );

        this.editor.setColumns(this.columns);

        this.editor.setSchema(this.schema);

        this.editor.setItems(
            this.repository.getAll()
        );

        return panel;

    }

    newObject() {

        const object = this.repository.create();

        this.editor.setItems(
            this.repository.getAll()
        );

        this.editor.select(object);

    }

    deleteObject() {

        const object = this.editor.getSelected();

        if (!object)
            return;

        this.repository.remove(object);

        this.editor.setItems(
            this.repository.getAll()
        );

    }

    duplicateObject() {

        const object = this.editor.getSelected();

        if (!object)
            return;

        const copy = this.repository.duplicate(object);

        this.editor.setItems(
            this.repository.getAll()
        );

        this.editor.select(copy);

    }

}