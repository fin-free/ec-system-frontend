import request from './request'

const login = (data: object) => request({ url: '/user/login', method: 'post', data })

const loginOut = () => request({ url: '/user/logout', method: 'post' })

const getUserInfo = () => request({ url: '/user/profile', method: 'get' })

export { getUserInfo, login, loginOut }
