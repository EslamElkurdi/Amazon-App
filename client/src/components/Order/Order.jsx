import React, { useEffect } from 'react'
import {readableTimestamp} from './OrderUtils'
import {highlightText} from '../Orders/OrdersUtils'
import Stepper from '../Stepper/Stepper';
import './Order.css'
import ReactHtmlParser from 'react-html-parser';
function Order({order,searchTerm}) {
  
  return (
     <>
      <div className="ordersContents">
        <div className="ordersDisplay">
          <div className="theOrder">
            <div className="orderFirstSection">
              <div className="orderPlaced">
                <h5>ORDER PLACED</h5>
                <h3>{readableTimestamp(order)}</h3>
              </div>
              <div className="orderTotal">
                <h5>TOTAL</h5>
                <h3>{searchTerm?ReactHtmlParser(highlightText(order.data.amount,searchTerm)):order.data.amount}$</h3>
              </div>
              <div className="orderShipTo">
                <h5>SHIP TO</h5>
                <h3>Andrew</h3>
              </div>
            </div>
            <div className="orderSecondSection">
              <h2 className='orderStateH2'>Order state</h2>
              <Stepper orderState={order.data.state}/>
              <div className="orderProducts">
            {order.data.basket?.map(product => (
            <div key={product.id} className="orderProduct">
              <div className="orderProductImgAndInfos">
                <img src={product.img} alt="" className="orderProductImg"/>
                <div className="orderProductInfos">
                  <h3>{searchTerm?ReactHtmlParser(highlightText(product.title,searchTerm)):product.title  }</h3>
                  <h4>{searchTerm?ReactHtmlParser(highlightText(product.description,searchTerm)):product.description }</h4>
                  <div className="orderProductInfosButtons">
                    <button className="orderBuyAgain">Buy it again</button>
                    <button className="orderViewItem">View your item</button>
                  </div>
                </div>
              </div>
              <button className="orderProductReview">Write a product review</button>
            </div>
            ))}
              </div>
            </div>
            <div className="orderThirdSection">
              <h3>Archive order</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Order
