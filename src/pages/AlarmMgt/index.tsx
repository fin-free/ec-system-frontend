import Content from './content'
import StoreContext from './context'
import createStore from './store'

const AlarmMgt: React.FC = () => {
  return (
    <StoreContext.Provider value={createStore()}>
      <Content />
    </StoreContext.Provider>
  )
}

export default AlarmMgt
