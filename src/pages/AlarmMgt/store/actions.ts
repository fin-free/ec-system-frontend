import { get } from 'lodash'
import { runInAction } from 'mobx'

import * as API from '@/api/alarmMgt'

import Store from './store'
import { Item } from '../typings'

export default class Actions {
  private _store: Store
  constructor(store: Store) {
    this._store = store
    this.init()
  }

  async init() {
    await this.fetchData()
  }
  async fetchData() {
    const res: {
      list: Array<Item>
      pageNum: number
      pageSize: number
      total: number
      totalPage: number
    } = await API.getAlarmList({
      status: this._store.eventStatus > -1 ? this._store.eventStatus : '',
      type: this._store.alarmType > 0 ? this._store.alarmType : '',
      startTime: this._store.timeRange?.[0]?.toISOString() ?? '',
      pageNum: this._store.pagination.current.toString(),
      pageSize: this._store.pagination.pageSize.toString(),
      endTime: this._store.timeRange?.[1]?.toISOString() ?? ''
    })

    if (res) {
      res.list = res.list.map((listItem) =>
        Object.assign(listItem, { key: listItem.alarmId })
      )
      runInAction(() => {
        this._store.pagination = {
          ...this._store.pagination,
          total: res.total,
          pageSize: res.pageSize,
          showTotal: (total: number) => `共 ${total} 条数据`
        }
        this._store.alarmData = get(res, 'list', [])
      })
    }
  }

  async resetData() {
    runInAction(() => {
      this._store.alarmType = 0
      this._store.eventStatus = -1
      this._store.timeRange = null
    })
    await this.fetchData()
  }

  async operateAlarm(alarmIds: React.Key[], operation: number) {
    const res = await API.operateAlarm({
      alarmIds,
      operation
    })
    if (res) {
      runInAction(() => {
        this._store.alarmData = this._store.alarmData.map((item) => {
          if (alarmIds.includes(item.alarmId)) {
            item.status = operation
          }
          return item
        })
      })
    }
  }
  changeAlarmType(type: any) {
    runInAction(() => {
      this._store.alarmType = type
    })
  }

  changeEventStatus(type: any) {
    runInAction(() => {
      this._store.eventStatus = type
    })
  }

  changeTimeRange(timeRange: any) {
    runInAction(() => {
      this._store.timeRange = timeRange
    })
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
    this.fetchData()
  }
}
