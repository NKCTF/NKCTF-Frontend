<script>
  import { mapState, mapMutations } from 'vuex'
  const {STATE_ERROR, STATE_PENDING, STATE_NONE, STATE_SUCCESS, getModel} = require('../../utils/fieldModel');

  const flag = getModel();

  export default {
    name: 'questiondetail',
      data() {
      return {
        questionMsg: null,
        errorMsg: '',
        STATE_ERROR,
        STATE_PENDING,
        STATE_NONE,
        flag,
      }
    },
    created(){
        this.fetch();
    },
    beforeMount() {
        this.flag.value = null;
        console.log(this.$route.params["questionid"]);
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

      }),
      fetch () {
          let id = this.$route.params["questionid"];
          return APIFetch(`/question/msg?question_id=${id}`).then(
              data => {
                  console.log(data);
                  if(data.code === 0) {
                      this.questionMsg = data.data;
                      this.tableState = STATE_SUCCESS;
                  }else {
                      this.errorMsg = `${data.msg}: ${data.error}`;
                      this.tableState = STATE_ERROR;
                  }
              }
          )
      },
      submitFlag() {
          console.log(this.$data);
          this.flag.state = STATE_PENDING;
          APIPost('/question/flg', {question_id: this.questionMsg.question_id, flag: flag.value}).then(
              data => {
                  console.log(data);
                  if (data.code === 0){
                      this.flag.message = data.msg;
                      this.flag.state = STATE_SUCCESS;
                  }else{
                      this.flag.message = data.error;
                      this.flag.state = STATE_ERROR;
                  }
              }
          )
      },
    },
  };

</script>
<!-- vue-loader's scoped css won't work with style-loader -->
<style scoped lang="vcss">

</style>

<template>
  <div :id="$options.name" :class="$options.name" style="justify-content: unset">
    <div class="box" style="width: 50%;">
      <article class="media">
        <div class="media-content">
          <div class="content" style="text-align: center">
            <p>
              <strong>{{questionMsg.question_name}}</strong><br>
              <small>SCORE:</small> <small>{{questionMsg.question_score + 'pt'}}</small>
              <br><br>
              {{questionMsg.description}}
            </p>
            <a :href="questionMsg.annex_link">{{questionMsg.annex_link===null ? "":"附件地址"}}</a>
          </div>
          <reg-input type="text" name="flag" :model.sync="flag" icon="fas fa-flag-checkered"
            placeholder="FLAG" @blur="submitFlag()" showSuccess>
          </reg-input>
        </div>
      </article>
    </div>
  </div>
</template>
