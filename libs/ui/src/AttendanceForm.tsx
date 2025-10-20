import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { colors, Text } from '@entry/design-token';
import { Check } from './assets';

interface IAttendanceFormType {
  title: string;
  value: string | number | null;
  onChange: (value: string) => void;
  defaultCount?: number;
  width?: string;
  suffix: string;
  prefix?: string;
  maxLength?: number;
  maxScore?: number;
  minScore?: number;
}

export const AttendanceForm: React.FC<IAttendanceFormType> = ({
  title,
  value,
  onChange,
  defaultCount,
  width = '100%',
  suffix,
  prefix,
  maxScore,
  minScore = 0,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState<boolean>(false);

  useEffect(() => {
    setIsFilled(!!value || value === 0);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: rawValue } = e.target;

    // 숫자만 추출 (마이너스 기호 제거)
    const onlyNums = rawValue.replace(/[^0-9]/g, '');

    // 빈 값 처리
    if (onlyNums === '') {
      onChange('');
      return;
    }

    const numValue = Number(onlyNums);

    // 0 이상인지 체크
    if (numValue < minScore) {
      return;
    }

    // 최대값이 설정되어 있으면 최대값 체크
    if (maxScore !== undefined && numValue > maxScore) {
      return;
    }

    // 숫자로 변환 후 다시 문자열로 (선행 0 자동 제거)
    onChange(String(numValue));
  };

  return (
    <Container width={width}>
      <HeaderRow>
        <CheckMark hasValue={!!value}>
          <Check />
        </CheckMark>
        <Text>
          {prefix ? `${prefix} ` : ''}
          {title}
        </Text>
      </HeaderRow>
      <InputWrapper>
        <StyledInput
          suffix={suffix}
          type="text"
          value={value ?? ''}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          hasValue={!!value}
          isFocused={isFocused}
        />
        <InputSuffix isFilled={isFilled}>{suffix}</InputSuffix>
      </InputWrapper>
    </Container>
  );
};

const Container = styled.div<Pick<IAttendanceFormType, 'width'>>`
  width: ${({ width }) => width};
  margin-bottom: 16px;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  gap: 20px;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledInput = styled.input<{
  hasValue: boolean;
  isFocused: boolean;
  suffix: string;
}>`
  width: 100%;
  height: 48px;
  border: 2px solid
    ${(props) =>
      props.isFocused
        ? props.hasValue
          ? colors.orange[800]
          : colors.gray[300]
        : props.hasValue
        ? colors.orange[800]
        : colors.gray[300]};
  border-radius: 12px;
  padding: ${({ suffix }) =>
    suffix && suffix.length > 1 ? '0 54px 0 20px' : '0 40px 0 20px'};
  font-size: 16px;
  outline: none;
  box-sizing: border-box;
  text-align: right;
`;

const InputSuffix = styled.span<{ isFilled: boolean }>`
  position: absolute;
  top: 50%;
  right: 23px;
  transform: translateY(-50%);
  font-size: 16px;
  color: ${({ isFilled }) => (isFilled ? colors.gray[500] : colors.gray[300])};
  pointer-events: none;
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
