<template>
  <div class="about">
    <counter name="Counter 2" />
    <h2>This is an about page</h2>
  </div>
</template>
<script>
import counter from '@/components/Counter.vue'
export default {
  name: 'about',
  components: {
    counter
  }

}
</script>

