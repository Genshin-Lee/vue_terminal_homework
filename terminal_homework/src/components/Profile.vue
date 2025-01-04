<template>
    <div class="user-detail-container">
      <el-card class="user-detail-card">
        <!-- 顶部布局：头像 + 用户信息 -->
        <div class="header-section">
          <!-- 用户头像 -->
          <el-avatar
            :src="userForm.avatarUrl"
            size="large"
            class="user-avatar"
          ></el-avatar>
          <!-- 用户信息 -->
          <div class="user-info">
            <div class="name-section">
              <span class="user-name">{{ userForm.nickname }}</span>
              <el-button type="text" @click="editingName = true">修改</el-button>
            </div>
            <el-input
              v-if="editingName"
              v-model="userForm.nickname"
              placeholder="请输入新的用户名"
              @blur="editingName = false"
            ></el-input>
          </div>
        </div>
  
        <!-- 性别选择 -->
        <div class="gender-section">
          <el-tag>性别：</el-tag>
          <el-button
            size="small"
            type="primary"
            :plain="userForm.gender !== '男'"
            @click="userForm.gender = '男'"
          >
            男
          </el-button>
          <el-button
            size="small"
            type="primary"
            :plain="userForm.gender !== '女'"
            @click="userForm.gender = '女'"
          >
            女
          </el-button>
        </div>
  
        <!-- 用户签名 -->
        <div class="signature-section">
          <el-form-item label="签名">
            <el-input
              type="textarea"
              v-model="userForm.signature"
              placeholder="请输入签名"
            ></el-input>
          </el-form-item>
        </div>
  
        <!-- 头像 URL -->
        <div class="avatar-url-section">
          <el-form-item label="头像 URL">
            <el-input
              v-model="userForm.avatarUrl"
              placeholder="请输入头像 URL"
            ></el-input>
          </el-form-item>
        </div>
  
        <!-- 保存和取消按钮 -->
        <div class="button-section">
          <el-button type="primary" @click="saveChanges">保存</el-button>
          <el-button @click="cancelChanges">取消</el-button>
        </div>
      </el-card>
    </div>
  </template>
  
  <script setup>
  import { ref,reactive, onMounted } from "vue";
  import { ElMessage } from "element-plus";
  import request from "../api.js";
  import { useUserStore } from "../store.js";
  
  const userStore = useUserStore();
  
  // 初始化表单数据（深拷贝 store 数据）
  const userForm = reactive({
    username: userStore.username,
    nickname: userStore.nickname,
    gender: userStore.sex,
    signature: userStore.sign,
    avatarUrl: userStore.imageurl,
  });
  
  // 编辑状态
  const editingName = ref(false);
  
  // 保存按钮事件
  const saveChanges = async () => {
    try {
      await request({
        url: "http://111.230.40.178:8084/addUserInfo",
        method: "post",
        data: {
          username: userForm.username,
          nickname: userForm.nickname,
          sign: userForm.signature,
          sex: userForm.gender,
          imageurl: userForm.avatarUrl,
        },
    });
      // 更新 store 数据
      userStore.modify(userForm.nickname, userForm.signature, userForm.gender, userForm.avatarUrl);
      ElMessage.success("提交成功！");
    } catch (error) {
      console.error(error);
      ElMessage.error("提交失败！");
    }
  };
  
  // 取消修改
  const cancelChanges = () => {
    // 重置为 store 的初始值
    userForm.nickname = userStore.nickname;
    userForm.gender = userStore.sex;
    userForm.signature = userStore.sign;
    userForm.avatarUrl = userStore.imageurl;
    ElMessage.info("已重置！");
  };
  </script>
  
  <style scoped>
  .user-detail-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  
  .user-detail-card {
    width: 70%;
    padding: 30px;
  }
  
  .header-section {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .user-avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin-right: 20px;
  }
  
  .user-info {
    flex: 1;
  }
  
  .name-section {
    display: flex;
    align-items: center;
  }
  
  .user-name {
    font-size: 20px;
    font-weight: bold;
    margin-right: 10px;
  }
  
  .gender-section {
    margin-bottom: 20px;
  }
  
  .signature-section {
    margin-bottom: 20px;
  }
  
  .avatar-url-section {
    margin-bottom: 20px;
  }
  
  .button-section {
    text-align: right;
  }
  </style>
  