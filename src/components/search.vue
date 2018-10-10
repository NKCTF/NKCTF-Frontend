<script>
import {mapState, mapMutations} from 'vuex';

const {STATE_ERROR, STATE_PENDING, STATE_SUCCESS, getModel} = require('../utils/fieldModel');
const {STATE_NOSEARCH, STATE_SEARCH_LOADING, STATE_USER, STATE_TEAM, STATE_SEARCH_FAIL} = require('../utils/fieldSearch');

const searchBox = getModel();
const userInfo = getModel();
const teamInfo = getModel();

export default {
  name: 'search',
  data() {
    return {
      searchBox,
      userInfo,
      teamInfo,
      STATE_NOSEARCH,
      STATE_SEARCH_LOADING,
      STATE_USER,
      STATE_TEAM,
      STATE_SEARCH_FAIL,
    }
  },
  mounted() {
    this.searchBox.state = STATE_NOSEARCH;
  },
    searchTeam(){

  },
    computed: {
        ...mapState({}),
    },
    methods: {
      ...mapMutations({}),
      searchUser(){
        this.searchBox.state = STATE_SEARCH_LOADING;
        return APIFetch(`/user/search/user?username=${this.searchBox.value}`).then(
          data =>{
            if (data.code === 0) {
              this.userInfo.data = data.data;
              this.userInfo.name = data.data.username;
              this.searchBox.state = STATE_USER;
            } else {
              this.searchBox.message = data.msg;
              this.searchBox.state = STATE_SEARCH_FAIL;
            }
          }
        )
      },
      searchTeam(){
        this.searchBox.state = STATE_SEARCH_LOADING;
        return APIFetch(`/user/search/team?team_name=${this.searchBox.value}`).then(
          data =>{
            if (data.code === 0) {
              this.teamInfo.data = data.data;
              this.teamInfo.name = data.data.team_name;
              this.searchBox.state = STATE_TEAM;
            } else {
              this.searchBox.message = data.msg;
              this.searchBox.state = STATE_SEARCH_FAIL;
            }
          }
        )
      }
    },
};
</script>

<style scoped lang="vcss">
.search {
  justify-content: unset!important;
}
</style>

<template>
<div :id="$options.name" :class="$options.name">
  <div class="is-flex" style="justify-content: center">
    <search-input :model.sync="searchBox"></search-input>
  </div>
  <div class="is-flex" style="padding-top: 0.5rem; padding-bottom: 2rem">
    <div class="buttons has-addons">
      <span class="button is-rounded" @click="searchUser">Search Users</span>
      <span class="button is-rounded" @click="searchTeam">Search Teams</span>
    </div>
  </div>
  <div class="is-flex">
    <message-card v-if="searchBox.state === STATE_USER" :model.sync="userInfo"></message-card>
    <message-card v-else-if="searchBox.state === STATE_TEAM" :model.sync="teamInfo"></message-card>
    <span v-else-if="searchBox.state === STATE_NOSEARCH">Waiting For Search...</span>
    <span v-else-if="searchBox.state === STATE_SEARCH_FAIL">Searching Fail:{{searchBox.message}}</span>
  </div>
</div>
</template>
