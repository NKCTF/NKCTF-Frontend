<script>
import {mapState, mapMutations} from 'vuex';
const {STATE_ERROR, STATE_PENDING, STATE_SUCCESS, getModel} = require('../utils/fieldModel');

const username = getModel();
const password = getModel();
const email = getModel();
const description = getModel();
const qq = getModel();
const github = getModel();
const user_career = getModel();

export default {
  name: 'profile',
    beforeMount() {

  },
  data() {
    return {
      username,
      password,
      email,
      description,
      qq,
      github,
      user_career,
    }
  },
  mounted() {
    this.$root.updateUserInfo().then(() => {
      this.username.value = this.userInfo.username;
      this.email.value = this.userInfo.email;
      this.description.value = this.userInfo.description;
      this.qq.value = this.userInfo.qq;
      this.github.value = this.userInfo.github;
      this.user_career.value = this.userInfo.user_career || "请选择..";
      console.log(this.userInfo, this.$data);
    });
  },
  computed: {
    ...mapState({userInfo: state => state.user}),
  },
  methods: {
    ...mapMutations({}),
    update(type) {
        this[type].state = STATE_PENDING;
        APIPost('/user/alter/alter_personal/', {attribute: type, value: this[type].value}).then(
          data => {
              if (data.code === 0) {
                  this[type].message = data.msg;
                  this[type].state = STATE_SUCCESS;
              }else{
                  this[type].message = data.error;
                  this[type].state = STATE_ERROR;
              }
          }
      )
    },
    updateselect(type) {
        console.log(this.$data);
        APIPost('/user/alter/alter_personal/', {attribute: type, value: this[type].value}).then(
            data => {
                if (data.code === 0){
                    this[type].message = data.msg;
                    this[type].state = STATE_SUCCESS;
                }else{
                    this[type].message = data.error;
                    this[type].state = STATE_ERROR;
                }
            }
        )
    },
    logout() {
        APIFetch('/user/logout/').then(
            data => {
                console.log(data);
                if(data.code === 0){
                    setTimeout(() => this.$router.push('/login'), 800)
                }
            }
        );
    },
  },
};

</script>

<style scoped lang="vcss">
  .profile{
    padding-bottom: 2rem;
  }
</style>

<template>
<div :id="$options.name" :class="$options.name">
  <div style="width:30%">
  <reg-input name="username" :model.sync="username" icon="fa-user"
             placeholder="User Name" @blur="update('username')" showSuccess>Username
  </reg-input>
  <reg-input type="email" name="email" :model.sync="email" icon="fa-at"
             placeholder="Email" @blur="update('email')" showSuccess>Email
  </reg-input>
  <reg-input type="text" name="qq" :model.sync="qq" icon="fab fa-qq"
             placeholder="QQ" @blur="update('qq')" showSuccess>QQ
  </reg-input>
  <reg-input type="text" name="github" :model.sync="github" icon="fab fa-github-alt"
             placeholder="GitHub" @blur="update('github')" showSuccess>Github
  </reg-input>
  <reg-input type="text" name="description" :model.sync="description" icon="fas fa-align-left"
             placeholder="Description" @blur="update('description')" showSuccess>Description
  </reg-input>
  <reg-select usertitle="Career" :model.sync="user_career" @change="updateselect('user_career')" showSuccess>
    <option selected>请选择..</option>
    <option>WEB, 网络</option>
    <option>PWN, 二进制</option>
    <option>Reverse, 逆向</option>
    <option>Crypto, 密码学</option>
    <option>MISC, 杂项</option>
    <option>Almighty, 万精油</option>
  </reg-select>
  <a class="button is-danger is-fullwidth" @click="logout()">注销</a>
  </div>
</div>
</template>
