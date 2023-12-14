import { useContext, useEffect } from 'react'

import { observer, useStore } from '@/hooks/storeHook'

import DataTable from './components/DataTable'
import EquipmentList from './components/EquipmentList'
import Toolbar from './components/Toolbar'
import storeContext from './context'
import Styles from './index.module.scss'

const Content: React.FC = () => {
  const { actions } = useContext(storeContext)
  const {
    commonStore: { defaultSelectedBuildingKeys }
  } = useStore()

  useEffect(() => {
    if (defaultSelectedBuildingKeys && defaultSelectedBuildingKeys.length > 0) {
      actions.getEnvironmentData(defaultSelectedBuildingKeys[0])
    }
  }, [defaultSelectedBuildingKeys])

  return (
    <div className={Styles.root}>
      <EquipmentList />
      <div className='content'>
        <Toolbar />
        <DataTable />
      </div>
    </div>
  )
}

export default observer(Content)
