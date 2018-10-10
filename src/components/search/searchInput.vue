<script>
  import { mapState, mapMutations } from 'vuex'
  const {STATE_NOSEARCH, STATE_SEARCH_LOADING, STATE_USER, STATE_TEAM, STATE_SEARCH_FAIL} = require('../../utils/fieldSearch');

  export default {
    name: 'search-input',
    inheritAttrs: false,
    props: ['model'],
    data() {
      return {
        STATE_TEAM,
        STATE_USER,
        STATE_SEARCH_LOADING,
        STATE_NOSEARCH,
        STATE_SEARCH_FAIL,
      }
    },
    mounted() {

    },
    computed: {
      ...mapState({

      }),
      reducedAttrs() {
        return this.$attrs
      },
      activeHelper() {
        switch(this.$props.model.state) {
          case STATE_NOSEARCH: return 'is-info';
          case STATE_SEARCH_LOADING: return 'is-warning';
          case STATE_USER:
          case STATE_TEAM: return 'is-success';
          case STATE_SEARCH_FAIL: return 'is-danger';
          default: return false;
        }
      },
      activeIcon() {
        switch(this.$props.model.state) {
          case STATE_NOSEARCH: return 'fa-search';
          case STATE_SEARCH_LOADING: return 'fa-spinner fa-pulse';
          case STATE_USER:
          case STATE_TEAM: return 'fa-check';
          case STATE_SEARCH_FAIL: return 'fa-exclamation-triangle';
          default: return false;
        }
      },
    },
    methods: {
      ...mapMutations({

      })
    }
  };

</script>
<!-- vue-loader's scoped css won't work with style-loader -->
<style scoped lang="vcss">

</style>

<template>
<div class="field">
  <label class="label"><slot></slot></label>
  <div class="control has-icons-left has-icons-right">
    <span class="icon is-small is-left" v-if="model.state === STATE_USER">
      <i class="fas fa-user"></i>
    </span>
    <span class="icon is-small is-left" v-else-if="model.state === STATE_TEAM">
      <i class="fas fa-users"></i>
    </span>
    <span class="icon is-small is-left" v-else>
      <i class="fas fa-question"></i>
    </span>
    <input class="input is-rounded" :class="activeHelper" v-bind="reducedAttrs" v-model="model.value" @blur="$emit('blur')">
    <span class="icon is-small is-right" v-if="activeIcon" :key="activeIcon">
      <i :class="activeIcon" class="fas"></i>
    </span>
  </div>
</div>
</template>
