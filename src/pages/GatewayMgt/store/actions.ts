import { get } from 'lodash'
import { runInAction } from 'mobx'

import * as API from '@/api/gatewayMgt'

import Store from './store'
import { GatewayItem } from '../typings'

export default class Actions {
  private _store: Store
  constructor(store: Store) {
    this._store = store
    this.init()
  }

  async init() {
    await this.fetchGatewayData()
  }
  async fetchGatewayData() {
    const res: {
      list: Array<GatewayItem>
    } = await API.getGatewayList({
      gatewayNum: this._store.gatewayNum ?? '',
      status: this._store.gatewayStatus ?? '',
      productModel: '', // TODO
      projectId: this._store.projectId ?? '1' // 默认projectId
    })
    if (res) {
      res.list = res.list.map((listItem) =>
        Object.assign(listItem, { key: listItem.gatewayId })
      )
      runInAction(() => {
        this._store.gatewayData = get(res, 'list', [])
      })
    }
  }

  async resetData() {
    runInAction(() => {
      this._store.gatewayNum = undefined
      this._store.gatewayStatus = undefined
    })
    await this.fetchGatewayData()
  }

  async addGateway(params: any) {
    const res = await API.addGateway({
      ...params,
      projectId: this._store.projectId ?? '1'
    })
    if (res) {
      return res
    } else {
      return null
    }
  }

  async updateGateway(params: any) {
    const res = await API.updateGateway({
      ...params,
      projectId: this._store.projectId ?? '1'
    })
    if (res) {
      return res
    } else {
      return null
    }
  }

  async deleteGateway(params: any) {
    const res = await API.deleteGateway({
      ...params,
      projectId: this._store.projectId ?? '1'
    })
    if (res) {
      return res
    } else {
      return null
    }
  }

  async getGatewayInfo(params: any) {
    const res = await API.getGatewayInfo({
      ...params,
      projectId: this._store.projectId ?? '1'
    })
    if (res) {
      return res
    } else {
      return {}
    }
  }
}
