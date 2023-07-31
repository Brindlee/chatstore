<script setup>
import pinia from "@/stores/store.js";
import {useCodeStore} from '@/stores/code'
import editorAPI from '@/js/editorAPI.js'

const codeStore = useCodeStore(pinia);
function deployWorkerToCloudeflare() {
    console.log("in theeditor deployWorkerToCloudeflare");
    editorAPI.deployWorkerToCloudeflare().then((data) => {
        console.log('response: ',data);
        //loaderStore.hideLoader();
    });
}
</script>
<template>
    <button @click="deployWorkerToCloudeflare">Deploy</button>
    <input v-model="codeStore.name" placeholder="Type Worker Name" />
    <textarea v-model="codeStore.code"></textarea>
</template>