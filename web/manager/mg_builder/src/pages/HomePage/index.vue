<style lang="less" scoped>
.HomePage {
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow: scroll;
}
.title {
  font-size: 16px;
  color: #999;
  margin-bottom: 10px;
  white-space: pre-wrap;
}
.btn {
  color: #0acd79;
  cursor: pointer;
}
</style>

<template>
  <Layout>
    <div class="HomePage">

      <nd-button @click="showAdd">新增项目</nd-button>
      <div class="title">
        状态: {{getStatusText()}} {{port ? ('当前服务使用的端口号为' + port) : '当前服务没有开启'}}
      </div>

      <add-or-update ref="addOrUpdate" />

      <nd-table class="mt-30" :items="items">
        <nd-table-column prop="name" label="项目名" />
        <nd-table-column prop="code" label="项目代号" />
        <nd-table-column label="访问路径">
          <template slot-scope="item">
            <a target="_blank" :title="getPath(item)" :href="getPath(item)">{{getPath(item)}}</a>
          </template>
        </nd-table-column>
        <nd-table-column label="前端地址" prop="front" />
        <!-- <nd-table-column label="前端git拉取地址" prop="frontGit" /> -->
        <nd-table-column label="前端git拉取">
          <template slot-scope="item">
            <span class="btn" @click="gitPull(item.frontGit)">拉取</span>
          </template>
        </nd-table-column>

        <nd-table-column label="后端地址" prop="back" />
        <!-- <nd-table-column label="后端git拉取" prop="backGit" /> -->
        <nd-table-column label="后端git拉取">
          <template slot-scope="item">
            <span class="btn" @click="gitPull(item.backGit)">拉取</span>
          </template>
        </nd-table-column>
        <!-- <nd-table-column label="操作">
                    <template slot-scope="item">
                        <span v-if="item.gender==0">未设置</span>
                        <span v-if="item.gender==1">男</span>
                        <span v-if="item.gender==2">女</span>
                    </template>
                </nd-table-column> -->
      </nd-table>
    </div>
  </Layout>
</template>

<script>
import AddOrUpdate from "./module/AddOrUpdate";
import ndTable from "nd-table";
import ndTableColumn from "nd-table-column";
import ndButton from "nd-button";
export default {
  data() {
    return {
      items: [],
      port: "",
      visible: true
    };
  },
  mounted() {
    this.getServer();
  },
  methods: {
    showAdd(submitForm) {
      this.$refs.addOrUpdate.showAdd(submitForm);
    },
    getStatusText() {
      switch (this.status) {
        case 0:
          return "未启动";
        case 1:
          return "启动中";
        case 2:
          return "已启动";
        case 3:
          return "停止中";
        case 4:
          return "已停止";
        default:
          return this.status;
      }
    },
    getPath(item) {
      return (
        location.protocol +
        "//" +
        location.hostname +
        ":" +
        this.port +
        "/" +
        item.path
      );
    },
    async getServer() {
      let result = await this.api.getServer();
      this.port = result.port;
      this.status = result.status;
      this.items = result.items;
    },

    async openServer() {
      let result = await this.api.openServer();
      if (result.success) {
        this.getServer();
      }
    },

    async restartServer() {
      let result = await this.api.restartServer();
      if (result.success) {
        this.getServer();
      }
    },

    async closeServer() {
      let result = await this.api.closeServer();
      if (result.success) {
        this.getServer();
      }
    },

    showAddBlock() {
      this.items.push({});
    },

    showEdit(e) {
      e.target.disabled = false;
    },

    async gitPull(gitUrl) {
      if (!gitUrl) return;
      let result = await this.api.gitPull({ url: gitUrl });
      if (result.success) {
        alert("拉取成功");
      }
    }
  },
  components: {
    "nd-table": ndTable,
    "nd-table-column": ndTableColumn,
    "add-or-update": AddOrUpdate,
    "nd-button": ndButton
  }
};
</script>


