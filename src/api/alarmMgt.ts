import request from './request'

const mockData: any[] = [];
for (let i = 0; i < 100; i++) {
  mockData.push({
    alarmType: i % 6,
    equipment: '设备',
    gatewayAddress: '网关地址',
    alarmDetail: `告警详情${i}`,
    eventStatus: i % 3,
    createdTime: '发生时间',
    operations: '操作',
    key: i,
  });
}
// const getMockData = () => request({ url: '/mock/data', method: 'get' })
const getMockData = (): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: mockData,
      })
    }, 500)
  })
}
export { getMockData }
