import { MaterialIcons } from '@expo/vector-icons';

export const getIconForPlaceType = (type: string) => {
  switch (type) {
    case 'country':
      return <MaterialIcons name="public" size={24} color="black" />;
    case 'region':
      return <MaterialIcons name="map" size={24} color="black" />;
    case 'city':
      return <MaterialIcons name="location-city" size={24} color="black" />;
    case 'neighborhood':
      return <MaterialIcons name="home" size={24} color="black" />;
    default:
      return <MaterialIcons name="location-on" size={24} color="black" />;
  }
};
