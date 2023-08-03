<script setup>
import ChatInput from './components/ChatInput.vue'
import ChatMessages from './components/ChatMessages.vue'
import FileExplorer from './components/FileExplorer.vue';
import TheEditor from './components/TheEditor.vue';
</script>

<template>
  <div class="left-container">
    <ChatMessages />
    <ChatInput />
  </div>
  <div class="right-container">
    <FileExplorer />
    <TheEditor />
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
