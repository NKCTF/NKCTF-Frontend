<script>
import {mapState, mapMutations} from 'vuex';

export default {
  name: 'challenges',
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
.tile.is-ancestor {
  width: 100%;
}
.challenges {
  padding-bottom: 2rem;
}
</style>

<template>
<div :id="$options.name" :class="$options.name">
  <div class="tile is-ancestor">
    <router-link tag="div" to="challenges/PWN" class="tile is-parent">
      <article class="tile  box is-child has-text-centered">
        <p class="title">PWN</p>
        <p class="subtitle">二进制</p>
      </article>
    </router-link>
    <router-link tag="div" to="challenges/Reverse" class="tile is-parent">
      <article class="tile  box is-child has-text-centered">
        <p class="title">WEB</p>
        <p class="subtitle">网络</p>
      </article>
    </router-link>
    <router-link tag="div" to="challenges/Crypto" class="tile is-parent">
      <article class="tile  box is-child has-text-centered">
        <p class="title">Crypto</p>
        <p class="subtitle">密码学</p>
      </article>
    </router-link>
  </div>
  <div class="tile is-ancestor">
    <router-link tag="div" to="challenges/Reverse" class="tile is-parent">
      <article class="tile  box is-child has-text-centered" style="height: 80%">
        <p class="title">Reverse</p>
        <p class="subtitle">逆向</p>
      </article>
    </router-link>
    <router-link tag="div" to="challenges/MISC" class="tile is-parent">
      <article class="tile  box is-child has-text-centered"  style="height: 80%">
        <p class="title">MISC</p>
        <p class="subtitle">杂项</p>
      </article>
    </router-link>
  </div>
</div>
</template>
