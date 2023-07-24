import { defineStore } from "pinia"
import {ref} from 'vue'

export const useLoaderStore = defineStore( 'loaderStore' ,() => {
    const isShow = ref(false);
    function showLoader() {
        this.isShow = true;
    }
    function hideLoader() {
        this.isShow = false;
    }
    return {isShow, showLoader, hideLoader}
})