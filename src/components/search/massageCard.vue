<script>
  import { mapState, mapMutations } from 'vuex'
  export default {
    name: 'messageCard',
    props: ['model'],
    data() {
      return {

      }
    },
    beforeMount() {

    },
    mounted() {

    },
    destroyed() {

    },
    computed: {
      ...mapState({

      })
    },
    methods: {
      ...mapMutations({

      })
    },
  };

</script>
<!-- vue-loader's scoped css won't work with style-loader -->
<style scoped lang="vcss">

</style>

<template>
  <div :id="$options.name" :class="$options.name">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">{{model.name}}</p>
        <a href="#" class="card-header-icon" aria-label="more options">
      <span class="icon">
        <i class="fas fa-angle-down" aria-hidden="true"></i>
      </span>
        </a>
      </header>
      <div class="card-content">
        <div class="content">
          <article class="message is-dark">
            <div class="message-body">
              <span v-for="(item, key, index) in model.data">
                <strong>{{key}}</strong>: {{item}}<br />
              </span>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>
