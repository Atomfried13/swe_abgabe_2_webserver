// AuthContext.tsx
import { createContext, useState } from 'react';

export const AuthContext = createContext<string>('');

export const AuthProvider = ({ children }) => {
	const [token, setToken] = useState<string | null>(null);

	const setAuthToken = (newToken: string) => {
		setToken(newToken !== null ? String(newToken) : null);
	};

	return (
		<AuthContext.Provider value={{ token, setAuthToken }}>
			{children}
		</AuthContext.Provider>
	);
};
