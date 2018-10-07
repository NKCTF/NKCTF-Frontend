<script>
  import { mapState, mapMutations } from 'vuex'
  export default {
    name: 'reg-select',
    inheritAttrs: false,
    props: ['model', 'icon', 'showSuccess', 'usertitle'],
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
      showMessage() {
          switch (this.model.state) {
              case 0:
              case 1: return false;
              case 2: return this.showSuccess !== undefined
              case 3: return true;
          }
      }
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
  <label class="label">{{ usertitle }}</label>
  <div class="control has-icons-left">
    <div class="select" style="display: flex">
      <select style="flex: 1 0 auto" v-model="model.value" @change="$emit('change')">
        <slot></slot>
      </select>
    </div>
    <div class="icon is-small is-left">
      <i class="fas fa-globe"></i>
    </div>
  </div>
  <p class="help" :class="[activeHelper]">{{showMessage && model.message || '&nbsp;'}}</p>
</div>
</template>
