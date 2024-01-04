import { describe, expect, test } from 'vitest';
import { fetchId, fetchTitel } from '../src/Controller/buch-query';

describe('Queries Tests', () => {
	test('fetchId für eine valide ID', async () => {
		// Given
		const id = '1';

		// When
		const result = await fetchId(id);

		//then
		const { status, headers, data } = result;

		expect(status).toBe(200);
		expect(headers['content-type']).toMatch(/json/iu);
		expect(data.data.buch).not.toBeNull();
		expect(data.errors).toBeUndefined();
	});

	test('fetchId für eine invalide ID', async () => {
		// Given
		const id = '99999';

		// When
		const result = await fetchId(id);

		//then
		const { status, headers, data } = result;

		expect(status).toBe(200);
		expect(headers['content-type']).toMatch(/json/iu);
		expect(data.errors).toBeDefined();
		expect(data.data.buch).toBeNull();
	});

	test('fetchTitel für einen validen Teiltitel', async () => {
		// Given
		const teilTitel = 'e';

		// When
		const result = await fetchTitel(teilTitel);

		//then
		const { status, headers, data } = result;

		expect(status).toBe(200);
		expect(headers['content-type']).toMatch(/json/iu);
		expect(data.errors).toBeUndefined();

		const { buecher } = data.data;

		expect(buecher).not.toHaveLength(0);
		expect(buecher).not.toBeNull();
	});

	test('fetchTitel für einen invaliden Teiltitel', async () => {
		// Given
		const teilTitel = 'qqq';

		// When
		const result = await fetchTitel(teilTitel);

		//then
		const { status, headers, data } = result;

		expect(status).toBe(200);
		expect(headers['content-type']).toMatch(/json/iu);
		expect(data.data.buecher).toBeNull();
		expect(data.errors).toBeDefined();
	});
});
