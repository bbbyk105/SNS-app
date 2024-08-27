import { createContext, useEffect, useState } from 'react';
import { authRepository } from './repositories/auth';

const SessionContext = createContext();

const SessionProvider = (props) => {
    const [currentUser, setCurrentUser] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setSession();
    }, [setSession]); // setSessionを依存関係に追加

    const setSession = async () => {
        const currentUser = await authRepository.getCurrentUser();
        setCurrentUser(currentUser);
        setIsLoading(false);
    }

    if (isLoading) {
        return <div>Loading...</div>; // ロード中のメッセージやスピナーを表示
    }

    return (
        <SessionContext.Provider value={{ currentUser, setCurrentUser }}>
            {props.children}
        </SessionContext.Provider>
    );
};

export { SessionContext, SessionProvider };
