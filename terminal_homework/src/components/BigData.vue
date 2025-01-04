<template>
    <div class="dashboard">
      <div class="side-charts">
        <div id="pie-chart" class="chart small-chart"></div>
        <div id="line-chart" class="chart small-chart"></div>
      </div>
      <div id="cool-chart" class="chart big-chart"></div>
      <div class="side-charts">
        <div id="bar-chart1" class="chart small-chart"></div>
        <div id="bar-chart2" class="chart small-chart"></div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue';
  import * as echarts from 'echarts';
  import 'echarts-gl';
  
  const initCharts = () => {
    // 中间的大图（GL 关系图）
    const coolChart = echarts.init(document.getElementById('cool-chart'));
    fetch('/data/GL.json')
      .then(response => response.json())
      .then(graph => {
        const edges = graph.edges.map(edge => ({
          source: edge[0],
          target: edge[1],
          value: 2
        }));
        const categories = [];
        const categoriesMap = {};
        const nodes = graph.nodes.map(node => {
          if (!categoriesMap[node[3]]) {
            categories.push({ name: node[3] });
            categoriesMap[node[3]] = true;
          }
          return {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            symbolSize: node[2],
            category: node[3],
            value: 1
          };
        });
        coolChart.setOption({
          backgroundColor: '#000000', // 设置黑色背景
          color: [
            'rgb(203,239,15)', 'rgb(73,15,239)', 'rgb(239,231,15)',
            'rgb(15,217,239)', 'rgb(30,15,239)', 'rgb(15,174,239)',
            'rgb(116,239,15)', 'rgb(239,15,58)', 'rgb(15,239,174)',
            'rgb(239,102,15)', 'rgb(239,15,15)', 'rgb(15,44,239)',
            'rgb(239,145,15)', 'rgb(30,239,15)', 'rgb(239,188,15)',
            'rgb(159,239,15)', 'rgb(159,15,239)', 'rgb(15,239,44)',
            'rgb(15,239,87)', 'rgb(15,239,217)', 'rgb(203,15,239)',
            'rgb(239,15,188)', 'rgb(239,15,102)', 'rgb(239,58,15)',
            'rgb(239,15,145)', 'rgb(116,15,239)', 'rgb(15,131,239)',
            'rgb(73,239,15)', 'rgb(15,239,131)', 'rgb(15,87,239)',
            'rgb(239,15,231)'
          ],
          series: [
            {
              type: 'graphGL',
              nodes: nodes,
              edges: edges,
              categories: categories.sort((a, b) => a.name - b.name),
              lineStyle: { color: 'rgba(255,255,255,0.2)' },
              itemStyle: { opacity: 1 },
              forceAtlas2: {
                steps: 1,
                stopThreshold: 1,
                jitterTolerence: 10,
                edgeWeight: [0.2, 1],
                gravity: 0,
                edgeWeightInfluence: 1,
                scaling: 0.2
              }
            }
          ]
        });
      });
  
    // 其他图表的初始化代码保持不变
    const pieChart = echarts.init(document.getElementById('pie-chart'));
    const pieOption = {
      backgroundColor: '#FFFFFF',
      title: { text: '饼状图', left: 'center' },
      series: [{
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: 'A' },
          { value: 735, name: 'B' },
          { value: 580, name: 'C' },
          { value: 484, name: 'D' },
          { value: 300, name: 'E' }
        ]
      }]
    };
    pieChart.setOption(pieOption);
  
    const lineChart = echarts.init(document.getElementById('line-chart'));
    const lineOption = {
      backgroundColor: '#FFFFFF',
      title: { text: '折线图', left: 'center' },
      xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
      yAxis: { type: 'value' },
      series: [{ data: [820, 932, 901, 934, 1290, 1330, 1320], type: 'line' }]
    };
    lineChart.setOption(lineOption);
  
    const barChart1 = echarts.init(document.getElementById('bar-chart1'));
    const barOption1 = {
      backgroundColor: '#FFFFFF',
      title: { text: '柱状图1', left: 'center' },
      xAxis: { type: 'category', data: ['A', 'B', 'C', 'D', 'E'] },
      yAxis: { type: 'value' },
      series: [{ data: [120, 200, 150, 80, 70], type: 'bar' }]
    };
    barChart1.setOption(barOption1);
  
    const barChart2 = echarts.init(document.getElementById('bar-chart2'));
    const barOption2 = {
      backgroundColor: '#FFFFFF',
      title: { text: '柱状图2', left: 'center' },
      xAxis: { type: 'category', data: ['X', 'Y', 'Z', 'W', 'Q'] },
      yAxis: { type: 'value' },
      series: [{ data: [300, 450, 390, 320, 500], type: 'bar' }]
    };
    barChart2.setOption(barOption2);
  };
  
  onMounted(() => {
    initCharts();
  });
  </script>
  
  <style>
  .dashboard {
    display: flex;
    justify-content: space-around; /* 左右对齐 */
    align-items: center;
    width: 100%; /* 扩大整个组件的宽度 */
  }
  .side-charts {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .chart {
    width: 400px;
    height: 300px;
  }
  .big-chart {
    width: 800px; /* 扩大中间图表的宽度 */
    height: 600px; /* 扩大中间图表的高度 */
  }
  .small-chart {
    width: 400px;
    height: 300px;
  }
  </style>
  