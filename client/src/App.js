import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  HomePage,
  NavBar,
  Checkout,
  SearchResults,
  ProductPage,
  Orders
} from "./components";
import Payment from "./components/PaymentGateway/Payment";

import Footer from "./components/Footer/Footer";
import Completion from './components/PaymentGateway/Completion';
// start
import Register from './users/register/Register';
import VerifyEmailAddress from './users/register/verifyemailaddress/VerfyEmailAddress';
import Login from './users/login/Login';
import LoginPassword from './users/login/loginPasswod/LoginPassword';

import Account from './users/account/Account';
import Security from './users/account/security/Security';
import NameSecurity from './users/account/security/nameSecurity/NameSecurity';
import EmailSecurity from './users/account/security/emailSecurity/EmailSecurity';
import PasswordSecurity from './users/account/security/passwordSecurity/PasswordSecurity';
// end

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/payment" element={<Payment />} />          
        <Route path="/search" element={<SearchResults />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/completion" element={<Completion />} />
        <Route path="/orders" element={<Orders />} />

        {/* start */}
        <Route path="/register" element={<Register />} />
        <Route path="/verifyEmailAddress" element={<VerifyEmailAddress />} />
        <Route path="/login" element={<Login />} />
         <Route path="/loginPassword" element={<LoginPassword />} />
       
        <Route path="/account" element={<Account />} />
        <Route path="/security" element={<Security />} />
        <Route path="/nameSecurity" element={<NameSecurity />} />
        <Route path="/emailSecurity" element={<EmailSecurity />} />
        <Route path="/passwordSecurity" element={<PasswordSecurity />} /> 
        {/* end */}

      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;

  // start
    // { path: 'account', element: <Account /> },
    // { path: 'security', element: <Security /> },
    // { path: 'nameSecurity', element: <NameSecurity /> },
    // { path: 'emailSecurity', element: <EmailSecurity /> },
    // { path: 'passwordSecurity', element: <PasswordSecurity /> },

    // { path: 'register', element: <Register /> },
    // { path: 'verifyEmailAddress', element: <VerifyEmailAddress /> },
    // { path: 'login', element: <Login /> },
    // { path: 'loginPassword', element: <LoginPassword /> },

    // { path: 'resetPassword', element: <ResetPassword /> },
    // {
    //   path: 'ResetPassverifyEmailAddress',
    //   element: <ResetPassVerifyEmailAddress />,
    // },
    // end