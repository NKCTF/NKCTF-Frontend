<script>
import {mapState, mapMutations} from 'vuex';

export default {
  name: 'nav-logo',
  props: ['to', 'logo'],
  beforeMount() {

  },
  mounted() {

  },
  destroyed() {

  },
  computed: {
    ...mapState({}),
    background() {
      return `url(${this.$props.logo}) no-repeat center center`
    }
  },
  methods: {
    ...mapMutations({}),
  },
};

</script>

<style lang="scss">
$nav-logo-height: 100px;
$nav-logo-max-width: 260px;
$nav-logo-min-width: 100px;
@media (min-width: 850px) and (orientation: landscape) {
  .nav-logo .logo-image{
    max-width: $nav-logo-max-width;
    min-width: $nav-logo-min-width;
    flex: 1;
  }
}

.nav-logo .logo-image {
  height: $nav-logo-height;
  background-size: contain !important;
  cursor: pointer;
  margin: auto;
}
</style>

<template>
<div :class="$options.name" class="column">
  <router-link :to="to" tag="div" class="logo-image" :style="{background}"></router-link>
</div>
</template>
