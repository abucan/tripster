import { Text,View } from 'react-native';
import ActionSheet, {
  registerSheet,
  SheetDefinition,
} from 'react-native-actions-sheet';

function SelectPlanningChoiceSheet() {
  return (
    <ActionSheet containerStyle={{ height: 300 }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingVertical: 16,
          paddingHorizontal: 20,
          gap: 16,
          backgroundColor: 'red',
          height: '100%',
        }}
      ></View>
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
