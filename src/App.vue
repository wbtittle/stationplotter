<template>
  <div id="app">
    <div class="fixed-top " >
      <img src="/img/Doing+It+Badly-logo-black.png" width="150px" alt="...">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view class="RouterArea"/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.RouterArea {
  margin-top: 75px;
}

</style>
