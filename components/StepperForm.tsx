import React, { useRef, useState } from 'react';
import { View } from 'react-native';
import { CollapsibleCard } from './CollapsibleCard';

interface Step {
  key: string;
  content: React.ReactNode;
  summary: React.ReactNode;
}

interface StepperFormProps {
  steps: Step[];
  initialStep?: number;
  currentStep: number;
  setCurrentStep: (index: number) => void;
}

export const StepperForm: React.FC<StepperFormProps> = ({
  steps,
  initialStep = 0,
  currentStep,
  setCurrentStep,
}) => {
  const stepRefs = useRef<Array<any>>([]);

  const goToStep = (index: number) => {
    if (index === currentStep || index < 0 || index >= steps.length) return;

    stepRefs.current[currentStep]?.collapse();
    stepRefs.current[index]?.expand();
    setCurrentStep(index);
  };

  const next = () => goToStep(currentStep + 1);
  const prev = () => goToStep(currentStep - 1);

  return (
    <View>
      {steps.map((step, index) => (
        <CollapsibleCard
          key={step.key}
          ref={(ref) => (stepRefs.current[index] = ref)}
          initiallyCollapsed={index !== initialStep}
          collapsedContent={step.summary}
        >
          {React.cloneElement(step.content as any, {
            onNext: next,
            onBack: prev,
          })}
        </CollapsibleCard>
      ))}
    </View>
  );
};
