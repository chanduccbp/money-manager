import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here
class MoneyManager extends Component {
  state = {
    transactions: [],
    income: 0,
    expenses: 0,
    title: '',
    amount: '',
    type: transactionTypeOptions[0].optionId,
  }

  updateTitle = event => {
    this.setState({title: event.target.value})
  }

  updateAmount = event => {
    this.setState({amount: event.target.value})
  }

  updateType = event => {
    this.setState({type: event.target.value})
  }

  onAdding = event => {
    event.preventDefault()
    const {title, amount, type} = this.state

    const tranType =
      transactionTypeOptions[0].optionId === type
        ? transactionTypeOptions[0].displayText
        : transactionTypeOptions[1].displayText

    const newTran = {
      id: uuidv4(),
      title,
      amount,
      type: tranType,
    }

    if (type === 'INCOME') {
      this.setState(prevState => ({
        transactions: [...prevState.transactions, newTran],
        income: prevState.income + parseInt(amount),
        title: '',
        amount: '',
        type: transactionTypeOptions[0].optionId,
      }))
    } else {
      this.setState(prevState => ({
        transactions: [...prevState.transactions, newTran],
        expenses: prevState.expenses + parseInt(amount),
        title: '',
        amount: '',
        type: transactionTypeOptions[0].optionId,
      }))
    }
  }

  onDelete = id => {
    const {transactions} = this.state
    const filteredTran = transactions.filter(tran => tran.id === id)
    const {amount, type} = filteredTran[0]
    const newTranList = transactions.filter(tran => tran.id !== id)
    if (type === 'Income') {
      this.setState(prevState => ({
        transactions: newTranList,
        income: prevState.income - parseInt(amount),
      }))
    } else {
      this.setState(prevState => ({
        transactions: newTranList,
        expenses: prevState.expenses - parseInt(amount),
      }))
    }
  }

  render() {
    const {transactions, income, expenses, title, amount, type} = this.state
    const balance = income - expenses

    return (
      <div className="bg-container">
        <div className="card">
          <h1>Hi, Richard</h1>
          <p className="c-text">
            Welcome back to your <span className="s-text">Money Manager</span>
          </p>
        </div>
        <MoneyDetails balance={balance} income={income} expenses={expenses} />
        <div className="t-cont">
          <form className="form" onSubmit={this.onAdding}>
            <h1 className="f-head">Add Transaction</h1>
            <label htmlFor="title" className="l-el">
              TITLE
            </label>
            <input
              value={title}
              type="input"
              id="title"
              onChange={this.updateTitle}
              placeholder="TITLE"
              className="in-el"
            />
            <label htmlFor="amount" className="l-el">
              AMOUNT
            </label>
            <input
              value={amount}
              type="input"
              id="amount"
              onChange={this.updateAmount}
              placeholder="AMOUNT"
              className="in-el"
            />
            <label htmlFor="s-el" className="l-el">
              TYPE
            </label>
            <select value={type} id="s-el" onChange={this.updateType}>
              <option value="INCOME">
                {transactionTypeOptions[0].displayText}
              </option>
              <option value="EXPENSES">
                {transactionTypeOptions[1].displayText}
              </option>
            </select>
            <button type="submit" className="butt">
              Add
            </button>
          </form>
          <div className="history">
            <h1 className="history-head">History</h1>
            <ul className="t-history">
              <li className="l-head">
                <p className="span-el">Title</p>
                <p className="span-el">Amount</p>
                <p className="span-el">Type</p>
              </li>
              {transactions.map(eachTran => (
                <TransactionItem
                  tranDetails={eachTran}
                  key={eachTran.id}
                  onDelete={this.onDelete}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
