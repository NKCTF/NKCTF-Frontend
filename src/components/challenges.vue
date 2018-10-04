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
</style>

<template>
<div :id="$options.name" :class="$options.name">
  <div class="tile is-ancestor">
    <div class="tile is-parent">
      <article class="tile is-child has-text-centered">
        <p class="title">第一组</p>
        <p class="subtitle">Foo</p>
      </article>
    </div>
    <div class="tile is-parent">
      <article class="tile is-child has-text-centered">
        <p class="title">第二组</p>
        <p class="subtitle">Bar</p>
      </article>
    </div>
    <div class="tile is-parent">
      <article class="tile is-child has-text-centered">
        <p class="title">第三组</p>
        <p class="subtitle">Meow</p>
        <div class="content">
          <p>shesl 小哥哥太强了</p>
        </div>
      </article>
    </div>
  </div>
  <div class="tile is-ancestor">
    <div class="tile is-parent">
      <article class="tile is-child has-text-centered">
        <p class="title">第四组</p>
        <p class="subtitle">Foo</p>
      </article>
    </div>
    <div class="tile is-parent">
      <article class="tile is-child has-text-centered">
        <p class="title">第五组</p>
        <p class="subtitle">Bar</p>
      </article>
    </div>
  </div>
</div>
</template>
