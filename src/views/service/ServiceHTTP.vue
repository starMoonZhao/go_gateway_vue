<template>
  <div style="width: 95%; margin: 10px auto">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span v-if="!isEdit"> 创建HTTP服务</span>
        <span v-if="isEdit"> 编辑HTTP服务</span>
      </div>
      <div style="margin-bottom: 50px">
        <el-form ref="form" :model="form" :rules="rules" label-width="150px">
          <el-form-item label="服务名称" prop="service_name">
            <el-input
              v-model="form.service_name"
              placeholder="6-128位字母数字下划线"
              :disabled="isEdit"
            ></el-input>
          </el-form-item>
          <el-form-item label="服务描述">
            <el-input
              v-model="form.service_desc"
              placeholder="最多225字符，必填"
            ></el-input>
          </el-form-item>
          <el-form-item label="接入类型">
            <el-input
              placeholder="路径格式：/user/, 域名格式：www.test.com"
              v-model="form.rule"
              :disabled="isEdit"
              class="input-with-select"
            >
              <el-select
                v-model="form.rule_type"
                slot="prepend"
                style="width: 80px"
                :disabled="isEdit"
              >
                <el-option label="路径" :value="0"></el-option>
                <el-option label="域名" :value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="支持https">
            <el-switch
              v-model="form.need_https"
              :active-value="1"
              :inactive-value="0"
            ></el-switch>
            <span class="span-with-block" style="width: 150px">
              支持strip_uri
            </span>
            <el-switch
              v-model="form.need_strip_uri"
              :active-value="1"
              :inactive-value="0"
            >
            </el-switch>
            <span class="span-with-block" style="width: 200px">
              支持need_websocket
            </span>
            <el-switch
              v-model="form.need_websocket"
              :active-value="1"
              :inactive-value="0"
            >
            </el-switch>
          </el-form-item>
          <el-form-item label="URL重写">
            <el-input
              v-model="form.url_rewrite"
              type="textarea"
              placeholder="格式: ^/gatekeeper/test_service(.*) $1 多条换行"
            ></el-input>
          </el-form-item>
          <el-form-item label="Header转换">
            <el-input
              v-model="form.header_transfer"
              type="textarea"
              placeholder="header转换支持增加(add)、删除(del)、修改(edit) 格式: add headname headvalue 多条换行"
            ></el-input>
          </el-form-item>
          <el-form-item label="开启验证">
            <el-switch
              v-model="form.open_auth"
              :active-value="1"
              :inactive-value="0"
            >
            </el-switch>
          </el-form-item>
          <el-form-item label="IP白名单">
            <el-input
              v-model="form.white_list"
              type="textarea"
              placeholder="格式: 127.0.0.1 多条换行，白名单优先级高于黑名单"
            ></el-input>
          </el-form-item>
          <el-form-item label="IP黑名单">
            <el-input
              v-model="form.black_list"
              type="textarea"
              placeholder="格式: 127.0.0.1 多条换行"
            ></el-input>
          </el-form-item>
          <el-form-item label="客户端限流">
            <el-input
              v-model="form.clientip_flow_limit"
              placeholder="0表示无限制"
            ></el-input>
          </el-form-item>
          <el-form-item label="服务端限流">
            <el-input
              v-model="form.service_flow_limit"
              placeholder="0表示无限制"
            ></el-input>
          </el-form-item>
          <el-form-item label="轮询方式">
            <el-radio-group v-model="form.round_type">
              <el-radio :label="0">random</el-radio>
              <el-radio :label="1">round-robin</el-radio>
              <el-radio :label="2">weight_round-robin</el-radio>
              <el-radio :label="3">ip_hash</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="IP列表">
            <el-input
              v-model="form.ip_list"
              type="textarea"
              placeholder="格式: 127.0.0.1:80 多条换行"
            ></el-input>
          </el-form-item>
          <el-form-item label="权重列表">
            <el-input
              v-model="form.weight_list"
              type="textarea"
              placeholder="格式: 50 多条换行"
            ></el-input>
          </el-form-item>
          <el-form-item label="建立连接超时">
            <el-input
              v-model="form.upstream_connect_timeout"
              placeholder="单位s，0表示无限制"
            ></el-input>
          </el-form-item>
          <el-form-item label="获取header超时">
            <el-input
              v-model="form.upstream_header_timeout"
              placeholder="单位s，0表示无限制"
            ></el-input>
          </el-form-item>
          <el-form-item label="链接最大空闲时间">
            <el-input
              v-model="form.upstream_idle_timeout"
              placeholder="单位s，0表示无限制"
            ></el-input>
          </el-form-item>
          <el-form-item label="最大空闲链接数">
            <el-input
              v-model="form.upstream_max_idle"
              placeholder="0表示无限制"
            ></el-input>
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
import {
  serviceAddHTTP,
  serviceUpdateHTTP,
  serviceDetail,
} from "@/api/service";
export default {
  name: "ServiceHTTP",
  data() {
    return {
      form: {
        service_name: "",
        service_desc: "",
        rule_type: 0,
        rule: "",
        need_https: 0,
        need_strip_uri: 0,
        need_websocket: 1,
        url_rewrite: "",
        header_transfer: "",
        open_auth: 0,
        white_list: "",
        black_list: "",
        clientip_flow_limit: null,
        service_flow_limit: null,
        round_type: 2,
        ip_list: "",
        weight_list: "",
        upstream_connect_timeout: null,
        upstream_header_timeout: null,
        upstream_idle_timeout: null,
        upstream_max_idle: null,
      },
      submitButDisabled: false,
      rules: {
        service_name: [
          { required: true, message: "请输入服务名称", trigger: "blur" },
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
      //查询服务详情信息
      this.fetchData(id);
    }
  },
  methods: {
    fetchData(id) {
      serviceDetail(id).then((response) => {
        //填充详情字段
        this.form.id = response.data.info.id;
        this.form.load_type = response.data.info.load_type;
        this.form.service_name = response.data.info.service_name;
        this.form.service_desc = response.data.info.service_desc;
        this.form.rule_type = response.data.http_rule.rule_type;
        this.form.rule = response.data.http_rule.rule;
        this.form.need_https = response.data.http_rule.need_https;
        this.form.need_websocket = response.data.http_rule.need_websocket;
        this.form.need_strip_uri = response.data.http_rule.need_strip_uri;
        this.form.url_rewrite = response.data.http_rule.url_rewrite.replace(
          /,/g,
          "\n"
        );
        this.form.header_transfer =
          response.data.http_rule.header_transfer.replace(/,/g, "\n");
        this.form.round_type = response.data.load_balance.round_type;
        this.form.ip_list = response.data.load_balance.ip_list.replace(
          /,/g,
          "\n"
        );
        this.form.weight_list = response.data.load_balance.weight_list.replace(
          /,/g,
          "\n"
        );
        this.form.upstream_connect_timeout =
          response.data.load_balance.upstream_connect_timeout;
        this.form.upstream_header_timeout =
          response.data.load_balance.upstream_header_timeout;
        this.form.upstream_idle_timeout =
          response.data.load_balance.upstream_idle_timeout;
        this.form.upstream_max_idle =
          response.data.load_balance.upstream_max_idle;
        this.form.upstream_max_idle =
          response.data.load_balance.upstream_max_idle;
        this.form.open_auth = response.data.access_control.open_auth;
        this.form.black_list = response.data.access_control.black_list.replace(
          /,/g,
          "\n"
        );
        this.form.white_list = response.data.access_control.white_list.replace(
          /,/g,
          "\n"
        );
        this.form.clientip_flow_limit =
          response.data.access_control.clientip_flow_limit;
        this.form.service_flow_limit =
          response.data.access_control.service_flow_limit;
      });
    },
    onSubmit() {
      this.submitButDisabled = true;
      //浅拷贝表单对象
      const data = Object.assign({}, this.form);

      //替换表单中所有以换行替代逗号的内容
      data.url_rewrite = data.url_rewrite.replace(/\n/g, ",");
      data.header_transfer = data.header_transfer.replace(/\n/g, ",");
      data.white_list = data.white_list.replace(/\n/g, ",");
      data.black_list = data.black_list.replace(/\n/g, ",");
      data.ip_list = data.ip_list.replace(/\n/g, ",");
      data.weight_list = data.weight_list.replace(/\n/g, ",");

      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            serviceUpdateHTTP(data)
              .then((response) => {
                this.submitButDisabled = false;
                if (response.errno === 0) {
                  this.$notify({
                    title: "Success",
                    message: "编辑HTTP服务成功",
                    type: "success",
                    duration: 2000,
                  });
                }
              })
              .catch(() => {
                this.submitButDisabled = false;
              });
          } else {
            serviceAddHTTP(data)
              .then((response) => {
                this.submitButDisabled = false;
                if (response.errno === 0) {
                  this.$notify({
                    title: "Success",
                    message: "添加HTTP服务成功",
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
