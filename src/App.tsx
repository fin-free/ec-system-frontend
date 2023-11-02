import { BrowserRouter as Router } from 'react-router-dom'

import '@/common/styles/index.scss'

import Routes from '@/routes'

import Styles from './App.module.scss'

function App() {
  return (
    <div className={Styles.root}>
      <Router>
        <Routes />
      </Router>
    </div>
  )
}

export default App
