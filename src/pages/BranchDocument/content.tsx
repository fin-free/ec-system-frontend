import { useContext, useEffect } from 'react'

import EquipmentList from './components/EquipmentList'
import ArchiveTree from './components/ArchiveTree'
import EnergyList from './components/EnergyList'
import EditArchivesForm from './components/EditArchievesForm'
import storeContext from './context'
import { observer } from '@/hooks/storeHook'
import Styles from './index.module.scss'
import { useStore } from '@/hooks/storeHook'

const Content: React.FC = () => {
  const { store } = useContext(storeContext)
  const { commonActions } = useStore()
  useEffect(() => {
    //TODO: projectId
    commonActions.getAchieveList('1')
  }, [store.curArchivesItem])

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
              {store.treeMode === 'manage' ? <EnergyList /> : <ArchiveTree />}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default observer(Content)
