import { get } from 'lodash'
import { runInAction } from 'mobx'

import * as API from '@/api/gatewayMgt'

import { GatewayItem } from '../typings'

import Store from './store'

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
      pageNum: number
      pageSize: number
      total: number
      totalPage: number
    } = await API.getGatewayList({
      gatewayNum: this._store.gatewayNum ?? '',
      productModel: this._store.productModel,
      projectId: this._store.projectId ?? '1', // 默认projectId
      pageNum: this._store.pagination.current,
      pageSize: this._store.pagination.pageSize
    })
    if (res) {
      res.list = res.list.map((listItem, index) =>
        Object.assign(listItem, { key: listItem.gatewayId, order: index + 1 })
      )
      runInAction(() => {
        this._store.pagination = {
          ...this._store.pagination,
          total: res.total,
          pageSize: res.pageSize,
          showTotal: (total: number) => `共 ${total} 条数据`
        }
        this._store.gatewayData = get(res, 'list', [])
      })
    }
  }

  async resetData() {
    runInAction(() => {
      this._store.gatewayNum = undefined
      this._store.productModel = undefined
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

  async updatePagination(pagination: {
    current: number
    pageSize: number
    total?: number
    showTotal?: (total: number) => string
  }) {
    const { current, pageSize } = pagination
    runInAction(() => {
      this._store.pagination.current = current
      this._store.pagination.pageSize = pageSize
    })
    this.fetchGatewayData()
  }
}
