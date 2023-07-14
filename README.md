## Clone this project

git clone [https://github.com/subquery/tutorials-account-transfers.git](https://github.com/subquery/tutorials-council-proposals.git)

## Install the dependencies

Under the project directory, run following command to install all the dependency.
```
yarn install
```

#### Code generation

Autogenerate the typescripts by running this command under the project directory.

````
yarn codegen
````

## Build the project

```
yarn build
```

## Indexing and Query

#### Run required systems in docker


Under the project directory run following command:

```
yarn start:docker
```
#### Query the project

Open your browser and head to `http://localhost:3000`.

Finally, you should see a GraphQL playground is showing in the explorer and the schemas that ready to query.

For the `subql-starter` project, you can try to query with the following code to get a taste of how it works.

````graphql
query {
    councillors (first: 3 orderBy: NUMBER_OF_VOTES_DESC) {
        nodes {
            id
            numberOfVotes
            voteHistories (first: 5) {
              totalCount 
              nodes {
                approvedVote
              }
          }
        }
    }
}

````
