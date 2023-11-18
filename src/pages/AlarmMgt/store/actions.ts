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
    await API.getMockData().then((res: {
      data: Array<Item>
    }) => {
      if (res) {
        if (!noFilter) {
          res.data = res.data.filter((item) => {
            return (this._store.alarmType === undefined || item.alarmType === this._store.alarmType) && (this._store.eventStatus === undefined || item.eventStatus === this._store.eventStatus)
          })
        }
        runInAction(() => {
          this._store.alarmData = get(res, 'data', [])
        })
      }
    })
  }

  async resetData() {
    await this.fetchData(true);
    runInAction(() => {
      this._store.alarmType = undefined;
      this._store.eventStatus = undefined;
    })
  }
}
