import { ILoginParams } from '@/types'

// const login = (data: ILoginParams) => request({ url: '/user/login', method: 'post', data, showLoading: false })
const login = (data: ILoginParams) =>
  Promise.resolve(data.userName && data.password ? { data: { token: 'test_token' } } : null) // mock

// const loginOut = () => request({ url: '/user/logout', method: 'post', showLoading: false })
const loginOut = () => Promise.resolve({ data: { userName: 'admin' } })

// const getUserInfo = () => request({ url: '/user/profile', method: 'get' })
const getUserInfo = () => Promise.resolve({ data: { userName: 'admin' } }) // mock

export { getUserInfo, login, loginOut }
