export interface GatewayItem {
  gatewayId: number
  gatewayName: string
  gatewayNum: string
  productModel: string
  type: string
  status: number
  createTime: string
  operations: string
  key?: number
}

export interface GatewayInfo {
  type: string //能源类型 11001 电表集中器  11002 水表集中器
  gatewayName: string //设备名称
  gatewayNum: string //设备编号
  productModel: string //表型
  projectId: string //项目Id
  status: number //设备状态 0 未使用 1已注册 2正常使用
}
