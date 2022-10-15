import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Crypto protocol for IDS */
  EncryptedID: any;
};

export type Cat = {
  __typename?: 'Cat';
  age: Scalars['Float'];
  firstName: Scalars['String'];
  id: Scalars['EncryptedID'];
  lastName: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type InputAddCat = {
  age: Scalars['Float'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type InputEditCat = {
  age?: InputMaybe<Scalars['Float']>;
  firstName?: InputMaybe<Scalars['String']>;
  id: Scalars['EncryptedID'];
  lastName?: InputMaybe<Scalars['String']>;
};

export type InputEncryptedId = {
  id: Scalars['EncryptedID'];
};

export type InputStructure = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addCat: Cat;
  editCat: ReturnEditedCat;
};


export type MutationAddCatArgs = {
  input: InputAddCat;
};


export type MutationEditCatArgs = {
  input: InputEditCat;
};

export type Query = {
  __typename?: 'Query';
  getAllCat: ReturnCats;
  getCat: ReturnSelectedCat;
};


export type QueryGetAllCatArgs = {
  Input?: InputMaybe<InputStructure>;
};


export type QueryGetCatArgs = {
  Input: InputEncryptedId;
};

export type ReturnCats = {
  __typename?: 'ReturnCats';
  cats: Array<Cat>;
  count: Scalars['Int'];
  errors?: Maybe<Array<FieldError>>;
  status?: Maybe<Scalars['Int']>;
};

export type ReturnEditedCat = {
  __typename?: 'ReturnEditedCat';
  cat: Cat;
  errors?: Maybe<Array<FieldError>>;
  status?: Maybe<Scalars['Int']>;
};

export type ReturnSelectedCat = {
  __typename?: 'ReturnSelectedCat';
  cat: Cat;
  errors?: Maybe<Array<FieldError>>;
  status?: Maybe<Scalars['Int']>;
};

export type ReturnStructure = {
  __typename?: 'ReturnStructure';
  errors?: Maybe<Array<FieldError>>;
  status?: Maybe<Scalars['Int']>;
};

export type GetAllCatQueryVariables = Exact<{
  input?: InputMaybe<InputStructure>;
}>;


export type GetAllCatQuery = { __typename?: 'Query', getAllCat: { __typename?: 'ReturnCats', status?: number | null, count: number, cats: Array<{ __typename?: 'Cat', firstName: string, id: any, lastName: string, age: number }>, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };


export const GetAllCatDocument = gql`
    query GetAllCat($input: InputStructure) {
  getAllCat(Input: $input) {
    status
    count
    cats {
      firstName
      id
    }
    cats {
      lastName
      id
      firstName
      age
    }
    errors {
      field
      message
    }
  }
}
    `;

/**
 * __useGetAllCatQuery__
 *
 * To run a query within a React component, call `useGetAllCatQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCatQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCatQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetAllCatQuery(baseOptions?: Apollo.QueryHookOptions<GetAllCatQuery, GetAllCatQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllCatQuery, GetAllCatQueryVariables>(GetAllCatDocument, options);
      }
export function useGetAllCatLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllCatQuery, GetAllCatQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllCatQuery, GetAllCatQueryVariables>(GetAllCatDocument, options);
        }
export type GetAllCatQueryHookResult = ReturnType<typeof useGetAllCatQuery>;
export type GetAllCatLazyQueryHookResult = ReturnType<typeof useGetAllCatLazyQuery>;
export type GetAllCatQueryResult = Apollo.QueryResult<GetAllCatQuery, GetAllCatQueryVariables>;