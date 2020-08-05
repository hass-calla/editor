import Model from "./Model";
import Group from "./Group";
import Vue from "vue";

class Page extends Model {

    boot() {
        this.loaded = false;
        this.loading = false;
        this._groups = {};
    }

    get order() {
        return this.getAttribute('background', 999);
    }

    set order(value) {
        this.setAttribute('background', value);
    }

    get icon() {
        return this.getAttribute('icon', "");
    }

    set icon(value) {
        this.setAttribute('icon', value);
    }

    get background() {
        return this.getAttribute('background', {});
    }

    set background(value) {
        this.setAttribute('background', value);
    }

    async newGroup() {
        const group = new Group(
            (await Page.api.createGroup(this)).data(),
            this
        )

        this.pushGroup(group);

        return group;
    }

    async group(id) {
        return (await this.groups())
            .find(g => g.id === id);
    }

    async groups(refresh = false) {
        if(this.loaded && ! refresh) {
            return Object.values(this._groups);
        }

        if(this.loading) {
            return Object.values(this._groups);
        }

        this.loaded = false;
        this.loading = true;

        const groups = (await Page.api.groups(this)).data();

        for(let group of groups) {
            this.pushGroup(new Group(group, this));
        }

        this.loaded = true;
        this.loading = false;

        return Object.values(this._groups);
    }

    deleteGroup(groupId) {
        Vue.delete(this._groups, groupId);
    }

    pushGroup(group) {
        Vue.set(this._groups, group.id, group);
    }

    link() {
        return {
            name: 'page',
            params: {
                ...this.parent.link().params,
                pageId: this.id
            }
        }
    }

}

export default Page;