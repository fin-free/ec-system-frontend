import Content from './Content'
import StoreContext from './context'
import createStore from './store'

const Dashboard: React.FC = () => {
  return (
    <StoreContext.Provider value={createStore()}>
      <Content />
    </StoreContext.Provider>
  )
}

export default Dashboard
