import CardStat from '../../../components/cardstat/CardStat'
import CardStat2 from '../../../components/cardstat/CardStat2'
import CardStat3 from '../../../components/cardstat/CardStat3'
import { ChartCategories } from '../../../components/charts/ChartProductSold';
// import { ChartCategories } from '../../../components/charts/ChartCategories';
import { Chart } from '../../../components/charts/ChartProductStock'
import { DangerCard } from '../../../components/dangercard/DangerCard';
import SideBarAdmin from '../../../components/sidebaradmin/SideBarAdmin';
import { TableUsageExample } from '../../../components/tables/tableUser/TableUsageExample'
import { Card } from '@tremor/react';
import CardSoldProducts from '../../../components/cardstat/CardOrderStat';
import { TableDashboardOrders } from '../../../components/tables/TableDashboardOrders';
import SideBarAdminResponsive from '../../../components/sidebaradmin/SideBarAdminResponsive';
import { Flowbite } from 'flowbite-react';
const DashboardAdmin = () => {
  return (
    <Flowbite>
    <div className="pt-16">
      <div className="flex min-h-screen bg-white antialiased dark:bg-gray-800 md:py-5">
        {/* Sidebar */}
        <SideBarAdmin></SideBarAdmin>
        {/* <SideBarAdminResponsive></SideBarAdminResponsive> */}
        <div className="pt-6">
        <div>
          <div className='grid grid-cols-1 gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
            <CardSoldProducts />
            <CardStat />
            <CardStat2 />
            <CardStat3 />
          </div>
          <div className='grid grid-cols-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
            <div className='col-span-2 mt-10'>
              <TableUsageExample />
              <TableDashboardOrders className='flex-1' />
            </div>
            <div className='col-span-2 mt-10 px-7'>
              <Card className="mb-5 ">
                <Chart></Chart>
              </Card>
              <Card className="mb-5 ">
                <ChartCategories></ChartCategories>
              </Card>
              <Card className="mb-5 ">
                <DangerCard></DangerCard>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </Flowbite>

  )
}

export default DashboardAdmin