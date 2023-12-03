import request from './request'

const getEquipmentList = async (params: any) => {
  const { equipmentNum, status, projectId } = params
  try {
    const res = await request({
      url: `/sys-equipment/list`,
      method: 'POST',
      data: {
        equipmentNum, //设备地址
        pageNum: 1, //页数
        pageSize: 100, //页码
        status, //设备状态 0 未使用 1已注册 2正常使用
        projectId //项目Id
      }
    })
    const { code, data, message } = res ?? {}
    if (code === 200) {
      return data
    } else {
      throw new Error(message)
    }
  } catch (error) {
    console.error('getEquipmentList error: ', error)
  }
}

const addEquipment = async (params: any) => {
  const {
    currentThresholdMax,
    energyType,
    equipmentName,
    equipmentNum,
    humidityMax,
    powerMin,
    productModel,
    powerMax,
    status,
    temperatureMax,
    voltageThresholdMax,
    currentMagnification,
    projectId
  } = params
  try {
    const res = await request({
      url: `/sys-equipment/add`,
      method: 'POST',
      data: {
        projectId, //项目Id
        currentThresholdMax, //最大电流阈值
        energyType, //能源类型 01001 冷水表  01002 热水表 01003 电表 01004 温湿度传感器
        equipmentName, //设备名称
        equipmentNum, //设备地址
        humidityMax, //最大湿度值
        powerMin, //最小功率
        productModel, //表型
        powerMax, //最大功率
        status, //设备状态 0 未使用 1已注册 2正常使用
        temperatureMax, //最大温度值
        voltageThresholdMax, //最大电压阈值
        currentMagnification //电流倍率
      }
    })
    const { code, data, message } = res ?? {}
    if (code === 200) {
      return message
    } else {
      throw new Error(message)
    }
  } catch (error) {
    console.error('addEquipment error: ', error)
  }
}

const updateEquipment = async (params: any) => {
  const {
    currentThresholdMax,
    energyType,
    equipmentName,
    equipmentNum,
    humidityMax,
    powerMin,
    productModel,
    powerMax,
    status,
    temperatureMax,
    voltageThresholdMax,
    currentMagnification,
    projectId,
    equipmentId
  } = params
  try {
    const res = await request({
      url: `/sys-equipment/update`,
      method: 'POST',
      data: {
        currentThresholdMax, //最大电流阈值
        energyType, //能源类型 01001 冷水表  01002 热水表 01003 电表 01004 温湿度传感器
        equipmentName, //设备名称
        equipmentNum, //设备地址
        humidityMax, //最大湿度值
        powerMin, //最小功率
        productModel, //表型
        powerMax, //最大功率
        status, //设备状态 0 未使用 1已注册 2正常使用
        temperatureMax, //最大温度值
        voltageThresholdMax, //最大电压阈值
        currentMagnification, //电流倍率
        projectId, //项目Id
        equipmentId
      }
    })
    const { code, data, message } = res ?? {}
    if (code === 200) {
      return message
    } else {
      throw new Error(message)
    }
  } catch (error) {
    console.error('updateEquipment error: ', error)
  }
}

const deleteEquipment = async (params: any) => {
  const { equipmentId } = params
  try {
    const res = await request({
      url: `/sys-equipment/delete?id=${equipmentId}`,
      method: 'DELETE'
    })
    const { code, data, message } = res ?? {}
    if (code === 200) {
      return data
    } else {
      throw new Error(message)
    }
  } catch (error) {
    console.error('deleteEquipment error: ', error)
  }
}

const getEquipmentInfo = async (params: any) => {
  const { equipmentId } = params
  try {
    const res = await request({
      url: `/sys-equipment/info?equipmentId=${equipmentId}`,
      method: 'GET'
    })
    const { code, data, message } = res ?? {}
    if (code === 200) {
      return data
    } else {
      throw new Error(message)
    }
  } catch (error) {
    console.error('getEquipmentInfo error: ', error)
  }
}

export {
  getEquipmentList,
  addEquipment,
  updateEquipment,
  deleteEquipment,
  getEquipmentInfo
}
