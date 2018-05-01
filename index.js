const express=require('express');
const schema=require('./schema/schema');
const graphqlHttp=require('express-graphql');

const app=express();
app.use(express.static('static'));
 app.use('/graphql',graphqlHttp({
schema,
graphiql:true
 }));

app.listen(3000,(err,result)=>{
  console.log("listening on port 3000");
});
