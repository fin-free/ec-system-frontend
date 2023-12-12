import { Form, Button, Input, message } from 'antd'
import React, { useContext, useEffect } from 'react'
import { observer } from '@/hooks/storeHook'
import Styles from '../index.module.scss'
import storeContext from '../context'

interface IProps {
  archievesItem: any
}

const EditForm: React.FC<IProps> = (props: IProps) => {
  const { archievesItem } = props
  const { actions } = useContext(storeContext)
  const [messageApi, contextHolder] = message.useMessage()
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue(archievesItem)
  }, [archievesItem])
  const onFormFinish = async (data: any) => {
    const res = await actions.addArchives(data)
    messageApi.info(res)
  }

  const onClickCancel = () => {
    actions.updateCurArchivesItem(null)
  }

  return (
    <>
      {contextHolder}
      <Form
        name='basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{
          width: 500,
          padding: 50
        }}
        onFinish={onFormFinish}
        autoComplete='off'
        form={form}
      >
        <Form.Item
          label='档案级别'
          name='archivesLevel'
          rules={[{ required: true, message: '请输入档案级别！' }]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          label='上级档案'
          name='parentId'
          rules={[{ required: true, message: '请输入上级档案！' }]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          label='档案名称'
          name='archivesName'
          rules={[{ required: true, message: '请输入档案名称！' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 32 }}>
          <Button
            size='large'
            className={Styles.primaryButton}
            style={{ width: 100 }}
            onClick={onClickCancel}
          >
            取消
          </Button>
          <Button
            size='large'
            type='primary'
            htmlType='submit'
            style={{ marginLeft: 20, width: 100 }}
          >
            保存
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default observer(EditForm)
