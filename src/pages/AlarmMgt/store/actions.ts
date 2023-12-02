import { get } from 'lodash'
import { runInAction } from 'mobx'

import * as API from '@/api/alarmMgt'

import Store from './store'
import { Item } from '../typings'

export default class Actions {
  private _store: Store
  constructor(store: Store) {
    this._store = store;
    this.init();
  }

  async init() {
    await this.fetchData();
  }
  async fetchData(noFilter = false) {
    const res: {
      list: Array<Item>
    } = await API.getAlarmList({
      status: this._store.eventStatus ?? '',
      type: this._store.alarmType ?? '', 
      startTime: this._store.timeRange?.[0]?.toISOString() ?? '', 
      pageNum: '', 
      pageSize: '', 
      endTime: this._store.timeRange?.[1]?.toISOString() ?? ''
    })
    
    if (res) {
      res.list = res.list.map((listItem) => Object.assign(listItem, {key: listItem.alarmId}));
      runInAction(() => {
        this._store.alarmData = get(res, 'list', [])
      })
    }
  }

  async resetData() {
    runInAction(() => {
      this._store.alarmType = undefined;
      this._store.eventStatus = undefined;
      this._store.timeRange = null
    })
    await this.fetchData(true);
  }

  async operateAlarm(alarmIds: React.Key[], operation: number) {
    const res = await API.operateAlarm({
      alarmIds,
      operation,
    });
    if (res) {
      runInAction(() => {
        this._store.alarmData = this._store.alarmData.map((item) => {
          if (alarmIds.includes(item.alarmId)) {
            item.status = operation;
          }
          return item;
        });
      })
    }
  }
}
