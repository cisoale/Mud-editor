import Component from "../framework/component.js";

export default class Toolbar extends Component {

    render() {

        this.element = this.createElement("header", "toolbar");

        this.element.textContent = "Realm Studio Alpha";

        return this.element;
    }

}