<template>
  <div class="news-page">
    <!-- Header -->
    <header class="page-header">
      <div class="left">
        <span class="zhihu">知乎</span>
      </div>
      <div class="right">
        <span class="profile-text" @click="goToProfile">个人中心</span>
        <el-avatar src="https://avatars.githubusercontent.com/u/116796403?v=4" class="avatar" @click="goToProfile" />
      </div>
    </header>

    <!-- Banner图 -->
    <div class="banner" @click="goToBannerPage">
      <img src="../assets/R.jpg" alt="Banner" />
    </div>

    <!-- 栏目切换 -->
    <el-tabs v-model="activeTab" @tab-click="handleTabChange" class="tabs">
      <el-tab-pane label="热榜" name="hot"></el-tab-pane>
      <el-tab-pane label="视频" name="video"></el-tab-pane>
    </el-tabs>

    <!-- 加载中状态 -->
    <div v-loading="loading" text="加载中..." spinner="el-icon-loading">
      <!-- 显示新闻列表 -->
      <div v-if="!loading">
        <el-card
          v-for="item in currentItems" 
          :key="item.id" 
          class="news-list"
          :body-style="{ padding: '20px' }"
        >
          <div class="news-item-content">
            <!-- 新闻内容 -->
            <div class="news-details">
              <h3 class="news-title"  @click="openNews(item.qid)">{{ item.title.slice(0, 30) + (item.title.length > 30 ? '...' : '') }}</h3>
              <p class="news-description">{{ item.context.slice(0, 40) + (item.context.length > 40 ? '...' : '') }}</p>
              <div class="news-meta">
                <span class="news-hotness">热度: {{ item.hot }}</span>
              </div>
            </div>
            <!-- 右侧图片 -->
            <img :src="item.url" alt="Image" class="news-image" />
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { ElTabs, ElTabPane, ElCard, ElAvatar } from 'element-plus';
import request from '../api.js'; 
import { useRouter } from 'vue-router';

const router = useRouter();

// 当前选中的栏目（热榜或视频）
const activeTab = ref('hot');

// 加载状态
const loading = ref(false);

// 当前展示的新闻列表
const currentItems = ref([]);

// 获取问答数据
const fetchData = async (tab) => {
  request(
    {
      url:'http://111.230.40.178:8084/getquestion',
      method:'get',
      params:{}
    }
  ).then(res=>{
    console.log(res)
    currentItems.value = res.data
    console.log(currentItems.value)
  }).catch(res=>{
    console.log(res)
  })
};

// 切换栏目时重新加载数据
const handleTabChange = () => {
  fetchData(activeTab.value);
};

// 页面加载时获取热榜数据
onMounted(() => {
  fetchData(activeTab.value);
});

// 监听选项卡变化，更新当前展示的数据
watch(activeTab, (newTab) => {
  fetchData(newTab);
});

// 跳转到个人中心页面
const goToProfile = () => {
  router.push('/Profile'); // 根据您的路由配置修改
};

// 跳转到BigData页面
const goToBannerPage = () => {
  router.push('/BigData'); // 根据您的路由配置修改
};

const openNews = (qid) =>{
  router.push({name:"NewsDetail",query: { id:qid } })
}
</script>

<style scoped>
.news-page {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 20px;
  background-color: #f5f5f5;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.page-header .left {
  font-size: 24px;
  font-weight: bold;
  color: #8581e6; /* 紫色字体 */
}

.page-header .right {
  display: flex;
  align-items: center;
  margin-right: 10px; /* 调整右边的间距，确保不会超出 */
}

.page-header .profile-text {
  margin-right: 10px;
  font-size: 16px;
  color: #333;
  cursor: pointer;
}

.page-header .avatar {
  margin-right: 30px;
  cursor: pointer;
}

.banner {
  width: 100%;
  margin-top: 30px; /* 调整顶部位置，避免被header覆盖 */
  cursor: pointer;
}

.banner img {
  width: 100%;
  height: auto;
}

.tabs {
  width: 500px; /* 选择栏宽度 */
  margin-bottom: 20px;
}

.news-list {
  width: 500px; /* 设置新闻列表的宽度 */
}

.news-item-content {
  display: flex;
  justify-content: space-between; /* 使图片和文字两端对齐 */
  align-items: flex-start;
}

.news-details {
  flex: 1;
  width: 65%; /* 固定宽度，确保列表宽度不变 */
}

.news-title {
  font-size: 18px;
  font-weight: bold;
  margin: 0;
  color: #333;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-description {
  font-size: 14px;
  color: #666;
  margin-top: 10px;
  white-space: nowrap; /* 限制简介为一行 */
  overflow: hidden;
  text-overflow: ellipsis;
}

.news-meta {
  margin-top: 10px;
  font-size: 14px;
  color: #999;
  display: flex;
  justify-content: flex-start; /* 让热度左对齐 */
  align-items: center;
}

.news-hotness {
  font-size: 14px;
  color: #999;
  margin-top: 5px;
}

.news-image {
  width: 120px;
  height: 80px;
  object-fit: cover;
  margin-left: 20px; /* 图片移到右侧 */
  border-radius: 0; /* 取消圆角 */
}
</style>
