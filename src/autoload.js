import Vue from 'vue';
import kebabCase from 'lodash/kebabCase';

const tileForms = require.context('@/components/TileForms', false, /[A-Z]\w+\.(vue)$/,);

tileForms.keys().forEach(fileName => {
	const componentConfig = tileForms(fileName);
	const componentName = kebabCase(fileName.split('/').pop().replace(/\.\w+$/, ''), '-');

	Vue.component(componentName, componentConfig.default || componentConfig);
});