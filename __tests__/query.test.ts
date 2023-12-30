import { expect, test } from 'vitest';
import axios from 'axios';
import { fetchId, fetchTitel } from '../src/Controller/buch-query';
//import MockAdapter from 'axios-mock-adapter';

test('fetchId should return data for valid ID', async () => {
     
    // Given
  const id = '1';


  // When
  const result = await fetchId(id);
  expect(result).toBeDefined();

  //then
  const { status, headers, data } = result;;
  //expect(data.error).toBeUndefined();
  expect(status).toBe(200);
    expect(headers['content-type']).toMatch(/json/iu);
  expect(data.data).toBeDefined();

  const { buch } = data.data!;

  expect(data.data.buch).toBeDefined();
});