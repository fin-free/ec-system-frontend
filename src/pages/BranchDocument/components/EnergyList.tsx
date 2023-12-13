import React, { useContext, useEffect, useState } from 'react'

import SearchInput from '@/components/SearchInput'
import EnergyForm from './EnergyForm'
import { observer, useStore } from '@/hooks/storeHook'
import { Select, List, Button, Checkbox } from 'antd'
import storeContext from '../context'
import Style from './EnergyList.module.scss'
import { EnergyItem } from '../types'
interface IProps {
  archivesId?: string
}
const energyLabelMap: Record<any, any> = {
  '01001': '冷水表',
  '01002': '热水表',
  '01003': '电表',
  '01004': '温湿度表'
}

const meterIdList = new Set<number>()

const EnergyList: React.FC<IProps> = (props: IProps) => {
  const [curEnergyItem, setCurEnergyItem] = useState<EnergyItem>()
  const {
    commonStore: { dataTypeOptions }
  } = useStore()
  const {
    store: { filter, filterEquipmentData, selectedArchiveId },
    actions
  } = useContext(storeContext)

  useEffect(() => {
    if (selectedArchiveId) {
      actions.getEnergyList({ archivesId: selectedArchiveId })
    }
  }, [selectedArchiveId])

  useEffect(() => {
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
    actions.updateSelectedArchivesId('')
  }

  const onClickSave = () => {
    actions.saveArchivesEquipmentRelation({
      archivesId: selectedArchiveId!,
      meterIdList: Array.from(meterIdList)
    })
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
    debugger
  }

  return (
    <div className={Style.listContainer}>
      <div className={Style.listBlock}>
        <div className={Style.listWrapper}>
          <Select
            value={filter.energyType}
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
                  key={item.equipmentId}
                  onClick={() => onClickListItem(item)}
                >
                  <Checkbox
                    disabled={!Boolean(item.enabledStatus)}
                    defaultChecked={
                      Boolean(item.enabledStatus) && Boolean(item.bindStatus)
                    }
                    onChange={(e) => onClickCheckbox(e, item)}
                    className={Style.checkbox}
                  />
                  {`${energyLabelMap[item.energyType]}-${item.equipmentName}`}
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
        <Button
          className={Style.button}
          size='large'
          type='primary'
          onClick={onClickSave}
        >
          保存
        </Button>
      </div>
    </div>
  )
}

export default observer(EnergyList)
