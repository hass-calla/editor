import Vue from 'vue';
import Model from "./Model";
import Page from "./Page";

class Board extends Model {

    boot() {
        this.loaded = false;
        this.loading = false;
        this._pages = {};
    }

    get background() {
        return this.getAttribute('background', {});
    }

    set background(value) {
        this.setAttribute('background', value);
    }

    get fully() {
        return this.getAttribute('fully');
    }

    set fully(value) {
        this.setAttribute('fully', value);
    }

    async newPage() {
        const page = new Page(
            (await Board.api.createPage(this)).data(),
            this
        )

        this.pushPage(page);

        return page;
    }

    async page(id) {
        return (await this.pages())
            .find(p => p.id === id);
    }

    async pages(refresh = false) {
        if(this.loaded && ! refresh) {
            return Object.values(this._pages);
        }

        this.loaded = false;
        this.loading = true;

        const pages = (await Board.api.pages(this));

        if(pages.isError) {
            this.loading = false;
            this.loaded = false;

            throw new Error(pages.data());
        }

        for(let page of pages.data()) {
            this.pushPage(new Page(page, this));
        }

        this.loaded = true;
        this.loading = false;

        return Object.values(this._pages);
    }

    async deletePage(pageId) {
        Vue.delete(this._pages, pageId);
    }

    pushPage(page) {
        Vue.set(this._pages, page.id, page);
    }

    static async create() {
        return new Board(
            (await Board.api.createBoard())
                .data()
        );
    }

}

export default Board;