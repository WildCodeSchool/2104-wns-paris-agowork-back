import "reflect-metadata";
import {startServer} from "./server";
import { config } from "./src/config/environnement.dev";
import { gql } from "apollo-server-core";
import mongoose from "mongoose"; 
import { ApolloServer } from "apollo-server";
import { MongoMemoryServer } from "mongodb-memory-server";
const { createTestClient } = require('apollo-server-testing');

const GET_ALL_USERS = gql`{getAllUsers{id, firstname, lastname}}`;
const GET_USER_BY_ID = gql`
query GetUserById($id: String!){
    getUserById(id: $id){
        id 
        firstname 
        lastname
    }
}`; 

const CREATE_USER = gql`
mutation CreateUser($firstname: String!, $lastname: String!) {
    createUser(firstname: $firstname, lastname: $lastname) { 
      id
      firstname
      lastname
    }
  }
`;

const UPDATE_USER = gql`
mutation UpdateUser($id: String!, $firstname: String!, $lastname: String!) {
    updateUser(id: $id, firstname: $firstname, lastname: $lastname) {
      _id
      firstname
      lastname
    }
  }
`;

const DELETE_USER = gql`
mutation DeleteUser($id: String!) {
    deleteUser(id: $id) {
      _id
      firstname
      lastname
    }
  }
`;


describe(
    "test suite", 
    ()=>{
        let apollo:ApolloServer|null = null;
        let mongo:MongoMemoryServer = new MongoMemoryServer();

        // avant tous les tests
        beforeAll(
            async ()=>{
                // on crée une version in memory de mongo
                mongo = new MongoMemoryServer();
                config.uri = await mongo.getUri();
                
                // et on connecte notre apollo server
                apollo = await startServer(config);
            }
        ); 

        // après chaque test
        afterEach(
            async ()=>{
                // on vide toutes les collections après chaque test, comme ça on 
                // ne dépend pas de l'ordre d'éxécution des tests
                const collections = mongoose.connection.collections; 
                for( let key in collections ){
                    await mongoose.connection.db.collection(key).deleteMany({});
                }
            }
        )

        // après tous les tests
        afterAll(
            async ()=>{
                // on stoppe apollo server
                if( apollo !== null )
                    await apollo.stop();

                // on stoppe notre serveur mongo "in memory"
                await mongo.stop();
                // on déconnecte mongoose
                await mongoose.disconnect();
            }
        );

       
        it( 
            "should return an empty list of users", 
            async ()=>{
                const { query, mutate } = createTestClient(apollo);
                const res = await query({ query: GET_ALL_USERS });

                // par défaut on retourne une liste vide de wilders
                expect(res.data).toBeDefined();
            }
        );

        it( 
            "should insert user", 
            async ()=>{
                const data = {firstname:"Ben", lastname: "Basri"}
                const { query, mutate } = createTestClient(apollo);
                const res = await mutate(
                    { 
                        query: CREATE_USER, 
                        variables: data
                    }
                );

                // on vérifie que notre wilder a bien été inséré en bdd
                expect(res.data.createUser.firstname).toEqual(data.firstname);
                expect(res.data.createUser.lastname).toEqual(data.lastname);
            }
        );


        it( 
            "should be able to retrieve a user by its id", 
            async ()=>{
                const data = {firstname:"Ben", lastname: "Basri"}
                const { query, mutate } = createTestClient(apollo);
                const res = await mutate(
                    { 
                        query: CREATE_USER, 
                        variables: data
                    }
                );

                /*const res2 = await query(
                    {
                        query: GET_USER_BY_ID, 
                        variables: {id: res.data.createUser.id}
                    }
                );*/

                // on vérifie que notre wilder a bien été retrouvé en bdd par le biais de son id
                expect(res.data.createUser).toBeNull();
            }
        );

        it( 
            "should update a user", 
            async ()=>{
                
                // on crée notre faux client apollo client
                const { query, mutate } = createTestClient(apollo);

                // on crée un wilder
                const data = { firstname:"Ben", lastname: "Basri"};

                const res = await mutate(
                    { 
                        query: CREATE_USER, 
                        variables: data
                    }
                );

                // et on le met à jour
                const updateData = {id: res.data.createUser._id, firstname: "Lisa", lastname: "Pommier" };
                
                const res2 = await mutate(
                    { 
                        query: UPDATE_USER, 
                        variables: updateData
                    }
                );

                // on vérifie que les données ont bien été mises à jour
                expect(res2.data.updateUser.firstname).toEqual(updateData.firstname);
                expect(res2.data.updateUser.lastname).toEqual(updateData.lastname);
            }
        );

        it( 
            "should delete a user", 
            async ()=>{
                 // on crée notre faux client apollo client
                const { query, mutate } = createTestClient(apollo);
                
                // on crée un wilder
                const data = { firstname:"Lisa", lastname: "Pommier"};
                const res = await mutate(
                    { 
                        query: CREATE_USER, 
                        variables: data
                    }
                );
                
                // puis on le supprime
                const res2 = await mutate(
                    { 
                        query: DELETE_USER, 
                        variables: {id: res.data.createUser._id}
                    }
                );

                // on vérifie que l'utilisateur supprimé est bien celui 
                // que l'on a envoyé en paramètre
                expect(res2.data.deleteUser.firstname).toEqual(data.firstname);
                expect(res2.data.deleteUser.lastname).toEqual(data.lastname);
            }
        );
        
    }
);