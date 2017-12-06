<!--suppress ALL -->
<template>
  <div id="app">
    <el-container class="fullHeight">
      <el-aside width="250px" class="fullHeight">
        <layout-nav></layout-nav>
      </el-aside>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import layoutNav from './components/layout-nav.vue';
export default {
  data() {
    return {
    }
  },
  methods: {
  },
  components: {
    layoutNav
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

html,
body {
  height: 100%;
}

#app {
  height: 100%;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

.fullHeight {
  height: 100%;
}
</style>