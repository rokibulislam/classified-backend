const { gql } = require('apollo-server-express')

module.exports =  gql`

    extend type Query {
        posts: [Post!],
        post(id: ID!): Post,
    }

    input createPostInput {
        title: String!
        body: String!
    }

    extend type Mutation {
        createPost( input: createPostInput ) : Post
        updatePost(id: ID!, input: createPostInput ) : Post
        deletePost(id: ID!) : Post
    }


    type Post {
        id: ID!
        title: String!
        body: String!
        user: User! 
    }

    extend type Subscription {
        postCreated: Post
    }
`