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

// get all products
router.get("/all", async (req, res) => {
    try {
        const data = await fetchData();
        res.send(data);
    } catch (err) {
        console.error('Error fetching data', err);
        res.status(500).send('Internal Server Error');
    }
});

// get a product by ID
router.get('/all/:id', async (req, res) => {
    try {
        const data = await fetchData();
        const productId = parseInt(req.params.id, 10);

        console.log(`Searching for product with ID: ${productId}`);

        const product = data.find(item => item.id === productId);

        if (!product) {
            return res.status(404).send('Product not found');
        }

        res.send(product);
    } catch (error) {
        console.error('Error fetching data from third-party API:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get("/transactions", async (req, res) => {
    try {
        const { search = '', page = 1, per_page = 10 } = req.query;
        const data = await fetchData();

        let filteredData = data;

        if (search) {
            const lowerSearch = search.toLowerCase();
            filteredData = data.filter(item =>
                item.title.toLowerCase().includes(lowerSearch) ||
                item.description.toLowerCase().includes(lowerSearch) ||
                item.price.toString().includes(lowerSearch)
            );
        }

        const start = (page - 1) * per_page;
        const end = start + per_page;
        const paginatedData = filteredData.slice(start, end);

        res.json({
            total: filteredData.length,
            page: parseInt(page, 10),
            per_page: parseInt(per_page, 10),
            data: paginatedData
        });
    } catch (err) {
        console.error('Error fetching data', err);
        res.status(500).send('Internal Server Error');
    }
});


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
    December: 12
  };
  
  router.get("/statistics", async (req, res) => {
      try {
          const { month } = req.query;
          const selectedMonth = monthNameToNumber[month];
  
          if (!selectedMonth) {
              return res.status(400).send('Invalid month');
          }
  
          const data = await fetchData();
  
          let totalSales = 0;
          let soldItems = 0;
          let notSoldItems = 0;
  
          data.forEach(item => {
              const itemMonth = new Date(item.dateOfSale).getMonth() + 1;
              if (itemMonth === selectedMonth) {
                  if (item.sold) {
                      totalSales += item.price; // Accumulate price of sold items
                      soldItems++;
                  } else {
                      notSoldItems++;
                  }
              }
          });
  
          res.json({
              totalSales,
              soldItems,
              notSoldItems
          });
      } catch (err) {
          console.error('Error fetching data', err);
          res.status(500).send('Internal Server Error');
      }
  });


module.exports = router;
