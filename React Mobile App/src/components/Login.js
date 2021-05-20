import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { base } from '../utilities/constant';

export const Login = (username, password, longitude, latitude, func) => {
  const loginURL = base + 'login';
  axios
    .post(loginURL, null, {
      params: {
        username: username,
        password: password,
        latitude: latitude,
        longitude: longitude,
      },
    })
    .then(
      (response) => {
        if (response.data.status === 'failure') func(-1);
        func(response.data.id);
      },
      (error) => {
        func('error');
        console.log(error);
      }
    );
};
