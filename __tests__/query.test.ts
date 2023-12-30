import { expect, test } from 'vitest';
import axios from 'axios';
import { fetchId, fetchTitel } from '../src/Controller/buch-query';
//import MockAdapter from 'axios-mock-adapter';

test('fetchId sfür eine valide ID', async () => {
     
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
  expect(data.daten).toBeDefined();

  const { buch } = data.daten!;

  expect(buch).toBeDefined();
  console.log('Wert von buch.titel:', buch.titel);
  expect(buch.titel?.titel).toMatch(/^\w/u);
  expect(buch.id).toBeDefined();

});

test('fetchId sfür eine invalide ID', async () => {
     
    // Given
  const id = '99999';


  // When
  const result = await fetchId(id);


  //then
  const { status, headers, data } = result;;
  //expect(data.error).toBeUndefined();
  expect(status).toBe(200);
    expect(headers['content-type']).toMatch(/json/iu);
    expect(data.daten!.buch).toBeNull();
    const { errorMessage } = data;
    expect(errorMessage).toHaveLength(1);
});