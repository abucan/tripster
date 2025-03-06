import { Building, Globe, Home, Map, MapPin } from 'lucide-react-native';
export const getIconForPlaceType = (type: string) => {
  switch (type) {
    case 'country':
      return <Globe size={20} color="black" />;
    case 'region':
      return <Map size={20} color="black" />;
    case 'city':
      return <Building size={20} color="black" />;
    case 'neighborhood':
      return <Home size={20} color="black" />;
    default:
      return <MapPin size={20} color="black" />;
  }
};
