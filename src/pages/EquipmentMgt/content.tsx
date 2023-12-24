import React, { useContext, useState } from 'react'

import { Button, Input, message, Modal, Select, Table, Typography } from 'antd'

import { observer } from '@/hooks/storeHook'

import EditForm from './components/editForm'
import storeContext from './context'
import Styles from './index.module.scss'
import { EquipmentItem } from './typings'

const columnNameMap: Record<string, string> = {
  order: '序号',
  equipmentName: '设备名称',
  equipmentNum: '设备编号',
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
  const [curEquipmentItem, setCurEquipmentItem] = useState<EquipmentItem>()
  const [messageApi, contextHolder] = message.useMessage()

  const handleAddClick = () => {
    setShowEditForm(true)
    setCurEquipmentItem(undefined)
  }

  const onClickEdit = (record: EquipmentItem) => {
    setShowEditForm(true)
    setCurEquipmentItem(record)
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
              <Typography.Link disabled={false} onClick={() => onClickEdit(record)}>
                编辑
              </Typography.Link>
              <Typography.Link disabled={false} onClick={() => onClickDelete(record)}>
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
    setCurEquipmentItem(undefined)
    setShowEditForm(false)
  }

  return (
    <div className={Styles.root}>
      {contextHolder}
      {showEditForm ? (
        <EditForm equipmentItem={curEquipmentItem} onClickBack={onClickBack} />
      ) : (
        <>
          <div className={Styles.toolbarWrapper}>
            设备编号：
            <Input
              style={{ width: 140 }}
              value={store.equipmentNum}
              onChange={handleEquipmentNumChange}
              placeholder='请输入设备编号'
            />
            设备状态：
            <Select
              value={store.equipmentStatus}
              placeholder='请选择设备状态'
              style={{ width: 140 }}
              onChange={handleEquipmentStatusChange}
              options={equipmentStatusOptions}
            />
            <div className={Styles.buttonWrapper}>
              <Button type='primary' className={Styles.primaryButton} onClick={handleSearchClick}>
                查询
              </Button>
              <Button onClick={handleResetClick}>重置</Button>
            </div>
          </div>
          <div className={Styles.secondToolBarWrapper}>
            <Button type='primary' className={Styles.primaryButton} onClick={handleAddClick}>
              新增
            </Button>
          </div>
          <div className={Styles.tableWrapper}>
            <Table
              size='small'
              dataSource={store.equipmentData}
              columns={columns}
              className={Styles.mainTable}
              pagination={store.pagination}
              onChange={({ current, pageSize }) => {
                actions.updatePagination({
                  current: current as number,
                  pageSize: pageSize as number
                })
              }}
            />
          </div>
          <Modal title='确认删除设备' open={showDeleteModal} onOk={handleModalOk} onCancel={handleModalCancel}>
            是否删除 {curEquipmentItem?.equipmentName} 设备?
          </Modal>
        </>
      )}
    </div>
  )
}

export default observer(Content)
