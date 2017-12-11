<template>
  <div class="list">
    <el-row type="flex" align="bottom" class='mbSpace'>
      <el-col>
        <!-- 搜索配置 -->
        <ncform :form-schema="configData.query.normal" v-model="normalQueryValue" form-name="normalQuery"></ncform>
        <ncform v-show="showAdvSearch" :form-schema="configData.query.adv" v-model="advQueryValue" form-name="advQuery"></ncform>
      </el-col>
<div class="searchBtnArea">
      <el-button type="info" v-show="!showAdvSearch" class="searchBtn mgb10" icon="el-icon-plus" @click="showAdvSearch = !showAdvSearch" plain>展开</el-button>
      <el-button type="info" v-show="showAdvSearch" class="searchBtn mgb10" icon="el-icon-minus" @click="showAdvSearch = !showAdvSearch" plain>收起</el-button>
      <el-button type="primary" class="searchBtn" icon="el-icon-search" plain @click="search">搜索</el-button>
</div>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-row type="flex">
          <template v-if="configData.list.selectAll">
            <el-button 
              v-if="configData.toolbar.batchActions.delete.enable"
              :disabled="this.$data.multipleSelection.length == 0"
              type="danger"
              icon="el-icon-delete"
              @click="eventHandler(configData.toolbar.batchActions.delete.handler, null, multipleSelection)"
              plain>
              {{configData.toolbar.batchActions.delete.name}}
              </el-button>
            <template v-for="(item, key) in configData.toolbar.batchActions.others">
              <el-button
                :disabled="this.$data.multipleSelection.length == 0"
                :key="key"
                v-if="item.enable"
                type="info"
                @click="eventHandler(item.handler, null, multipleSelection)"
                plain>
                {{item.name}}
              </el-button>
            </template>
          </template>
            <el-col>
            </el-col>
            <el-button 
              v-if="configData.toolbar.tools.new.enable"
              type="success"
              icon="el-icon-document"
              @click="eventHandler(configData.toolbar.tools.new.handler)"
              plain>
              {{configData.toolbar.tools.new.name}}
              </el-button>
            <template v-for="(item, key) in configData.toolbar.tools.others">
              <el-button
                :key="key"
                v-if="item.enable"
                type="info"
                @click="eventHandler(item.handler)"
                plain>
                {{item.name}}
              </el-button>
            </template>
        </el-row>
      </el-col>
    </el-row>

    <el-row>
        <el-col :span="24">
            <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column
                    v-if="configData.list.selectAll"
                    type="selection">
                </el-table-column>

                

                <el-table-column
                  v-for="(item, key) in configData.list.columns"
                  :key="key"
                  :label="item.header">
                    <template slot-scope="scope">{{ scope.row[item.dataField] }}</template>
                </el-table-column>

                <el-table-column
                    align="center"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button v-if="configData.list.actions.view.enable" type="text" size="small" @click="eventHandler(configData.list.actions.view.handler, scope.row)">查看</el-button>
                        <el-button v-if="configData.list.actions.edit.enable" type="text" size="small" @click="eventHandler(configData.list.actions.edit.handler, scope.row)">编辑</el-button>
                        <el-button v-if="configData.list.actions.delete.enable" type="text" size="small" @click="eventHandler(configData.list.actions.delete.handler, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
    </el-row>

    <el-row>
        <el-col align="right" style="margin-top:30px;">
            <el-pagination
                background
                @current-change="currentChange"
                layout="prev, pager, next"
                :page-count="pageCount"
                :current-page="pageNum">
                </el-pagination>
        </el-col>
    </el-row>

    <el-dialog title="这是一个弹窗" :visible.sync="modalVisible">

    </el-dialog>
  </div>
</template>

<script>
import _get from 'lodash-es/get';

export default {
  components: {},
  props: {
    config: {
      type: Object,
      default: () => ({
        // 查询条件
        query: {
          normal: {
            // 普通搜索
            // ncform的配置
            type: "object",
            properties: {
              name: {
                type: "string ",
                ui: {
                  label: '关键字',
                  placeholder: '普通关键字'
                }
              }
            }
          },
          adv: {
            // 高级搜索
            // ncform的配置
            type: "object",
            properties: {
              supername: {
                type: "string ",
                ui: {
                  label: '高级关键字',
                  placeholder: '这就厉害了'
                }
              }
            }
          }
        },

        // 工具栏，位于列表之上
        toolbar: {
          batchActions: {
            // 批量操作，当selectAll为true时有效
            delete: {
              name: "批量删除",
              enable: true, // 支持dx表达式
              handler: {
                type: "ajax", // ajax / page / modal / component
                options: {
                  // type = 'ajax'
                  apiUrl: "",
                  params: [
                    {
                      name: "id",
                      value: "dx: {{$item.id}}"
                    }
                  ],

                  // type = 'page'
                  route: "dx: /path/to/some-page?id={{$item.id}}",

                  // type = 'modal'
                  component: {
                    // 对于弹窗，需要指定弹窗页面的业务组件，这里约定弹窗页面整个就是一个业务组件
                    name: "",
                    config: {}
                  },

                  // type = 'component'
                  compName: "", // 即用这个component显示，比如导入excel功能，就可以放一个有上传功能的component组件
                  compConfig: {}
                }
              },
              refresh: true // 操作后是否刷新数据
            },
            others: [
              // 参考 Action Object config
            ]
          },
          tools: {
            new: {
              name: "新建",
              enable: true, // 支持dx表达式
              handler: {
                type: "ajax", // ajax / page / modal / component
                options: {
                  // type = 'ajax'
                  apiUrl: "",
                  params: [
                    {
                      name: "id",
                      value: "dx: {{$item.id}}"
                    }
                  ],

                  // type = 'page'
                  route: "dx: /path/to/some-page?id={{$item.id}}",

                  // type = 'modal'
                  component: {
                    // 对于弹窗，需要指定弹窗页面的业务组件，这里约定弹窗页面整个就是一个业务组件
                    name: "",
                    config: {}
                  },

                  // type = 'component'
                  compName: "", // 即用这个component显示，比如导入excel功能，就可以放一个有上传功能的component组件
                  compConfig: {}
                }
              },
              refresh: true // 操作后是否刷新数据
            },
            others: [
              // 参考 Action Object config
            ]
          }
        },

        // 显示列表
        list: {
          selectAll: true, // 是否全选
          datasource: {
            // 数据源
            apiUrl: "/api/getListData", // 请求url
            paramFields: {
              // 传过去的参数
              pageSize: "pageSize", // 每页显示的项数
              pageNum: "pageNum", // 请求的页码
              query: "" // 查询条件，当为空时，查询对象的每个Key就是字段。当提供值时，即整个查询对象作为值传过去
            },
            otherParams: {
              // 其它的请求参数，如 type: 1
            },
            resField: {
              // 返回结果字段
              pageingTotal: "page.total", // 分页总数字段
              list: "data" // 列表数据字段
            }
          },
          columns: [
            //
            {
              header: "日期", // 表头
              dataField: "date", // 数据源的字段
              component: {
                // 如果显示的是一个组件，比如点击即可编辑之类的组件
                name: "",
                config: {}
              }
            },{
              header: "姓名", // 表头
              dataField: "name", // 数据源的字段
              component: {
                // 如果显示的是一个组件，比如点击即可编辑之类的组件
                name: "",
                config: {}
              }
            },{
              header: "地址", // 表头
              dataField: "address", // 数据源的字段
              component: {
                // 如果显示的是一个组件，比如点击即可编辑之类的组件
                name: "",
                config: {}
              }
            },
          ],
          actions: {
            // 项操作
            delete: {
              // 删除
              enable: true,
              handler: {
                // 参考 Action Object config 的 handler( type = 'ajax')
              }
            },
            view: {
              // 查看
              enable: true, // 或 dx表达式，如 dx: !!{{$item.id}}
              handler: {
                // 参考 Action Object config 的 handler( type = 'modal' 或 'page')
              }
            },
            edit: {
              // 编辑
              enable: true,
              handler: {
                // 参考 Action Object config 的 handler( type = 'modal' 或 'page')
              }
            },
            others: [
              // 参考 Action Object config
            ]
          }
        },

        // 分页配置
        paging: {
          enable: true
        }
      })
    },
    value: {
      type: Object,
      default: () => ({
        pageNum: 1,
        pageSize: 10,
        query: {
          name: 'hey',
          supername: 'superhey'
        }
      })
    }
  },
  created() {
    // 将props导入到data中，方便操作。
    this.$data.configData = JSON.parse(JSON.stringify(this.config));
    this.$data.valueData = JSON.parse(JSON.stringify(this.value));
  },
  mounted() {
    // 加载数据
    this.loadtableData();
  },

  data() {
    return {
      configData: {}, // config
      valueData: {},  // value
      pageCount: 1, // 页码总数
      tableData: [],  // 表单数据
      multipleSelection: [], // 多选的选中项
      showAdvSearch: false,  //  搜索模式，0为普通搜索, 1为高级搜索
      modalVisible: false,
      normalQueryValue: {name:'1'},
      advQueryValue: {supername:'xx'},
    };
  },
  methods: {
    loadtableData() {
      const dataSource = this.$data.configData.list.datasource;
      const valueData = this.$data.valueData;

      let postData = {
      };
      postData[dataSource.paramFields.pageSize] = valueData.pageSize;
      postData[dataSource.paramFields.pageNum] = valueData.pageNum;
      if(dataSource.paramFields.query){
        postData[dataSource.paramFields.query] = valueData.query;
      }else{
        postData = Object.assign(postData, valueData.query);
      }
      this.$axios.post(dataSource.apiUrl, postData).then(res => {
        const listField = dataSource.resField.list;
        const pageingTotalField = dataSource.resField.pageingTotal;
        this.$data.tableData = listField ? _get(res.data, `${listField}`) : res.data;
        this.$data.pageCount = pageingTotalField ? _get(res.data, `${pageingTotalField}`) : 1;
      })
    },
    // 多选改变时触发
    handleSelectionChange(val) {
      this.$data.multipleSelection = val;
    },
    // Action Object config 实现
    // TODO: 具体的处理方法
    eventHandler(handler, item={}, multipleSelection = []) {
      switch(handler.type){
        case 'ajax':
          this.$axios.post(handler.options.apiUrl, {}).then(res => {
            
          })
          break;
        case 'page':
          this.$route.push({

          });
          break;
        case 'modal':
          this.$data.modalVisible = true;
          break;
        case 'component':
        
          break;
      }
    },
    // 页码变化
    currentChange(currentIndex) {
      this.$data.valueData.pageNum = currentIndex;
      this.loadtableData();
    },
    // 搜索
    search() {
      const { configData, valueData } = this.$data;
      
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.mbSpace {
  margin-bottom: 20px;
}
.searchBtnArea{
  width:90px;
  margin-left: 20px;
}
.searchBtn {
  height: 40px;
  margin: 0;
}
.mgb10{
  margin-bottom: 10px;
}
</style>
