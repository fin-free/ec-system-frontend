import { useContext } from 'react'

import SearchInput from '@/components/SearchInput'
import Tree from '@/components/Tree'
import { observer } from '@/hooks/storeHook'

import storeContext from '../context'

import Styles from './EquipmentList.module.scss'

const EquipmentList = () => {
  const { store } = useContext(storeContext)

  return (
    <aside className={Styles.root}>
      <SearchInput rootClassName='search-input' />
      <Tree defaultExpandAll treeData={[]} />
    </aside>
  )
}

export default observer(EquipmentList)
