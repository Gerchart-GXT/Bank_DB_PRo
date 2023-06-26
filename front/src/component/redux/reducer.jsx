import ACTIONS from "./action";
const reducer = (
    state = {
        loginStatus: false,
        hasCookie: false,
        cookie: {
            value: "",
            expires: "",
        },
        userInfo: {
            userName: "",
            passWord: "",
            userType: ""
        }
    },
    action
) => {
    switch (action.type) {
        case ACTIONS.RECOVERYCOOKIE: 
            return {
                ...state,
                hasCookie: true,
                cookie: action.cookie
            };
        case ACTIONS.DELECOOKIE: {
            return {
                ...state,
                hasCookie: false,
                loginStatus: false
            }
        }
        case ACTIONS.RECOVERYLOGIN: 
            return {
                ...state,
                loginStatus: true,
                userInfo: action.userInfo
            };
        case ACTIONS.LOGIN: 
            localStorage.setItem("cookieValue", action.cookie.value);
            localStorage.setItem("cookieExpires", action.cookie.expires);
            console.log(action);
            return {
                ...state,
                loginStatus: true,
                hasCookie: true,
                cookie: action.cookie,
                userInfo: action.userInfo,
            };
        case ACTIONS.LOGOUT: 
            localStorage.removeItem("cookieValue");
            localStorage.removeItem("cookieExpires");
            return {
                ...state,
                loginStatus: false,
                hasCookie: false,
            }
        default: 
            return state;
    }
};

export default reducer;