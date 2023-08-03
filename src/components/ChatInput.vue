<script setup>
    import {useMessageStore} from '@/stores/message'
    import {useLoaderStore} from '@/stores/loader'
    import TheLoader from './TheLoader.vue'
    import {ref, computed} from 'vue'
    import axios from 'axios'
    import messagesAPI from '@/js/messagesAPI.js'
    import {useCodeStore} from '@/stores/code'

    //import { getChatCompletions } from '@/js/messagesAPI.js'

    const msgStore = useMessageStore();
    const loaderStore = useLoaderStore();
    const codeStore = useCodeStore();

    const message = ref("")

    const msgStoreMessages = computed(() => {
        return msgStore.messages
    })

    function pushMessage( msg) {
        console.log('in pushMsg', msg);
        //msg = 'User REQUIREMENTS are: '+msg;
        const note = "Note: When writing JavaScript code for a Cloudflare worker to connect to the OpenAI API and implement chat completions, there are several important things you should keep in mind to ensure a smooth and secure implementation: 1. **Security:** Take security seriously, as the code will be running on Cloudflare's edge servers. Avoid exposing sensitive information like API keys or credentials in the code. Use Cloudflare Workers' environment variables or secrets to store and access sensitive information securely. 2. **Rate Limiting:** Be mindful of the rate limits imposed by the OpenAI API and implement appropriate rate limiting in your worker to prevent excessive API requests and avoid potential issues or extra costs. 3. **Error Handling:** Always handle errors gracefully. If there is an issue with the OpenAI API request or response, ensure that your worker provides meaningful error messages or fallback responses to users. 4. **Dependency Management:** Keep the worker's dependencies minimal to reduce the size and improve performance. Use only the necessary libraries to interact with the OpenAI API. 5. **Asynchronous Code:** Make use of asynchronous programming techniques to avoid blocking the event loop and to improve the worker's overall efficiency. 6. **CORS Headers:** Set appropriate CORS headers if your worker is making requests to the OpenAI API from the client-side (browser). This ensures that the client-side can receive the responses correctly. 7. **Request Validation:** Validate user input or requests to ensure they meet the expected format and prevent potential vulnerabilities like SQL injection or other malicious attacks. 8. **Cache Management:** If applicable, consider implementing caching strategies to minimize redundant API requests and improve the response time. 9. **Monitoring and Logging:** Implement logging in your Cloudflare worker to track important events, errors, and debug information. This will be useful for troubleshooting and monitoring the worker's behavior. 10. **Testing:** Thoroughly test your Cloudflare worker in different scenarios to ensure it behaves as expected and handles different types of input gracefully. Here's a basic outline of the steps you might take in your Cloudflare worker to implement chat completions using the OpenAI API: 1. Receive a request from the client containing the chat message(s) and any other required parameters. 2. Validate and sanitize the input received from the client. 3. If necessary, implement rate limiting to control the number of API requests. 4. Create a function that makes a request to the OpenAI API using the necessary authentication (API key, token, etc.). 5. Handle the API response and extract the required information. 6. Send back the appropriate response to the client or cache the response for future use";
        msg = msg+' '+note;
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
                    codeStore.setCode(respMessage.content);
                }
            });
        }
    }
</script>
<template>
    
    <div class="typing-container">
      <div class="typing-content">
        <div class="typing-textarea">

            <textarea id="chat-input" spellcheck="false" placeholder="type a message" v-model="message" v-on:keyup.enter="pushMessage(message)"></textarea>
        </div>
        <div class="typing-controls">
          <span id="theme-btn" class="material-symbols-rounded">light_mode</span>
          <span id="delete-btn" class="material-symbols-rounded">delete</span>
      </div>
    </div>
    </div>
</template>