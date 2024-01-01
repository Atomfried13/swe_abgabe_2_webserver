import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { Navigate } from 'react-router-dom';

interface RequireAuthProps {
	element: React.ReactNode;
	allowedRoles: string[];
}

export function RequireAuth({ element, allowedRoles }: RequireAuthProps) {
	const { roles } = useContext(AuthContext);
	const { token } = useContext(AuthContext);

	let isAdminOrFachabteilung: string | undefined = undefined;
	if (roles !== undefined) {
		isAdminOrFachabteilung = roles.find(
			(role) => allowedRoles?.includes(role),
		);
	}

	return isAdminOrFachabteilung ? (
		element
	) : token !== undefined ? (
		<Navigate to="/Unauthorized" />
	) : (
		<Navigate to="/Login" />
	);
}
