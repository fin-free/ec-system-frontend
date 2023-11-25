import Store from '../modules/commonStore'

export default class CommonActions {
  private _store: Store
  constructor(commonStore: Store) {
    this._store = commonStore
  }

  async init(): Promise<void> {}
}
