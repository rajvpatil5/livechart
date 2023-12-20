import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';

// use this import to remove error for canvas already use, no-unused-vars
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from 'chart.js/auto';

const LineChart = ({ chartPriceData }) => {
  // Function to format current time as hh:mm:ss
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const [chartSampleData, setChartSampleData] = useState([]);

  useEffect(() => {
    setChartSampleData((prevData) => {
      const newData = {
        labels: [...(prevData.labels?.slice(-9) || []), getCurrentTime()],
        data: [...(prevData.data?.slice(-9) || []), chartPriceData.p],
      };

      return newData;
    });
  }, [chartPriceData]);

  const data = {
    labels: chartSampleData.labels || [],
    datasets: [
      {
        label: 'BTCUSDT Price',
        data: chartSampleData.data || [],
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  // Example options for the bar chart
  const options = {
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  return (
    <div>
      <h2>Line Chart Example</h2>
      <Line data={data} options={options} />
    </div>
  );
};

LineChart.propTypes = {
  chartPriceData: PropTypes.shape({
    p: PropTypes.number.isRequired,
  }),
};

export default LineChart;
