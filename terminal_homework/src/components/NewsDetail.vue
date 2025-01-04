<template>
  <div class="question-detail">
    <!-- 整个内容放入一个卡片组件 -->
    <el-card class="question-card">
      <!-- 问题部分 -->
      <div class="question-section">
        <h2 class="question-title">{{ currentItems.title }}</h2>
        <p class="question-content">{{ currentItems.context }}</p>
        <!-- 写回答按钮 -->
        <el-button plain @click="dialogFormVisible = true">写回答</el-button>
      </div>

      <!-- 分割线 -->
      <el-divider>精选回答</el-divider>

      <!-- 回答部分 -->
      <div class="answers-section">
        <div v-for="answer in currentItems.answerList" :key="answer.id" class="answer-item">
          <div class="answer-header">
            <!-- 用户头像 -->
            <img :src="answer.userInfo.imageurl" alt="avatar" class="avatar" />

            <!-- 用户信息 -->
            <div class="user-info">
              <strong class="user-name">{{ answer.userInfo.nickname }}</strong>
              <p class="user-signature">{{ answer.userInfo.sign }}</p>
            </div>
          </div>

          <!-- 回答内容 -->
          <p class="answer-content">{{ answer.answer }}</p>

          <!-- 分割线 -->
          <el-divider></el-divider>
        </div>
      </div>
    </el-card>

    <!-- 写回答的对话框 -->
    <el-dialog v-model="dialogFormVisible" title="写回答" width="500">
    <el-form :model="form">
    <el-form-item label="答案：" prop="desc">
    <el-input v-model="form.answer" type="textarea" />
    </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancelPost">取消</el-button>
        <el-button type="primary" @click="postAnswer(qid,form.answer)">
          提交
        </el-button>
      </div>
    </template>
  </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive,onMounted } from "vue";
import { useRoute } from "vue-router";
import request from "../api.js";
import { ElMessage } from 'element-plus';
import { useUserStore } from "../store.js";

// 路由实例
const router = useRoute();
const currentItems = ref([]); // 问题和回答数据

const dialogFormVisible = ref(false)
const qid = ref(router.query.id)

const UserStore = useUserStore()
const imageurl = UserStore.imageurl

const form = reactive({
    answer:''
})


// 页面加载时获取数据
onMounted(() => {
  fetchData(router.query.id);
});

// 获取问题详情
const fetchData = async (qid) => {
  try {
    const response = await request({
      url: "http://111.230.40.178:8084/getquestion",
      method: "get",
      params: { qid },
    });
    currentItems.value = response.data;
  } catch (error) {
    console.error("获取问题详情失败:", error);
  }
};

const postAnswer = (id,answer) =>{
    dialogFormVisible.value = false
    request({
     url: "http://111.230.40.178:8084/addNews",
     method: "post",
     data:{
        qid:id,
        answer:answer,
        username:"段坤"
     }
    }).then(res=>{
    ElMessage({
    message: '提交成功！',
    type: 'success',
    })
    }).catch(res=>{
    ElMessage.error('提交失败！')
    })
}

const cancelPost = () =>{
    dialogFormVisible.value = false
    ElMessage('取消提交')
}

</script>

<style scoped>
.question-detail {
  padding: 20px;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center; /* 居中内容 */
  width: 700px;
}

.question-card {
  width: 100%;
  padding: 20px;
  background-color: #ffffff;
}

/* 问题部分样式 */
.question-section {
  margin-bottom: 20px;
}

.question-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.question-content {
  font-size: 16px;
  line-height: 1.6;
  text-align: left; /* 左对齐 */
}

/* 写回答按钮样式 */
.write-answer-btn {
  margin-top: 10px;
  margin-bottom: 20px;
  display: block;
  width: 30%; /* 按钮宽度 */
  text-align: center;
}

/* 回答部分样式 */
.answers-section {
  margin-top: 20px;
}

.answer-item {
  margin-bottom: 20px;
}

.answer-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-size: 16px;
  font-weight: bold;
}

.user-signature {
  font-size: 14px;
  color: #666;
}

.answer-content {
  font-size: 14px;
  line-height: 1.6;
}
</style>
