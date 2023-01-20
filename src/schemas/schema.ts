import { gql } from "apollo-server-express"; //will create a schema
const Schema = gql`
  type Bill {
    id: ID!
    description: String
    category: String
    amount: String
    date: String
  }
  input Bill1 {
    id: ID!
    description: String
    category: String
    amount: String
    date: String
  }
  input Category{
    category: String
  }
  input Amount{
    amount:Int
  }
  type Query {
    getAllBills: [Bill] #will return multiple Person instances
    getBill(id: Int): Bill 
    getBillsByCategory(filter: Category):[Bill]!
    billsPaidInBudget(budget:Int):[Bill]
  }
  type Mutation{
    addBill(description:String,category:String,amount:String,date:String): Bill
    addBillAtAnyPosition(id:Int!,description:String!,category:String!,amount:String,date:String): Bill
    updateBill(id:Int!,description:String!,category:String!,amount:String,date:String): Bill
    deleteBill(id:Int!):Bill
  }
`;
export default Schema; 
