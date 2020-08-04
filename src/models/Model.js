import Vue from 'vue';
import Api from "../api";

class Model {

    static api = new Api;

    constructor(rawObject, parentObject = null) {
        this.boot();
        this._original = {};
        this._attributes = {};
        this._parent = parentObject;

        this.fill(rawObject);
    }

    boot() {};

    fill(rawObject) {
        this._original = rawObject;
        Vue.set(this, '_attributes', rawObject);
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

    update() {

    }

    toJSON() {

    }

}

export default Model;