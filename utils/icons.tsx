import { Text } from 'react-native';

export const getIconForPlaceType = (type: string) => {
  switch (type) {
    case 'country':
      return <Text>Globe</Text>;
    case 'region':
      return <Text>Map</Text>;
    case 'city':
      return <Text>Building</Text>;
    case 'neighborhood':
      return <Text>Home</Text>;
    default:
      return <Text>MapPin</Text>;
  }
};
