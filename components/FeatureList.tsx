import { FlatList } from 'react-native';
import { FeatureItem } from './FeatureItem';
import { features } from '@/types/features';

export const FeaturesList = () => {
  return (
    <FlatList
      data={features}
      keyExtractor={(item) => item.id.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 20,
        marginHorizontal: 'auto',
        gap: 24,
      }}
      renderItem={({ item }) => (
        <FeatureItem icon={item.icon} title={item.title} />
      )}
    />
  );
};
