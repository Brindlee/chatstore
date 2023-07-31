import { defineCustomElement } from 'vue'
import AppSFC from './App.ce.vue';

// convert into custom element constructor
const TheWidget = defineCustomElement(AppSFC);

// register
customElements.define('the-widget', TheWidget)