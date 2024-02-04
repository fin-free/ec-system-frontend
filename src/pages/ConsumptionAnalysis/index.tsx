import { useStore } from '@/hooks/storeHook'

import Content from './Content'
import StoreContext from './context'
import createStore from './store'

const ConsumptionAnalysis: React.FC = () => {
  const {
    authStore: {
      userInfo: { projectId }
    }
  } = useStore()

  return (
    <StoreContext.Provider value={createStore(projectId)}>
      <Content />
    </StoreContext.Provider>
  )
}

export default ConsumptionAnalysis
