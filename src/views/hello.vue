<template>
  <div class="hello">
    <list></list>
  </div>
</template>

<script>
import { mapState } from "vuex";
import list from '../components/list.vue'

export default {
  data() {
    return {
      msg: "Hello Vue!"
    };
  },
  methods: {
    async getContent() {}
  },
  mounted() {
    // this.$store.commit("message", "欢迎使用 vue！");
    this.getContent();
  },
  components: {
    list
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>

</style>
