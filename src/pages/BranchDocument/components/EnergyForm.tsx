import { Form, Input } from 'antd'
import React, { useEffect } from 'react'
import { observer } from '@/hooks/storeHook'
// import Styles from '../index.module.scss'
// import storeContext from '../context'

interface IProps {
  energyItem: any
}

const EditForm: React.FC<IProps> = (props: IProps) => {
  const { energyItem } = props
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue(energyItem)
  }, [energyItem])

  return (
    <>
      <Form
        name='basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ border: '1px solid rgba(255, 255, 255, 0.15)', padding: 50 }}
        autoComplete='off'
        form={form}
      >
        <Form.Item label='电表编号' name='equipmentNum'>
          <Input disabled />
        </Form.Item>
        <Form.Item label='电表型号' name='productModel'>
          <Input disabled />
        </Form.Item>
        <Form.Item label='电流倍率' name='currentMagnification'>
          <Input disabled />
        </Form.Item>
      </Form>
    </>
  )
}

export default observer(EditForm)
