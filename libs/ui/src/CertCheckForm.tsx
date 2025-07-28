import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { colors, Text } from '@entry/design-token';
import {
  Check,
  OActivate,
  ONoActivate,
  XActivate,
  XNoActivate,
} from '@entry/ui';

interface ICertCheckFormType {
  title: string;
  value: 'O' | 'X' | null;
  onChange: (value: 'O' | 'X') => void;
  width?: string;
}

export const CertCheckForm: React.FC<ICertCheckFormType> = ({
  title,
  value,
  onChange,
  width = '100%',
}) => {
  const [_, setIsFilled] = useState<boolean>(false);

  useEffect(() => {
    setIsFilled(!!value);
  }, [value]);

  return (
    <Container width={width}>
      <ContentRow>
        <LeftSection>
          <CheckMark hasValue={!!value}>
            <Check />
          </CheckMark>
          <Text fontSize={32} fontWeight={600}>
            {title}
          </Text>
        </LeftSection>
        <ButtonWrapper>
          <IconButton onClick={() => onChange('O')}>
            {value === 'O' ? <OActivate /> : <ONoActivate />}
          </IconButton>
          <IconButton onClick={() => onChange('X')}>
            {value === 'X' ? <XActivate /> : <XNoActivate />}
          </IconButton>
        </ButtonWrapper>
      </ContentRow>
    </Container>
  );
};

const Container = styled.div<Pick<ICertCheckFormType, 'width'>>`
  width: ${({ width }) => width};
  margin-bottom: 16px;
`;

const ContentRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 12px 0;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 32px;
  align-items: center;
`;

const IconButton = styled.button`
  width: 52px;
  height: 52px;
  border: none;
  background: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const CheckMark = styled.span<{ hasValue: boolean }>`
  color: ${(props) => (props.hasValue ? colors.orange[800] : colors.gray[300])};
  transition: color 0.2s;

  svg {
    fill: currentColor !important;
    color: inherit !important;
  }

  * {
    fill: currentColor !important;
    stroke: currentColor !important;
  }
`;
