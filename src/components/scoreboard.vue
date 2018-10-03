<script>
import {mapState, mapMutations} from 'vuex';

export default {
  name: 'scoreboard',
  data() {
    return {
      scoreboard: [],
    };
  },
  beforeMount() {

  },
  mounted() {
    APIFetch('/scoreboard/user').then(data => {
      if(data.code === 0)
        this.scoreboard = data.data;
    })
  },
  destroyed() {

  },
  computed: {
    ...mapState({}),
  },
  methods: {
    ...mapMutations({}),
  },
};

</script>

<style scoped lang="vcss">

</style>

<template>
<div :id="$options.name" :class="$options.name">
  <table class="table is-striped is-hoverable is-fullwidth">
    <thead>
    <tr>
      <th>排名</th>
      <th>用户名</th>
      <th>分数</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(user, idx) in scoreboard">
      <td>{{idx}}</td>
      <td>{{user.fields.username}}</td>
      <td>{{user.fields.score}}</td>
    </tr>
    </tbody>
  </table>
</div>
</template>
