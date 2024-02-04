import { useLocation } from 'react-router-dom'

import Content from './Content'
import StoreContext from './context'
import createStore from './store'

const Dashboard: React.FC = () => {
  const {
    state: { projectId }
  } = useLocation()

  return (
    <StoreContext.Provider value={createStore(projectId || localStorage.getItem('ec_sys_projectId'))}>
      <Content />
    </StoreContext.Provider>
  )
}

export default Dashboard
