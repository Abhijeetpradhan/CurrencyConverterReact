import { useState } from 'react';
import FetchDataFromApi from './FetchDataFromApi';

const App = () => {
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState("usd");
  const [toCurrency, setToCurrency] = useState("inr");

  const currencyInfo = FetchDataFromApi(fromCurrency);
  const options = Object.keys(currencyInfo);
  console.log(currencyInfo);


  const calculate = () => {
    setConvertedAmount(amount * currencyInfo[toCurrency]);
  }

  const swap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }

  const reset = () => {
    setAmount("");
    setConvertedAmount("");
  }

  const calculateOnChange = (e) => {
    setAmount(e)
    setConvertedAmount(e * currencyInfo[toCurrency]);
  }

  return (
    <div className="bg-black h-screen flex justify-center items-center">
      <div className="border border-white h-[30rem] w-[50rem] bg-slate-300 rounded-lg">
        <div className="bg-white h-[10rem] m-5 rounded-lg flex justify-between">
          <div className="flex flex-col justify-between m-4">
            <h1 className="text-2xl text-gray-500 font-bold">From</h1>
            <input
              type="number"
              placeholder="0"
              min={0}
              className="text-2xl text-gray-500 font-bold outline-none"
              value={amount}
              // onChange={(e)=>setAmount(e.target.value)}
              onChange={(e) => calculateOnChange(e.target.value)}
            />
          </div>

          <div className="flex flex-col justify-between m-4">
            <h1 className="text-2xl text-gray-500 font-bold">Currency Type</h1>
            <select
              className="text-2xl p-1 text-gray-500 font-bold outline-none"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
            >
              {options.map((c) => (
                <option className="bg-violet-200" key={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-white h-[10rem] m-5 rounded-lg flex justify-between">
          <div className="flex flex-col justify-between m-4">
            <h1 className="text-2xl text-gray-500 font-bold">To</h1>
            <input
              type="number"
              className="text-2xl text-gray-500 font-bold outline-none"
              placeholder="0"
              value={convertedAmount}
              readOnly
            />
          </div>

          <div className="flex flex-col justify-between m-4">
            <h1 className="text-2xl text-gray-500 font-bold">Currency Type</h1>
            <select
              className="text-2xl p-1 text-gray-500 font-bold outline-none "
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
            >
              {options.map((c) => (
                <option className="bg-violet-200" key={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-evenly text-white">

          <button className="bg-red-600 p-3 rounded-lg" onClick={calculate}>Convert {fromCurrency} to {toCurrency}</button>
          <button className="bg-red-600 p-3 rounded-lg" onClick={swap}>Swap</button>
          <button className="bg-red-600 p-3 rounded-lg" onClick={reset}>Reset</button>


          {/* <button className="border border-black m-5 rounded-lg p-2 text-white bg-red-500 hover:bg-black font-bold" onClick={calculate}>
              Convert USD to INR
            </button>
            <button className="border border-black m-5 rounded-lg p-2 text-white bg-red-500 hover:bg-black font-bold" onClick={swap}>
              Swap
            </button>
            <button className="border border-black m-5 rounded-lg p-2 text-white bg-red-500 hover:bg-black font-bold" onClick={reset}>
              Reset
            </button> */}
        </div>
      </div>
    </div>
  );

}

export default App;