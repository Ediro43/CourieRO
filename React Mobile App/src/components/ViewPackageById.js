import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { base } from '../utilities/constant';

export const ViewPackageById = (packageId, func) => {
  const [packages, setPackages] = useState('');
  const viewPackageId = `${base}viewpackage?id=${packageId}`;
  axios.get(viewPackageId).then(
    (response) => {
      console.log(response.data.state);
      func(response.data.state);
    },
    (error) => {
      func('error');
      console.log('dsadas', error);
    }
  );
};
