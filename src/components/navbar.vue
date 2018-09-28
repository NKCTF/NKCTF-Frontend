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
    ...mapState({}),
  },
  methods: {},
};

</script>

<style scoped lang="scss">

</style>

<template>
<div class="columns">
  <nav-item to="/teams">Teams</nav-item>
  <nav-item to="/scoreboard">ScoreBoard</nav-item>
  <nav-item to="/challenges">Challenges</nav-item>
  <nav-logo to="/" :logo="Logo"></nav-logo>
  <nav-item to="/beginner">Beginner Requests</nav-item>
  <nav-item to="/readme">README</nav-item>
  <nav-item to="/login">Join a Team</nav-item>
</div>
</template>
