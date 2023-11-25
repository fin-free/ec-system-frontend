// import request from './request'

// const getStatisticSummary = () => request({ url: '/mock/data', method: 'get' })
const getStatisticSummary = () =>
  Promise.resolve({
    data: [
      { title: '网关数', value: Math.floor(Math.random() * 1000) },
      { title: '设备数', value: Math.floor(Math.random() * 1000) },
      { title: '在线数', value: Math.floor(Math.random() * 1000) },
      { title: '离线数', value: Math.floor(Math.random() * 1000) }
    ]
  })

export { getStatisticSummary }
