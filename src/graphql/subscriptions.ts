/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./GraphQLAPI";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreatePlayers = /* GraphQL */ `subscription OnCreatePlayers($id: String, $name: String, $score: Int) {
  onCreatePlayers(id: $id, name: $name, score: $score) {
    id
    name
    score
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreatePlayersSubscriptionVariables,
  APITypes.OnCreatePlayersSubscription
>;
export const onUpdatePlayers = /* GraphQL */ `subscription OnUpdatePlayers($id: String, $name: String, $score: Int) {
  onUpdatePlayers(id: $id, name: $name, score: $score) {
    id
    name
    score
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdatePlayersSubscriptionVariables,
  APITypes.OnUpdatePlayersSubscription
>;
export const onDeletePlayers = /* GraphQL */ `subscription OnDeletePlayers($id: String, $name: String, $score: Int) {
  onDeletePlayers(id: $id, name: $name, score: $score) {
    id
    name
    score
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeletePlayersSubscriptionVariables,
  APITypes.OnDeletePlayersSubscription
>;
