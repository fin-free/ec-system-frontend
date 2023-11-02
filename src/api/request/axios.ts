import axios from 'axios'
import { get } from 'lodash'

import { AUTH_TOKEN_KEY } from '@/common/constants/auth'
import { rootStore } from '@/store'

const instance = axios.create({
  baseURL: '/api',
  timeout: 300000
})

// 全局数据请求loading
let requestingCount = 0
function configLoading(type: string) {
  if (type === 'req') {
    if (requestingCount === 0 && rootStore) {
      rootStore.commonStore.setShowLoading(true)
    }
    requestingCount++
  } else {
    requestingCount--
    if (requestingCount === 0 && rootStore) {
      rootStore.commonStore.setShowLoading(false)
    }
  }
}

// 请求头token注入
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY) || ''
    if (config.headers) {
      config.headers.Authorization = token
    }
    if (get(config, 'showLoading', false)) {
      configLoading('req')
    }
    return config
  },
  (err) => {
    if (err.config.showLoading) {
      configLoading('req')
    }
    console.log(err)
  }
)

export default instance
