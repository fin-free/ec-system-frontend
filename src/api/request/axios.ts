import { message } from 'antd'
import axios from 'axios'
import dayjs from 'dayjs'
import { get } from 'lodash'

import { AUTH_TOKEN_EXPIRE, AUTH_TOKEN_KEY, AUTH_TOKEN_SAVE_TIME } from '@/common/constants/auth'
import { ROUTE_PATH_LOGIN } from '@/routes/routePath'
import { rootStore } from '@/store'

const instance = axios.create({
  baseURL: '/api/iot',
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
      config.headers.token = token
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

// 响应处理
instance.interceptors.response.use(
  (res) => {
    if (get(res.config, 'showLoading', false)) {
      configLoading('res')
    }
    return Promise.resolve(get(res, 'data'))
  },
  (err) => {
    if (err.config?.showLoading) {
      configLoading('res')
    }
    const response = err.response || {}
    const msg = response.data?.message
    msg && message.error(msg)
    const status = response?.status
    const now = dayjs().valueOf()
    const tokenSaveTime = parseInt(localStorage.getItem(AUTH_TOKEN_SAVE_TIME) || '')
    const tokenExpire = parseInt(localStorage.getItem(AUTH_TOKEN_EXPIRE) || '')
    if (status === 401 || (tokenSaveTime && now - tokenSaveTime > tokenExpire)) {
      localStorage.clear()
      window.location.href = ROUTE_PATH_LOGIN
    }

    return Promise.reject(get(err, ['response', 'data']))
  }
)

export default instance
