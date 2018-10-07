<script>
  import { mapState, mapMutations } from 'vuex'

  const {STATE_ERROR, STATE_PENDING, STATE_NONE, STATE_SUCCESS} = require('../../utils/fieldModel');

  export default {
    name: 'tagdetail',
    data() {
      return {
          tableState: STATE_NONE,
          questionList: [],
          errorMsg: '',
          STATE_ERROR,
          STATE_PENDING,
          STATE_NONE,
      };
    },
    beforeMount() {

    },
    mounted() {
      console.log(this.$route.params["tagname"]);
      this.fetch();
    },
    destroyed() {

    },
    computed: {
      ...mapState({

      })
    },
    methods: {
      ...mapMutations({

      }),
      fetch (){
          this.tableState = STATE_PENDING;
          let tag = this.$route.params["tagname"];
          return APIFetch(`/question/lst?question_tag=${tag}`).then(
              data => {
                  console.log(data);
                  if(data.code === 0) {
                      this.questionList = data.data;
                      this.tableState = STATE_SUCCESS;
                  }else {
                      this.errorMsg = `${data.msg}: ${data.error}`;
                      this.tableState = STATE_ERROR;
                  }
              }
          );
      },
    },
  };

</script>
<!-- vue-loader's scoped css won't work with style-loader -->
<style scoped lang="vcss">

</style>

<template>
  <div :id="$options.name" :class="$options.name" style="display: table">
    <article class="message is-danger" v-if="tableState === STATE_ERROR">
      <div class="message-body">
        {{errorMsg}}
      </div>
    </article>
    <table class="table is-striped is-hoverable is-fullwidth" :class="{'is-loading': tableState === STATE_PENDING}">
      <thead>
        <tr>
          <th> </th>
          <th>题目名称</th>
          <th>基础分数</th>
          <th>解出人数</th>
          <th>第一个解出</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(question, index) in questionList">
          <td>{{ index+1 }}</td>
          <td>{{ question.question_name }}</td>
          <td>{{ question.score }}</td>
          <td>{{ question.solved_by }}</td>
          <td>{{ question.first_solved }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
