import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AuthComponent = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [products, setProducts] = useState([]);

  const authenticateAndGetToken = async () => {
    const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/';
    const targetUrl = 'http://20.244.56.144/test/auth';
    const dataUrl = "http://20.244.56.144/test/companies/AMZ/categories/Laptop/products?top=10&minPrice=1&maxPrice=10000";
    const data = {
      companyName: 'AFFORDMED',
      clientID: '40913b07-f2f6-4d18-a745-c4619e1fad70',
      clientSecret: 'FQaDrGmFXOqPkbUl',
      ownerName: 'vibeesh',
      ownerEmail: 'vibeeshn.21aid@kongu.edu',
      rollNo: '21ADR059'
    };

    try {
      const response = await axios.post(corsAnywhereUrl + targetUrl, data, {
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest', 
        },
      });

      console.log(response)

      const accessToken = response.data.access_token; 
      console.log(accessToken)

      setAccessToken(accessToken);


      const response2 = await axios.get(corsAnywhereUrl + dataUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-Requested-With': 'XMLHttpRequest', 
        },
      });
      console.log(response2)
      setProducts(response2.data); 
    } catch (error) {
      console.error('Authentication error:', error);
      // Handle error (e.g., show error message)
    }
  };
  
  useEffect(() => {
    authenticateAndGetToken(); 
  }, []);

  return (
    <div>
      <h1>Product List</h1>
      <ul>
  {products.map((product, index) => (
    <li key={index}>
      {product.productName} - Price: {product.price} - Rating: {product.rating}
    </li>
  ))}
</ul>

    </div>
  );
};

export default AuthComponent;
