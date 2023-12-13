import { useRoutes } from 'react-router-dom'

import Layout from '@/components/Layout'
import AlarmMgt from '@/pages/AlarmMgt'
import ComparativeAnalysis from '@/pages/ComparativeAnalysis'
import ConsumptionAnalysis from '@/pages/ConsumptionAnalysis'
import Dashboard from '@/pages/Dashboard'
import ElectricityDataMgt from '@/pages/ElectricityDataMgt'
import TemperatureDataMgt from '@/pages/TemperatureDataMgt'
import WaterDataMgt from '@/pages/WaterDataMgt'
import EquipmentMgt from '@/pages/EquipmentMgt'
import GatewayMgt from '@/pages/GatewayMgt'
import LineComparison from '@/pages/LineComparison'
import PowerLineLoss from '@/pages/PowerLineLoss'
import BranchDocument from '@/pages/BranchDocument'
import Login from '@/pages/Login'

import {
  ROUTE_PATH_COMPARATIVE_ANALYSIS,
  ROUTE_PATH_CONSUMPTION_ANALYSIS,
  ROUTE_PATH_DASHBOARD,
  ROUTE_PATH_ELECTRICITY_DATA_MANAGEMENT,
  ROUTE_PATH_WATER_MANAGEMENT,
  ROUTE_PATH_TEMPERATURE_MANAGEMENT,
  ROUTE_PATH_LOGIN,
  ROUTE_PATH_ROOT,
  ROUTE_PATH_ALARM_LIST,
  ROUTE_PATH_EQUIPMENT_LIST,
  ROUTE_PATH_GATEWAY_LIST,
  ROUTE_PATH_LINE_COMPARISON,
  ROUTE_PATH_BRANCH_DOCUMENT,
  ROUTE_PATH_POWER_LINE_LOSS
} from './routePath'

const Router = () => {
  const fullPageRoutes = [
    { path: ROUTE_PATH_ROOT, element: <Login /> },
    {
      path: ROUTE_PATH_LOGIN,
      element: <Login />
    }
  ]

  const layoutRoutes = [
    {
      path: ROUTE_PATH_ROOT,
      element: <Layout />,
      children: [
        {
          path: ROUTE_PATH_DASHBOARD,
          element: <Dashboard />
        },
        {
          path: ROUTE_PATH_ELECTRICITY_DATA_MANAGEMENT,
          element: <ElectricityDataMgt />
        },
        {
          path: ROUTE_PATH_TEMPERATURE_MANAGEMENT,
          element: <TemperatureDataMgt />
        },
        {
          path: ROUTE_PATH_WATER_MANAGEMENT,
          element: <WaterDataMgt />
        },
        {
          path: ROUTE_PATH_CONSUMPTION_ANALYSIS,
          element: <ConsumptionAnalysis />
        },
        {
          path: ROUTE_PATH_COMPARATIVE_ANALYSIS,
          element: <ComparativeAnalysis />
        },
        {
          path: ROUTE_PATH_BRANCH_DOCUMENT,
          element: <BranchDocument />
        },
        {
          path: ROUTE_PATH_LINE_COMPARISON,
          element: <LineComparison />
        },
        {
          path: ROUTE_PATH_POWER_LINE_LOSS,
          element: <PowerLineLoss />
        },
        {
          path: ROUTE_PATH_ALARM_LIST,
          element: <AlarmMgt />
        },
        {
          path: ROUTE_PATH_EQUIPMENT_LIST,
          element: <EquipmentMgt />
        },
        {
          path: ROUTE_PATH_GATEWAY_LIST,
          element: <GatewayMgt />
        }
      ]
    }
  ]

  const routes = useRoutes([...fullPageRoutes, ...layoutRoutes])

  return routes
}

export default Router
