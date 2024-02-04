import { get } from 'lodash'
import { runInAction } from 'mobx'

import * as AlarmAPI from '@/api/alarmMgt'
import * as ConsumptionApi from '@/api/consumptionAnalysis'
import * as API from '@/api/dashboard'
import { STATISTICS_SUMMARY_LABEL } from '@/common/constants/labels'

import { Item } from '../types'

import Store from './store'

export default class Actions {
  private _store: Store
  constructor(store: Store) {
    this._store = store
  }

  async getStatisticSummaryData() {
    await API.getStatisticSummary({ projectId: this._store.projectId }).then((res) => {
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

  async getEnergyConsumptionData() {
    const payload = {
      projectId: this._store.projectId,
      ...this._store.energyConsumptionPayload
    }
    await ConsumptionApi.getEnergyConsumptionData(payload).then((res) => {
      if (res) {
        runInAction(() => {
          this._store.energyConsumptionData = get(res, 'data', []).map((d: any) => ({
            ...d,
            energyValue: d.energyValue === '-' ? 0 : d.energyValue,
            tooltipValue: d.energyValue === '-' ? '--' : null
          }))
        })
      }
    })
  }

  async getWaterCompareData() {
    const payload = {
      projectId: this._store.projectId,
      ...this._store.waterConsumptionPayload
    }
    await ConsumptionApi.getEnergyConsumptionData(payload).then((res) => {
      if (res) {
        runInAction(() => {
          this._store.waterConsumptionData = get(res, 'data', []).map((d: any) => ({
            ...d,
            energyValue: d.energyValue === '-' ? 0 : d.energyValue,
            tooltipValue: d.energyValue === '-' ? '--' : null
          }))
        })
      }
    })
  }

  async onSearch(searchParams: { datetype: string; startTime?: string; endTime?: string }) {
    runInAction(() => {
      this._store.energyConsumptionPayload = {
        ...this._store.energyConsumptionPayload,
        ...searchParams
      }
      this._store.waterConsumptionPayload = {
        ...this._store.waterConsumptionPayload,
        ...searchParams
      }
    })
    this.getEnergyConsumptionData()
    this.getWaterCompareData()
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
      endTime: '',
      projectId: this._store.projectId
    })
    if (res) {
      res.list = res.list.map((listItem) => Object.assign(listItem, { key: listItem.alarmId }))
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
