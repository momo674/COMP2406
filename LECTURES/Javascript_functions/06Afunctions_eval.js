/* Example of javascript eval function

In javascript functions are first order objects -they
can be treated as data objects.

Code can also be treated as data.
The eval() function will evaluate a string as
though it is source code.
It will compile and run the code.

You can ask a function for its source code by asking for its toString()

Thus we can "hack" the source-code of any function and then run that code -Yikes!

*/

account = {balance: 0}
transaction = {account: account, amount: 100}

function deposit(){
  transaction.account.balance = transaction.account.balance + transaction.amount
}

deposit()
console.log(account.balance)

let hack = deposit.toString()
console.log(hack)
hack = hack.substring(0, hack.length-1)
console.log(hack)
hack = hack + ' + 1000 }; deposit()'
console.log(hack)

eval(hack)
console.log(account.balance)
