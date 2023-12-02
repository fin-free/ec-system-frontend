import { useContext, useEffect } from 'react'

import DataTable from './components/DataTable'
import EquipmentList from './components/EquipmentList'
import Toolbar from './components/Toolbar'
import storeContext from './context'
import Styles from './index.module.scss'

const Content: React.FC = () => {
  const { actions } = useContext(storeContext)

  useEffect(() => {
    // actions.getBuildCompare()
  }, [])

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

export default Content
