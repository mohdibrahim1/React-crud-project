import logo from './logo.svg';
import 'antd/dist/antd.css';
import './App.css';
import { PageContex, Reducer } from './components/Stock/service';
import { StockList } from './components/Stock/List/StockList';
import { useReducer, useState } from 'react';
import { StockAdd } from './components/Stock/Add/StockAdd';

function App() {
  const initialState = {
    data: []
  }
  const [state, dispatch] = useReducer(Reducer, initialState);
  const [formdata, setformdata] = useState({});
  return (
    <div className="App">
      <PageContex.Provider value={{state,dispatch,formdata,setformdata}}>
        <StockAdd/>
        <StockList/>
      </PageContex.Provider>
    </div>
  );
}

export default App;
