import Toolbar from "../components/toolbar.js";
import Sidebar from "../components/sidebar.js";
import Workspace from "../components/workspace.js";
import StatusBar from "../components/statusbar.js";

export default class Layout {

    constructor() {
        this.toolbar = new Toolbar();
        this.sidebar = new Sidebar();
        this.workspace = new Workspace();
        this.statusbar = new StatusBar();
    }

    render(parent) {

        parent.innerHTML = "";

        const layout = document.createElement("div");
        layout.className = "layout";

        layout.appendChild(this.toolbar.render());

        const body = document.createElement("div");
        body.className = "layout-body";

        body.appendChild(this.sidebar.render());
        body.appendChild(this.workspace.render());

        layout.appendChild(body);

        layout.appendChild(this.statusbar.render());

        parent.appendChild(layout);
    }

}