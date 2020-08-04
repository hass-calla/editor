import iconsMeta from '@mdi/svg/meta.json';
import * as icons from '@mdi/js';
import {camelCase} from 'lodash/string';

export default class Icons {

    constructor() {
        this.meta = iconsMeta.map(icon => ({
            'id': icon.id,
            'name': icon.name,
            "aliases": icon.aliases
        }));

        this.icons = icons;
    }

    byName(name) {
        return this.icons[camelCase(`mdi-${name}`)];
    }

    all() {
        return this.meta;
    }

}