<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { USER_REQUEST } from './store/actions/user'
export default {
  components: {
     },
  name: 'app',
  created: function () {
    this.getUserData();
  },
  methods: {
    getUserData: function() {
      this.$store.dispatch(USER_REQUEST);
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  background: #f8f8fa;
  overflow-x: hidden;
}
.signin h2 {
  margin-bottom: 52px;
}
</style>
