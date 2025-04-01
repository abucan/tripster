import ActionSheet, {
  registerSheet,
  SheetDefinition,
} from 'react-native-actions-sheet';
import { View, Text } from 'react-native';

function SelectPlanningChoiceSheet() {
  return (
    <ActionSheet containerStyle={{ height: 300 }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 16,
          paddingHorizontal: 20,
          gap: 16,
        }}
      >
        <Text
          style={{
            fontFamily: 'Helvetica-Now-Display-Bold',
            fontSize: 20,
            color: '#1e3a8a',
            textAlign: 'center',
          }}
        >
          Create your plan with
        </Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontFamily: 'Helvetica-Now-Display-Bold',
                fontSize: 16,
                color: '#1e3a8a',
              }}
            >
              AI Help
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontFamily: 'Helvetica-Now-Display-Bold',
                fontSize: 16,
                color: '#1e3a8a',
              }}
            >
              Manually
            </Text>
          </View>
        </View>
      </View>
    </ActionSheet>
  );
}

registerSheet('select-planning-choice-sheet', SelectPlanningChoiceSheet);

declare module 'react-native-actions-sheet' {
  interface Sheets {
    'select-planning-choice-sheet': SheetDefinition;
  }
}

export {};
