import Vue from 'vue';
import Api from "../api";

class Model {

    static api = new Api;

    constructor(rawObject, parentObject = null) {
        this._attributes = {};
        Vue.set(this, '_attributes', {});
        this._parent = parentObject;

        this.fill(rawObject);
    }

    fill(rawObject) {
        const keys = Object.keys(rawObject);

        for(let key of keys) {
            this[key] = rawObject[key];
        }
    }

    setAttribute(key, value) {
        Vue.set(this._attributes, key, value);
        this.update();
    }

    getAttribute(key, defaultValue = null) {
        const value = this._attributes[key];

        return typeof value === 'undefined' ? defaultValue : value;
    }

    get id() {
        return this.getAttribute('id');
    }

    set id(value) {
        this.setAttribute('id', value);
    }

    get name() {
        return this.getAttribute('name', "");
    }

    set name(value) {
        this.setAttribute('name', value);
    }

    get meta() {
        return this.getAttribute('meta', {});
    }

    set meta(value) {
        this.setAttribute('meta', value);
    }

    static create() {

    }

    update() {

    }

    toJSON() {

    }

}

export default Model;