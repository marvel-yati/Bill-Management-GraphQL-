import bills from "../utils/dataset"; 
const Resolvers = {
  Query: {
    getAllBills: () => bills, 
    getBill: (_: any, args: any) => { 
      return bills.find((bill) => bill.id === args.id);
    },
    getBillsByCategory:(_:any,args:any) => {
      return bills.filter((bill) => bill.category == args.filter.category)
    },
    billsPaidInBudget:(_:any,budget:number) => {
      let listOfBills:any = [],totalAmount = 0
      type ObjectKey = keyof typeof budget;
      let list = 'budget' as ObjectKey
      let newBill = bills
      newBill.sort((a,b) => Number(a.amount) - Number(b.amount))
      let newBudget = Number(budget[list])
      if(newBudget === 0)
        return 0
      for(let i = 0; i < newBill.length; i++){
        if(totalAmount <= newBudget){
          listOfBills.push(newBill[i])
          newBudget -= totalAmount
          totalAmount += Number(newBill[i].amount)
        }
      }
      if(totalAmount > Number(budget[list])){
        listOfBills.pop()
      }
      return listOfBills
    },
  },
  Mutation:{
    addBill:(_: any,args: any) => {
      const {description,category,amount,date} = args
      const newBill = {
        id:bills.length + 1,
        description: description,
        category: category,
        amount: amount,
        date: date
      }
      if(bills.find(bill => bill.description === description)){
        throw new Error("This item already exists!!! Try with a different one")
      }
      if(!bills.find(bill => bill.description === description)){
        bills.push(newBill)
      }
      
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
      let index = bills.findIndex(d => d.id === args.id)
      if(index > 0){
        bills.splice(index,1)
      }
    }
  }
};
export default Resolvers;