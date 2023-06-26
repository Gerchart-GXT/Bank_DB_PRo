import React, { Component } from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from '../home/home';
import NotFound from '../not_found/not-found';
import { Navigate } from 'react-router-dom';
import Register from '../register/register';
import Login from '../login/login';
import My from '../my/my';
import { connect } from 'react-redux';
import MyUserInfo from '../my/user_info/my-user-info'
import MyDebitCard from '../my/bank_account_info/my-debit-card';
import MyCreditCard from './../my/bank_account_info/my-credit-card';
import MyFinanicialInfo from '../my/finanicial_acount_info/my-finanicial-info';
import MyFundInfo from '../my/fund_acount_info/My-fund-info';
import MyInsuranceInfo from '../my/insurance_acount_info/My-insurance-info';
import MyBankAccount from '../my/bank_account_info/my-cards';
import MyFundTotal from '../my/fund_acount_info/My-fund-total';
import MyInsuranceTotal from './../my/insurance_acount_info/My-insurance-Total';
import MyFinanicialTotal from './../my/finanicial_acount_info/my-finanicial-total';
import BuyFinanicial from '../buy/finanicial';
import BuyFund from '../buy/fund';
import BuyInsurance from '../buy/insurance';
import DebitCardApply from '../card/debit-card-apply';
import CreditCardApply from '../card/credit-card-apply';
class RootRouters extends Component {
    render() { 
        return (
            <React.Fragment>
                <Routes>
                    <Route path="/" element={<Home></Home>}></Route>
                    <Route path="/404" element={<NotFound></NotFound>}></Route>
                    <Route path='/register' element={this.props.loginStatus === false ? <Register></Register>: <My></My>}></Route>
                    <Route path='/login' element={this.props.loginStatus === false ? <Login></Login>: <My></My>}></Route>
                    <Route path='/my' element={this.props.loginStatus === false ? <Login></Login>: <My></My>}>
                        <Route path='user-info' element={<MyUserInfo></MyUserInfo>}></Route>
                        <Route path='bank-account-info' element={<MyBankAccount></MyBankAccount>}></Route>
                        <Route path="debit-account" element={<MyDebitCard></MyDebitCard>}></Route>
                        <Route path='credit-account' element={<MyCreditCard></MyCreditCard>}></Route>
                        <Route path="finanicail-total" element={<MyFinanicialTotal></MyFinanicialTotal>}></Route>
                        <Route path='finanicail-account' element={<MyFinanicialInfo></MyFinanicialInfo>}></Route>
                        <Route path="fund-total" element={<MyFundTotal></MyFundTotal>}></Route>
                        <Route path='fund-account' element={<MyFundInfo></MyFundInfo>}></Route>
                        <Route path="insurance-total" element={<MyInsuranceTotal></MyInsuranceTotal>}></Route>
                        <Route path='insurance-account' element={<MyInsuranceInfo></MyInsuranceInfo>}></Route>
                    </Route>
                    <Route path="buy-finanicial" element={<BuyFinanicial></BuyFinanicial>}></Route>
                    <Route path="buy-fund" element={<BuyFund></BuyFund>}></Route>
                    <Route path="buy-insurance" element={<BuyInsurance></BuyInsurance>}></Route>
                    <Route path="/debit-apply" element={<DebitCardApply></DebitCardApply>}></Route>
                    <Route path="/credit-apply" element={<CreditCardApply></CreditCardApply>}></Route>
                    <Route path="*" element={ <Navigate replace to="/404" /> } />
                </Routes>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        loginStatus: state.loginStatus,
        hasCookie: state.hasCookie,
        cookie: state.cookie,
        userInfo: state.userInfo
    }
};
 
export default connect(mapStateToProps)(RootRouters);
