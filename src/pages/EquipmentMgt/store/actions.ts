import { get } from 'lodash'
import { runInAction } from 'mobx'

import * as API from '@/api/equipmentMgt'

import Store from './store'
import { EquipmentItem } from '../typings'

export default class Actions {
  private _store: Store
  constructor(store: Store) {
    this._store = store
    this.init()
  }

  async init() {
    await this.fetchEquipmentData()
  }
  async fetchEquipmentData() {
    const res: {
      list: Array<EquipmentItem>
    } = await API.getEquipmentList({
      equipmentNum: this._store.equipmentNum ?? '',
      status: this._store.equipmentStatus ?? '',
      projectId: this._store.projectId ?? '1' // 默认projectId
    })
    if (res) {
      res.list = res.list.map((listItem) =>
        Object.assign(listItem, { key: listItem.equipmentId })
      )
      runInAction(() => {
        this._store.equipmentData = get(res, 'list', [])
      })
    }
  }

  async resetData() {
    runInAction(() => {
      this._store.equipmentNum = undefined
      this._store.equipmentStatus = undefined
    })
    await this.fetchEquipmentData()
  }

  async addEquipment(params: any) {
    const res = await API.addEquipment({
      ...params,
      projectId: this._store.projectId ?? '1'
    })
    if (res) {
      return res
    } else {
      return null
    }
  }

  async updateEquipment(params: any) {
    const res = await API.updateEquipment({
      ...params,
      projectId: this._store.projectId ?? '1'
    })
    if (res) {
      return res
    } else {
      return null
    }
  }

  async deleteEquipment(params: any) {
    const res = await API.deleteEquipment({
      ...params,
      projectId: this._store.projectId ?? '1'
    })
    if (res) {
      return res
    } else {
      return null
    }
  }

  async getEquipmentInfo(params: any) {
    const res = await API.getEquipmentInfo({
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
