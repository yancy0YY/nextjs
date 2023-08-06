import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { ApolloServer } from '@apollo/server'
import { gql } from 'graphql-tag'
import { NextRequest } from 'next/server'

const resolvers = {
    Query: {
        hello: () => `world`,
    }
}
const typeDefs = gql`
type Query {
    hello: String
}
`
const server = new ApolloServer({
    resolvers,
    typeDefs
})
const handler = startServerAndCreateNextHandler(server);

export async function GET(reqeust: NextRequest) {
    return handler(reqeust)
}

export async function POST(reqeust: NextRequest) {
    return handler(reqeust)
}