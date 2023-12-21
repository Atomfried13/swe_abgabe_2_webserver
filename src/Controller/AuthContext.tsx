import { createContext, useState } from 'react';

export const AuthContext = createContext<string>('');

export const AuthProvider = ({ children }) => {
	const [token, setToken] = useState<string | null>(null);

	const updateToken = (newToken: string) => {
		setToken(newToken !== null ? String(newToken) : null);
	};

	return (
		<AuthContext.Provider value={{ token, updateToken }}>
			{children}
		</AuthContext.Provider>
	);
};
