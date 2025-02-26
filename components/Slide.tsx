import {
  Dimensions,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const { height } = Dimensions.get('screen');

interface SlideProps {
  image: ImageSourcePropType;
  header: string;
  description: string;
}

export const Slide = ({ image, header, description }: SlideProps) => {
  return (
    <View style={styles.container}>
      <Image source={image} resizeMode="contain" style={styles.imageWrapper} />
      <View style={styles.body}>
        <Text style={styles.title}>{header}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: height * 0.04,
    gap: 24,
  },
  imageWrapper: {
    flex: 0.6,
  },
  body: {
    alignItems: 'center',
    flex: 0.4,
    gap: 8,
  },
  title: {
    textAlign: 'center',
    lineHeight: 46,
    fontFamily: 'Helvetica-Now-Display-Bold',
    fontSize: 38,
  },
  description: {
    textAlign: 'center',
    lineHeight: 26,
    fontFamily: 'Helvetica-Now-Display-Regular',
    fontSize: 18,
    color: '#4b5563',
  },
});
