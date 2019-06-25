<template>
  <div class="home">
    <b-jumbotron bg-variant="dark" text-variant="white" border-variant="dark">
      <template slot="header"><b-img src="../assets/logo.png" alt="CB-Alerts"></b-img></template>

      <template slot="lead">
        This is a simple hero unit, a simple jumbotron-style component for calling extra attention to
        featured content or information.
      </template>

      <hr class="my-4">

      <p>
        It uses utility classes for typography and spacing to space content out within the larger
        container.
      </p>
    </b-jumbotron>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
