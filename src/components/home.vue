<script>
import {mapState, mapMutations} from 'vuex';

export default {
  name: 'home',
  beforeMount() {

  },
  mounted() {
    APIFetch('/user/info/user').then(data => {
      if(data.code === 0) {
        data.data.isLogin = true;
        this.updateUser(data.data);
        this.$router.push('/scoreboard');
      }
    })
  },
  destroyed() {

  },
  computed: {
    ...mapState({userInfo: state => state.user}),
  },
  methods: {
    ...mapMutations(['updateUser']),
  },
};

</script>

<style scoped lang="vcss">

</style>

<template>
<div :id="$options.name" :class="$options.name">
  3
</div>
</template>
