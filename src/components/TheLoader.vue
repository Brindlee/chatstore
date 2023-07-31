<script setup>
    import { useLoaderStore } from '@/stores/loader'
    const loaderStore = useLoaderStore();
</script>
<template>
    <div v-if="loaderStore.isShow">
      <div class="chat incoming">
        <div class="chat-content">
          <div class="chat-details">
              <!--<img src="images/chatbot.jpg" alt="chatbot-img">-->
              <div class="typing-animation">
                  <div class="typing-dot" style="--delay: 0.2s"></div>
                  <div class="typing-dot" style="--delay: 0.3s"></div>
                  <div class="typing-dot" style="--delay: 0.4s"></div>
              </div>
          </div>
        </div>
      </div>
    </div>
</template>