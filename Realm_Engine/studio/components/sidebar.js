import Component from "../framework/component.js";

export default class Sidebar extends Component {

    render() {

        this.element = this.createElement("aside", "sidebar");

        this.element.innerHTML = `
            <ul>
                <li>🏠 Dashboard</li>
                <li>📁 Browser</li>
                <li>📦 Items</li>
                <li>👹 Mobs</li>
                <li>🏠 Rooms</li>
            </ul>
        `;

        return this.element;

    }

}