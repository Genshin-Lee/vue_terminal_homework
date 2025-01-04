import axios from 'axios'
const request = axios.create({
  timeout: 2000 //设置强求超时时间
})
export default request