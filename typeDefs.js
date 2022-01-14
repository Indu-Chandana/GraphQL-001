const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Post {
        id: ID
        topic: String
        name: String
        lang: String
        capacity: String
        creator: String
        createdAt: String
        conversation: String
        roomUser: String
    }

    input PostInput {
        topic: String
        name: String
        lang: String
        capacity: String
        creator: String
        createdAt: String
        conversation: String
        roomUser: String
    }

    type Query {
        hello: String

        getAllPosts: [Post]
        getPost(id: ID): Post
    }

    type Mutation {
        createPost(post: PostInput): Post
        deletePost(id: ID): String
        updatePost(id:ID, post: PostInput): Post
    }
`;

module.exports = typeDefs;