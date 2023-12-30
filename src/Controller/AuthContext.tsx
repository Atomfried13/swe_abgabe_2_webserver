/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useState, ReactNode } from 'react';

interface AuthContextType {
	token: string | undefined;
	roles: string[] | undefined;
	expiresIn: string | undefined;
	tokenIssuedAt: Date | undefined;
	setToken: React.Dispatch<React.SetStateAction<string | undefined>>;
	setRoles: React.Dispatch<React.SetStateAction<string[] | undefined>>;
	setExpiresIn: React.Dispatch<React.SetStateAction<string | undefined>>;
	setTokenIssuedAt: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

export const AuthContext = createContext<AuthContextType>({
	token: undefined,
	roles: undefined,
	expiresIn: undefined,
	tokenIssuedAt: undefined,
	setToken: () => {},
	setRoles: () => {},
	setExpiresIn: () => {},
	setTokenIssuedAt: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [token, setToken] = useState<string | undefined>(undefined);
	const [roles, setRoles] = useState<string[] | undefined>(undefined);
	const [expiresIn, setExpiresIn] = useState<string | undefined>(undefined);
	// eslint-disable-next-line prettier/prettier
	const [tokenIssuedAt, setTokenIssuedAt] = useState<Date | undefined>(undefined);

	return (
		<AuthContext.Provider
			value={{
				token,
				roles,
				expiresIn,
				tokenIssuedAt,
				setToken,
				setRoles,
				setExpiresIn,
				setTokenIssuedAt,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
