/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./GraphQLAPI";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getPlayers = /* GraphQL */ `query GetPlayers($id: String!) {
  getPlayers(id: $id) {
    id
    name
    score
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetPlayersQueryVariables,
  APITypes.GetPlayersQuery
>;
export const listPlayers = /* GraphQL */ `query ListPlayers(
  $filter: TablePlayersFilterInput
  $limit: Int
  $nextToken: String
) {
  listPlayers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      score
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListPlayersQueryVariables,
  APITypes.ListPlayersQuery
>;
