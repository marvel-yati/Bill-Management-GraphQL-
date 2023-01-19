import { ApolloError } from "apollo-server-core";
import bills from "./dataset"; //get all of the available data from our database.
import Schema from "./Schema";
const Resolvers = {
  Query: {
    getAllBills: () => bills, //when user runs getAllBills command
    //when user runs the getBill command:
    getBill: (_: any, args: any) => { 
      console.log(args);
      //get the object that contains the specified ID.
      
      return bills.find((bill) => bill.id === args.id);
    },
    getFilteredBillsCategory:(_:any,args:any) => {
      
      let get = bills.find(a => a.category === args.category)
      console.log(get)
      return bills.filter((bill) => bill.category == args.category)
    }
  },
  Mutation:{
    addBill:(_: any,args: any) => {
      const newBill = {
        id:bills.length + 1,
        description: args.description,
        category: args.category,
        amount: args.amount,
        date: args.date
      }
      if(bills.find(bill => bill.description === args.description)){
        throw new Error("This item already exists!!! Try with a different one")
      }
      if(!bills.find(bill => bill.description === args.description)){
        bills.push(newBill)
      }
      
      return newBill
    },
    addBillAtAnyPosition:(_:any,args: any) => {
      let index = bills.findIndex(d => d.id === args.id)
      const newBill = {
        id: bills[index].id + 1,
        description: args.description,
        category: args.category,
        amount: args.amount,
        date: args.date
      }
      if(bills.find(bill => bill.description === args.description)){
        throw new Error("This item already exists!!! Try with a different one")
      }
      if(!bills.find(bill => bill.description === args.description)){
        bills.splice(index+1,0,newBill)
      }
      console.log(index)
      return newBill
    },
    updateBill:(_:any,args:any) => {
      let index = bills.findIndex(d => d.id === args.id)
      if(index > 0){
        bills[index].description = args.description
        bills[index].category = args.category
        if(args.amount){
          bills[index].amount = args.amount
        }
        else{
          bills[index].amount = bills[index].amount
        }
        if(args.date){
          bills[index].date = args.date
        }
        else{
          bills[index].date = bills[index].date
        }
      }
      return bills[index]
    },
    deleteBill:(_:any,args:any) => {
      console.log(args)
      let index = bills.findIndex(d => d.id === args.id)
      // if(bills.find(bill => bill.description === args.description)){
      //   throw new Error("This item is already deleted!! 😣")
      // }
      
      // if(!bills.find(bill => bill.description === args.description)){
      //   bills.splice(index,1)
      // }
      if(index > 0){
        bills.splice(index,1)
      }
    }
  }
};
export default Resolvers;