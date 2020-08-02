import Model from "./Model";
import Page from "./Page";

class Tile extends Model {

    get order() {
        return this.getAttribute('background', 999);
    }

    set order(value) {
        this.setAttribute('background', value);
    }

    get type() {
        return this.getAttribute('type');
    }

    set type(value) {
        this.setAttribute('type', value);
    }

    get width() {
        return this.getAttribute('width');
    }

    set width(value) {
        this.setAttribute('width', value);
    }

    get height() {
        return this.getAttribute('height');
    }

    set height(value) {
        this.setAttribute('height', value);
    }

    get entity_id() {
        return this.getAttribute('entity_id');
    }

    set entity_id(value) {
        this.setAttribute('entity_id', value);
    }

    get state_style() {
        return this.getAttribute('state_style', []);
    }

    set state_style(value) {
        this.setAttribute('state_style', value);
    }

}

export default Tile;