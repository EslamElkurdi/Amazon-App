import { ShoppingCartIcon, UserIcon } from "@heroicons/react/24/outline";
import { Link,useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Search } from "./";
import { useEffect, useState } from "react";
import { auth } from "../services/firebase";
import { logout } from "../services/auth";
import { onAuthStateChanged } from "firebase/auth";


const NavBar = () => {
  const cart = useSelector((state) => state.cart.productsNumber);
   
  // start
const navigate = useNavigate();
    const [nameSecurity, setNameSecurity] = useState('');

    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setNameSecurity(user.displayName);
        } else {
          setNameSecurity('');
        }
      });
    }, []);
  const handleSignOut = async() => {
    try {
      localStorage.clear();
      await logout();
      navigate("/login")
    } catch (err) {
      console.log(err.message);
    }
  }
  // end

  return (
    <>
      <header className="hidden sm:block">
        <div className="flex bg-amazonclone text-white h-[60px]">
          {/* Left */}
          <div className="flex items-center m-4">
            <Link to={"/"}>
              <img
                className="h-[35px] w-[100px] m-2"
                src={"../images/amazon.png"}
                alt="Amazon logo"
              />
            </Link>
            <div className="pr-4 pl-4">
              <div className="text-xs xl:text-sm">Deliver to</div>
              <div className="text-sm xl:text-base font-bold">Egypt</div>
            </div>
          </div>
          {/* Middle */}
          <div className="flex grow relative items-center">
            <Search />
          </div>
          {/* Right */}
          <div className="flex items-center m-2 lg:m-4">

          {/* start */}
            <div
              className='px-2 mt-4 h-11 w-[150px] overflow-hidden border border-[#131921]
             hover:border-white hover:overflow-visible'
            >
              <div className='z-10 relative top-0 duration-1000'>
                {nameSecurity ? (
                  <>
                    <div className='text-xs xl:text-sm'>
                      Hello <span>{nameSecurity}</span>
                    </div>
                    <div className='text-xs xl:text-base font-bold'>
                      Accounts & Lists
                    </div>
                    <div className='bg-white border border-[#cbc3c3] rounded-lg  w-[200px] mt-4 -ml-8 text-black flex flex-col '>
                      <div className='flex flex-col mb-4 mx-5'>
                        <p className='font-[500] mt-3 mb-2'>Your Account</p>
                        <span className='mb-1'>
                          <Link
                            to={'/account'}
                            className=' hover:cursor-pointer hover:text-[#C7511F] hover:underline'
                          >
                            Account
                          </Link>
                        </span>
                        <span className='mb-2'>
                          <Link
                            to={'/orders'}
                            className=' hover:cursor-pointer hover:text-[#C7511F] hover:underline'
                          >
                            Orders
                          </Link>
                        </span>
                        <button
                          onClick={() => {
                            handleSignOut();
                          }}
                          className=' hover:cursor-pointer hover:text-[#C7511F] hover:underline'
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <Link to={'/login'}>
                      <div className='text-xs xl:text-sm'>Hello, sign in</div>
                      <div className='text-xs xl:text-base font-bold'>
                        Accounts & Lists
                      </div>
                    </Link>
                    <div className='bg-white border border-[#cbc3c3]  rounded-lg  w-[230px] mt-4 -ml-12 text-black flex flex-col justify-center items-center'>
                      <div
                        className='rounded-lg my-4 mb-3 text-sm flex w-[100px] items-center justify-center h-8
                      bg-[#FFD814] border border-[#FCD200] 
                      hover:bg-[#F7CA00] hover:border-[#F2C200] hover:cursor-pointer
                       active:bg-[#F0B800] active:border-[#008296] active:shadow-continueButton'
                      >
                        <Link className='hover:cursor-pointer' to={'/login'}>
                          Sign in
                        </Link>
                      </div>
                      <div>
                        <p className='mb-4'>
                          New customer?{' '}
                          <Link
                            to={'/register'}
                            className='text-blue-500 hover:text-[#C7511F] hover:underline'
                          >
                            Start here.
                          </Link>
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            {/* end */}
            <Link to={"/orders"}>
            <div className="px-2 lg:px-4">
              <div className="text-xs xl:text-sm">Returns</div>
              <div className="text-xs xl:text-base font-bold">& Orders</div>
            </div>
            </Link>

            <Link to={"/checkout"}>
              <div className="flex px-2 lg:px-3">
                <ShoppingCartIcon className="h-[48px]" />
                <div className="relative">
                  <div className="absolute right-[9px] font-bold m-2 text-orange-400">
                    {cart}
                  </div>
                </div>
                <div className="hidden lg:block mt-7 text-xs xl:text-sm font-bold">
                  Cart
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className="flex bg-amazonclone-light_blue text-white space-x-3 text-xs xl:text-sm p-2 pl-6">
          <div>Today's Deals</div>
          <div>Customer Service</div>
          <div>Registry</div>
          <div>Gift Cards</div>
          <div>Sell</div>
        </div>
      </header>
      <header className="sm:hidden">
        <div className="flex bg-amazonclone text-white h-[60px]">
          {/* Left */}
          <div className="flex items-center m-4">
            <Link to={"/"}>
              <img
                className="h-[35px] w-[100px] m-2 mt-8"
                src={"../images/amazon.png"}
                alt="Amazon logo"
              />
            </Link>
            <div className="pr-4 pl-4 hidden">
              <div className="text-xs xl:text-sm">Deliver to</div>
              <div className="text-sm xl:text-base font-bold">Egypt</div>
            </div>
          </div>

          {/* Right */}
          <div className="absolute right-0 flex items-center m-4">
            <div className="flex pr-4 pl-4">
              <div className="text-sm xl:text-sm font-bold "> Sign in</div>
              <div className="sm:hidden text-sm xl:text-base">
                <UserIcon className="h-[32px]" />
              </div>
            </div>
            <div className="hidden pr-4 pl-4">
              <div className=" text-xs xl:text-sm">Returns</div>
              <div className="text-sm xl:text-base font-bold">& Orders</div>
            </div>
            <Link to={"/checkout"}>
              <div className="flex pr-3 pl-3">
                <ShoppingCartIcon className="h-[48px]" />
                <div className="relative">
                  <div className="absolute right-[9px] font-bold m-2 text-orange-400">
                    {cart}
                  </div>
                </div>
                <div className="mt-7 text-xs xl:text-sm font-bold">Cart</div>
              </div>
            </Link>
          </div>
        </div>
        {/* Middle */}
        <div className="flex grow relative items-center p-5 bg-amazonclone ">
          <Search />
        </div>
        <div className="flex bg-amazonclone-light_blue text-white space-x-3 text-xs xl:text-sm p-2 pl-6">
          <div>Today's Deals</div>
          <div>Customer Service</div>
          <div>Registry</div>
          <div>Gift Cards</div>
          <div>Sell</div>
        </div>
      </header>
    </>
  );
};

export default NavBar;
