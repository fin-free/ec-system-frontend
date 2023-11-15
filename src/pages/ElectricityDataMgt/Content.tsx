import EquipmentList from './components/EquipmentList'
import Styles from './index.module.scss'



const ElectricityDataMgt: React.FC = () => {
  return (
    <div className={Styles.root}>
      <EquipmentList />
      <div className='content'></div>
    </div>
  )
}

export default ElectricityDataMgt
