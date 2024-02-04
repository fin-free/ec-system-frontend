import React, { useContext, useEffect, useState } from 'react'

import { Button, Checkbox, List, message, Select } from 'antd'

import SearchInput from '@/components/SearchInput'
import { observer, useStore } from '@/hooks/storeHook'

import storeContext from '../context'
import { EnergyItem } from '../types'

import EnergyForm from './EnergyForm'
import Style from './EnergyList.module.scss'

interface IProps {
  archivesId?: string
}

const meterIdList = new Set<number>()

const EnergyList: React.FC<IProps> = () => {
  const [curEnergyItem, setCurEnergyItem] = useState<EnergyItem>()
  const {
    commonStore: { dataTypeOptions }
  } = useStore()
  const {
    store: { filter, filterEquipmentData, selectedNode, treeMode },
    actions
  } = useContext(storeContext)

  useEffect(() => {
    if (selectedNode?.archivesId && treeMode === 'manage') {
      actions.getEnergyList({ archivesId: selectedNode.archivesId })
    }
  }, [selectedNode, treeMode])

  useEffect(() => {
    meterIdList.clear()
    filterEquipmentData.forEach((data) => {
      if (data.enabledStatus && data.bindStatus) {
        meterIdList.add(data.equipmentId)
      }
    })
  }, [filterEquipmentData])

  const handleEngrgyTypeChange = (type: string) => {
    meterIdList.clear()
    actions.updateEnergyType(type)
  }

  const onClickListItem = (item: EnergyItem) => {
    setCurEnergyItem(item)
  }

  const onClickBack = () => {
    actions.updateTreeMode('')
  }

  const onClickSave = async () => {
    const res = await actions.saveArchivesEquipmentRelation({
      archivesId: selectedNode?.archivesId!,
      meterIdList: Array.from(meterIdList),
      energyType: filter.datatype
    })
    if (res) {
      actions.getEnergyList({ archivesId: selectedNode?.archivesId })
      message.success(res)
    } else {
      message.error('保存失败')
    }
  }

  const onSearch = (e: any) => {
    const { value } = e.target
    actions.updateFilterInput(value)
  }

  const onClickCheckbox = (e: any, item: EnergyItem) => {
    const { checked } = e.target
    if (checked) {
      meterIdList.add(item.equipmentId)
    } else {
      meterIdList.delete(item.equipmentId)
    }
  }

  return (
    <div className={Style.listContainer}>
      <div className={Style.listBlock}>
        <div className={Style.listWrapper}>
          <Select
            value={filter.datatype}
            placeholder='设备类型'
            style={{ width: 200, marginBottom: 10 }}
            onChange={handleEngrgyTypeChange}
            options={dataTypeOptions}
          />
          <SearchInput onChange={onSearch} placeholder='设备地址/设备名称' />
          <List
            bordered
            dataSource={filterEquipmentData}
            style={{ marginTop: 10 }}
            renderItem={(item: EnergyItem) => {
              return (
                <List.Item
                  style={curEnergyItem?.equipmentId === item.equipmentId ? { background: '#26266d' } : {}}
                  key={item.equipmentId}
                  onClick={() => onClickListItem(item)}
                >
                  <Checkbox
                    disabled={!item.enabledStatus}
                    defaultChecked={Boolean(item.bindStatus)}
                    onChange={(e) => onClickCheckbox(e, item)}
                    className={Style.checkbox}
                  />
                  {`${item.equipmentName}`}
                </List.Item>
              )
            }}
          />
        </div>
        {curEnergyItem ? (
          <div className={Style.formWrapper}>
            <EnergyForm energyItem={curEnergyItem} />
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className={Style.buttonWrapper}>
        <Button size='large' onClick={onClickBack}>
          返回
        </Button>
        <Button className={Style.button} size='large' type='primary' onClick={onClickSave}>
          保存
        </Button>
      </div>
    </div>
  )
}

export default observer(EnergyList)
