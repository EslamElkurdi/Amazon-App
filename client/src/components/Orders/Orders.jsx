import React, { useEffect,useState } from 'react'
import {pushProductsToOrders,getUserOrders,sendOrderDataToUserEmail,getUserProductsAgain,searchOrders,searchProductsAgain,extractOrdersYears,filterOrdersBySelectedYear} from './OrdersUtils'
import Order from '../Order/Order';
import BuyAgain from '../BuyAgain/BuyAgain';
import './Orders.css';

function Orders() {
  // this function mustnt be here it must be in ezzat part after user confirm payment on his order (tutorial : 7:20:00)
  //pushProductsToOrders("1",{id:"3",amount:400,created:12,state:"delivered"},[{id:"1",img:"img_path",title:"laptop",price:600,rating:"2"},{id:"2",img:"img_path2",title:"football",price:400,rating:"4"}])// this function mustnt called here must called after click buy now
  // sendOrderDataToUserEmail("bashawwn@gmail.com","order data is 55555")
  
  // state section
  let user={uid:"1"}// instead of this you must be able to obtain user from: const [{basket,user},dispatch]=useStateValue();
  const [orders,setOrders]=useState([]);
  const [allOrders,setAllOrders]=useState([]);
  const [productsAgain,setProductsAgain]=useState([]);
  const [allProductsAgain,setAllProductsAgain]=useState([]);
  const [tabPressed,setTabPressed]=useState("orders");
  const [searchTerm,setSearchTerm]=useState("");
  const [ordersYears,setOrdersYears]=useState([]);
  const [selectedYear,setSelectedYear]=useState("2024");

  // life cycle methods section
  useEffect(() => {
    const fetchUserOrders = async () => {
      if (user) {
        const userOrders = await getUserOrders(user.uid);
        setAllOrders(userOrders);
        const yearOrders=filterOrdersBySelectedYear(selectedYear,userOrders);
        setOrders(yearOrders);
        const productsAgain = getUserProductsAgain(userOrders);
        setProductsAgain(productsAgain);
        setAllProductsAgain(productsAgain);
        const years = extractOrdersYears(userOrders);
        setOrdersYears(years);
        
      } else {
        setOrders([]);
        setAllOrders([]);
        setProductsAgain([]);
        setOrdersYears([]);
      }
    };

    fetchUserOrders();
  },[])//[user] put user when user comes from context or redux

  useEffect(() => {
    const yearOrders=filterOrdersBySelectedYear(selectedYear,allOrders)
    setOrders(yearOrders);
  },[selectedYear])

  // functions handling ui events section
  function switchTabs(tabPressed){
      setSearchTerm("");// empty search input
      setTabPressed(tabPressed);
      if(tabPressed=="orders"){
        setProductsAgain(allProductsAgain);
        setSelectedYear(ordersYears[0]);
        const yearOrders=filterOrdersBySelectedYear(selectedYear,allOrders)
        setOrders(yearOrders);
      }
  };
  const handleSearchInputChange =async (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    if(tabPressed=="orders"){
      const SearchRes= await searchOrders(searchTerm,user.uid);
      setOrders(SearchRes)
    }else if(tabPressed=="buy again"){
      const SearchRes=searchProductsAgain(allOrders,searchTerm)
      setProductsAgain(SearchRes)
    }
    if(searchTerm==""){
      const yearOrders=filterOrdersBySelectedYear(selectedYear,allOrders)
      setOrders(yearOrders);
    }
  };
  
  return (
    <>
      <div className="ordersContainer">
        <div className="titleAndSearchContainer">
          <h1>Your Orders</h1>
          <div className="ordersSearchContainer">
            <div className="ordersSearchInput">
              <i className="ordersSearchIcon"></i>
              <input type="text" placeholder="Search all orders" value={searchTerm} onChange={handleSearchInputChange}/>
            </div>
            <button className="ordersSearchButton">Search Orders</button>
          </div>
          <div className='ordersProceedToCheckOut'>
            {/* put proceed to checkout here... */}
          </div>
        </div>
        <div className="ordersTabsNav">
          <button className={`ordersTabsNavButton ${tabPressed=="orders"&&"ordersTabsNavButtonActive"}`} onClick={()=>{switchTabs("orders")}}>Orders</button>
          <button className={`ordersTabsNavButton ${tabPressed=="buy again"&&"ordersTabsNavButtonActive"}`} onClick={()=>{switchTabs("buy again")}}>Buy again</button>
        </div>
        {tabPressed=="orders"&&<><div className={`ordersNumberPerYear ${searchTerm&&"orders-display-none"}`}>
          {orders.length} orders placed in   
          <select id="yearSelect" onChange={(event)=>{setSelectedYear(event.target.value)}}>
          {ordersYears.map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
          </select>
        </div>
        {orders?.map(order => (
              <div key={`order-${order.id}`}>
                <Order order={order} searchTerm={searchTerm} />
              </div>
            ))}
        </>}
        {tabPressed=="buy again"&&<BuyAgain productsAgain={productsAgain} searchTerm={searchTerm}/>}
      </div>
    </>
  )
}

export default Orders
