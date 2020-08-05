import Model from "./Model";
import Vue from "vue";
import Tile from "./Tile";

class Group extends Model {

    boot() {
        this.loaded = false;
        this.loading = false;
        this._tiles = {};
    }

    get order() {
        return this.getAttribute('background', 999);
    }

    set order(value) {
        this.setAttribute('background', value);
    }

    get background() {
        return this.getAttribute('background', {});
    }

    set background(value) {
        this.setAttribute('background', value);
    }

    get name_visible() {
        return this.getAttribute('name_visible', true);
    }

    set name_visible(value) {
        this.setAttribute('name_visible', value);
    }

    get icon() {
        return this.getAttribute('icon');
    }

    set icon(value) {
        this.setAttribute('icon', value);
    }

    async newTile() {
        const tile = new Tile(
            (await Group.api.createTile(this)).data(),
            this
        )

        this.pushTile(tile);

        return tile;
    }

    async tile(id) {
        return (await this.tiles())
            .find(g => g.id === id);
    }

    async tiles(refresh = false) {
        if(this.loaded && ! refresh) {
            return Object.values(this._tiles);
        }

        if(this.loading) {
            return Object.values(this._tiles);
        }

        this.loaded = false;
        this.loading = true;

        const tiles = (await Tile.api.tiles(this)).data();

        for(let tile of tiles) {
            this.pushTile(new Tile(tile, this));
        }

        this.loaded = true;
        this.loading = false;

        return Object.values(this._tiles);
    }

    deleteTile(tileId) {
        Vue.delete(this._tiles, tileId);
    }

    pushTile(tile) {
        Vue.set(this._tiles, tile.id, tile);
    }

    link() {
        return {
            name: 'group',
            params: {
                ...this.parent.link().params,
                groupId: this.id
            }
        }
    }

}

export default Group;