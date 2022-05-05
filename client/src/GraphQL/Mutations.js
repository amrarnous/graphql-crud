import {gql} from '@apollo/client'
export const ADD_BOOK = gql`
    mutation addBook($name: String! $genre: String! $authorId: ID!){
        addBook(name: $name genre: $genre authorId: $authorId){
            name
        }
    }
`
export const ADD_AUTHOR = gql`
    mutation AddAuthor($name: String! $age: Int!){
        addAuthor(name: $name age: $age){
            name
            age
        }
    }
`
export const REMOVE_BOOK = gql`
    mutation removeBook($id: ID!){
        removeBook(id: $id){
            name
            genre
        }
    }
`

export const REMOVE_AUTHOR = gql`
    mutation removeAuthor($id: ID!){
        removeAuthor(id: $id){
            name
        }
    }
`
export const UPDATE_BOOK = gql`
    mutation updateBook($id: ID! $name: String! $genre: String! $authorId: ID!){
        updateBook(id: $id name: $name genre: $genre authorId: $authorId){
            name
        }
    }
`
export const UPDATE_AUTHOR = gql`
    mutation updateAuthor ($id: ID! $name: String! $age: Int!){
        updateAuthor(id: $id name: $name age: $age){
            name
        }
    }
`