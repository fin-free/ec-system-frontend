import { useContext, useEffect } from 'react'

import { DoubleRightOutlined } from '@ant-design/icons'

import { observer, useStore } from '@/hooks/storeHook'

import ArchiveTree from './components/ArchiveTree'
import EditArchivesForm from './components/EditArchievesForm'
import EnergyList from './components/EnergyList'
import EquipmentList from './components/EquipmentList'
import storeContext from './context'
import Styles from './index.module.scss'

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
          {store.treeMode === 'manage' ? <DoubleRightOutlined style={{ marginLeft: 16, fontSize: 50 }} /> : null}
          <div className='content'>
            <div className={Styles.innerContent}>{store.treeMode === 'manage' ? <EnergyList /> : <ArchiveTree />}</div>
          </div>
        </>
      )}
    </div>
  )
}

export default observer(Content)
