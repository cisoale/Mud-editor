/**
 * ============================================================
 * Realm Studio
 * Application State
 * ============================================================
 *
 * Global application state.
 *
 * ============================================================
 */

class ApplicationState {

    constructor() {

        this.currentProject = null;

        this.currentView = null;

        this.modified = false;

    }

    setProject(project) {

        this.currentProject = project;

    }

    getProject() {

        return this.currentProject;

    }

    setCurrentView(view) {

        this.currentView = view;

    }

    getCurrentView() {

        return this.currentView;

    }

    setModified(value) {

        this.modified = value;

    }

    isModified() {

        return this.modified;

    }

}

export default new ApplicationState();