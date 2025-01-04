<template>
  <div class="title-container">
    <h2 class="title">知乎</h2>
  </div>

  <div class="login-container">
    <h2 class="header-text">登录</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="username">用户名  {{user_message}}</label>
        <input
          type="text"
          id="username"
          v-model="username"
          placeholder="请输入你的用户名"
          v-on:input="showuser"
        />
      </div>
      <div class="form-group">
        <label for="password">密码 {{password_message}}</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="请输入你的密码"
          v-on:input="showpassward"
        />
      </div>
      <div class="form-group">
        <button type="submit" class="login-btn" @click="login">登录</button>
      </div>
      <div class="form-group">
        <button type="button" class="register-btn" @click="register">注册</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import request from '../api.js';
import {useRouter} from 'vue-router';
import { ElMessage } from 'element-plus';
import { useUserStore } from '../store.js'

const username = ref("");
const password = ref("");
const user_message = ref("");
const password_message = ref("");
const router = useRouter();
const userStore = useUserStore()

// 展示用户输入的用户名
const showuser = () => {
  user_message.value = "你好，" + username.value;
}

// 展示密码输入提示
const showpassward = () => {
  password_message.value = "快让我看看你的密码>_<";
}

// 登录函数
const login = () => {
  request(
    {
      url:'http://111.230.40.178:8084/login',
      method:'post',
      data:{
        username:username.value,
        password:password.value
      },
    }
  ).then(res=>{
    // router.push
    console.log(res)    
    ElMessage({
    message: '登录成功！',
    type: 'success',
    })
    userStore.login(username.value)
    router.push('/News')
  }).catch(res=>{
    console.log(res)
    ElMessage.error('登录失败！')
  })
}

// 注册函数
const register = () => {
  request(
    {
      url:'http://111.230.40.178:8084/addUser',
      method:'post',
      data:{
        "username":username.value,
        "password":password.value
      }
    }
  ).then(res=>{
    console.log(res)
    ElMessage({
    message: '注册成功！',
    type: 'success',
    })
  }).catch(res=>{
    console.log(res)
    ElMessage.error('注册失败！')
  })
}
</script>

<style scoped>

.title-container {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;  /* 使标题水平居中 */
  padding: 20px;
  text-align: center;  /* 使标题居中 */
}

.title {
  font-size: 40px;  /* 设置标题的字体大小 */
  color: #6666cc;
  margin-bottom: 20px;  /* 设置标题和登录框之间的间距 */
  width: 400px;

}

.login-container {
  width: 250px;
  max-width: 400px;
  margin: 0 auto; /* 使登录框居中 */
  padding: 20px;
  background-color: rgba(240, 240, 255, 0.8); /* 半透明背景颜色 */
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

}

.header-text {
  text-align: center;
  margin-bottom: 20px;
  color: #6666cc;
  font-size: 24px; /* 设置字体大小 */
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  text-align: left;
  margin-bottom: 5px;
  font-weight: bold;
  color: #6666cc;
}

input {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;  /* 确保padding和border不影响总宽度 */
  border: 1px solid #6666cc;
  border-radius: 4px;
  background-color: #fff;
  color: #333;
  height: 40px;  /* 固定高度 */
  transition: border-color 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #9999ff;
}

.login-btn {
  width: 100%;
  padding: 10px;
  background-color: #6666cc;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
}

.login-btn:hover {
  background-color: #9999ff;
}

.login-btn:focus {
  outline: none;
}

.register-btn {
  width: 100%;
  padding: 10px;
  background-color: #6666cc;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
  margin-top: 10px;
}

.register-btn:hover {
  background-color: #9999ff;
}

.register-btn:focus {
  outline: none;
}

</style>
