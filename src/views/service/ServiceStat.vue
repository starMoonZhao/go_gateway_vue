<template>
  <div class="chart-container">
    <chart height="100%" width="100%" :data="data" />
  </div>
</template>

<script>
import Chart from "@/components/Charts/LineStat";
import { serviceDetail, serviceStat } from "@/api/service";

export default {
  name: "ServiceStat",
  components: { Chart },
  data() {
    return {
      id: null,
      data: {
        title: "",
        today: [],
        yesterday: [],
      },
    };
  },
  created() {
    this.id = this.$route.params && this.$route.params.id;
    this.getServiceStat();
  },
  methods: {
    getServiceStat() {
      serviceStat(this.id).then((statResponse) => {
        serviceDetail(this.id).then((detailResponse) => {
          this.data.title = detailResponse.data.info.service_name + "流量统计";
          this.data.today = statResponse.data.today;
          this.data.yesterday = statResponse.data.yesterday;
        });
      });
    },
  },
};
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>


