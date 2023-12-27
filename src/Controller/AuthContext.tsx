/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useState, ReactNode } from 'react';

interface AuthContextType {
	token: string | null;
	expiresIn: string | null;
	tokenIssuedAt: Date | null;
	setToken: (value: string | null) => void;
	setExpiresIn: (value: string | null) => void;
	setTokenIssuedAt: (value: Date | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
	token: null,
	expiresIn: null,
	tokenIssuedAt: null,
	setToken: () => {},
	setExpiresIn: () => {},
	setTokenIssuedAt: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
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
