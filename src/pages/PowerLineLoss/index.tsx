import { useStore } from '@/hooks/storeHook'

import Content from './content'
import StoreContext from './context'
import createStore from './store'

const PowerLineLoss: React.FC = () => {
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

export default PowerLineLoss
