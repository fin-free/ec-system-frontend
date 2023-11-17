// import request from './request'

// const getElectricityDataByType = () => request({ url: '/mock/data', method: 'get' })
const getElectricityDataByType = () =>
  Promise.resolve({
    data: [
      { name: '1', date: '2023-01-01', voltage: 100 },
      { name: '2', date: '2023-01-01', voltage: 200 },
      { name: '3', date: '2023-01-01', voltage: 300 },
      { name: '4', date: '2023-01-01', voltage: 400 }
    ]
  })

// const getEquipmentList = () => request({ url: '/mock/data', method: 'get' })
const getEquipmentList = () =>
  Promise.resolve({
    data: [
      { name: 'level-1-node', children: [{ name: 'level-1-1-node', children: [{ name: 'level-1-1-1-node' }] }] },
      { name: 'level-2-node', children: [{ name: 'level-2-1-node', children: [{ name: 'level-2-1-1-node' }] }] }
    ]
  })

export { getElectricityDataByType, getEquipmentList }
