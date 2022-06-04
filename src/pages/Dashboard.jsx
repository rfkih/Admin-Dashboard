import React,{useState, useEffect} from 'react'
import { Button, SparkLine } from '../components'
import { FiShoppingBag, FiEdit, FiPieChart, FiBarChart, FiCreditCard, FiStar, FiShoppingCart } from 'react-icons/fi';
import { BsKanban, BsBarChart, BsBoxSeam, BsCurrencyDollar, BsShield, BsChatLeft } from 'react-icons/bs';
import axios from '../utils/axios'

import {earningData} from '../components/data' 
import { GoPrimitiveDot } from 'react-icons/go';
import { BiColorFill } from 'react-icons/bi';
import { IoMdContacts } from 'react-icons/io';
import { RiContactsLine, RiStockLine } from 'react-icons/ri';
import { MdOutlineSupervisorAccount } from 'react-icons/md';
import { HiOutlineRefresh } from 'react-icons/hi';




function Dashboard() {
  const [ countUser, setCountUser ] = useState(0)
  const [ totalSold, setTotalSold] = useState(0)
  const [ graphData, setGraphData ] = useState([])
  const [ sortUser, setSortUser] = useState('')
  const [ keywordUser, setKeywordUser] = useState('')
  const [ range, setRange] = useState(12)
  const [ year, setYear] = useState(null)
  const [ revenueDetail, setRevenueDetail] = useState(false)
  const [ totalRevenue, setTotalRevenue] = useState(0)
  const [ revenueToday, setRevenueToday] = useState(0)
  const [ revenueSeven, setRevenueSeven] = useState(0)
  const [ revenueThirty, setRevenueThirty] = useState(0)




  const getCompletedTransaction = async () => {
        
    const month = {month: range, yeardata: year}
    try {
        const res = await axios.get("/transaction/completed", {params: (month)});
        const data  = res.data;
        setTotalRevenue(data.sumResultAll[0].total_revenue);
        setRevenueThirty(data.sumResultThirty[0].total_revenue);
        setRevenueSeven(data.sumResultSeven[0].total_revenue);
        setGraphData(data.detailTransactionMonth);
       if(data.sumResultToday[0].total_revenue){
        setRevenueToday(data.sumResultToday[0].total_revenue)
       } 
    } catch (error) {
        console.log(alert(error.message));
    }
}



  const fetchUser = async () => {
    try {
        const res = await axios.get("/users/admin", {params: { pages:(``), sortUser, keywordUser }});
        const data  = res.data;
        setCountUser(data.userCount[0].user_count);
    } catch (error) {
        console.log(alert(error.message));
    }
};


console.log(totalSold);
useEffect(() => {
  fetchUser();
  getTransactionDetail();
},[])

const getTransactionDetail = async () => {
  try {

      const res = await axios.get("/transactiondetails")
      const data  = res.data;
      setTotalSold(data.totalSold[0].total_sold);
  } catch (error) {
      console.log(alert(error.message));
  }
};



  const Card = ({icon, amount, title, iconColor, iconBg, pcColor}) => {

   return ( 
   <div
      key="Customers"
      className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-4 pt-9 rounded-2xl md:w-56"
    >
      <button
       type='button'
       style={{ color:iconColor, backgroundColor:iconBg}}
       className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl "
      >
        {icon}
      </button>
      <p className='mt-3'>
        <span className='text-lg font-semibold'>
          {amount}
        </span>
      </p>
      <p className='text-sm text-gray-400 mt-1'>
        {title}
      </p>
    </div>
  
  
  )}
  return (
    <div className='mt-12'>
      <div className='flex flex-wrap lg:flex-nowrap justify-center'>
        <div className='bg-white dark:bg-secondary-dark-bg dark:text-gray-200 h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-center bg-cover'>
          <div className='flex justify-between items-center'>
            <div>
              <p className='font-bold text-gray-400'>Earnings</p>
              <p className='text-2xl'>Rp.38.304.000</p>
            </div>
          </div>
          <div className='mt-6'>
            <Button
              color="white"
              bgColor="blue"
              text="See Details"
              borderRadius="10px"
              size="md"
            />
          </div>     
        </div>
        <div className='flex m-3 flex-wrap justify-center gap-1 items-center'>
            <Card icon={<BsBoxSeam />} amount={2323} title={'Products'} iconColor={'rgb(255, 244, 229)'} iconBg={'rgb(254, 201, 15)'}/>    
            <Card icon={<MdOutlineSupervisorAccount />} amount={countUser} percentage='-4%' title='Customers' iconColor='#03C9D7' iconBg='#E5FAFB' pcColor='red-600'/>
            <Card icon={<HiOutlineRefresh/>} amount={55} title={'Refunds'} iconBg={`rgb(235, 250, 242)`} iconColor={'rgb(0, 194, 146)'}/>
            <Card icon={<FiBarChart />} amount={totalSold} title={'Product Sold'} iconBg={'rgb(255, 244, 229)'} iconColor={'rgb(228, 106, 118)'}/>
        </div>   
      </div>
      <div className='flex gap-10 flex-wrap justify-center'>
        <div className='bg-white dark:bg-secondary-dark-bg dark:text-gray-200 m-2 p-4 rounded-2xl md:w-780 lg:w-800'>
          <div className='flex justify-between '>
            <p className='font-semibold text-xl mx-2'>
              Revenue Update
            </p>
            <div className='flex items-start gap-4'>
              <p className='flex items-center gap-2 text-gray-600 hover:drop-shadow-lg'>
                <span><GoPrimitiveDot/></span>
                <span>Expense</span>
              </p>
              <p className='flex item-center gap-2 text-green-400 hover:drop-shadow-xl'>
                <span> <GoPrimitiveDot/> </span>
                <span>Budget</span>
              </p>
            </div>
          </div>
          <div className='mt-10 flex gap-10 flex-wrap justify-center'>
            <div className='border-r-1 border-color m-4 pr-10'>
              <div>
                <p>
                  <span className='text-3xl font-semibold'>Rp.34.034.322</span>
                </p>
                <p className='text-gray-500'>
                  Budget
                </p>
              </div>
              <div className='mt-8'>
                <p>
                  <span className='text-3xl font-semibold'>Rp.2434134</span>                
                </p>
                <p className='text-gray-500'>
                    Expense
                </p>
              </div>
              <div className='mt-5'>
                <SparkLine/>
              </div>
              <div className='mt-10'>
                    <Button
                      color="white"
                      bgColor="blue"
                      text="Detail Report"
                      borderRadius="10px"
                    />
                  </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard