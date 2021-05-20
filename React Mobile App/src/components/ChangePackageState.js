import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { base } from '../utilities/constant';

export const ChangePackageState = (packageId, changeState) => {
  const changeStateURL = `${base}changestate?id=${packageId}&state=${changeState}`;
  console.log(changeStateURL);
  axios.post(changeStateURL, null).then(
    (response) => {
      console.log('login', response.data);
    },
    (error) => {
      console.log('error', error);
    }
  );
};
