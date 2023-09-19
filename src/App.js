import "./App.css";
import { useState } from "react";
import { serviceTips } from "./Data.js";

function App() {
  const [amount, setAmount] = useState(0);
  const [firstIndex, setFirstIndex] = useState(0);
  const [secondIndex, setSecondIndex] = useState(0);
  let averageTip =
    0.01 *
    0.5 *
    (serviceTips[firstIndex].percentage + serviceTips[secondIndex].percentage);

  function handleReset() {
    setAmount(0);
    setFirstIndex(0);
    setSecondIndex(0);
  }

  return (
    <div>
      <Bill addAmount={(a) => setAmount(a)}>{amount === 0 ? "" : amount}</Bill>
      <Service index={firstIndex} changeIndex={(index) => setFirstIndex(index)}>
        How did you like the service?
      </Service>
      <Service
        index={secondIndex}
        changeIndex={(index) => setSecondIndex(index)}
      >
        How did your friend like the service?
      </Service>
      <BillMessage amount={amount} averageTip={averageTip} />

      {amount > 0 && <button onClick={handleReset}>Reset</button>}
    </div>
  );
}

function BillMessage({ amount, averageTip }) {
  let tipValue = parseFloat((amount * averageTip).toFixed(2));
  let finalAmount = parseFloat((amount + tipValue).toFixed(2));

  return (
    <p>
      You pay {finalAmount}$ ({parseFloat(amount.toFixed(2))}$ + {tipValue}$
      tip)
    </p>
  );
}

function Service({ index, changeIndex, children }) {
  return (
    <div className="question">
      <label className="line">{children}</label>
      <select
        value={index}
        onChange={(e) => {
          changeIndex(e.target.value);
        }}
      >
        {serviceTips.map((feedback, index) => (
          <option id={feedback.id} value={index}>
            {feedback.text} ({feedback.percentage}%)
          </option>
        ))}
      </select>
    </div>
  );
}

function Bill({ addAmount, children }) {
  return (
    <div className="question">
      <span className="line">How much was the bill?</span>
      <input
        className="input"
        type="number"
        min="0.0"
        value={children}
        step="0.01"
        placeholder="0.00"
        onChange={(e) => addAmount(Number(e.target.value))}
      ></input>
    </div>
  );
}

export default App;
