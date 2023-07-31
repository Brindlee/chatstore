import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCodeStore = defineStore('codeStore', () => {
  const code = ref("")
  const name = ref("")
  function setCode(codeStr) {
    code.value = codeStr;
  }

  return { code, setCode, name }
})
