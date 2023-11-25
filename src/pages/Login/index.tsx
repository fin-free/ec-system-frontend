import Styles from './index.module.scss'
import LoginForm from './LoginForm'

const Login: React.FC = () => {
  return (
    <div className={Styles.root}>
      <LoginForm />
    </div>
  )
}

export default Login
