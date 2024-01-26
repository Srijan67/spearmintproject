import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const GraphComp = ({ xaxis, yaxis }) => {
  const chartRef = useRef();
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    if (chartInstance.current !== null) {
      chartInstance.current.destroy();
    }

    const xData = xaxis.map(data => parseFloat(data.RandomNumber));
    const yData = yaxis.map(data => parseFloat(data.RandomNumber));

    const data = xData.map((x, index) => ({ x, y: yData[index] }));

    chartInstance.current = new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: [
          {
            label: 'Scatter Plot',
            data,
            borderColor: 'rgb(54, 162, 235)',
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
            title: {
              display: true,
              text: 'X Axis',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Y Axis',
            },
          },
        },
      },
    });

    // Cleanup on unmount
    return () => {
      if (chartInstance.current !== null) {
        chartInstance.current.destroy();
      }
    };
  }, [xaxis, yaxis]);

  return  <div style={{ width: '90vw', height: '90vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
   <canvas ref={chartRef} style={{ maxWidth: '100%', maxHeight: '100%' }} />
  </div>;
};

export default GraphComp;
