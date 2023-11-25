import { useContext } from 'react'

import { DatePicker, Select } from 'antd'

import { electricityOptions } from '@/common/constants'

import storeContext from '../context'

import Styles from './Toolbar.module.scss'

const Toolbar: React.FC = () => {
  const {
    store: { filterDate, filterDataType }
  } = useContext(storeContext)

  const onDateChange = () => {}

  const onDataTypeChange = () => {}

  return (
    <div className={Styles.root}>
      <DatePicker defaultValue={filterDate} format={'YYYY-MM-DD'} onChange={onDateChange} />
      <Select options={electricityOptions} defaultValue={filterDataType} onChange={onDataTypeChange} />
    </div>
  )
}

export default Toolbar
