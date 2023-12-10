import { Form, Button, Input, Select, message } from 'antd'
import React, { useContext, useEffect } from 'react'
import { observer } from '@/hooks/storeHook'
import Styles from '../index.module.scss'
import storeContext from '../context'

const equipmentStatusList = ['未使用', '已注册', '正常使用']

const equipmentStatusOptions = equipmentStatusList.map((item, index) => ({
  label: item,
  value: index
}))

const EnergyTypes = {
  COLD_WATER: '01001',
  HOT_WATER: '01002',
  ELECTRIC: '01003',
  TEMPERATURE_HUMIDITY: '01004'
}

const energyTypeMap = {
  [EnergyTypes.COLD_WATER]: '冷水表',
  [EnergyTypes.HOT_WATER]: '热水表',
  [EnergyTypes.ELECTRIC]: '电表',
  [EnergyTypes.TEMPERATURE_HUMIDITY]: '温湿度传感器'
}

const energyTypeOptions = Object.values(EnergyTypes).map((type) => ({
  label: energyTypeMap[type],
  value: type
}))

interface IProps {
  equipmentId?: number
}

const EditForm: React.FC<IProps> = (props: IProps) => {
  const { equipmentId } = props
  const { actions } = useContext(storeContext)
  const [messageApi, contextHolder] = message.useMessage()
  const [form] = Form.useForm()

  useEffect(() => {
    if (typeof equipmentId === 'number') {
      // 区分编辑or新建
      actions
        .getEquipmentInfo({
          equipmentId: equipmentId
        })
        .then((res) => {
          form.setFieldsValue(res)
        })
    } else {
      form.setFieldsValue({})
    }
  }, [equipmentId])

  const onFormFinish = async (data: any) => {
    const res =
      typeof equipmentId === 'number'
        ? await actions.updateEquipment({ ...data, equipmentId })
        : await actions.addEquipment(data)
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
        <Form.Item label='设备名称' name='equipmentName' rules={[{ required: true, message: '请输入设备名称！' }]}>
          <Input />
        </Form.Item>
        <Form.Item label='设备类型' name='energyType' rules={[{ required: true, message: '请输入设备类型！' }]}>
          <Select placeholder='请选择设备类型' options={energyTypeOptions} />
        </Form.Item>

        <Form.Item label='设备编号' name='equipmentNum' rules={[{ required: true, message: '请输入设备编号！' }]}>
          <Input />
        </Form.Item>
        <Form.Item label='产品型号' name='productModel' rules={[{ required: true, message: '请输入产品型号！' }]}>
          <Input />
        </Form.Item>
        <Form.Item label='设备状态' name='status' rules={[{ required: true, message: '请输入设备状态！' }]}>
          <Select placeholder='请选择设备状态' options={equipmentStatusOptions} />
        </Form.Item>
        <Form.Item label='电压上限' name='voltageThresholdMax'>
          <Input />
        </Form.Item>

        <Form.Item label='电流上限' name='currentThresholdMax'>
          <Input />
        </Form.Item>
        <Form.Item label='电流倍率' name='currentMagnification'>
          <Input />
        </Form.Item>
        <Form.Item label='最大功率' name='powerMax'>
          <Input />
        </Form.Item>
        <Form.Item label='最小功率' name='powerMin'>
          <Input />
        </Form.Item>
        <Form.Item label='最大温度' name='temperatureMax'>
          <Input />
        </Form.Item>
        <Form.Item label='最大湿度' name='humidityMax'>
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 32 }}>
          <Button size='large' className={Styles.primaryButton} style={{ width: 100 }} type='primary' htmlType='submit'>
            {equipmentId ? '更新设备' : '新建设备'}
          </Button>
          <Button size='large' htmlType='reset' style={{ marginLeft: 20, width: 100 }}>
            重置
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default observer(EditForm)
