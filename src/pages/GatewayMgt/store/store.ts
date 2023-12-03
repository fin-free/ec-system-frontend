import { makeAutoObservable, observable } from 'mobx'
import { GatewayItem } from '../typings'

export default class Store {
  public gatewayData: Array<GatewayItem> = []
  public gatewayStatus = undefined
  public gatewayNum = undefined
  public projectId = undefined
  constructor() {
    makeAutoObservable(this, {
      gatewayData: observable,
      gatewayStatus: observable,
      gatewayNum: observable,
      projectId: observable
    })
  }

  changeGatewayNum(num: any) {
    this.gatewayNum = num
  }

  changeGatewayStatus(status: any) {
    this.gatewayStatus = status
  }
}
