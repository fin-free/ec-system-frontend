import request from './request'

const getMockData = () => request({ url: '/mock/data', method: 'get' })

export { getMockData }
