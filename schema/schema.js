const graphql=require('graphql');
const mongoose=require('mongoose');
const book=require('./mongoschema').book;
const author=require('./mongoschema').author;
const _=require('lodash');
const {GraphQLObjectType,GraphQLString,GraphQLSchema,GraphQLID,GraphQLInt,GraphQLList,GraphQLNonNull}=graphql;
const BookType=new GraphQLObjectType({
  name:'Book',
  fields:()=>({
    id:{
      type:GraphQLString
    },
    name:{
      type:GraphQLString
    },
    genre:{
      type:GraphQLString
    },
    author:{
      type:AuthorType,
      //resolve function to return a object to frontend
      resolve(parent,args){
        console.log(parent.authorid);
        return author.findById({_id:parent.authorid});


      }
    }
  })

});

const AuthorType=new GraphQLObjectType({
  name:'Author',
  fields:()=>({
    id:{type:GraphQLID},
    name:{type:GraphQLString},
    age:{type:GraphQLInt},
    books:{
      type:new GraphQLList(BookType),
      resolve(parent,args){
        return book.find({authorid:parent.id});
          }
    }

  })

});
//rootQuery for entering graph
const RootQuery=new GraphQLObjectType({
  name:'RootQueryType',
  fields:{
    book:{
      type:BookType,
      args:{id:{type:GraphQLID}},
      resolve(parent,args){
         return book.findById(args.id);

      }
    },
    author:{
      type:AuthorType,
      args:{id:{type:GraphQLID}},
      resolve(parent,args){
      return author.findById(args.id);

        // return _.find(authors,{id:args.id});
      }

    },
    books:{
      type:new GraphQLList(BookType),
      resolve(parent,args){
        // return books;
        return book.find({});
      }
    },
    authors:{
      type:new GraphQLList(AuthorType),
      resolve(parent,args){
        // return authors;
        return author.find({});


      }
    }
  }
    });

//Mutaiton for making changes to data
const Mutation=new GraphQLObjectType({
  name:'Mutation',
  fields:{
    addAuthor:{
      type: AuthorType,
      args:{
        name:{type:new GraphQLNonNull(GraphQLString)},
        age:{type:new GraphQLNonNull(GraphQLInt)}
      },
      resolve(parent,args){
        var Author=new author({
           name:args.name,
           age:args.age
         });
      return Author.save();
      // author.create({
      //   name:args.name,
      //   age:args.age
      // },function(err,result){
      //   var x=JSON.parse(result);
      //   return x;
      // });
      }
    },
    addBook:{
      type:BookType,
      args:{
        name:{type:new GraphQLNonNull(GraphQLString)},
        genre:{type:new GraphQLNonNull(GraphQLString)},
        authorid:{type:new GraphQLNonNull(GraphQLID)}
      },
      resolve(parent,args){
        var Book=new book({
          name:args.name,
          genre:args.genre,
          authorid:args.authorid
        });
        return Book.save();
      }
    }
  }
});
/*sample object
book(id:"2"){
name
genre
}
*/
module.exports=new GraphQLSchema({
  query:RootQuery,
  mutation:Mutation
});
