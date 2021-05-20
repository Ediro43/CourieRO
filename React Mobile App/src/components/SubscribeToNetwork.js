import NetInfo from '@react-native-community/netinfo';

export const SubscribeToNetwork = () => {
  // Subscribe
  const unsubscribe = NetInfo.addEventListener((state) => {
    console.log('Connection type', state.type);
    console.log('Is connected?', state.isConnected);
  });

  // Unsubscribe
  unsubscribe();
};
