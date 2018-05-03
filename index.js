const express=require('express');
const schema=require('./schema/schema');
const graphqlHttp=require('express-graphql');
const app=express();

const mongoose=require('mongoose');
 app.use('/graphql',graphqlHttp({
schema:schema,
graphiql:true
 }));
app.listen(3000,"localhost",()=>{
  console.log("listening on port 3000");
});
