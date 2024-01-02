import { describe, expect, test } from 'vitest';
import { Einloggen } from '../src/Controller/auth.service';

describe('Login', () => {
	test('Einloggen mit gültigen Daten', async () => {
		// Given
		const username = 'admin';
		const password = 'p';

		// When
		const response = await Einloggen(username, password);

		// Then
		expect(response).toBeDefined();

		const { status, headers, data } = response;

		expect(status).toBe(200);
		expect(headers['content-type']).toMatch(/json/iu);
		expect(data.errors).toBeUndefined();
		expect(data.data).not.toBeNull();
		expect(data.data.login).not.toBeNull();

		const { token, roles, expiresIn } = data.data.login;

		expect(token).toBeDefined();
		expect(roles).toBeDefined();
		expect(expiresIn).toBeDefined();

		const tokenParts = token.split('.');

		expect(tokenParts).toHaveLength(3);
		expect(token).toMatch(/^[a-z\d]+\.[a-z\d]+\.[\w-]+$/iu);
	});

	test('Einloggen mit falschem Passwort', async () => {
		// Given
		const username = 'admin';
		const password = 'a';

		// When
		const response = await Einloggen(username, password);

		// Then
		const { status, headers, data } = response;

		expect(status).toBe(200);
		expect(headers['content-type']).toMatch(/json/iu);
		expect(data.data.login).toBeNull();

		const { errors } = data;

		expect(errors).toBeDefined();
		expect(errors!).toHaveLength(1);

		const error = errors![0]!;
		const { message, path, extensions } = error;

		expect(message).toBe('Falscher Benutzername oder falsches Passwort');
		expect(path).toBeDefined();
		expect(path![0]).toBe('login');
		expect(extensions).toBeDefined();
		expect(extensions!.code).toBe('BAD_USER_INPUT');
	});
});
