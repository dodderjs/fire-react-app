import { useEffect, useState, ReactNode } from "react";
import { User } from 'firebase/auth';
import {createContext} from "react";
import { userService } from "../services/user.service";
import { FireService } from "../services/firebase.service";

interface IAuthContext {
	user: User|null,
	loading: boolean,
	signIn: () => Promise<any>,
	signOut: () => void
}

export const AuthContext = createContext<IAuthContext>(null!);

type Props = {
	children: ReactNode
}
export const AuthProvider = ({ children }:Props ) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const unsubscribe = userService.onAuthStateChanged((firebaseUser) => {
			setUser(firebaseUser);
			setLoading(false);
		});

		return unsubscribe;
	}, [FireService.auth, setLoading, setUser]);

	const value = {
		signIn: () => { setLoading(true); return userService.signIn() },
		signOut: () => { setLoading(true); return userService.signOut(); },
		user,
		loading
	};

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	);
};
