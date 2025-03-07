import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { Step } from '../types/financial';

interface StepIndicatorProps {
  currentStep: Step;
}

const steps = ['Profile', 'Income', 'Expenses', 'Goal', 'Amount', 'Time', 'Plan'];

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  return (
    <div className="flex items-center space-x-2 text-sm text-gray-400">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <span className={currentStep >= index ? 'text-blue-500' : ''}>
            {step}
          </span>
          {index < steps.length - 1 && <ChevronRightIcon className="h-4 w-4" />}
        </React.Fragment>
      ))}
    </div>
  );
};