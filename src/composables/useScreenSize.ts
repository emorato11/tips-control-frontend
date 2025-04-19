import { ref, onMounted, onBeforeUnmount } from 'vue'

export function useScreenSize() {
  const screenWidth = ref(window.innerWidth)
  const isMobile = ref(screenWidth.value <= 768)

  const handleResize = () => {
    screenWidth.value = window.innerWidth
    isMobile.value = screenWidth.value <= 768
  }

  onMounted(() => {
    window.addEventListener('resize', handleResize)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
  })

  return {
    screenWidth,
    isMobile,
  }
}
