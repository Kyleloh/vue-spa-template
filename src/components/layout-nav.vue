<template>
  <div class="lay-outnav fullHeight">
        <el-menu
        :default-active="$route.path"
        :router="true"
        class="el-menu-vertical-demo fullHeight"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
          <el-header class="projectHeader">{{projectTitle}}<i v-if="$store.state._requestCount" class="el-icon-loading"></i></el-header>
          <template v-for="(item, index) in navList">
            <el-submenu v-if="item.type=='submenu'" :key="index" :index="index+''">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.name}}</span>
              </template>
              <el-menu-item v-for="(subItem, subIndex) in item.itemList" :index="subItem.link||index+'-'+subIndex" :key="subIndex" :route="{path: subItem.link || ''}">
                <i :class="subItem.icon"></i>
                <span slot="title">{{subItem.name}}</span>
              </el-menu-item>
            </el-submenu>

            <el-menu-item v-else  :index="item.link || index+''" :key="index" :route="{path: item.link || ''}">
              <i :class="item.icon"></i>
              <span slot="title">{{item.name}}</span>
            </el-menu-item>
          </template>
        </el-menu>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";

export default {
  data() {
    return {
      projectTitle: "系统名称",
      navList: [
        {
          icon: "el-icon-menu",
          name: "导航一",
          link: "/hello"
        },
        {
          type: "submenu",
          icon: "el-icon-location",
          name: "导航二",
          itemList: [
            {
              // icon: 'el-icon-menu',
              name: "选项1",
              link: "/hello2"
            },
            {
              // icon: 'el-icon-menu',
              name: "选项2",
              link: ""
            }
          ]
        },
      ]
    };
  },
  methods: {},
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.projectHeader {
  line-height: 60px;
  font-size: 24px;
  color: #fff;
  letter-spacing: 2px;
}
.fullHeight {
  height: 100%;
}
</style>
