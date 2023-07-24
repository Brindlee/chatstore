<script setup>
import {useMessageStore} from '@/stores/message'
import { CButtonGroup, CButton } from '@coreui/vue';

const msgStore = useMessageStore();
function  buttonClicked( selectedValue ) {
    console.log('selectedValue', selectedValue);
}
</script>
<template>
    <div v-for="msg in msgStore.messages">
        <div v-if="msg.type == 'text'">
            <pre>{{msg.role}} : {{msg.content}}</pre>
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
    
</template>