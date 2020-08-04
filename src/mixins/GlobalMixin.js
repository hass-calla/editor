import Vue from 'vue';

const GlobalMixin = {

    computed: {

        builderTypes() {
            return this.$store.state.builderTypes;
        },

        displayedObjectType() {
            return this.$store.state.displayedObjectType;
        },

        currentListObjectType() {
            return this.$store.state.currentListObjectType;
        },

        displayIndex() {
            return this.builderTypes.indexOf(this.displayedObjectType);
        },

        currentObject() {
            switch(this.displayedObjectType) {
                case "board": return this.boardModel;
                case "page": return this.pageModel;
                case "group": return this.groupModel;
                case "tile": return this.tileModel;
            }
        },

        boardModel() {
            const boardId = this.$route.params.boardId;

            if(! boardId || ! this.$store.state.boardsLoaded) {
                return null;
            }

            return this.$store.getters.board(boardId);
        },

        pageModel() {
            const pageId = this.$route.params.pageId;

            if(! pageId || ! this.boardModel) {
                return null;
            }

            return this.boardModel.page(pageId);
        },

        groupModel() {
            const groupId = this.$route.params.groupId;

            if(! groupId || ! this.pageModel) {
                return null;
            }

            return this.pageModel.group(groupId);
        },

        tileModel() {
            const tileId = this.$route.params.tileId;

            if(! tileId || ! this.groupModel) {
                return null;
            }

            return this.groupModel.tile(tileId);
        }

    }
};

Vue.mixin(GlobalMixin);