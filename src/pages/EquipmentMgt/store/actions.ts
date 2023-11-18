import { get } from 'lodash'
import { runInAction } from 'mobx'

import * as API from '@/api/EquitmentMgt'

import Store from './store'
import { EquipmentItem } from '../typings'

export default class Actions {
  private _store: Store
  constructor(store: Store) {
    this._store = store;
    this.init();
  }

  async init() {
    await this.fetchData();
  }
  async fetchData() {
    await API.getMockData().then((res: {
      data: Array<EquipmentItem>
    }) => {
      if (res) {
        runInAction(() => {
          this._store.equipmentData = get(res, 'data', [])
        })
      }
    })
  }
}
