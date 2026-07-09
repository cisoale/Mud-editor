import Component from "./component.js";

export default class Panel extends Component {

    constructor(title = "") {

        super();

        this.title = title;

    }

    render() {

        const panel = this.createElement("div", "panel");

        const header = this.createElement("div", "panel-header");
        header.textContent = this.title;

        const body = this.createElement("div", "panel-body");

        panel.append(header, body);

        this.body = body;
        this.header = header;

        this.element = panel;

        return panel;

    }

}