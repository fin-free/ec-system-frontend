import { get } from 'lodash'
import { runInAction } from 'mobx'

import * as API from '@/api/dashboard'
import * as AlarmAPI from '@/api/alarmMgt'
import * as ConsumptionApi from '@/api/consumptionAnalysis'
import { STATISTICS_SUMMARY_LABEL } from '@/common/constants/labels'

import Store from './store'
import { Item } from '../types'
export default class Actions {
  private _store: Store
  constructor(store: Store) {
    this._store = store
  }

  async getStatisticSummaryData() {
    await API.getStatisticSummary({ projectId: 1 }).then((res) => {
      if (res) {
        runInAction(() => {
          const data = get(res, 'data', [])
          this._store.statisticsList = Object.keys(data).map((key) => {
            return {
              key,
              title: STATISTICS_SUMMARY_LABEL[key],
              value: data[key]
            }
          })
        })
      }
    })
  }

  async getEnergyCompareData() {
    await ConsumptionApi.getEnergyConsumptionData(
      this._store.energyConsumptionPayload
    ).then((res) => {
      if (res) {
        runInAction(() => {
          this._store.energyConsumptionData = get(res, 'data', [])
        })
      }
    })
  }

  async onSearch(searchParams: {
    datetype: string
    startTime?: string
    endTime?: string
  }) {
    runInAction(() => {
      this._store.energyConsumptionPayload = {
        ...this._store.energyConsumptionPayload,
        ...searchParams
      }
    })
    this.getEnergyCompareData()
  }
  async getAlarmData() {
    const res: {
      list: Array<Item>
    } = await AlarmAPI.getAlarmList({
      status: '',
      type: '',
      startTime: '',
      pageNum: '',
      pageSize: '',
      endTime: ''
    })
    if (res) {
      res.list = res.list.map((listItem) =>
        Object.assign(listItem, { key: listItem.alarmId })
      )
      runInAction(() => {
        this._store.alarmData = get(res, 'list', [])
      })
    }
  }
  async operateAlarm(alarmIds: React.Key[], operation: number) {
    const res = await AlarmAPI.operateAlarm({
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
  updateStatus(status: number) {
    this._store.eventStatus = status
  }
}
