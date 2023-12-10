import request from './request'

const getGatewayList = async (params: any) => {
  const { gatewayNum, productModel, projectId, status } = params
  try {
    const res = await request({
      url: `/sys-gateway/list`,
      method: 'POST',
      data: {
        gatewayNum, //设备地址
        pageNum: 1, //页数
        pageSize: 100, //页码
        productModel, //表型
        projectId, //项目Id
        status
      }
    })
    const { code, data, message } = res ?? {}
    if (code === 200) {
      return data
    } else {
      throw new Error(message)
    }
  } catch (error) {
    console.error('getGatewayList error: ', error)
  }
}

const addGateway = async (params: any) => {
  const { type, gatewayName, gatewayNum, productModel, status, projectId } = params
  try {
    const res = await request({
      url: `/sys-gateway/add`,
      method: 'POST',
      data: {
        projectId, //项目Id
        type,
        gatewayName, //设备名称
        gatewayNum, //设备地址
        productModel, //表型
        status //设备状态 0 未使用 1已注册 2正常使用
      }
    })
    const { code, message } = res ?? {}
    if (code === 200) {
      return message
    } else {
      throw new Error(message)
    }
  } catch (error) {
    console.error('addGateway error: ', error)
  }
}

const updateGateway = async (params: any) => {
  const { energyType, gatewayName, gatewayNum, productModel, status, gatewayId, projectId } = params
  try {
    const res = await request({
      url: `/sys-gateway/update`,
      method: 'POST',
      data: {
        energyType,
        gatewayName, //设备名称
        gatewayNum, //设备地址
        productModel, //表型
        status, //设备状态 0 未使用 1已注册 2正常使用
        projectId, //项目Id
        gatewayId
      }
    })
    const { code, message } = res ?? {}
    if (code === 200) {
      return message
    } else {
      throw new Error(message)
    }
  } catch (error) {
    console.error('updateGateway error: ', error)
  }
}

const deleteGateway = async (params: any) => {
  const { gatewayId } = params
  try {
    const res = await request({
      url: `/sys-gateway/delete?id=${gatewayId}`,
      method: 'DELETE'
    })
    const { code, data, message } = res ?? {}
    if (code === 200) {
      return data
    } else {
      throw new Error(message)
    }
  } catch (error) {
    console.error('deleteGateway error: ', error)
  }
}

const getGatewayInfo = async (params: any) => {
  const { gatewayId } = params
  try {
    const res = await request({
      url: `/sys-gateway/info?gatewayId=${gatewayId}`,
      method: 'GET'
    })
    const { code, data, message } = res ?? {}
    if (code === 200) {
      return data
    } else {
      throw new Error(message)
    }
  } catch (error) {
    console.error('getGatewayInfo error: ', error)
  }
}

export { getGatewayList, addGateway, updateGateway, deleteGateway, getGatewayInfo }
