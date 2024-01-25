import { useContext, useState } from 'react'

import { Button, DatePicker, Input, Select } from 'antd'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'

import { observer, useStore } from '@/hooks/storeHook'

import storeContext from '../context'

import Styles from './Toolbar.module.scss'

const { Search } = Input
const { RangePicker } = DatePicker

type RangeValue = [Dayjs | null, Dayjs | null] | null

const Toolbar: React.FC = () => {
  const {
    commonStore: { dateTypeOptions, functionTypeOptions }
  } = useStore()
  const {
    actions,
    store: { filters }
  } = useContext(storeContext)
  const [keyWord, setKeyWord] = useState<string>('')

  const onDateChange = (date: RangeValue) => {
    actions.onSearch({
      startTime: date![0]!.format('YYYY-MM-DD HH:mm:ss'),
      endTime: date![1]!.format('YYYY-MM-DD HH:mm:ss')
    })
  }

  const onSearch = () => {
    actions.onSearch({
      equipmentNum: keyWord
    })
  }

  const handleExport = () => {
    actions.exportElectricityData()
  }

  return (
    <div className={Styles.root}>
      <div className='filters'>
        <RangePicker
          format={'YYYY-MM-DD'}
          onChange={onDateChange}
          defaultValue={[dayjs(filters?.startTime), dayjs(filters?.endTime)]}
        />
        <Search
          placeholder='请输入设备地址'
          onSearch={onSearch}
          value={keyWord}
          onChange={(e) => setKeyWord(e.target.value)}
        />
        <Select
          options={functionTypeOptions}
          onChange={(value: string) =>
            actions.onSearch({
              functiontype: value
            })
          }
          defaultValue={filters.functiontype}
        />
        {filters.functiontype === '0021' && (
          <Select
            options={dateTypeOptions}
            onChange={(value: string) =>
              actions.onSearch({
                datetype: value
              })
            }
            defaultValue={filters.datetype}
          />
        )}
      </div>
      <Button type='primary' className={Styles.primaryButton} onClick={handleExport}>
        导出
      </Button>
    </div>
  )
}

export default observer(Toolbar)
