<script setup>
import pinia from "@/stores/store.js";
import {useCodeStore} from '@/stores/code'
import editorAPI from '@/js/editorAPI.js'
import { onMounted } from 'vue'

const codeStore = useCodeStore(pinia);
onMounted(() => {
    editorAPI.listR2Objects().then((data) => {
        console.log('response: ',data);
        //loaderStore.hideLoader();
    });
})
</script>
<template>
    File explorer will be here
</template>