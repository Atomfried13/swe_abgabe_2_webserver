

import { expect, test } from 'vitest';
import axios from 'axios';
import { fetchId, fetchTitel } from '../src/Controller/buch-query';
import MockAdapter from 'axios-mock-adapter';

test('fetchId should return data for valid ID', async () => {
  
  // Given
  const id = '1';

  // When
  const result = await fetchId(id);
  expect(result).toBeDefined();

  const foundBooks = result.buch;

  expect(foundBooks).toBeDefined();


});

// Füge weitere Tests für fetchTitel oder andere Funktionen hinzu
