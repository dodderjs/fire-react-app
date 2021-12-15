import { useEffect, useState, ReactNode } from "react";
import { User } from 'firebase/auth';
import { FireService } from '../services/firebase.service';
import AuthContext from "../contexts/auth.context";

type Props = {
	children: ReactNode
}
const AuthProvider = ({ children }:Props ) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = FireService.auth.onAuthStateChanged((firebaseUser) => {
			setUser(firebaseUser);
			setLoading(false)
		});

		return unsubscribe;
	}, []);

	return (
		<AuthContext.Provider value={{user, loading}}>
			{children}
		</AuthContext.Provider>
	);
};
export default AuthProvider;
