<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="appQuery.info"
        placeholder="app_id/租户名称"
        style="width: 200px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-button
        v-waves
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        搜索
      </el-button>
      <router-link :to="'/app/app_add'">
        <el-button
          class="filter-item"
          style="margin-left: 10px"
          type="primary"
          icon="el-icon-edit"
          @click="handleCreate"
        >
          添加租户
        </el-button>
      </router-link>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="appList"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column label="ID" prop="id" align="center" width="80">
        <template slot-scope="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="app_id" min-width="100px">
        <template slot-scope="{ row }">
          <span>{{ row.app_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="租户名称" min-width="150px">
        <template slot-scope="{ row }">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="密钥" min-width="70px">
        <template slot-scope="{ row }">
          <span>{{ row.secret }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Qps" min-width="50px">
        <template slot-scope="{ row }">
          <span>{{ row.real_qps }}</span>
        </template>
      </el-table-column>
      <el-table-column label="日请求数" min-width="70px">
        <template slot-scope="{ row }">
          <span>{{ row.real_qpd }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="230"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row, $index }">
          <router-link :to="'/app/app_stat/' + row.id">
            <el-button type="primary" size="mini"> 统计 </el-button>
          </router-link>
          <router-link :to="'/app/app_edit/' + row.id">
            <el-button type="primary" size="mini"> 修改 </el-button>
          </router-link>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(row, $index)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="appQuery.page_num"
      :limit.sync="appQuery.page_size"
      @pagination="getAppList"
    />
  </div>
</template>
  
<script>
import { appList, appDelete } from "@/api/app";
import waves from "@/directive/waves";
import Pagination from "@/components/Pagination";

export default {
  name: "APPList",
  components: { Pagination },
  directives: { waves },
  filters: {},
  data() {
    return {
      tableKey: 0,
      appList: null,
      total: 0,
      listLoading: true,
      appQuery: {
        page_num: 1,
        page_size: 20,
        info: "",
      },
      curApp: {
        id: undefined,
      },
    };
  },
  created() {
    this.getAppList();
  },
  methods: {
    getAppList() {
      this.listLoading = true;
      appList(this.appQuery).then((response) => {
        this.appList = response.data.list;
        this.total = response.data.total;

        setTimeout(() => {
          this.listLoading = false;
        }, 1.5 * 1000);
      });
    },
    handleFilter() {
      this.appQuery.page_num = 1;
      this.getAppList();
    },
    handleDelete(row, index) {
      this.$confirm("此操作将删除该租户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          appDelete(row.id).then((response) => {
            this.$notify({
              title: "Success",
              message: "删除成功",
              type: "success",
              duration: 2000,
            });
            this.getAppList();
          });
        })
        .catch(() => {
          this.$notify({
            title: "Success",
            message: "已取消删除",
            type: "info",
            duration: 2000,
          });
        });
    },
  },
};
</script>  