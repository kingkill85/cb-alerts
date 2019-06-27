<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#"><b-img src="./assets/logo.png" height="50" alt="CB-Alerts"></b-img></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/">Home</b-nav-item>
          <b-nav-item to="/about">About</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template slot="button-content"><em>User</em></template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
        
      </b-collapse>
    </b-navbar>
    <div class="container-fluid content">
      <router-view/>
    </div>
  </div>
</template>

<style>
  .content {
    margin-top: 10px; 
  }

  #app {
    background-color: darkgray; 
  }

  html {
    background-color: darkgray; 
  }
</style>
