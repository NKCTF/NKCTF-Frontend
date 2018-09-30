<script>
  import { mapState, mapMutations } from 'vuex'
  export default {
    name: 'reg-input',
    inheritAttrs: false,
    props: ['model', 'icon'],
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

      }),
      reducedAttrs() {
        return this.$attrs
      },
      activeHelper() {
        switch(this.$props.model.state) {
          case 0:
            return '';
          case 1:
            return 'is-warning';
          case 2:
            return 'is-success';
          case 3:
            return 'is-danger';
          default:
            return false;
        }
      },
      activeIcon() {
        switch(this.$props.model.state) {
          case 0:
            return false;
          case 1:
            return 'fa-spinner fa-pulse';
          case 2:
            return 'fa-check';
          case 3:
            return 'fa-exclamation-triangle';
          default:
            return false;
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
    <input class="input" :class="activeHelper" v-bind="reducedAttrs" v-model="model.value" @blur="$emit('blur')">
    <span class="icon is-small is-left">
      <i class="fas" :class="icon"></i>
    </span>
    <span class="icon is-small is-right" v-if="activeIcon" :key="activeIcon">
      <i :class="activeIcon" class="fas"></i>
    </span>
  </div>
  <p class="help" :class="[activeHelper]">{{model.state === 3 && model.message || '&nbsp;'}}</p>
</div>
</template>
