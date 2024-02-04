import Content from './Content'
import StoreContext from './context'
import createStore from './store'

const ElectricityDataMgt: React.FC = () => {
  const projectId = localStorage.getItem('ec_sys_projectId') || '1'

  return (
    <StoreContext.Provider value={createStore(projectId)}>
      <Content />
    </StoreContext.Provider>
  )
}

export default ElectricityDataMgt
