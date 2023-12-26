import { createContext, useState } from 'react';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
	const [token, setToken] = useState<string | null>(null);
	const [expiresIn, setExpiresIn] = useState<string | null>(null);
	const [tokenIssuedAt, setTokenIssuedAt] = useState<Date | null>(null);

	return (
		<AuthContext.Provider
			value={{
				token,
				expiresIn,
				setExpiresIn,
				setTokenIssuedAt,
				tokenIssuedAt,
				setToken,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
