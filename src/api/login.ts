import request from './request'

const loginOut = () => request({ url: '/sys/logout', method: 'post' })

export { loginOut }
