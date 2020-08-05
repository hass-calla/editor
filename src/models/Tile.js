import Model from "./Model";
import store from '../store';


class Tile extends Model {

    get hasEntity() {
        if(! this.entity_id || typeof this.entity_id !== 'string') {
            return false;
        }

        return this.entity_id && (this.entity_id || []).length > 0;
    }

    get entity() {
        if(! this.entity_id || typeof this.entity_id !== 'string') {
            return;
        }

        return store.getters.entities[this.entity_id];
    }

    get name() {
        if(! this.sync_friendly_name) {
            return this.getAttribute('name');
        }

        if(this.entity) {
            return this.entity.attributes.friendly_name;
        }

        return "";
    }

    set name(value) {
        this.setAttribute('name', value);
    }

    get loaded() {
        return (this.parent || {loaded: false}).loaded;
    }

    get loading() {
        return (this.parent || {loading: true}).loading;
    }

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

    get conditional_style() {
        return this.getAttribute('conditional_style', []);
    }

    set conditional_style(value) {
        this.setAttribute('conditional_style', value);
    }

    get sync_friendly_name() {
        return this.getAttribute('sync_friendly_name');
    }

    set sync_friendly_name(value) {
        this.setAttribute('sync_friendly_name', value);
    }

    syncComponentForm(form) {
        for(let key of Object.keys(form)) {
            this[key] = form[key];
        }
    }

    link() {
        return {
            name: 'tile',
            params: {
                ...this.parent.link().params,
                tileId: this.id
            }
        }
    }

}

export default Tile;