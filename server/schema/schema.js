const {GraphQLObjectType,
     GraphQLString, 
     GraphQLInt,
      GraphQLSchema,
      GraphQLID,
       GraphQLList,
        GraphQLNonNull
    } = require('graphql');

const Book = require('../models/book')
const Author = require('../models/author')


const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type:  GraphQLString },
        genre:  { type:  GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args){
                return Author.findById(parent.authorId);
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
               return Book.find( { authorId: parent.id } )
            }
        }
    })
})
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args){
             return Book.findById(args.id)
            }
        },
        author: {
            type: AuthorType,
            args: {
                id: {type: GraphQLID}
            },
             resolve(parent, args){
              return Author.findById(args.id);
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return Author.find({})
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return Book.find({})
            }
        }
    }
}) 

const Mutation = new GraphQLObjectType({
    name: "Mutations",
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve (parent, args)  {
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                genre: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                 authorId: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            resolve(parent, args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                })
                return book.save();
            }
        },
        removeBook: {
            type: BookType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            resolve(parent, args){
                return Book.findByIdAndRemove(args.id)
            }
        },
        removeAuthor: {
            type: AuthorType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            resolve(parent, args){
               return  Book.deleteMany({ authorId: args.id }).then(()=> {
                      return Author.findByIdAndRemove(args.id)
                })
                
            }
        },
        updateBook: {
            type: BookType,
            args: {
                 id: { type: GraphQLID },
                 name: { type:  new GraphQLNonNull(GraphQLString) },
                 genre:  { type: new GraphQLNonNull(GraphQLString) } ,
                 authorId:  { type: GraphQLID }
            },
            resolve(parent, args) {
                return Book.findByIdAndUpdate(args.id, {
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                })
            }
        },
        updateAuthor: {
            type: AuthorType,
            args: {
                id: {type: GraphQLID},
               name: { type:  new GraphQLNonNull(GraphQLString) },
               age: { type:  new GraphQLNonNull(GraphQLInt) },
            },
            resolve(parent, args){
                return Author.findByIdAndUpdate(args.id, {
                    name: args.name,
                    age: args.age
                })
            }
        }
    }
})
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})

//626bef799482cbc44413ec2d