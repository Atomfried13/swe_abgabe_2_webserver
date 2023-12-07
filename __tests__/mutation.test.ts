import { afterAll, beforeAll, describe, test } from '@jest/globals';
import axios, { type AxiosInstance, type AxiosResponse } from 'axios';
import { type GraphQLRequest } from '@apollo/server';
import { type GraphQLResponseBody } from './buch-query.resolver.test.js';
import { HttpStatus } from '@nestjs/common';
import { loginGraphQL } from '../login.js';

describe('GraphQL Mutations', () => {
    let client: AxiosInstance;
    const graphqlPath = 'graphql';

    beforeAll(async () => {
        const baseURL = `https://localhost:3000/`;
        client = axios.create({
            baseURL,
            httpsAgent,
        });
    });

    test('Neues Buch', async () => {
        // given
        const token = await loginGraphQL(client);
        const authorization = { Authorization: `Bearer ${token}` }; // eslint-disable-line @typescript-eslint/naming-convention
        

        // when
        const response: AxiosResponse<GraphQLResponseBody> = await client.post(
            graphqlPath,
            body,
            { headers: authorization },
        );

        // then
        const { status, headers, data } = response;

        expect(status).toBe(HttpStatus.OK);
        expect(headers['content-type']).toMatch(/json/iu); // eslint-disable-line sonarjs/no-duplicate-string
        expect(data.data).toBeDefined();

        const { create } = data.data!;

        // Der Wert der Mutation ist die generierte ID
        expect(create).toBeDefined();
        expect(create.id).toBeGreaterThan(0);
    });
});