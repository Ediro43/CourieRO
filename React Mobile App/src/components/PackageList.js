import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { base } from '../utilities/constant';

export const PackageList = (courierID) => {
  const [packages, setPackages] = useState([]);

  const courierPackages = `${base}packages?cid=${courierID}`;

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(courierPackages);

      console.log(result.data);
      setPackages(result.data);
    };
    fetchData();
  }, [setPackages]);

  return packages;
};
