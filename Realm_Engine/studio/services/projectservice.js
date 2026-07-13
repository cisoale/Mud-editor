export default class ProjectService {

    constructor() {

        this.project = null;

    }

    open(project) {

        this.project = project;

    }

    close() {

        this.project = null;

    }

    current() {

        return this.project;

    }

}