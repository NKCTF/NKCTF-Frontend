<script>
  import { mapState, mapMutations } from 'vuex'
  export default {
    name: 'reg-input',
    props: ['model', 'placeholder', 'icon', 'name'],
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
      activeHelper() {
        switch(this.$props.model.state) {
          case 0:
          case 1:
            return false;
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
    <input class="input" :class="activeHelper" type="text" :name="name"
           :placeholder="placeholder" v-model="model.value" @blur="$emit('blur')">
    <span class="icon is-small is-left">
      <i class="fas" :class="icon"></i>
    </span>
    <span class="icon is-small is-right" v-if="activeIcon" :key="activeIcon">
      <i :class="activeIcon" class="fas"></i>
    </span>
  </div>
  <p class="help" :class="[activeHelper, {hidden: activeHelper === false}]">{{model.message || '&nbsp;'}}</p>
</div>
</template>
