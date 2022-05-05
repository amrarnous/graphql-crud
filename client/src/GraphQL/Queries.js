import { gql } from '@apollo/client'

export const GET_BOOKS = gql`
        query {
            books {
                id
                name
                genre
                    author {
                     name
                 }
            }
         }
`

export const GET_AUTHORS = gql`
        query {
            authors {
                id
                name
               age
               books {
                   name
               }
            }
         }
`

export const GET_BOOK = gql`
         query  book($id: ID!) {
                book(id: $id){
                    id
                    name
                    genre
                    author {
                        id
                        name
                    }
                }
        }
`

export const GET_AUTHOR = gql`
        query author($id: ID!){
            author(id: $id){
                id
                name
                age
            }
        }
`