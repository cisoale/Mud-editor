export default class Repository {

    constructor() {

        this.items = [];

    }

    getAll() {

        return this.items;

    }

    get(id) {

        return this.items.find(item => item.id === id);

    }

    add(item) {

        this.items.push(item);

    }

    update(item) {

        const index = this.items.findIndex(i => i.id === item.id);

        if (index !== -1) {

            this.items[index] = item;

        }

    }

    remove(id) {

        this.items = this.items.filter(item => item.id !== id);

    }

    clear() {

        this.items = [];

    }

}