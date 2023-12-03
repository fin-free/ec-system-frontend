import { useContext, useEffect } from 'react'

import EquipmentList from './components/EquipmentList'
import Toolbar from './components/Toolbar'
import storeContext from './context'
import Styles from './index.module.scss'

const Content: React.FC = () => {
  const { actions } = useContext(storeContext)

  useEffect(() => {
    actions.getConsumptionData()
  }, [])

  return (
    <div className={Styles.root}>
      <EquipmentList />
      <div className='content'>
        <Toolbar />
      </div>
    </div>
  )
}

export default Content
