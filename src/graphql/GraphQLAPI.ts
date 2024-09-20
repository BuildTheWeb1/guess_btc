/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreatePlayersInput = {
  id: string,
  name?: string | null,
  score?: number | null,
};

export type Players = {
  __typename: "Players",
  id: string,
  name?: string | null,
  score?: number | null,
};

export type UpdatePlayersInput = {
  id: string,
  name?: string | null,
  score?: number | null,
};

export type DeletePlayersInput = {
  id: string,
};

export type TablePlayersFilterInput = {
  id?: TableStringFilterInput | null,
  name?: TableStringFilterInput | null,
  score?: TableIntFilterInput | null,
};

export type TableStringFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  size?: ModelSizeInput | null,
};

export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type TableIntFilterInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
};

export type PlayersConnection = {
  __typename: "PlayersConnection",
  items?:  Array<Players | null > | null,
  nextToken?: string | null,
};

export type CreatePlayersMutationVariables = {
  input: CreatePlayersInput,
};

export type CreatePlayersMutation = {
  createPlayers?:  {
    __typename: "Players",
    id: string,
    name?: string | null,
    score?: number | null,
  } | null,
};

export type UpdatePlayersMutationVariables = {
  input: UpdatePlayersInput,
};

export type UpdatePlayersMutation = {
  updatePlayers?:  {
    __typename: "Players",
    id: string,
    name?: string | null,
    score?: number | null,
  } | null,
};

export type DeletePlayersMutationVariables = {
  input: DeletePlayersInput,
};

export type DeletePlayersMutation = {
  deletePlayers?:  {
    __typename: "Players",
    id: string,
    name?: string | null,
    score?: number | null,
  } | null,
};

export type GetPlayersQueryVariables = {
  id: string,
};

export type GetPlayersQuery = {
  getPlayers?:  {
    __typename: "Players",
    id: string,
    name?: string | null,
    score?: number | null,
  } | null,
};

export type ListPlayersQueryVariables = {
  filter?: TablePlayersFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPlayersQuery = {
  listPlayers?:  {
    __typename: "PlayersConnection",
    items?:  Array< {
      __typename: "Players",
      id: string,
      name?: string | null,
      score?: number | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreatePlayersSubscriptionVariables = {
  id?: string | null,
  name?: string | null,
  score?: number | null,
};

export type OnCreatePlayersSubscription = {
  onCreatePlayers?:  {
    __typename: "Players",
    id: string,
    name?: string | null,
    score?: number | null,
  } | null,
};

export type OnUpdatePlayersSubscriptionVariables = {
  id?: string | null,
  name?: string | null,
  score?: number | null,
};

export type OnUpdatePlayersSubscription = {
  onUpdatePlayers?:  {
    __typename: "Players",
    id: string,
    name?: string | null,
    score?: number | null,
  } | null,
};

export type OnDeletePlayersSubscriptionVariables = {
  id?: string | null,
  name?: string | null,
  score?: number | null,
};

export type OnDeletePlayersSubscription = {
  onDeletePlayers?:  {
    __typename: "Players",
    id: string,
    name?: string | null,
    score?: number | null,
  } | null,
};
