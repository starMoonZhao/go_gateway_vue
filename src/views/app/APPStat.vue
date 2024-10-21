<template>
  <div class="chart-container">
    <chart height="100%" width="100%" :data="data" />
  </div>
</template>

<script>
import Chart from "@/components/Charts/LineStat";
import { appDetail, appStat } from "@/api/app";

export default {
  name: "APPStat",
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
    this.getAPPStat();
  },
  methods: {
    getAPPStat() {
      appStat(this.id).then((statResponse) => {
        appDetail(this.id).then((detailResponse) => {
          this.data.title = detailResponse.data.app_id + "流量统计";
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


