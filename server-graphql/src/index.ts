import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { typeDefs, resolvers } from './graphql';

const app = express();
const httpServer = http.createServer(app);

// Tell ApolloServer to 'drain" (attach) the Express server
const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

// Wait for apollo server to start
await server.start();

// Specify the path to mounst the server & Set up Express middleware to handle CORS and body parsing
app.use('/api', cors<cors.CorsRequest>(), bodyParser.json({ limit: '50mb' }), expressMiddleware(server));

// Modified server startup ------------- usa app.listen
await new Promise<void>((resolve) => httpServer.listen({ port: 3000 }, resolve));
console.log(`🚀 Server ready at http://localhost:3000`);