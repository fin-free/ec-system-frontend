import { useContext, useState } from 'react'

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
    commonStore: { dateTypeOptions, functionTypeOptions }
  } = useStore()
  const {
    actions,
    store: { filters }
  } = useContext(storeContext)
  const [selectedDateType, setSelectedDateType] = useState<string>(filters.datetype)
  const [selectedFunctionType, setSelectedFunctionType] = useState<string>(filters.functiontype)

  const onDateChange = (date: RangeValue) => {
    actions.onSearch({
      startTime: date![0]!.format('YYYY-MM-DD HH:mm:ss'),
      endTime: date![1]!.format('YYYY-MM-DD HH:mm:ss')
    })
  }

  const onDateTypeChange = (value: string) => {
    setSelectedDateType(value)
    actions.onSearch({
      datetype: value,
      functiontype: selectedFunctionType
    })
  }

  const onFunctionTypeChange = (value: string) => {
    setSelectedFunctionType(value)
    if (value !== '0021' && selectedDateType === '0011') {
      setSelectedDateType('0012')
    }
    actions.onSearch({
      datetype: selectedDateType,
      functiontype: value
    })
  }

  const dateTypeOpts =
    filters.functiontype === '0021' ? dateTypeOptions : dateTypeOptions.filter((opt) => opt.value !== '0011')

  return (
    <div className={Styles.root}>
      <RangePicker
        format={'YYYY-MM-DD'}
        onChange={onDateChange}
        defaultValue={[dayjs(filters?.startTime), dayjs(filters?.endTime)]}
      />
      <Select options={functionTypeOptions} value={selectedFunctionType} onChange={onFunctionTypeChange} />
      <Select options={dateTypeOpts} value={selectedDateType} onChange={onDateTypeChange} />
    </div>
  )
}

export default observer(Toolbar)
