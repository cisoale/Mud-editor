import View from "../framework/view.js";
import Panel from "../framework/panel.js";

export default class DashboardView extends View {

    render() {

        const panel = new Panel("Dashboard");

        panel.render();

        panel.body.innerHTML = `
            <h2>Realm Studio</h2>

            <p>Version Alpha 0.1</p>

            <p>Benvenuto.</p>
        `;

        return panel.element;

    }

}