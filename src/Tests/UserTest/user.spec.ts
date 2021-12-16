import "reflect-metadata";
import startServer from "../../server";
import config from "../../config/environnement.dev";
import { gql } from "apollo-server-core";
import mongoose from "mongoose";
import { ApolloServer } from "apollo-server";
import { MongoMemoryServer } from "mongodb-memory-server";
const { createTestClient } = require('apollo-server-testing');

const GET_ALL_USERS = gql`{
    getAllUsers{
        id
        firstname
        lastname
        email
        town
        picture
    }
}`;
const GET_USER_BY_ID = gql`
query GetUserById($id: String!){
    getUserById(id: $id){
        id 
        firstname 
        lastname
        email
        town
        picture
    }
}`;

const CREATE_USER = gql`
mutation CreateUser(
    $firstname: String!, 
    $lastname: String!, 
    $email: String!, 
    $town: String!,
    $picture: String!,
    $password: String!
    ) {
    createUser(
        firstname: $firstname, 
        lastname: $lastname, 
        email: $email, 
        town: $town,
        picture: $picture,
        password: $password
        ) { 
      id
      firstname
      lastname
      email
      town
      picture
    }
  }
`;

const UPDATE_USER = gql`
mutation UpdateUser(
    $id: String!, 
    $firstname: String!, 
    $lastname: String!, 
    $email: String!,
    $town: String!,
    $picture: String!
    ) {
    updateUser(
        id: $id, 
        firstname: $firstname, 
        lastname: $lastname, 
        email: $email,
        town: $town,
        picture: $picture
        ) {
      firstname
      lastname
      email
      town
      picture
    }
  }
`;

const DELETE_USER = gql`
mutation DeleteUser($id: String!) {
    deleteUser(id: $id) {
      id
      firstname
      lastname
      email
      town
      picture
    }
  }
`;


describe(
    "test suite",
    () => {
        let apollo: ApolloServer | null = null;
        let mongo: MongoMemoryServer = new MongoMemoryServer();

        beforeAll(
            async () => {
                mongo = new MongoMemoryServer();
                config.uri = await mongo.getUri();
                apollo = await startServer();
            }
        );

        afterEach(
            async () => {

                const collections = mongoose.connection.collections;
                for (let key in collections) {
                    await mongoose.connection.db.collection(key).deleteMany({});
                }
            }
        )

        afterAll(
            async () => {
                if (apollo !== null)
                    await apollo.stop();
                await mongo.stop();
                await mongoose.disconnect();
            }
        );

        it(
            "should return an empty list of users",
            async () => {
                const { query, mutate } = createTestClient(apollo);
                const res = await query({ query: GET_ALL_USERS });

                expect(res.data).toBeDefined();
            }
        );

        it(
            "should insert user",
            async () => {
                const data = { 
                    firstname: "Ben", 
                    lastname: "Basri", 
                    email: "ben@user.com",
                    password: "secretPass",
                    town: "Paris",
                    picture: "https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
                }
                const { query, mutate } = createTestClient(apollo);
                const res = await mutate(
                    {
                        query: CREATE_USER,
                        variables: data
                    }
                );

                expect(res.data.createUser.firstname).toEqual(data.firstname);
                expect(res.data.createUser.lastname).toEqual(data.lastname);
                expect(res.data.createUser.email).toEqual(data.email);
                expect(res.data.createUser.town).toEqual(data.town);
                expect(res.data.createUser.picture).toEqual(data.picture);
            }
        );


        it(
            "should be able to retrieve a user by its id",
            async () => {
                const data = { 
                    firstname: "Ben", 
                    lastname: "Basri", 
                    password: "secretPass",
                    email: "ben@user.com",
                    town: "Paris",
                    picture: "https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
                }
                const { query, mutate } = createTestClient(apollo);
                const res = await mutate(
                    {
                        query: CREATE_USER,
                        variables: data
                    }
                );

                const res2 = await query(
                    {
                        query: GET_USER_BY_ID,
                        variables: { id: res.data.createUser.id }
                    }
                );

                expect(res.data.createUser).toEqual(res2.data.getUserById);
            }
        );

        it(
            "should update a user",
            async () => {

                const { query, mutate } = createTestClient(apollo);

                const data = { 
                    firstname: "Ben", 
                    lastname: "Basri", 
                    password: "secretPass",
                    email: "ben@user.com",
                    town: "Paris",
                    picture: "https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
                };

                const res = await mutate(
                    {
                        query: CREATE_USER,
                        variables: data
                    }
                );

                const updateData = { 
                    id: res.data.createUser.id, 
                    firstname: "Lisa", 
                    lastname: "Pommier", 
                    email: "lisa@user.com",
                    town: "Marseille",
                    picture: "https://www.pngkey.com/png/detail/114-1199878_setting-user-avatar-in-specific-size-without-breaking.png"
                };
            
                const res2 = await mutate(
                    {
                        query: UPDATE_USER,
                        variables: updateData
                    }
                );
             
                expect(res2.data.updateUser.firstname).toEqual(updateData.firstname);
                expect(res2.data.updateUser.lastname).toEqual(updateData.lastname);
                expect(res2.data.updateUser.email).toEqual(updateData.email);
                expect(res2.data.updateUser.town).toEqual(updateData.town);
                expect(res2.data.updateUser.picture).toEqual(updateData.picture);
            }
        );

        it(
            "should delete a user",
            async () => {

                const { query, mutate } = createTestClient(apollo);

                const data = { 
                    firstname: "Lisa", 
                    lastname: "Pommier", 
                    email: "lisa@user.com",
                    password: "secretPass",
                    town: "Paris",
                    picture: "https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
                };
                const res = await mutate(
                    {
                        query: CREATE_USER,
                        variables: data
                    }
                );

                const res2 = await mutate(
                    {
                        query: DELETE_USER,
                        variables: { id: res.data.createUser.id }
                    }
                );

                expect(res2.data.deleteUser.firstname).toEqual(data.firstname);
                expect(res2.data.deleteUser.lastname).toEqual(data.lastname);
                expect(res2.data.deleteUser.email).toEqual(data.email);
                expect(res2.data.deleteUser.town).toEqual(data.town);
                expect(res2.data.deleteUser.picture).toEqual(data.picture);
            }
        );

    }
);