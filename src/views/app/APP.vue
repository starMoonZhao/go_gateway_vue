<template>
  <div style="width: 95%; margin: 10px auto">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span v-if="!isEdit"> 创建租户</span>
        <span v-if="isEdit"> 编辑租户</span>
      </div>
      <div style="margin-bottom: 50px">
        <el-form ref="form" :model="form" :rules="rules" label-width="150px">
          <el-form-item label="app_id" prop="app_id">
            <el-input
              v-model="form.app_id"
              placeholder="6-128位字母数字下划线"
              :disabled="isEdit"
            ></el-input>
          </el-form-item>
          <el-form-item label="租户名称" prop="name">
            <el-input
              v-model="form.name"
              placeholder="6-128位字母数字下划线"
              :disabled="isEdit"
            ></el-input>
          </el-form-item>
          <el-form-item label="32位密钥">
            <el-input
              v-model="form.secret"
              placeholder="32位字符串，非必填，自动生成"
            ></el-input>
          </el-form-item>
          <el-form-item label="QPS限流">
            <el-input v-model="form.qps" placeholder="0表示无限制"></el-input>
          </el-form-item>
          <el-form-item label="日请求量限流">
            <el-input v-model="form.qpd" placeholder="0表示无限制"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              @click="onSubmit"
              :disabled="submitButDisabled"
              >立即提交</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { appAdd, appUpdate, appDetail } from "@/api/app";
export default {
  name: "APP",
  data() {
    return {
      form: {
        app_id: "",
        name: "",
        qps: 0,
        qpd: 0,
      },
      submitButDisabled: false,
      rules: {
        app_id: [
          { required: true, message: "请输入app_id", trigger: "blur" },
          {
            min: 6,
            max: 128,
            message: "长度在 6 到 128 个字符",
            trigger: "blur",
          },
        ],
      },
      isEdit: false,
      id: null,
    };
  },
  created() {
    const id = this.$route.params && this.$route.params.id;
    if (id != null && id != undefined && id != "") {
      this.id = id;
      this.isEdit = true;
      //查询租户详情信息
      this.fetchData(id);
    }
  },
  methods: {
    fetchData(id) {
      appDetail(id).then((response) => {
        //填充详情字段
        this.form.id = response.data.id;
        this.form.app_id = response.data.app_id;
        this.form.name = response.data.name;
        this.form.secret = response.data.secret;
        this.form.qps = response.data.qps;
        this.form.qpd = response.data.qpd;
      });
    },
    onSubmit() {
      this.submitButDisabled = true;
      //浅拷贝表单对象
      const data = Object.assign({}, this.form);

      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            appUpdate(data)
              .then((response) => {
                this.submitButDisabled = false;
                if (response.errno === 0) {
                  this.$notify({
                    title: "Success",
                    message: "编辑租户成功",
                    type: "success",
                    duration: 2000,
                  });
                }
              })
              .catch(() => {
                this.submitButDisabled = false;
              });
          } else {
            appAdd(data)
              .then((response) => {
                this.submitButDisabled = false;
                if (response.errno === 0) {
                  this.$notify({
                    title: "Success",
                    message: "添加租户成功",
                    type: "success",
                    duration: 2000,
                  });
                }
              })
              .catch(() => {
                this.submitButDisabled = false;
              });
          }
        } else {
          this.submitButDisabled = false;
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

.span-with-block {
  color: #606266;
  font-weight: 700;
  display: inline-block;
  text-align: right;
  margin-right: 20px;
}
</style>
