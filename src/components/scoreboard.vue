<script>
import {mapState, mapMutations} from 'vuex';

const {STATE_ERROR, STATE_PENDING, STATE_NONE, STATE_SUCCESS} = require('../utils/fieldModel');

export default {
  name: 'scoreboard',
  data() {
    return {
      current: undefined,
      scoreboard: [],
      tableState: STATE_NONE,
      errorMsg: '',
      STATE_ERROR,
      STATE_PENDING,
      STATE_NONE,
    };
  },
  beforeMount() {

  },
  mounted() {
    this.$data.current = 0;
  },
  destroyed() {

  },
  watch: {
    current: function(newVar) {
      if (newVar !== undefined)
        this.fetch();
    },
  },
  computed: {
    ...mapState({}),
  },
  methods: {
    ...mapMutations({}),
    navTo(which) {
      this.$data.current = which;
    },
    fetch() {
      this.tableState = STATE_PENDING;
      return APIFetch(`/scoreboard/${this.current === 0 ? 'user' : 'team'}`).then(data => {
        if (data.code === 0) {
          this.scoreboard = data.data;
          this.tableState = STATE_SUCCESS;
        } else {
          this.errorMsg = `${data.msg}： ${data.error}`;
          this.tableState = STATE_ERROR;
        }
      });
    },
  },
};

</script>

<style scoped lang="vcss">
.scoreboard {
  justify-content: unset !important;
}
</style>

<template>
<div :id="$options.name" :class="$options.name">
  <div class="buttons has-addons">
    <span class="button" :class="{'is-info': current === 0}" @click="navTo(0)">Users</span>
    <span class="button" :class="{'is-info': current === 1}" @click="navTo(1)">Teams</span>
  </div>
  <article class="message is-danger" v-if="tableState === STATE_ERROR">
    <div class="message-body">
      {{errorMsg}}
    </div>
  </article>
  <table class="table is-striped is-hoverable is-fullwidth" :class="{'is-loading': tableState === STATE_PENDING}">
    <template v-if="current === 0">
    <thead>
    <tr>
      <th>排名</th>
      <th>用户名</th>
      <th>分数</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(user, idx) in scoreboard">
      <td>{{idx + 1}}</td>
      <td>{{user.username}}</td>
      <td>{{user.score}}</td>
    </tr>
    </tbody>
    </template>
    <template v-else>
    <thead>
    <tr>
      <th>排名</th>
      <th>队名</th>
      <th>分数</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(user, idx) in scoreboard">
      <td>{{idx + 1}}</td>
      <td>{{user.team_name}}</td>
      <td>{{user.score}}</td>
    </tr>
    </tbody>
    </template>
  </table>
</div>
</template>
