import {
  Table,
  Typography,
  Flex,
  Button,
  Input,
  Select,
  Modal,
  message
} from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import React, { useContext, useState } from 'react'
import { observer } from '@/hooks/storeHook'
import Styles from './index.module.scss'
import storeContext from './context'
import { EquipmentItem } from './typings'
import EditForm from './components/editForm'

const columnNameMap: Record<string, string> = {
  equipmentId: '序号',
  equipmentName: '设备名称',
  equipmentNum: '设备地址',
  productModel: '设备型号',
  energyType: '设备类型',
  status: '设备状态',
  createTime: '添加时间',
  operations: '操作'
}

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

const Content: React.FC = () => {
  const { store, actions } = useContext(storeContext)
  const [showEditForm, setShowEditForm] = useState<boolean>(false)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [curEquipmentId, setCurEquipmentId] = useState<number>()
  const [curEquipmentItem, setCurEquipmentItem] = useState<EquipmentItem>()
  const [messageApi, contextHolder] = message.useMessage()

  const handleAddClick = () => {
    setShowEditForm(true)
    setCurEquipmentId(undefined)
  }

  const onClickEdit = (record: EquipmentItem) => {
    setShowEditForm(true)
    setCurEquipmentId(record.equipmentId)
  }

  const onClickDelete = (record: EquipmentItem) => {
    setCurEquipmentItem(record)
    setShowDeleteModal(true)
  }

  const getColumnsRender = (itemKey: string) => {
    switch (itemKey) {
      case 'operations':
        return (_: any, record: EquipmentItem) => {
          return (
            <div className={Styles.operationWrapper}>
              <Typography.Link
                disabled={false}
                onClick={() => onClickEdit(record)}
              >
                编辑
              </Typography.Link>
              <Typography.Link
                disabled={false}
                onClick={() => onClickDelete(record)}
              >
                删除
              </Typography.Link>
            </div>
          )
        }
      case 'energyType':
        return (_: any, record: EquipmentItem) => {
          return energyTypeMap[record.energyType]
        }
      case 'status':
        return (_: any, record: EquipmentItem) => {
          return equipmentStatusList[record.status]
        }
      default:
        return null
    }
  }

  const columns = Object.keys(columnNameMap).map((itemKey) => {
    const render = getColumnsRender(itemKey)
    return {
      title: columnNameMap[itemKey],
      dataIndex: itemKey,
      ...(render ? { render } : null)
    }
  })

  const handleSearchClick = () => {
    actions.fetchEquipmentData()
  }

  const handleResetClick = () => {
    actions.resetData()
  }

  const handleEquipmentNumChange = (e: any) => {
    store.changeEquipmentNum(e?.target?.value)
  }

  const handleEquipmentStatusChange = (status: any) => {
    store.changeEquipmentStatus(status)
  }

  const handleModalOk = async () => {
    const res = await actions.deleteEquipment({
      equipmentId: curEquipmentItem?.equipmentId
    })
    if (res) {
      messageApi.info('删除成功')
      actions.fetchEquipmentData()
    }
    setShowDeleteModal(false)
  }

  const handleModalCancel = () => {
    setShowDeleteModal(false)
  }

  const onClickBack = () => {
    setCurEquipmentId(undefined)
    setShowEditForm(false)
  }

  return (
    <div className={Styles.root}>
      {contextHolder}
      {showEditForm ? (
        <>
          <Button
            className={Styles.primaryButton}
            onClick={onClickBack}
            shape='circle'
            icon={<ArrowLeftOutlined />}
          ></Button>
          <EditForm equipmentId={curEquipmentId} />
        </>
      ) : (
        <>
          <Flex justify='space-between' flex='1 1 0%'>
            <Flex align='center' justify='flex-start' flex='0.4 0.5 0%'>
              <Flex align='center' flex='0.5 0.5 0%'>
                设备地址：
                <Flex align='center' flex='0.7 0.5 0%'>
                  <Input
                    value={store.equipmentNum}
                    onChange={handleEquipmentNumChange}
                    placeholder='请输入设备地址'
                  />
                </Flex>
              </Flex>
              <Flex align='center' flex='0.5 0.5 0%'>
                设备状态：
                <Select
                  value={store.equipmentStatus}
                  placeholder='请选择设备状态'
                  style={{ width: 120 }}
                  onChange={handleEquipmentStatusChange}
                  options={equipmentStatusOptions}
                />
              </Flex>
            </Flex>
            <Flex justify='space-between' flex='0.2 0.5 0%'>
              <Button
                type='primary'
                className={Styles.primaryButton}
                onClick={handleSearchClick}
              >
                查询
              </Button>
              <Button onClick={handleResetClick}>重置</Button>
              <Button
                type='primary'
                className={Styles.primaryButton}
                onClick={handleAddClick}
              >
                新增
              </Button>
            </Flex>
          </Flex>
          <Table
            bordered
            dataSource={store.equipmentData}
            columns={columns}
            className={Styles.mainTable}
          />
          <Modal
            title='确认删除设备'
            open={showDeleteModal}
            onOk={handleModalOk}
            onCancel={handleModalCancel}
          >
            是否删除 {curEquipmentItem?.equipmentName} 设备?
          </Modal>
        </>
      )}
    </div>
  )
}

export default observer(Content)
