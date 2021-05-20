import React, { useState, useEffect } from 'react';

import * as Location from 'expo-location';

export const GetLocation = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  if (errorMsg) {
    return errorMsg;
  } else if (location !== undefined && location !== null) {
    return location;
  }
};
