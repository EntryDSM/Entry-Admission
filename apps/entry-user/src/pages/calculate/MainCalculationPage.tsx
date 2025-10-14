import { useState } from 'react';
import { Flex } from '@entry/design-token';
import { Button } from '@entry/ui';
import { PrimaryCalculationPage } from './PrimaryCalculationPage';
import { GraduatedCalculationPage } from './GraduatedCalculationPage';
import { QECalculationPage } from './QECalculationPage';

type CalculationType = 'primary' | 'graduated' | 'qe';

const CALCULATION_TYPES = [
  { key: 'primary' as const, label: '졸업 예정자' },
  { key: 'graduated' as const, label: '졸업자' },
  { key: 'qe' as const, label: '검정고시' },
];

export const MainCalculationPage = () => {
  const [activeType, setActiveType] = useState<CalculationType>('primary');

  const renderCalculationPage = () => {
    switch (activeType) {
      case 'primary':
        return <PrimaryCalculationPage />;
      case 'graduated':
        return <GraduatedCalculationPage />;
      case 'qe':
        return <QECalculationPage />;
      default:
        return null;
    }
  };

  return (
    <Flex isColumn={true} width="100%" height="100vh">
      <Flex
        padding="24px 40px"
        borderBottom="1px solid #E5E5E5"
        backgroundColor="white"
        gap={32}
      >
        {CALCULATION_TYPES.map((type) => (
          <Button
            key={type.key}
            onClick={() => setActiveType(type.key)}
            width="160px"
            backgroundColor={
              activeType === type.key ? '#FF6B35' : 'transparent'
            }
            color={activeType === type.key ? 'white' : '#666'}
            borderColor={activeType === type.key ? '#FF6B35' : '#E5E5E5'}
            hoverBackgroundColor={
              activeType === type.key ? '#FF6B35' : '#F5F5F5'
            }
          >
            {type.label}
          </Button>
        ))}
      </Flex>

      <Flex flex={'1'}>{renderCalculationPage()}</Flex>
    </Flex>
  );
};
