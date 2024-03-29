import { makeAutoObservable, observable } from 'mobx'

import { GatewayItem } from '../typings'

export default class Store {
  public gatewayData: Array<GatewayItem> = []
  public productModel = undefined
  public gatewayNum = undefined
  public projectId: string
  constructor(projectId: string) {
    this.projectId = projectId
    makeAutoObservable(this, {
      gatewayData: observable,
      productModel: observable,
      gatewayNum: observable,
      projectId: observable
    })
  }

  changeGatewayNum(num: any) {
    this.gatewayNum = num
  }

  changeProductModel(model: any) {
    this.productModel = model
  }
  public pagination = {
    total: 0,
    current: 1,
    pageSize: 15,
    showTotal: (total: number) => `共 ${total} 条数据`
  }
}
