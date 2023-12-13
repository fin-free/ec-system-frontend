import { useContext, useEffect } from 'react'

import EquipmentList from './components/EquipmentList'
import ArchiveTree from './components/ArchiveTree'
import EnergyList from './components/EnergyList'
import EditArchivesForm from './components/EditArchievesForm'
import storeContext from './context'
import { observer } from '@/hooks/storeHook'
import Styles from './index.module.scss'

const Content: React.FC = () => {
  const { store } = useContext(storeContext)
  useEffect(() => {}, [])

  return (
    <div className={Styles.root}>
      {store.curArchivesItem ? (
        <div className={Styles.archivesForm}>
          <EditArchivesForm archievesItem={store.curArchivesItem} />
        </div>
      ) : (
        <>
          <EquipmentList />
          <div className='content'>
            <div className={Styles.innerContent}>
              {!store.selectedArchiveId ? <ArchiveTree /> : <EnergyList archivesId={store.selectedArchiveId} />}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default observer(Content)
