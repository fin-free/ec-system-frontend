import { useContext } from 'react'

import { DatePicker, Select } from 'antd'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'

import { observer, useStore } from '@/hooks/storeHook'

import storeContext from '../context'

import Styles from './Toolbar.module.scss'

const { RangePicker } = DatePicker

type RangeValue = [Dayjs | null, Dayjs | null] | null

const Toolbar: React.FC = () => {
  const {
    commonStore: { dateTypeOptions }
  } = useStore()
  const {
    actions,
    store: { filters }
  } = useContext(storeContext)

  const onDateChange = (date: RangeValue) => {
    actions.onSearch({
      startTime: date![0]!.format('YYYY-MM-DD HH:mm:ss'),
      endTime: date![1]!.format('YYYY-MM-DD HH:mm:ss')
    })
  }

  const onDataTypeChange = (value: string) => {
    actions.onSearch({
      datetype: value
    })
  }

  return (
    <div className={Styles.root}>
      <RangePicker
        format={'YYYY-MM-DD'}
        onChange={onDateChange}
        defaultValue={[dayjs(filters?.startTime), dayjs(filters?.endTime)]}
      />
      <Select
        options={dateTypeOptions.filter((opt) => opt.value !== '0011')}
        defaultValue={filters?.datetype}
        onChange={onDataTypeChange}
      />
    </div>
  )
}

export default observer(Toolbar)
