<script setup>
import pinia from "@/stores/store.js";
import {useCodeStore} from '@/stores/code'
import editorAPI from '@/js/editorAPI.js'
import { VAceEditor } from 'vue3-ace-editor';
import ace from 'ace-builds';

import modeJavascriptUrl from 'ace-builds/src-noconflict/mode-javascript?url';
ace.config.setModuleUrl('ace/mode/javascript', modeJavascriptUrl);

import themeChromeUrl from 'ace-builds/src-noconflict/theme-chrome?url';
ace.config.setModuleUrl('ace/theme/chrome', themeChromeUrl);

const codeStore = useCodeStore(pinia);
function deployWorkerToCloudeflare() {
    console.log("in theeditor deployWorkerToCloudeflare");
    editorAPI.deployWorkerToCloudeflare().then((data) => {
        console.log('response: ',data);
        //loaderStore.hideLoader();
    });
}
function saveFileToR2() {
    console.log()
    if( codeStore.name == '' ) {
        alert('provide file name');
    } else {
        editorAPI.saveFileToR2().then((data) => {
            console.log('response: ',data);
            //loaderStore.hideLoader();
        });
    }
}
function previewApp() {
    codeStore.selectedFile = 'vuestandaloneapp/index.html'
    editorAPI.getR2Object().then((data) => {
        console.log('response: ',data);
        codeStore.code = data;
        //loaderStore.hideLoader();
    });
   
}

function editorInit() {

}
</script>
<template>
    <!--<button @click="deployWorkerToCloudeflare">Deploy</button>-->
    <button @click="saveFileToR2">Save</button>
    <button @click="previewApp">Preview App</button>
    <input v-model="codeStore.name" placeholder="Type File Name" />
    <!--<textarea v-model="codeStore.code"></textarea>-->
    <VAceEditor
    v-model:value="codeStore.code"
    @init="editorInit"
    lang="javascrpt"
    theme="chrome"
    style="height: 300px" />
</template>