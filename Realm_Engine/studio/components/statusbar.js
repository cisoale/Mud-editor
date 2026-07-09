import Component from "../framework/component.js";

export default class StatusBar extends Component {

    render() {

        this.element = this.createElement("footer", "statusbar");

        this.element.textContent = "Ready";

        return this.element;

    }

}