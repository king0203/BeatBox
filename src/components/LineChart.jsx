import React from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';
import { Chart, registerables} from 'chart.js';

Chart.register(...registerables);

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  // Extracting price and timestamp data from coinHistory and storing them in separate arrays
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp * 1000).toLocaleDateString());
  }

  // Configuring chart data
  const data = {
    labels: coinTimestamp, // X-axis labels (timestamps)
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice, // Y-axis data points (prices)
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  // Configuring chart options
  const options = {
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true, // Y-axis starts from zero
          },
        },
      ],
    },
  };

  return (
    <>
      {/* Chart Header */}
      <Row className="chart-header">
        <Title level={2} className="chart-title">{coinName} Price Chart </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">Change: {coinHistory?.data?.change}%</Title> {/* Displaying percentage change in price */}
          <Title level={5} className="current-price">Current {coinName} Price: $ {currentPrice}</Title> {/* Displaying current price */}
        </Col>
      </Row>
      {/* Rendering the Line chart */}
      <Line data={data} options={options}/>
    </>
  );
};

export default LineChart;
