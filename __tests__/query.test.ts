import { expect, test } from 'vitest';
import axios from 'axios';
import { fetchId, fetchTitel, Buch } from '../src/Controller/buch-query';
//import MockAdapter from 'axios-mock-adapter';
import { Titel } from '../src/pages/NeuesBuch/Titel.component';

test('fetchId für eine valide ID', async () => {
     
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

  expect(buch).toBeDefined();
  expect(buch.titel?.titel).toMatch(/^\w/u);

  expect(buch.id).toBeDefined();

});

test('fetchId für eine invalide ID', async () => {
     
    // Given
  const id = '99999';

  // When
  const result = await fetchId(id);

  //then
  const { status, headers, data } = result;;
  //expect(data.error).toBeUndefined();
  expect(status).toBe(200);
    expect(headers['content-type']).toMatch(/json/iu);
    expect(data.data!.buch).toBeNull();

    const { errorMessage } = data;
    expect(errorMessage).toBe(`Ein Buch mit der ID${id} existiert nicht.`);
});

test('fetchTitel für einen validen Teiltitel', async () => {
     
  // Given
const teilTitel = 'e';

// When
const result = await fetchTitel(teilTitel);
expect(result).toBeDefined();

//then
const { status, headers, data } = result;;
//expect(data.error).toBeUndefined();
expect(status).toBe(200);
  expect(headers['content-type']).toMatch(/json/iu);

expect(data.data).toBeDefined();

const { buecher } = data.data!;
expect(buecher).not.toHaveLength(0);

expect(buecher).toBeDefined();

buecher.forEach((buch: Buch) => {
  expect(buch.titel?.titel).toMatch(/^\w/u);
  expect(buch.id).toBeDefined();
});
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
        expect(data.data!.buecher).toBeNull();

        const { errorMessage } = data;
        expect(errorMessage).toBe(`Ein Buch mit dem Titel oder dem Teiltitel "${teilTitel}" existiert nicht.`);
});