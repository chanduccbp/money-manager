// Write your code here
import './index.css'

const TransactionItem = props => {
  const {tranDetails, onDelete} = props
  const {id, title, amount, type} = tranDetails

  const onClickDelete = () => {
    onDelete(id)
  }

  return (
    <li className="t-item">
      <p className="para-el">{title}</p>
      <p className="para-el">Rs {amount}</p>
      <p className="para-el">{type}</p>
      <button
        type="button"
        className="d-butt"
        onClick={onClickDelete}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          className="del-icon"
        />
      </button>
    </li>
  )
}

export default TransactionItem
