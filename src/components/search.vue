<script>
import {mapState, mapMutations} from 'vuex';

const {STATE_ERROR, STATE_PENDING, STATE_SUCCESS, getModel} = require('../utils/fieldModel');
const user = getModel();

export default {
  name: 'search',
  data() {
    return {
      user,
    }
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
  <search-input :model.sync="user"></search-input>
  <div class="buttons has-addons">
    <span class="button">Search Users</span>
    <span class="button">Search Teams</span>
  </div>
  </div>
</div>
</template>
