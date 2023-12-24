import React, { useContext, useEffect } from 'react'

import { Button, Form, Input, message, Select } from 'antd'

import { observer } from '@/hooks/storeHook'
import {} from '@/store'

import storeContext from '../context'
import Styles from '../index.module.scss'
import { GatewayItem } from '../typings'

const gatewayStatusList = ['未使用', '已注册', '正常使用']

const gatewayStatusOptions = gatewayStatusList.map((item, index) => ({
  label: item,
  value: index
}))

const EnergyTypes = {
  //能源类型 11001 电表集中器  11002 水表集中器
  ELECTRIC: '11001',
  WATER: '11002'
}

const energyTypeMap = {
  [EnergyTypes.WATER]: '水表集中器',
  [EnergyTypes.ELECTRIC]: '电表集中器'
}

const energyTypeOptions = Object.values(EnergyTypes).map((type) => ({
  label: energyTypeMap[type],
  value: type
}))

interface IProps {
  gatewayItem?: GatewayItem
  onClickBack: () => void
}

const EditForm: React.FC<IProps> = (props: IProps) => {
  const { gatewayItem, onClickBack } = props
  const { actions } = useContext(storeContext)
  const [messageApi, contextHolder] = message.useMessage()
  const [form] = Form.useForm()

  useEffect(() => {
    if (gatewayItem) {
      // 区分编辑or新建 TODO
      // actions
      //   .getGatewayInfo({
      //     gatewayId: gatewayId
      //   })
      //   .then((res) => {
      //     form.setFieldsValue(res)
      //   })
      form.setFieldsValue(gatewayItem)
    } else {
      form.setFieldsValue({})
    }
  }, [gatewayItem])

  const onFormFinish = async (data: any) => {
    const res = gatewayItem ? await actions.updateGateway(data) : await actions.addGateway(data)
    if (res) {
      messageApi.info(res)
    }
  }

  return (
    <>
      {contextHolder}
      <Form
        name='basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ width: 800, alignSelf: 'flex-start', marginTop: 20 }}
        onFinish={onFormFinish}
        autoComplete='off'
        form={form}
      >
        <Form.Item label='设备名称' name='gatewayName' rules={[{ required: true, message: '请输入设备名称！' }]}>
          <Input />
        </Form.Item>
        <Form.Item label='设备类型' name='type' rules={[{ required: true, message: '请输入设备类型！' }]}>
          <Select placeholder='请选择设备类型' options={energyTypeOptions} />
        </Form.Item>

        <Form.Item label='设备编号' name='gatewayNum' rules={[{ required: true, message: '请输入设备编号！' }]}>
          <Input />
        </Form.Item>
        <Form.Item label='产品型号' name='productModel' rules={[{ required: true, message: '请输入产品型号！' }]}>
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 32 }}>
          <Button size='large' className={Styles.primaryButton} style={{ width: 100 }} type='primary' htmlType='submit'>
            保存
          </Button>
          <Button size='large' htmlType='reset' style={{ marginLeft: 20, width: 100 }} onClick={onClickBack}>
            取消
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default observer(EditForm)
