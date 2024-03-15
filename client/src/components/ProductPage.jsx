import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ProductDetails } from "./";
import { GB_CURRENCY } from "../utils/constants";
import { callAPI } from "../utils/CallApi";
import { addToCart } from "../redux/cartSlice";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // Default quantity
  const dispatch = useDispatch();

  const getProduct = () => {
    callAPI(`data/products.json`).then((productResults) => {
      setProduct(productResults[id]);
    });
  };

  const handleAddToCart = () => {
    notify();
    const productWithQuantity = { ...product, quantity: quantity };
    dispatch(addToCart(productWithQuantity));
  };
  const notify = () =>
    toast.success("added to Cart", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  useEffect(() => {
    getProduct();
  }, []);

  return (
    product && (
      <div className="h-screen bg-amazonclone-background">
        <div className="min-w-[1000px] max-w-[1500px] m-auto p-4">
          <div className="grid grid-cols-10 gap-2">
            {/* Left */}
            <div className="col-span-3 p-8 rounded bg-white m-auto">
              <img src={`${product.image}`} alt="Main product" />
            </div>
            {/* Middle */}
            <div className="col-span-5 p-4 rounded bg-white divide-y divide-gray-400">
              <div className="mb-3">
                <ProductDetails product={product} ratings={true} />
              </div>
              <div className="text-base xl:text-lg mt-3">
                {product.description}
              </div>
            </div>
            {/* Right */}
            <div className="col-span-2 p-4 rounded bg-white">
              <div className="text-xl xl:text-2xl text-red-700 text-right font-semibold">
                {GB_CURRENCY.format(product.price)}
              </div>
              <div className="text-base xl:text-lg text-gray-500 text-right font-semibold">
                RRP:{" "}
                <span className="line-through">
                  {GB_CURRENCY.format(product.oldPrice)}
                </span>
              </div>
              <div className="text-sm xl:text-base text-blue-500 font-semibold mt-3">
                FREE Returns
              </div>
              <div className="text-sm xl:text-base text-blue-500 font-semibold mt-1">
                FREE Delivery
              </div>
              <div className="text-base xl:text-lg text-green-700 font-semibold mt-1">
                In Stock
              </div>
              <div className="text-base xl:text-lg mt-1">
                Quantity:
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="p-2 bg-white border rounded-md focus:border-indigo-600"
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>
              </div>
              <button onClick={handleAddToCart} className="btn mt-3">
                Add to Cart
              </button>
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductPage;
