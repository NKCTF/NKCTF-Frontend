<script>
import {mapState, mapMutations} from 'vuex';
const {STATE_ERROR, STATE_PENDING, STATE_SUCCESS, getModel} = require('../utils/fieldModel');

const username = getModel();
const password = getModel();
const email = getModel;
const description = getModel();
const qq = getModel();

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
      qq
    }
  },
  mounted() {
    this.$root.updateUserInfo().then(() => {
      this.username.value = this.userInfo.username;
      this.password.value = this.userInfo.password;
      this.email.value = this.userInfo.email;
      this.description.value = this.userInfo.description;
      this.qq.value = this.userInfo.qq;
      console.log(this.userInfo, this.$data);
    });
  },
  destroyed() {

  },
  computed: {
    ...mapState({userInfo: state => state.user}),
  },
  methods: {
    ...mapMutations({}),
    update(type) {

    }
  },
};

</script>

<style scoped lang="vcss">

</style>

<template>
<div :id="$options.name" :class="$options.name">
  <template>
  <reg-input name="username" :model.sync="username" icon="fa-user"
             placeholder="User Name" @blur="update('username')">Username
  </reg-input>
  <reg-input type="password" name="password" :model.sync="password" icon="fa-key"
             placeholder="Password" @blur="update('password')">Password
  </reg-input>
  <reg-input type="email" name="email" :model.sync="email" icon="fa-at"
             placeholder="Email" @blur="update('email')">Email
  </reg-input>
  <reg-input type="text" name="qq" :model.sync="qq" icon="fa-key"
             placeholder="QQ" @blur="update('qq')">QQ
  </reg-input>
  <reg-input type="text" name="description" :model.sync="description" icon="fa-key"
             placeholder="Description" @blur="update('description')">Description
  </reg-input>
  </template>
</div>
</template>
