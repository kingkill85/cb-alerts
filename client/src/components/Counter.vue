<template>
  <div class="counter">
    <h2>{{name}} <b-badge>{{count}}</b-badge></h2>

    <b-button-group>
      <b-button @click="increment">+</b-button>
      <b-button @click="decrement">-</b-button>
    </b-button-group>

  </div>
</template>

<script>
export default {
  name: 'counter',
  props: {
    name
  },
  computed: {
    count () {
      return this.$store.state.count;
    }
  },
  methods: {
    increment () {
      this.$store.commit('increment')
    },
    decrement () {
    	this.$store.commit('decrement')
    }
  }
}
</script>

<style scoped>
  #counter {
    width: 100px;
  }
</style>
