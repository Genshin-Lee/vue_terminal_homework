import { createPinia,defineStore } from 'pinia'; 
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";//持久化插件

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export const useUserStore = defineStore('user', {
    state: () => (
        {
            username: null,
            nickname:null,
            sign:null,
            sex:null,
            imageurl:null,
            isLoggedIn:false
        }
    ),
    actions: {
        async login(username) { 
            this.username = username;
            this.nickname = "段坤"
            this.sign = "学生党，不接商务合作"
            this.sex = "男"
            this.imageurl = "https://avatars.githubusercontent.com/u/116796403?v=4"
            this.isLoggedIn = true;

        },
        async modify(nickname,sign,sex,imageurl){
            this.nickname = nickname;
            this.sign = sign;
            this.sex = sex;
            this.imageurl = imageurl;
        },
        logout() {
            this.username = null,
            this.nickname = null,
            this.sign = null,
            this.sex = null,
            this.imageurl = null,
            this.isLoggedIn = false
        }
    },
    persist: {
        // 配置持久化选项
        enabled: true, // 启用持久化
        strategies: [
          {
            key: "user-store",
            storage: localStorage, // 持久化到 localStorage
          },
        ],
    },
});