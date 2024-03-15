import React from 'react';
import './BuyAgain.css';
import {highlightText} from '../Orders/OrdersUtils';
import ReactHtmlParser from 'react-html-parser';


function BuyAgain({productsAgain,searchTerm}) {
  return (
    <>
    <div className="ordersBuyAgain">
    {productsAgain?.map(product => (
                  <div key={product.id} className="buyAgainProduct">
                    <div className="buyAgainProductUpper">
                      <img src={product.img} alt=""/>
                      <h3>{searchTerm?ReactHtmlParser(highlightText(product.title,searchTerm)):product.title}</h3>
                      <h2>{searchTerm?ReactHtmlParser(highlightText(product.price,searchTerm)):product.price}$</h2>
                      <h4>{searchTerm?ReactHtmlParser(highlightText(product.description,searchTerm)):product.description}</h4>
                    </div>
                    <button>Add to cart</button>
                  </div>
            ))}
    </div>    
    </>
  )
}

export default BuyAgain
