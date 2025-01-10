import axios from 'axios';

/**
 * @typedef {Object} Products
 * @property {number} id
 * @property {string} title
 * @property {string} description
 * @property {Number} price
 * @property {Date} dateOfSale
 * @property {string} category
 * @property {boolean} sold
 */

/**
 * 
 * @returns {Promise<Products>}
 */

const getProduct = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/all');
        
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        } else {
            throw new Error(`Failed to fetch products. Status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error fetching products data:', error);
        throw error;
    }
};

export default getProduct;