import { gql } from "apollo-server-express"; //will create a schema
const Schema = gql`
  type Bill {
    id: ID!
    description: String
    category: String
    amount: String
    date: String
  }
  input Category{
    category: String
  }
  #handle bills commands
  type Query {
    getAllBills: [Bill] #will return multiple Person instances
    getBill(id: Int): Bill 
    getFilteredBillsCategory(filter: String):[Bill]!
  }
  type Mutation{
    addBill(description:String,category:String,amount:String,date:String): Bill
    addBillAtAnyPosition(id:Int!,description:String!,category:String!,amount:String,date:String): Bill
    updateBill(id:Int!,description:String!,category:String!,amount:String,date:String): Bill
    deleteBill(id:Int!):Bill
  }
`;
export default Schema; 
//export this Schema so we can use it in our project