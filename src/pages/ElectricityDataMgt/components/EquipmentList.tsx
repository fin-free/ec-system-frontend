import { useContext } from 'react'

import SearchInput from '@/components/SearchInput'
import Tree from '@/components/Tree'
import { observer, useStore } from '@/hooks/storeHook'

import storeContext from '../context'

import Styles from './EquipmentList.module.scss'

const EquipmentList = () => {
  const {
    commonStore: { buildingList }
  } = useStore()
  const { store } = useContext(storeContext)

  return (
    <aside className={Styles.root}>
      <SearchInput rootClassName='search-input' />
      <Tree defaultExpandAll={true} treeData={buildingList} />
    </aside>
  )
}

export default observer(EquipmentList)
