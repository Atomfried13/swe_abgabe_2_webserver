/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { beforeAll, expect, test, describe } from 'vitest';
import { mutation } from '../src/Controller/buch-mutation';
import { Einloggen } from '../src/Controller/auth.service';

// eslint-disable-next-line max-lines-per-function
describe('Mutation Tests', () => {
	let token: string;

	beforeAll(async () => {
		const response = await Einloggen('admin', 'p');
		token = response.data.data.login.token;
	});

	test('mutation für ein validen Datensatz', async () => {
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

		const result = await mutation(buch, token);

		expect(result).toBeDefined();

		const { status, headers, data } = result;

		expect(status).toBe(200);
		expect(headers['content-type']).toMatch(
			/^application\/json(; charset=utf-8)?/u,
		);
		expect(data.data).toBeDefined();
	});

	test('Mutation mit falscher ISBN', async () => {
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

		const result = await mutation(buch, token);

		expect(result).toBeDefined();

		const { status, headers, data } = result;
		const { errors } = data;

		expect(status).toBe(200);
		expect(headers['content-type']).toMatch(
			/^application\/json(; charset=utf-8)?/u,
		);
		expect(errors).toBeDefined;
		expect(errors[0].message).include('isbn');
	});
});
