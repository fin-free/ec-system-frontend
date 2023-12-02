export interface EquipmentItem {
  equipmentId: number
  equipmentName: string
  equipmentNum: string
  productModel: string
  energyType: string
  status: number
  createTime: string
  operations: string
  key?: number
}

export interface EquipmentInfo {
  currentThresholdMax: number //最大电流阈值
  energyType: string //能源类型 01001 冷水表  01002 热水表 01003 电表 01004 温湿度传感器
  equipmentName: string //设备名称
  equipmentNum: string //设备地址
  humidityMax: number //最大湿度值
  powerMin: number //最小功率
  productModel: string //表型
  projectId: string //项目Id
  powerMax: number //最大功率
  status: number //设备状态 0 未使用 1已注册 2正常使用
  temperatureMax: number //最大温度值
  voltageThresholdMax: number //最大电压阈值
  currentMagnification: number //电流倍率
}
