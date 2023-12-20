// AuthContext.tsx
import { createContext, useState } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [token, setToken] = useState<string | null>(null);

	const setAuthToken = (newToken: string) => {
		setToken(newToken);
	};

	return (
		<AuthContext.Provider value={{ token, setAuthToken }}>
			{children}
		</AuthContext.Provider>
	);
};
