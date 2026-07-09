export default class Router {

    constructor(workspace) {
        this.workspace = workspace;
        this.routes = new Map();
    }

    register(name, ViewClass) {
        this.routes.set(name, ViewClass);
    }

    open(name) {

        const ViewClass = this.routes.get(name);

        if (!ViewClass) {
            console.error(`View '${name}' non trovata.`);
            return;
        }

        this.workspace.setView(new ViewClass());

    }

}