<script>
import {mapState, mapMutations} from 'vuex';

export default {
  name: 'beginner',
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

</style>

<template>
<div :id="$options.name" :class="$options.name">
  1
</div>
</template>
