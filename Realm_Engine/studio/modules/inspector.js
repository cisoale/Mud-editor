/**
 * ============================================================
 * Realm Studio
 * Inspector
 * ============================================================
 *
 * Displays all ECS components of the selected entity.
 *
 * Responsibilities
 * ----------------
 * - Receives an Entity.
 * - Retrieves component schemas from SchemaLoader.
 * - Creates one ComponentPanel per component.
 * - Creates one PropertyGrid per component.
 *
 * ============================================================
 */

import Component from "../framework/core/component.js";

import Panel from "../framework/ui/panel.js";
import PropertyGrid from "./propertygrid.js";

export default class Inspector extends Component {

    constructor(schemaLoader, repository = null, project = null) {

        super();

        this.schemaLoader = schemaLoader;
        this.repository = repository;
        this.project = project;

        this.entity = null;
        this.panels = [];
        this.history = [];
        this.historyIndex = -1;
        this.redoStack = [];
        this.refresh();
    }

    // ==========================================================
    // Entity
    // ==========================================================

    setEntity(entity) {

        console.log("[Inspector] Entity:", entity);

        this.entity = entity;

        this.refresh();

    }

    getEntity() {

        return this.entity;

    }

    async undo() {

        if (this.historyIndex < 0)
            return false;

        const change = this.history[this.historyIndex];
        this.redoStack.push(change);

        const entity = this.repository?.getById(change.entityId);

        if (!entity)
            return false;

        const component = Object.values(entity.components || {})
            .find(component => Object.prototype.hasOwnProperty.call(
                component,
                change.fieldId
            ));

        if (!component)
            return false;

        component[change.fieldId] = change.oldValue;
        entity.meta.dirty = true;

        if (this.project) {
            this.project.setDirty(true);
            await this.project.save();
        }

        this.historyIndex--;

        this.refresh();

        return true;

    }
    async redo() {

        if (this.redoStack.length === 0)
            return false;

        const change = this.redoStack.pop();

        const entity = this.repository?.getById(change.entityId);

        if (!entity)
            return false;

        const component = Object.values(entity.components || {})
            .find(component => Object.prototype.hasOwnProperty.call(
                component,
                change.fieldId
            ));

        if (!component)
            return false;

        component[change.fieldId] = change.newValue;

        entity.meta.dirty = true;

        if (this.project) {
            this.project.setDirty(true);
            await this.project.save();
        }

        this.historyIndex++;

        this.refresh();

        return true;
    }

    // ==========================================================
// Components
// ==========================================================

async addComponent(componentId) {
    

    if (!this.entity)
        return false;

    if (!componentId)
        return false;

    if (!this.entity.components)
        this.entity.components = {};

    if (this.entity.components[componentId])
        return false;

    const schema = this.schemaLoader?.get(componentId);

    if (!schema)
        return false;

    const component = {};

    for (const field of schema.fields || []) {
        component[field.id] = field.default ?? null;
    }

    this.entity.components[componentId] = component;
    console.log(
    "[Inspector] AFTER ADD:",
    structuredClone(this.entity.components)
    );
    this.entity.meta.dirty = true;

    this.history = [];
    this.historyIndex = -1;
    this.redoStack = [];

    this.refresh();

    return true;
}

    async removeComponent(componentId) {

    if (!this.entity)
        return false;

    if (!componentId)
        return false;

    if (!this.entity.components?.[componentId])
        return false;

    delete this.entity.components[componentId];

    this.entity.meta.dirty = true;

    this.history = [];
    this.historyIndex = -1;
    this.redoStack = [];

    if (this.project) {
        this.project.setDirty(true);
        await this.project.save();
    }

    this.refresh();

    return true;
}
    // ==========================================================
    // Refresh
    // ==========================================================

    refresh() {

        if (!this.element)
            return;

        this.element.replaceChildren();

        this.panels = [];
        
        if (!this.entity)
            return;

        const components = this.entity.components || {};

        for (const componentId of Object.keys(components)) {

            if (!this.schemaLoader)
                continue;

            const schema = this.schemaLoader.get(componentId);

            if (!schema)
                continue;

            const grid = new PropertyGrid();

            grid.setSchema(schema.fields || []);

            grid.setObject(
                components[componentId]
            );

            // ==================================================
            // Dirty State
            // ==================================================

            grid.onChange(async (fieldId, newValue, oldValue) => {

                console.log(
                    "[Inspector] Change:",
                    fieldId,
                    "old:",
                    oldValue,
                    "new:",
                    newValue
                );

                if (this.historyIndex < this.history.length - 1) {
                    this.history.splice(this.historyIndex + 1);
                }

                this.history.push({
                    entityId: this.entity.id,
                    fieldId,
                    oldValue,
                    newValue
                });

                this.historyIndex = this.history.length - 1;

                this.entity.meta.dirty = true;

                console.log(
                    "[Inspector] Dirty:",
                    this.entity.id,
                    this.entity.meta
                );

                if (this.project) {
                    this.project.setDirty(true);
                    await this.project.save();
                }

            });

            const panel = new Panel(
                schema.name || componentId
            );

            panel.append(grid);

            this.panels.push(panel);

            this.element.appendChild(
                panel.render()
            );

        }

    }

    // ==========================================================
    // Helpers
    // ==========================================================

    clear() {

        this.entity = null;

        this.refresh();

    }

    // ==========================================================
    // Render
    // ==========================================================

    render() {

        if (this.isRendered()) {

            return this.getElement();

        }

        this.element = this.createElement(
            "div",
            "inspector"
        );

        this.refresh();

        return this.finishRender();

    }

}