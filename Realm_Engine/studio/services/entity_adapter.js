export default class EntityAdapter {

    static identity(entity) {

        return entity.components["core.identity"] || {};

    }

    static getName(entity) {

        return this.identity(entity).name || "";

    }

    static getDescription(entity) {

        return this.identity(entity).description || "";

    }

    static getCategory(entity) {

        return this.identity(entity).category || "";

    }

}