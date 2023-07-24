import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMessageStore = defineStore('messagesStore', () => {
  const messages = ref([])
  function pushMessage(msg) {
    messages.value.push(msg);
  }

  return { messages, pushMessage }
})
