import { createContext, useEffect, useReducer } from 'react';

export const Context = createContext({ user: {}, dispatch: action=>{} });

export const authReducer = (state, action) => {
    if (action.type === 'login') {
        window.localStorage.setItem('user', JSON.stringify(action.payload));
        return { user: action.payload };
    } else if (action.type === 'logout') {
        window.localStorage.removeItem('user');
        return { user: {} };
    } else return state;
}
//@ts-ignore
export const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, { user: {}, appHasLoaded: false });

    useEffect(()=> {
        const cachedUser = window.localStorage.getItem('user');
        if (cachedUser) dispatch({ type: 'login', payload: JSON.parse(cachedUser) });
    }, []);

    //@ts-ignore
    return <Context.Provider value={{ ...state, dispatch }}>{ children }</Context.Provider>
}