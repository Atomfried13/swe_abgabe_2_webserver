

import { expect, test } from 'vitest';
import axios from 'axios';
import { fetchId, fetchTitel } from '../src/Controller/buch-query';
import MockAdapter from 'axios-mock-adapter';

test('fetchId should return data for valid ID', async () => {
  const mockAdapter = new MockAdapter(axios);

  const expectedData = {
    art: "DRUCKAUSGABE",
    id: 1,
    isbn: "978-3-897-22583-1",
    lieferbar: true,
    preis: 11.1,
    rabatt: "1.10 %",
    rating: 4,
    schlagwoerter: ["JAVASCRIPT"],
    titel: {
      titel: "Alpha",
    },
  };

  mockAdapter.onPost('baseURL/query').reply(200, expectedData);

  const result = await fetchId('1');

  expect(result.buch).toEqual(expectedData);

  mockAdapter.reset();
});

