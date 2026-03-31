const expenses = [
    {
        "_id": "69b7b9fca8667194c795bc5f",
        "userId": "69b7b7475f4812615c050d76",
        "description": "trip",
        "amount": 90,
        "type": "Expense",
        "category": "Miscellaneous",
        "date": "2026-03-16",
        "createdAt": "2026-03-16T08:06:20.836Z",
        "updatedAt": "2026-03-16T08:06:20.836Z",
        "__v": 0
    },
    {
        "_id": "69bfd4d1df0a349294fd2768",
        "userId": "69b7b7475f4812615c050d76",
        "description": "momos",
        "amount": 100,
        "type": "Expense",
        "category": "Food",
        "date": "2026-03-22",
        "createdAt": "2026-03-22T11:38:57.376Z",
        "updatedAt": "2026-03-22T11:38:57.376Z",
        "__v": 0
    },
    {
        "_id": "69bfd4e2df0a349294fd276b",
        "userId": "69b7b7475f4812615c050d76",
        "description": "salary",
        "amount": 100,
        "type": "Income",
        "category": "Food",
        "date": "2026-03-22",
        "createdAt": "2026-03-22T11:39:14.407Z",
        "updatedAt": "2026-03-22T11:39:14.407Z",
        "__v": 0
    }
]

const totalIncome = expenses
    .filter((exp) => exp.type === "Income")
    .reduce((acc, exp) => acc + exp.amount, 0);

  const totalExpenses = expenses
    .filter((exp) => exp.type === "Expense")
    .reduce((acc, exp) => acc + exp.amount, 0);

    const balance = totalIncome - totalExpenses;

     // If income = 950, expenses = 1739.95, balance = -789.95
  const savingsGoal =
    totalIncome > 0
      ? Math.round((balance / totalIncome) * 100)
      : 0; // can be negative if overspending


    console.log('Total Income:', totalIncome);
    console.log('Total Expenses:', totalExpenses);
    console.log('Balance:', balance);
    console.log('Savings Goal (%):', savingsGoal);


