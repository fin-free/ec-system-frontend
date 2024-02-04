import Content from './content'
import StoreContext from './context'
import createStore from './store'

const LineComparison: React.FC = () => {
  const projectId = localStorage.getItem('ec_sys_projectId') || '1'

  return (
    <StoreContext.Provider value={createStore(projectId)}>
      <Content />
    </StoreContext.Provider>
  )
}

export default LineComparison
