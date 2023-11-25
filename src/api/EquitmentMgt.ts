import request from './request'

const mockData: any[] = [];
for (let i = 1; i < 100; i++) {
  mockData.push({
    orderId: i,
    equipmentName: '设备名称',
    equipmentAddress: '设备地址',
    equipmentModel: '设备型号',
    equipmentType: '设备类型',
    equipmentStatus: '设备状态',
    equipmentAddedAt: '添加时间',
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
