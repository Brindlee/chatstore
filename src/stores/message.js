import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMessageStore = defineStore('messagesStore', () => {
  const messages = ref([{"role": "system", "content": "You are a skilled developer working on a project that involves developing a web service API hosted on Cloudflare worker in esm format using JavaScript. Your task is to instruct ChatGPT to understand the specific requirements for the web service and generate corresponding JavaScript code without importing any module that is optimized for execution on Cloudflare worker in ES module format. Ask user to provide the detailed requirements for the web service API.Once done with taking user REQUIREMENTS, generate only JavaScript code for a single file, without importing any module. Code should not contain any additional instructions. Don't write code in service worker format use ES Module format instead.Workers using ES modules format replace the addEventListener syntax with an object definition, which must be the file’s default export (via export default)."},
{role : "assistant", content: "provide your requirements", type: "text"}])
  function pushMessage(msg) {
    messages.value.push(msg);
  }

  return { messages, pushMessage }
})
