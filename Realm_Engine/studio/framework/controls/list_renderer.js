/**
 * ============================================================
 * Realm Framework
 * List Renderer
 * ============================================================
 *
 * Renders ListView cells.
 *
 * Version
 * ----------------
 * 1.0
 * ============================================================
 */

export default class ListRenderer {

    render(cell, result) {

        cell.innerHTML = "";

        if (result == null)
            return;

        if (typeof result === "string") {

            cell.textContent = result;

            return;

        }

        if (result.html) {

            cell.innerHTML = result.html;

            return;

        }

        if (result.image)
            this.renderImage(cell, result.image);

        if (result.svg)
            this.renderSvg(cell, result.svg);

        if (result.icon || result.emoji)
            this.renderIcon(cell, result.icon ?? result.emoji);

        if (result.badge)
            this.renderBadge(cell, result.badge);

        if (result.text)
            this.renderText(cell, result.text);

    }

    renderImage(cell, src) {

        const img = document.createElement("img");

        img.className = "listview-image";

        img.src = src;

        cell.appendChild(img);

    }

    renderSvg(cell, svg) {

        const span = document.createElement("span");

        span.className = "listview-svg";

        span.innerHTML = svg;

        cell.appendChild(span);

    }

    renderIcon(cell, icon) {

        const span = document.createElement("span");

        span.className = "listview-icon";

        span.textContent = icon;

        cell.appendChild(span);

    }

    renderBadge(cell, text) {

        const badge = document.createElement("span");

        badge.className = "listview-badge";

        badge.textContent = text;

        cell.appendChild(badge);

    }

    renderText(cell, text) {

        const span = document.createElement("span");

        span.className = "listview-text";

        span.textContent = text;

        cell.appendChild(span);

    }

}