<script>
import {mapState, mapMutations} from 'vuex';
const {STATE_ERROR, STATE_PENDING, STATE_SUCCESS, getModel} = require('../utils/fieldModel');
const username = getModel();
const password = getModel();
const form = getModel();

export default {
  name: 'login',
  data() {
    return {
      username,
      password,
      form
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
      const username = this.username.value;
      this.username.state = STATE_PENDING;
      APIFetch(`/user/signup/?username=${username}`).then(response => {
        this.username.state = response.code === 2 ? STATE_SUCCESS : STATE_ERROR;
        this.username.message = response.code === 0 ? '用户不存在' : response.msg;
      });
    },
    updatePassword() {
      this.password.state = STATE_PENDING;
      setTimeout(() => {
        const password = this.password.value;
        if(password.length < 6 || password.length > 16) {
          this.password.state = STATE_ERROR;
          this.password.message = `密码应在 6 - 16 字符之间！`;
        } else {
          this.password.state = STATE_SUCCESS;
        }
      }, 100);
    },
    trySignIn() {
      const form = this.form;
      form.state = STATE_PENDING;
      const username = this.username.value;
      const password = this.username.value;
      APIPost('/user/login/', {username, password}).then((data) => {
        if(data.code === 0) {
          form.state = STATE_SUCCESS;
          setTimeout(() => this.$router.push('/'), 800);
        } else {
          form.state = STATE_ERROR;
        }
        form.message = data.msg;
      })
    }
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
    <h2>登录</h2>
    <hr>
    <article class="message" v-if="form.complete"
             :class="{'is-danger': form.error, 'is-success': form.success}">
      <div class="message-body">
        {{form.message}}
      </div>
    </article>
    <form :class="{'is-loading': form.pending}">
      <reg-input name="username" :model.sync="username" icon="fa-user"
                 placeholder="User Name" @blur="updateUsername">Username</reg-input>
      <reg-input type="password" name="password" :model.sync="password" icon="fa-key"
                 placeholder="Password" @blur="updatePassword">Password</reg-input>
      <a class="button is-success is-pulled-right" @click="trySignIn">登录</a>
      <a class="is-clearfix"></a>
      <div class="has-text-centered">还没有账号喵？<router-link to="/register">立即注册</router-link></div>
    </form>
  </div>
</div>
</template>
