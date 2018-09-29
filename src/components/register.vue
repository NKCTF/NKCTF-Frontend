<script>
import {mapState, mapMutations} from 'vuex';

export default {
  name: 'register',
  data() {
    return {
      username: {
        state: 0,
        value: '',
        message: '',
      },
      password: {
        state: 0,
        value: '',
        message: '',
      },
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
  methods: {
    ...mapMutations({}),
    updateUsername() {
      this.username.state = 1;
      setTimeout(() => {
        this.username.state = ~~(Math.random() * 2) + 2;
        this.username.message = `Input: ${this.username.value}`;
      }, 500);
    },
    updatePassword() {
      this.password.state = 1;
      setTimeout(() => {
        this.password.state = ~~(Math.random() * 2) + 2;
        this.password.message = `Input: ${this.password.value}`;
      }, 500);
    },
  },
};

</script>

<style scoped lang="vcss">
@media (min-width: 850px) and (orientation: landscape) {
  .box {
    max-width: 50%;
  }
}
.box {
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  flex: 0 1 100%;
  width: 100%;
}
</style>

<template>
<div :id="$options.name" :class="$options.name">
  <div class="box">
    <h2>注册</h2>
    <hr>
    <form>
      <reg-input name="username" :model.sync="username" icon="fa-user"
                 placeholder="User Name" @blur="updateUsername">Username</reg-input>
      <reg-input name="password" :model.sync="password" icon="fa-key"
                 placeholder="Password" @blur="updatePassword">Password</reg-input>
      <a class="button is-primary is-pulled-right">注册</a>
      <a class="is-clearfix"></a>
      <div class="has-text-centered">已经有账号了喵？<router-link to="/login">立即登陆</router-link></div>
    </form>
  </div>
  <!--<div style="flex: 1 0 100%"></div>-->
</div>
</template>
