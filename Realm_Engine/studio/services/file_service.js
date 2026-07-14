/**
 * ============================================================
 * Realm Studio
 * File Service
 * ============================================================
 *
 * Responsibilities
 * ----------------
 * - Load JSON files.
 * - Save JSON files (future backend).
 *
 * ============================================================
 */

export default class FileService {

    /**
     * Load a JSON file.
     */

    async load(path) {

        const response = await fetch(path);

        if (!response.ok) {

            throw new Error(
                `Unable to load '${path}'.`
            );

        }

        return await response.json();

    }

    /**
     * Save JSON file.
     * (Requires backend support.)
     */

    async save(path, data) {

        const response = await fetch("/api/save", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                path,
                data

            })

        });

        if (!response.ok) {

            throw new Error(
                `Unable to save '${path}'.`
            );

        }

        return await response.json();

    }

}