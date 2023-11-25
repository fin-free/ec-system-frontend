import { useState } from 'react'

import { Button, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'

import { useStore } from '@/hooks/storeHook'
import { ROUTE_PATH_DASHBOARD } from '@/routes/routePath'
import { ILoginParams } from '@/types'

import Styles from './LoginForm.module.scss'

const LoginForm: React.FC = () => {
  const navigate = useNavigate()
  const { authActions, commonActions } = useStore()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const onFinish = (values: ILoginParams) => {
    setLoading(true)
    authActions.toLogin(values).then((res) => {
      if (res) {
        commonActions.init()
        navigate(ROUTE_PATH_DASHBOARD)
      }
      setLoading(false)
    })
  }

  return (
    <div className={Styles.root}>
      <h1>登录</h1>
      <Form
        form={form}
        className='login-form'
        name='user-login'
        initialValues={{
          userName: '',
          password: ''
        }}
        onFinish={onFinish}
        autoComplete='off'
      >
        <Form.Item name='userName' rules={[{ required: true, message: '请输入用户名!' }]}>
          <Input placeholder='邮箱/手机号' />
        </Form.Item>
        <Form.Item name='password' rules={[{ required: true, message: '请输入密码!' }]}>
          <Input.Password placeholder='密码' />
        </Form.Item>
        <Button type='primary' htmlType='submit' loading={loading}>
          登录
        </Button>
      </Form>
    </div>
  )
}

export default LoginForm
