/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./GraphQLAPI";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createPlayers = /* GraphQL */ `mutation CreatePlayers($input: CreatePlayersInput!) {
  createPlayers(input: $input) {
    id
    name
    score
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreatePlayersMutationVariables,
  APITypes.CreatePlayersMutation
>;
export const updatePlayers = /* GraphQL */ `mutation UpdatePlayers($input: UpdatePlayersInput!) {
  updatePlayers(input: $input) {
    id
    name
    score
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdatePlayersMutationVariables,
  APITypes.UpdatePlayersMutation
>;
export const deletePlayers = /* GraphQL */ `mutation DeletePlayers($input: DeletePlayersInput!) {
  deletePlayers(input: $input) {
    id
    name
    score
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeletePlayersMutationVariables,
  APITypes.DeletePlayersMutation
>;
