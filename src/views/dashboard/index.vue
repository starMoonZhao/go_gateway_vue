<template>
  <div class="dashboard-editor-container">
    <panel-group :data="panelGroupData" />

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="16">
        <div class="chart-wrapper">
          <line-chart :chart-data="flowStatData" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart :chart-data="serviceStatData" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from "./components/PanelGroup";
import LineChart from "./components/LineChart";
import PieChart from "./components/PieChart";
import { panelGroupData, flowStat, serviceStat } from "@/api/dashboard";

export default {
  name: "Dashboard",
  components: {
    PanelGroup,
    LineChart,
    PieChart,
  },
  data() {
    return {
      flowStatData: {
        today: [
          12, 14, 13, 12, 12, 1213, 44, 214, 422, 23, 123, 34, 66, 53, 86, 35,
        ],
        yesterday: [
          12, 14, 13, 12, 12, 1213, 44, 214, 422, 23, 123, 34, 66, 53, 86, 35,
          37, 78, 9, 87, 66, 33, 35, 71,
        ],
      },
      serviceStatData: {
        title: "今日流量统计",
        legend: ["Industries", "Technology", "Forex", "Gold", "Forecasts"],
        series: [
          { value: 320, name: "Industries" },
          { value: 240, name: "Technology" },
          { value: 149, name: "Forex" },
          { value: 100, name: "Gold" },
          { value: 59, name: "Forecasts" },
        ],
      },
      panelGroupData: {
        appNum: 100,
        currentQps: 102,
        serviceNum: 102,
        todayRequestNum: 105,
      },
    };
  },
  created() {
    panelGroupData().then((response) => {
      this.panelGroupData = {
        appNum: response.data.appNum,
        currentQps: response.data.currentQps,
        serviceNum: response.data.serviceNum,
        todayRequestNum: response.data.todayRequestNum,
      };
    });
    flowStat().then((response) => {
      this.flowStatData = response.data;
    });
    serviceStat().then((response) => {
      this.serviceStatData.legend = response.data.legend;
      this.serviceStatData.series = response.data.data;
      console.log(this.serviceStatData);
    });
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
