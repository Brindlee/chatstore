<script setup>
import pinia from "@/stores/store.js";
import {useMessageStore} from '@/stores/message'
import { CButtonGroup, CButton } from '@coreui/vue';
import TheLoader from './TheLoader.vue'

const msgStore = useMessageStore(pinia);
function  buttonClicked( selectedValue ) {
    console.log('selectedValue', selectedValue);
}
</script>
<template>
    <div class="chat-container">
        <div v-for="msg in msgStore.messages">
            <div v-if="msg.type == 'text'">
                <div :class="{'chat incoming' : msg.role === 'assistant', 'chat outgoing' : msg.role === 'user' }">
                    <div class="chat-content">
                        <div class="chat-details">
                            <template v-if="msg.role === 'user'">
                                <img src="@/assets/images/user.jpeg" alt="user-img">
                            </template>
                            <template v-if="msg.role === 'assistant'">
                                <img src="@/assets/images/chatbot.jpeg" alt="user-img">
                            </template>
                            <p>{{msg.content}}</p>
                        </div>
                        <template v-if="msg.role === 'assistant'">
                            <span class="material-symbols-rounded">content_copy</span>
                        </template>
                    </div>
                </div>
            </div>
            <div v-else-if="msg.type == 'buttons'">
                <CButtonGroup vertical role="group" aria-label="Vertical button group">
                    <span>{{ msg.templateData.questionText }}</span>
                    <template v-for="btn in  msg.templateData.buttons">
                        <CButton color="dark" @click="buttonClicked(btn.buttonValue)">{{ btn.buttonLabel }}</CButton>
                    </template>
                </CButtonGroup>
            </div>
        </div>
        <TheLoader />
    </div>
</template>