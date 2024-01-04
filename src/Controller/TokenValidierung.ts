export function isTokenExpired(
	expirationString: string | undefined,
	issuedTime: Date,
): boolean {
	if (!expirationString) {
		return true;
	} else {
		let expiresIn = parseInt(expirationString);

		if (expirationString.includes('h')) {
			expiresIn = expiresIn * 60 * 60 * 1000;
		} else if (expirationString.includes('m')) {
			expiresIn = expiresIn * 60 * 1000;
		} else if (expirationString.includes('s')) {
			expiresIn = expiresIn * 1000;
		}

		const expirationTime = issuedTime.getTime() + expiresIn;
		const now = new Date().getTime();

		return expirationTime < now;
	}
}
