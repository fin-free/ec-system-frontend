import React, { useContext, useEffect, useState } from 'react'

import { Button, Form, Input, message, Select } from 'antd'

import { observer } from '@/hooks/storeHook'

import storeContext from '../context'
import Styles from '../index.module.scss'
import { EquipmentItem } from '../typings'

const equipmentStatusList = ['未使用', '已注册', '正常使用']

const equipmentStatusOptions = equipmentStatusList.map((item, index) => ({
  label: item,
  value: index
}))

const EnergyTypes = {
  COLD_WATER: '01001',
  HOT_WATER: '01002',
  ELECTRIC: '01003',
  TEMPERATURE_HUMIDITY: '01004',
  SMOKE: '01005',
  FLOOD: '01006'
}

const energyTypeMap = {
  [EnergyTypes.COLD_WATER]: '冷水表',
  [EnergyTypes.HOT_WATER]: '热水表',
  [EnergyTypes.ELECTRIC]: '电表',
  [EnergyTypes.TEMPERATURE_HUMIDITY]: '温湿度传感器',
  [EnergyTypes.SMOKE]: '烟雾感应器',
  [EnergyTypes.FLOOD]: '水浸传感器'
}

const energyTypeOptions = Object.values(EnergyTypes).map((type) => ({
  label: energyTypeMap[type],
  value: type
}))

interface IProps {
  equipmentItem?: EquipmentItem
  onClickBack: () => void
}

const EditForm: React.FC<IProps> = (props: IProps) => {
  const { equipmentItem, onClickBack } = props
  const { actions } = useContext(storeContext)
  const [localEnergyType, setLocalEnergyType] = useState<string | undefined>(
    equipmentItem?.energyType
  )
  const [messageApi, contextHolder] = message.useMessage()
  const [form] = Form.useForm()

  useEffect(() => {
    if (equipmentItem) {
      // 区分编辑or新建
      actions
        .getEquipmentInfo({
          equipmentId: equipmentItem.equipmentId
        })
        .then((res) => {
          form.setFieldsValue(res)
        })
    } else {
      form.setFieldsValue({})
    }
  }, [equipmentItem])

  const onFormFinish = async (data: any) => {
    const res = equipmentItem
      ? await actions.updateEquipment({
          ...data,
          equipmentId: equipmentItem.equipmentId
        })
      : await actions.addEquipment(data)
    if (res?.code === 200) {
      message.success(res.message)
      onClickBack()
      actions.fetchEquipmentData()
    } else {
      message.error(res?.message)
    }
  }

  const onEnergyTypeChange = (value: string) => {
    setLocalEnergyType(value)
  }

  return (
    <>
      {contextHolder}
      <Form
        name='basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{
          width: 800,
          alignSelf: 'flex-start',
          marginTop: 20,
          height: 700,
          overflowY: 'auto'
        }}
        onFinish={onFormFinish}
        autoComplete='off'
        form={form}
      >
        <Form.Item
          label='设备名称'
          name='equipmentName'
          rules={[{ required: true, message: '请输入设备名称！' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='设备类型'
          name='energyType'
          rules={[{ required: true, message: '请输入设备类型！' }]}
        >
          <Select
            placeholder='请选择设备类型'
            options={energyTypeOptions}
            onChange={onEnergyTypeChange}
          />
        </Form.Item>

        <Form.Item
          label='设备编号'
          name='equipmentNum'
          rules={[{ required: true, message: '请输入设备编号！' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='产品型号'
          name='productModel'
          rules={[{ required: true, message: '请输入产品型号！' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='倍率'
          name='currentMagnification'
          rules={[
            {
              type: 'number',
              message: '请输入数字',
              transform: (value) => Number(value)
            }
          ]}
        >
          <Input />
        </Form.Item>
        {localEnergyType === EnergyTypes.ELECTRIC ? (
          <>
            <Form.Item
              label='电压上限'
              name='voltageThresholdMax'
              rules={[
                {
                  type: 'number',
                  message: '请输入数字',
                  transform: (value) => Number(value)
                }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label='电流上限'
              name='currentThresholdMax'
              rules={[
                {
                  type: 'number',
                  message: '请输入数字',
                  transform: (value) => Number(value)
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='最大功率'
              name='powerMax'
              rules={[
                {
                  type: 'number',
                  message: '请输入数字',
                  transform: (value) => Number(value)
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='最小功率'
              name='powerMin'
              rules={[
                {
                  type: 'number',
                  message: '请输入数字',
                  transform: (value) => Number(value)
                }
              ]}
            >
              <Input />
            </Form.Item>
          </>
        ) : null}
        {localEnergyType === EnergyTypes.TEMPERATURE_HUMIDITY ? (
          <>
            <Form.Item
              label='最大温度'
              name='temperatureMax'
              rules={[
                {
                  type: 'number',
                  message: '请输入数字',
                  transform: (value) => Number(value)
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='最大湿度'
              name='humidityMax'
              rules={[
                {
                  type: 'number',
                  message: '请输入数字',
                  transform: (value) => Number(value)
                }
              ]}
            >
              <Input />
            </Form.Item>{' '}
          </>
        ) : null}

        <Form.Item wrapperCol={{ offset: 8, span: 32 }}>
          <Button
            size='large'
            className={Styles.primaryButton}
            style={{ width: 100 }}
            type='primary'
            htmlType='submit'
          >
            保存
          </Button>
          <Button
            size='large'
            htmlType='reset'
            style={{ marginLeft: 20, width: 100 }}
            onClick={onClickBack}
          >
            取消
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default observer(EditForm)
