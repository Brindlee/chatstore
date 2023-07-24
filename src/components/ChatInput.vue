<script setup>
    import {useMessageStore} from '@/stores/message'
    import {useLoaderStore} from '@/stores/loader'
    import TheLoader from './TheLoader.vue'
    import {ref, computed} from 'vue'
    import axios from 'axios'
    import messagesAPI from '@/js/messagesAPI.js'
    //import { getChatCompletions } from '@/js/messagesAPI.js'

    const msgStore = useMessageStore();
    const loaderStore = useLoaderStore();

    const message = ref("")

    const msgStoreMessages = computed(() => {
        return msgStore.messages
    })

    function pushMessage( msg) {
        console.log('in pushMsg', msg);
        msgStore.pushMessage({ role : 'user', content: msg, type: "text" });
        message.value = ""
        loaderStore.showLoader();
        console.log(' msgStoreMessages.value: ',  msgStoreMessages.value);
        
               
        if( msg.trim() == 'show buttons' ) {
            console.log('in show buttons');

            messagesAPI.getButtonOptions().then((data) => {
            //getChatCompletions( msgStoreMessages.value ).then((data) => {
                console.log('buttonOptions: ',data);
                loaderStore.hideLoader();
                msgStore.pushMessage({ role : 'assistant', content: msg, type : 'buttons', templateData: data });
            });
            
        } else {
            console.log('in show buttons else');
            messagesAPI.getChatCompletions( msgStoreMessages.value ).then((data) => {
            //getChatCompletions( msgStoreMessages.value ).then((data) => {
                console.log('completions: ',data);
                loaderStore.hideLoader();
                if(typeof data.choices != 'undefined' && data.choices.length > 0) {
                    let respMessage = data.choices[0].message;
                    respMessage.type = 'text';
                    msgStore.pushMessage(respMessage);
                }
            });
        }
    }
</script>
<template>
    <TheLoader />
    <textarea placeholder="type a message" v-model="message" v-on:keyup.enter="pushMessage(message)"></textarea>
</template>