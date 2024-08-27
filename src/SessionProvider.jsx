import { createContext, useEffect, useState } from 'react';
import { authRepository } from './repositories/auth';

const SessionContext = createContext();

const SessionProvider = (props) => {
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        setSession();
    }, []);
    
    const setSession = async () => {
        const currentUser = await authRepository.getCurrentUser();
        setCurrentUser(currentUser);
    }

    return (
        <SessionContext.Provider value={{ currentUser, setCurrentUser }}>
            {props.children}
        </SessionContext.Provider>
    );
};

export { SessionContext, SessionProvider };

