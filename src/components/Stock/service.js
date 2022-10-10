import { createContext } from "react";
import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";
import env from "../../env";
import gql from "graphql-tag";

export const PageContex = createContext();
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: env.GAPI,
    }),
    fetchPolicy: `no-cache`

});

export const Reducer = (state, action) => {
    switch (action.type) {
        case 'List':
            return { ...state, data: action.data }
    }
}

export const getStockList = async () => {
    return await client.query({
        query: gql`query{
            stockList {
              id
              name
              start
              end
              yearHigh
              yearLow
            }
          }`
    })
}

 export const getStockById = async (id) => {
    return await client.query({
        query: gql`query($stockByIdId: Int){
            stockById (id: $stockByIdId){
              id
              name
              start
              end
              yearHigh
              yearLow
            }
          }`,
        variables: {

            "stockByIdId": id
        }
    })
}

export const postStock = async (data) => {
    console.log("DATA CONSOLE",data)
    return await client.mutate({
        mutation: gql`mutation($input: StockCreate!){
            createdStock(input: $input) {
              id
            }
          }
          `,
        variables: {
            input: {
                name: data.name,
                start: data.start,
                end: data.end,
                yearHigh: data.yearHigh,
                yearLow: data.yearLow
            }
        }
    })

}

export const putStock = async (data) => {
    return await client.mutate({
        mutation: gql`mutation($input: StockCreate!){
            updatedStock(input: $input) {
              id
            }
          }`,
        variables: {
            input: {
                name: data.name,
                start: data.start,
                end: data.end,
                yearHigh: data.yearHigh,
                yearLow: data.yearLow,
                id: data.id
            }
        }
    })

}


export const deleteStock = async (id) => {
    return await client.mutate({
        mutation: gql`
        mutation($deleteStockId: Int!){
  deleteStock(id: $deleteStockId) {
    id
  }
}`,
        variables: {

            deleteStockId: id
        }

    })
}