<script>
import {mapState, mapMutations} from 'vuex';
import Logo from '@r/logo.png';

export default {
  name: 'navbar',
  data() {
    return {
      Logo,
    };
  },
  beforeMount() {

  },
  mounted() {

  },
  destroyed() {

  },
  computed: {
    ...mapState({userInfo: state => state.user,}),
  },
  methods: {},
};

</script>

<style scoped lang="scss">
  #navbar {
    flex: 0 0 auto;
  }
</style>

<template>
<div :id="$options.name" class="columns">
  <nav-item v-if="userInfo.isLogin" to="/scoreboard">ScoreBoard</nav-item>
  <nav-item v-if="userInfo.isLogin" to="/challenges">Challenges</nav-item>
  <nav-logo to="" :logo="Logo"></nav-logo>
  <nav-item v-if="userInfo.isLogin" to="/search">Search</nav-item>
  <nav-item v-if="userInfo.isLogin" to="/profile" >Profile</nav-item>
</div>
</template>
