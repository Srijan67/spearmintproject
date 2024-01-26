import React, { useEffect, useState } from 'react';
import GraphComp from './components/GraphComp';
import axios from 'axios';


const App = () => {
  const [xAxisData, setXAxisData] = useState([])
  const [yAxisData, setYAxisData] = useState([])
  const getAxis = async() => {
    try {
      let xData = await axios.get('https://retoolapi.dev/gDa8uC/data')
      let yData = await axios.get('https://retoolapi.dev/o5zMs5/data')
      if(yData && xData && yData.status === 200 && xData.status ===200){
        setXAxisData(xData.data?.slice(0, 50))
        setYAxisData(yData.data?.slice(0, 50))
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getAxis()
  },[])
  return <GraphComp xaxis={xAxisData} yaxis={yAxisData} />;
};

export default App;
