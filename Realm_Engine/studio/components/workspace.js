import Component from "../framework/component.js";

export default class Workspace extends Component {

    constructor() {

        super();

        this.currentView = null;

    }

    render() {

        this.element = this.createElement("main", "workspace");

        return this.element;

    }

    setView(view) {

        this.currentView = view;

        this.element.innerHTML = "";

        this.element.appendChild(view.render());

        view.onOpen();

    }

}