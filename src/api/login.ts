import request from './request'

const login = ({ userName, password }: { userName: string; password: string }) =>
  request({
    url: '/sys/login',
    method: 'post',
    data: {
      username: userName,
      password
    }
  })

const loginOut = () => request({ url: '/sys/logout', method: 'post' })

const getUserInfo = () => request({ url: '/sys/user/info', method: 'get' })

export { getUserInfo, login, loginOut }
