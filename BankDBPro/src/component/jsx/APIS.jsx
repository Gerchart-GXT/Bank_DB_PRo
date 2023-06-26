const APIHOST = "http://172.20.10.10:8000";
const APIPATH = {
    checkLoginState: "/login-status-check/",
    logout: "/logout/",
    login: "/login/",
    reigster: "/register/",
    bankCardTotal: "/client/cards/",
    creditCardInfo: "/credit_card/list/client/",
    cardDelete: "/card/delete/",
    debitCardInfo: "/debit_card/list/client/",
    finanicialInfo: "/client/financial/list/",
    projectDelete: "/project/delete/",
    finanicialTotal: "/client/financials/",
    fundInfo: "/client/fund/list/",
    fundTotal: "/client/funds/",
    insuranceInfo: "/client/insurance/list/",
    insuranceTotal: "/client/insurances/",
    loginAccountInfo: "/info/account/get/",
    clientInfo: "/info/client/get/",
    clientInfoChange: "/info/client/write/",
    managerInfo: "/info/manager/",
    managerInfoChange: "/info/manager/write/",
    accountDelete: "/account/delete/",
    fundList: "/fund/list/",
    buyFund: "/fund/buy/",
    shopFund: "/shop/fund/",
    financialList: "/financial/list/",
    buyFinancial: "/financial/buy/",
    shopFinancial: "/shop/financial/",
    insuranceList: "/insurance/list/",
    buyInsurance: "/insurance/buy/",
    shopInsurance: "/shop/insurance/",
    debitApply: "/debit_card/create/",
    creditApply: "/credit_card/create/"
}



export {APIHOST, APIPATH};