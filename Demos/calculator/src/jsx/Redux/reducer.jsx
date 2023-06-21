import ACTIONS from "./action";

let calForOnce = (lastOperand, currentOperand, operator) => {
    if(operator === ""){
        return currentOperand;
    }
    currentOperand = parseFloat(currentOperand);
    lastOperand = parseFloat(lastOperand);
    let calResult = ""
    if(operator === '+'){
        calResult = lastOperand + currentOperand;
    }
    if(operator === '-'){
        calResult = lastOperand - currentOperand;
    }
    if(operator === '/'){
        calResult = lastOperand / currentOperand;
    }
    if(operator === '*'){
        calResult = lastOperand * currentOperand;
    }
    return calResult.toString();
}

const reducer = (
    state={
        currentOperand: "0",
        lastOperand: "NULL",
        operator: ""
    },
    action
) => {
    switch(action.type) {
        case ACTIONS.ADD_DIGIT:
            if(state.currentOperand === '0' && action.digit === '0')
                return state;
            if(state.currentOperand === '0' && action.digit === '.'){
                return {
                    ...state,
                    currentOperand: "0."
                }
            }
            if(state.currentOperand === '0' && action.digit !== '0')
                return {
                    ...state,
                    currentOperand: action.digit
                };
            if(state.currentOperand.includes(".") && action.digit === '.')
                return state;
            return {
                ...state,
                currentOperand: state.currentOperand + action.digit
            }
        case ACTIONS.DELETE_DIGIT:
            if(state.currentOperand === "0" || state.currentOperand.length === 1)
                return {
                    ...state,
                    currentOperand: "0"
                }
            return {
                ...state,
                currentOperand: state.currentOperand.slice(0, -1)
            }        
        case ACTIONS.CLEAR:
            return {
                currentOperand: "0",
                lastOperand: "NULL",
                operator: ""
            }
        case ACTIONS.EVALUATE: {
            if(state.operator !== "" && action.digit !== '=' && action.digit !== '-'){
                return {
                    ...state,
                    operator: action.digit
                }
            }
            if(state.currentOperand === '0' && action.digit === '-'){
                return {
                    ...state,
                    currentOperand: "-0"
                }
            }
            if(action.digit === '=') {
                return {
                    ...state,
                    currentOperand: "0",
                    lastOperand: calForOnce(state.lastOperand, state.currentOperand, state.operator ),
                    operator: ""
                }
            } else {
                return {
                    ...state,
                    currentOperand: "0",
                    lastOperand: state.currentOperand,
                    operator: action.digit
                }
            }
        }
        default: 
            return state;
    
    }
};

export default reducer;