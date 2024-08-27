import { createContext, useEffect, useState } from 'react';
import { authRepository } from './repositories/auth';

 const SessionContext = createContext();
 const SessionProvider = (props) => {
    const [currentUser, setCurrentUser] = useState();
    const [setIsLoading] =useState(true);

    useEffect(() =>{
        setSession();
    },[]);
    
    const setSession = async () =>{
        const currentUser = await authRepository.getCurrentUser();
        setCurrentUser(currentUser);
        setIsLoading(false);
    }

    return (<SessionContext.Provider value ={{currentUser, setCurrentUser}}>
        {props.children}
    </SessionContext.Provider>
    );
 };

 export {SessionContext, SessionProvider};