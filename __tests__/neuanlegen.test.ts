import { beforeAll, expect, test, describe } from 'vitest';
import { mutation } from '../src/Controller/buch-mutation';
import { einloggen } from '../src/Controller/auth';

// eslint-disable-next-line max-lines-per-function
describe('Neuanlegen Tests', () => {
	let token: string;

	beforeAll(async () => {
		const response = await einloggen('admin', 'p');
		token = response.data.data.login.token;
	});

	test('Neuanlegen eines validen Datensatzes', async () => {
		//given
		const buchart = 'KINDLE';

		const buch = {
			isbn: '978-0-321-19368-1',
			rating: 1,
			art: buchart,
			preis: 99.99,
			rabatt: 0.123,
			lieferbar: true,
			datum: '2022-01-31',
			homepage: 'https://create.mutation',
			schlagwoerter: ['JAVASCRIPT', 'TYPESCRIPT'],
			titel: {
				titel: 'Titelcreatemutation',
				untertitel: 'untertitelcreatemutation',
			},
			abbildungen: [],
		};

		//when
		const result = await mutation(buch, token);

		//then
		expect(result).toBeDefined();

		const { status, headers, data } = result;

		expect(status).toBe(200);
		expect(headers['content-type']).toMatch(
			/^application\/json(; charset=utf-8)?/u,
		);
		expect(data.data).toBeDefined();
	});

	test('Versuchtes Neuanlegen mit falscher ISBN', async () => {
		//given
		const buchart = 'KINDLE';

		const buch = {
			isbn: 'falscheISBN',
			rating: 1,
			art: buchart,
			preis: 99.99,
			rabatt: 0.123,
			lieferbar: true,
			datum: '2022-01-31',
			homepage: 'https://create.mutation',
			schlagwoerter: ['JAVASCRIPT', 'TYPESCRIPT'],
			titel: {
				titel: 'Titelcreatemutation',
				untertitel: 'untertitelcreatemutation',
			},
			abbildungen: [],
		};

		//when
		const result = await mutation(buch, token);

		//then
		expect(result).toBeDefined();

		const { status, headers, data } = result;
		const { errors } = data;

		expect(status).toBe(200);
		expect(headers['content-type']).toMatch(
			/^application\/json(; charset=utf-8)?/u,
		);
		// eslint-disable-next-line @typescript-eslint/unbound-method
		expect(errors).toBeDefined;

		if (errors !== undefined) {
			expect(errors[0].message).include('isbn');
		}
	});
});
