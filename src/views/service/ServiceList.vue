<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="serviceQuery.info"
        placeholder="服务名/服务描述"
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
        Search
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        Add
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="serviceList"
      border
      fit
      highlight-current-row
      style="width: 100%"
      @sort-change="sortChange"
    >
      <el-table-column label="ID" prop="id" align="center" width="80">
        <template slot-scope="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="服务名称" min-width="100px">
        <template slot-scope="{ row }">
          <span>{{ row.service_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="服务描述" min-width="150px">
        <template slot-scope="{ row }">
          <span>{{ row.service_desc }}</span>
        </template>
      </el-table-column>
      <el-table-column label="服务类型" min-width="70px">
        <template slot-scope="{ row }">
          <span>{{ row.load_type | loadTypeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="服务地址" min-width="150px">
        <template slot-scope="{ row }">
          <span>{{ row.service_addr }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Qps" min-width="50px">
        <template slot-scope="{ row }">
          <span>{{ row.qps }}</span>
        </template>
      </el-table-column>
      <el-table-column label="日请求数" min-width="70px">
        <template slot-scope="{ row }">
          <span>{{ row.qpd }}</span>
        </template>
      </el-table-column>
      <el-table-column label="节点数" min-width="50px">
        <template slot-scope="{ row }">
          <span>{{ row.total_node }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="230"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row, $index }">
          <el-button type="primary" size="mini" @click="handleStat(row)">
            统计
          </el-button>
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            修改
          </el-button>
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
      :page.sync="serviceQuery.page_num"
      :limit.sync="serviceQuery.page_size"
      @pagination="getServiceList"
    />
  </div>
</template>
  
  <script>
import { serviceList, serviceDelete } from "@/api/service";
import waves from "@/directive/waves";
import Pagination from "@/components/Pagination";

const loadTypeOptions = [
  { key: "0", display_name: "HTTP" },
  { key: "1", display_name: "TCP" },
  { key: "2", display_name: "GRPC" },
];

// arr to obj, such as { CN : "China", US : "USA" }
const loadTypeKeyValue = loadTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name;
  return acc;
}, {});

export default {
  name: "ServiceList",
  components: { Pagination },
  directives: { waves },
  filters: {
    loadTypeFilter(type) {
      return loadTypeKeyValue[type];
    },
  },
  data() {
    return {
      tableKey: 0,
      serviceList: null,
      total: 0,
      listLoading: true,
      serviceQuery: {
        page_num: 1,
        page_size: 20,
        info: "",
      },
      curService: {
        id: undefined,
      },
    };
  },
  created() {
    this.getServiceList();
  },
  methods: {
    getServiceList() {
      this.listLoading = true;
      serviceList(this.serviceQuery).then((response) => {
        this.serviceList = response.data.list;
        this.total = response.data.total;

        setTimeout(() => {
          this.listLoading = false;
        }, 1.5 * 1000);
      });
    },
    handleFilter() {
      this.serviceQuery.page_num = 1;
      this.getServiceList();
    },
    handleCreate() {},
    handleStat() {},
    handleUpdate(row) {},
    handleDelete(row, index) {
      this.$confirm("此操作将删除该服务, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          serviceDelete(row.id).then((response) => {
            this.$notify({
              title: "Success",
              message: "删除成功",
              type: "success",
              duration: 2000,
            });
            this.getServiceList();
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