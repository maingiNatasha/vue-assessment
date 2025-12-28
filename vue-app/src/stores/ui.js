import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  const collapsed = ref(false)
  const mobileOpen = ref(false)

  function toggleCollapse() {
    if (window.innerWidth >= 768) {
      collapsed.value = !collapsed.value
    } else {
      mobileOpen.value = !mobileOpen.value
    }
  }

  return { collapsed, mobileOpen, toggleCollapse }
})
