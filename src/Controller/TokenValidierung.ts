export function isTokenExpired(
	expirationString: string | undefined,
	issuedTime: Date,
): boolean {
	if (!expirationString) {
		return true;
	} else {
		let expiresIn = 0;
		const value = parseInt(expirationString);

		if (expirationString.includes('h')) {
			expiresIn = value * 60 * 60 * 1000;
		} else if (expirationString.includes('m')) {
			expiresIn = value * 60 * 1000;
		} else if (expirationString.includes('s')) {
			expiresIn = value * 1000;
		}

		const expirationTime = issuedTime.getTime() + expiresIn;
		const now = new Date().getTime();

		return expirationTime < now;
	}
}
