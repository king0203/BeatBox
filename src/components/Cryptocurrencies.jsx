import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';

import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';

const Cryptocurrencies = ({ simplified }) => {
  // Determine the number of cryptocurrencies to fetch based on 'simplified' prop
  const count = simplified ? 10 : 100;

  // Fetch cryptocurrency data using the custom 'useGetCryptosQuery' hook
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);

  // State to hold the filtered cryptocurrencies based on the search term
  const [cryptos, setCryptos] = useState();

  // State to hold the search term entered by the user
  const [searchTerm, setSearchTerm] = useState('');

  // Update the 'cryptos' state whenever 'cryptosList' or 'searchTerm' changes
  useEffect(() => {
    // Set the 'cryptos' state with the data fetched from the API
    setCryptos(cryptosList?.data?.coins);

    // Filtering the cryptocurrency data based on the search term
    const filteredData = cryptosList?.data?.coins.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );

    // Update the 'cryptos' state with the filtered data
    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  // If data is still fetching, display a loading spinner
  if (isFetching) return <Loader />;

  return (
    <>
      {!simplified && (
        // Show the search input if not in simplified mode
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {/* Map through the cryptocurrencies and render each as a Card */}
        {cryptos?.map((currency) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className="crypto-card"
            key={currency.uuid}
          >
            {/* Link to the details page for the selected cryptocurrency */}
            <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} />}
                hoverable
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {currency.change}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
