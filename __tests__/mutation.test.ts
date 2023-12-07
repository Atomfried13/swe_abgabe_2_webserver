import { afterAll, beforeAll, describe, test } from '@jest/globals';
import axios, { type AxiosInstance, type AxiosResponse } from 'axios';
import { type GraphQLRequest } from '@apollo/server';
import { type GraphQLResponseBody } from './buch-query.resolver.test.js';
import { HttpStatus } from '@nestjs/common';
import { loginGraphQL } from '../login.js';

describe('GraphQL Mutations', () => {
    let client: AxiosInstance;
    const graphqlPath = 'graphql';
});