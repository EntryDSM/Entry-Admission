import React, { useState } from 'react';
import styled from '@emotion/styled';
import { colors } from '@entry/design-token';

interface AttendanceFormProps {
  title: string;
  value: string;
  onChange: (value: string) => void;
  defaultCount?: number;
}

export const AttendanceForm: React.FC<AttendanceFormProps> = ({
  title,
  value,
  onChange,
  defaultCount,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNums = e.target.value.replace(/[^0-9]/g, '');
    onChange(onlyNums);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  return (
    <Container>
      <HeaderRow>
        {value && <CheckIcon>✓</CheckIcon>}
        <Title>{title}</Title>
      </HeaderRow>
      <InputContainer>
        <StyledInput
          value={value}
          onChange={handleChange}
          placeholder=""
          type="tel"
          onFocus={handleFocus}
          onBlur={() => setIsFocused(false)}
          hasValue={!!value}
          isFocused={isFocused}
        />
        {value && <CountDisplay>회</CountDisplay>}
      </InputContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin-bottom: 16px;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const CheckIcon = styled.span`
  color: ${colors.orange[800]};
  font-size: 18px;
  font-weight: bold;
  margin-right: 8px;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #333;
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const StyledInput = styled.input<{ hasValue: boolean; isFocused: boolean }>`
  width: 100%;
  height: 48px;
  border: 1px solid
    ${(props) => (props.hasValue ? colors.orange[800] : colors.gray[300])};
  border-radius: 12px;
  padding: 0 16px;
  font-size: 16px;
  outline: none;

  &:focus {
    border-color: ${(props) =>
      props.hasValue ? colors.orange[800] : colors.gray[300]};
  }
`;

const CountDisplay = styled.div`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  color: #333;
`;

export default AttendanceForm;
