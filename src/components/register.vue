<script>
import {mapState, mapMutations} from 'vuex';

const {STATE_ERROR, STATE_PENDING, STATE_SUCCESS, getModel} = require('../utils/fieldModel');
const {getPopupStr} = require('../utils/popup');
const {MESSAGE_TYPE_POPUP_GITHUB} = require('../msgType');
const username = getModel();
const password = getModel();
const form = getModel();

export default {
  name: 'register',
  data() {
    return {
      username,
      password,
      form,
    };
  },
  beforeMount() {
    username.clearState();
    password.clearState();
    form.clearState();
  },
  mounted() {

  },
  destroyed() {

  },
  computed: {
    ...mapState({userInfo: state => state.user}),
  },
  methods: {
    ...mapMutations(['updateUser']),
    updateUsername() {
      const username = this.username.value;
      this.username.state = STATE_PENDING;
      APIFetch(`/user/signup/?username=${username}`).then((response) => {
        this.username.state = response.code === 0 ? STATE_SUCCESS : STATE_ERROR;
        this.username.message = response.msg;
      });
    },
    updatePassword() {
      this.password.state = STATE_PENDING;
      setTimeout(() => {
        const password = this.password.value;
        if (password.length < 6 || password.length > 16) {
          this.password.state = STATE_ERROR;
          this.password.message = `密码应在 6 - 16 字符之间！`;
        } else {
          this.password.state = STATE_SUCCESS;
        }
      }, 500);
    },
    trySignUp() {
      const form = this.form;
      form.state = STATE_PENDING;
      const username = this.username.value;
      const password = this.password.value;
      APIPost('/user/signup/', {username, password}).then((data) => {
        if (data.code === 0) {
          form.state = STATE_SUCCESS;
          setTimeout(() => this.$router.push('/'), 800);
        } else {
          form.state = STATE_ERROR;
        }
        form.message = data.msg || '' + data.error || '';
      });
    },
    trySignWithGithub() {
      const w = window.open(
          new URL('/user/auth_in?type='+MESSAGE_TYPE_POPUP_GITHUB, API_PATH).href,
          'Sign in with GitHub...',
          getPopupStr(500, 600)
      );
      form.state = STATE_PENDING;
      window._oauthInterval = setInterval(function(){
        if (w.closed) {
          window.clearInterval(window._oauthInterval);
          form.state = STATE_ERROR;
          form.message = "取消了登录QAQ";
        }
      }, 1000);
      window.addEventListener('message', e => {
        if(e.data.type !== MESSAGE_TYPE_POPUP_GITHUB) return;
        window.clearInterval(window._oauthInterval);
        if(e.data.code === 0) {
          form.state = STATE_SUCCESS;
          this.updateUser(e.data.data);
          setTimeout(() => this.$router.push('/'), 1000);
        } else {
          form.state = STATE_ERROR;
        }
        w.close();
        form.message = e.data.msg || '' + e.data.error || '';
      });
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
    <h2>注册</h2>
    <hr>
    <article class="message" v-if="form.complete"
             :class="{'is-danger': form.error, 'is-success': form.success}">
      <div class="message-body">
        {{form.message}}
      </div>
    </article>
    <form :class="{'is-loading': form.pending}">
      <reg-input name="username" :model.sync="username" icon="fa-user"
                 placeholder="User Name" @blur="updateUsername">Username
      </reg-input>
      <reg-input type="password" name="password" :model.sync="password" icon="fa-key"
                 placeholder="Password" @blur="updatePassword">Password
      </reg-input>
      <a class="button is-light" @click="trySignWithGithub">
        <span class="icon">
          <i class="fab fa-github"></i>
        </span>
        <span>Sign in with GitHub</span>
      </a>
      <a class="button is-primary is-pulled-right is-flex" @click="trySignUp">
        <span>注册</span>
        <span class="icon">
          <i class="fas fa-sign-in-alt"></i>
        </span>
      </a>
      <a class="is-clearfix"></a>
    </form>
    <hr>
    <div class="has-text-centered">已经有账号了喵？
      <router-link to="/login">立即登陆</router-link>
    </div>
  </div>
  <!--<div style="flex: 1 0 100%"></div>-->
</div>
</template>
