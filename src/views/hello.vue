<template>
  <div class="hello">
    {{msg}}
  </div>
</template>

<script>
import { mapState } from "vuex";

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
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>

</style>
