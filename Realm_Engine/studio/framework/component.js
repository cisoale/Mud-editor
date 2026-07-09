export default class Component {

    constructor() {
        this.element = null;
    }

    createElement(tag, className = "") {
        const element = document.createElement(tag);

        if (className) {
            element.className = className;
        }

        return element;
    }

    render() {
        throw new Error("render() not implemented");
    }

}