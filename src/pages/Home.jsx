import { useEffect, useState } from 'react';
import LineChart from '../components/LineChart';

const Home = () => {
  const [chartPriceData, setChartPriceeData] = useState({});
  useEffect(() => {
    const socket = new WebSocket('wss://ws.finnhub.io?token=cm19ie1r01qk0g5fmu2gcm19ie1r01qk0g5fmu30');

    // Connection opened -> Subscribe
    socket.addEventListener('open', function () {
      //   socket.send(JSON.stringify({ type: 'subscribe', symbol: 'AAPL' }));
      socket.send(JSON.stringify({ type: 'subscribe', symbol: 'BINANCE:BTCUSDT' }));
      //   socket.send(JSON.stringify({ type: 'subscribe', symbol: 'IC MARKETS:1' }));
    });

    // Listen for messages
    socket.addEventListener('message', function (event) {
      try {
        const messageData = JSON.parse(event.data);
        console.log('Message from server ', messageData.data[0]);
        setChartPriceeData(messageData.data[0]);
        // You can handle the received messageData here as a JSON object
      } catch (error) {
        console.error('Error parsing message data:', error);
      }
      // You can handle the received message here
    });

    // Clean up the WebSocket connection on component unmount
    return () => {
      socket.close();
    };
  }, []); // Empty dependency array means this effect runs once when the component mounts

  // Unsubscribe function
  // eslint-disable-next-line no-unused-vars
  const unsubscribe = (symbol) => {
    // eslint-disable-next-line no-undef
    socket.send(JSON.stringify({ type: 'unsubscribe', symbol: symbol }));
  };

  return (
    <div>
      Home
      <LineChart chartPriceData={chartPriceData} />
    </div>
  );
};

export default Home;
