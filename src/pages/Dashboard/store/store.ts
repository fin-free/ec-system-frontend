import { makeAutoObservable } from 'mobx'

import { StatisticsCard } from '../types'

export default class Store {
  constructor() {
    makeAutoObservable(this)
  }

  public statisticsList: Array<StatisticsCard> = []
}
