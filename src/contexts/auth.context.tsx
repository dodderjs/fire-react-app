import {createContext} from "react";
import { User } from 'firebase/auth';

const AuthContext = createContext<{user: User|null, loading: boolean}>({user: null, loading: false});
export default AuthContext;
