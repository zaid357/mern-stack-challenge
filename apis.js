const express = require('express');
const { default: axios } = require("axios");
const router = express.Router();

const API_URL = 'https://s3.amazonaws.com/roxiler.com/product_transaction.json';

// Function to fetch data from the API
const fetchData = async () => {
    try {
        const res = await axios.get(API_URL);
        return res.data;
    } catch (err) {
        console.error('Error fetching data', err);
        throw err;
    }
};

const monthNameToNumber = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12,
  };

router.get('/transactions', async (req, res) => {
    try {
      const { month } = req.query;
      const selectedMonth = monthNameToNumber[month];
  
      if (!selectedMonth) {
        return res.status(400).send('Invalid month');
      }
  
      const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
      const data = response.data;
  
      const filteredData = data.filter(item => {
        const itemMonth = new Date(item.dateOfSale).getMonth() + 1;
        return itemMonth === selectedMonth;
      });
  
      console.log(`Filtered Data for ${month}:`, filteredData); // Add this line for logging
  
      res.json(filteredData);
    } catch (err) {
      console.error('Error fetching data', err);
      res.status(500).send('Internal Server Error');
    }
  });


module.exports = router;