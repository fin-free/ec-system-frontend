import { useRoutes } from 'react-router-dom'

import Layout from '@/components/Layout'
import AlarmMgt from '@/pages/AlarmMgt'
import ComparativeAnalysis from '@/pages/ComparativeAnalysis'
import ConsumptionAnalysis from '@/pages/ConsumptionAnalysis'
import Dashboard from '@/pages/Dashboard'
import ElectricityDataMgt from '@/pages/ElectricityDataMgt'
import EnvironmentDataMgt from '@/pages/EnvironmentDataMgt'
import EquipmentMgt from '@/pages/EquipmentMgt'
import Login from '@/pages/Login'

import {
  ROUTE_PATH_ALARM_MANAGEMENT,
  ROUTE_PATH_COMPARATIVE_ANALYSIS,
  ROUTE_PATH_CONSUMPTION_ANALYSIS,
  ROUTE_PATH_DASHBOARD,
  ROUTE_PATH_ELECTRICITY_DATA_MANAGEMENT,
  ROUTE_PATH_ENVIRONMENT_MANAGEMENT,
  ROUTE_PATH_EQUIPMENT_MANAGEMENT,
  ROUTE_PATH_LOGIN,
  ROUTE_PATH_ROOT
} from './routePath'

const Router = () => {
  const fullPageRoutes = [
    {
      path: ROUTE_PATH_ROOT,
      element: <Dashboard />
    },
    {
      path: ROUTE_PATH_DASHBOARD,
      element: <Dashboard />
    },
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
          path: ROUTE_PATH_ELECTRICITY_DATA_MANAGEMENT,
          element: <ElectricityDataMgt />
        },
        {
          path: ROUTE_PATH_ENVIRONMENT_MANAGEMENT,
          element: <EnvironmentDataMgt />
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
          path: ROUTE_PATH_ALARM_MANAGEMENT,
          element: <AlarmMgt />
        },
        {
          path: ROUTE_PATH_EQUIPMENT_MANAGEMENT,
          element: <EquipmentMgt />
        }
      ]
    }
  ]

  const routes = useRoutes([...fullPageRoutes, ...layoutRoutes])

  return routes
}

export default Router
