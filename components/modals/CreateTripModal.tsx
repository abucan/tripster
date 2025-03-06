import LottieView from 'lottie-react-native';
import { StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';

import lottie from '@/assets/animations/lottie.json';
import { Button } from '@/components/Button';
import { DefaultModalProps } from '@/types';

export function CreateTripModal({
  showModal,
  setShowModal,
  onDonePress,
}: DefaultModalProps) {
  return (
    <Modal
      isVisible={showModal}
      animationIn="fadeIn"
      animationOut="fadeOut"
      collapsable={false}
    >
      <View style={styles.modalContainer}>
        <LottieView
          source={lottie}
          autoPlay
          loop={false}
          style={styles.lottie}
        />
        <View style={{ gap: 6 }}>
          <Text style={styles.title}>Start planning your adventure!</Text>
          <Text style={styles.description}>
            Plan every detail yourself or get{' '}
            <Text style={{ fontFamily: 'Helvetica-Now-Display-Bold' }}>
              AI-powered
            </Text>{' '}
            recommendations.
          </Text>
        </View>
        <Button
          title="Get Started"
          size="lg"
          style={{ width: '100%' }}
          onPress={onDonePress}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    width: '100%',
    height: '45%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  lottie: {
    width: 180,
    height: 180,
  },
  title: {
    fontFamily: 'Helvetica-Now-Display-Bold',
    fontSize: 24,
    textAlign: 'center',
  },
  description: {
    fontFamily: 'Helvetica-Now-Display-Regular',
    fontSize: 16,
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.5)',
  },
});
