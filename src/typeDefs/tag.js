const { gql } = require('apollo-server-express')

module.exports = gql`

    extend type Query {
        tags: [Tag!],
        tag(id: ID!): Tag,
    }

    input createTagInput {
        name: String!
    }

    extend type Mutation {
        createTag( input: createTagInput ) : Tag
        updateTag(id: ID!, input: createTagInput ) : Tag
        deleteTag(id: ID!) : Tag
    }


    type Tag {
        id: ID!
        name: String!
        posts: [Post!]
    }
`;