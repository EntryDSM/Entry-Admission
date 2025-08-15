import  styled  from '@emotion/styled';
import { colors, Text } from '@entry/design-token';

interface IInputSectionType {
  label: string
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: number;
  suffix: string;
}

export const InputSection = ({label,suffix, value, onChange,placeholder,} : IInputSectionType) => {
  return (
    <FormContainer>
      <Text fontSize={20}>{label}</Text>
      <InputWrapper>
        <StyledInput
          type="number"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      <InputSuffix>{suffix}</InputSuffix>
    </InputWrapper>
    </FormContainer>
  )
}


const InputWrapper = styled.div`
  position: relative;
  width: fit-content;
`;

const StyledInput = styled.input `
  width: 300px;
  height: 48px;
  border: 2px solid ${colors.gray[300]};
  border-radius: 12px;
  padding: 0 40px 0 20px;
  font-size: 16px;
  outline: none;
  box-sizing: border-box;
  text-align: right;
`;

const InputSuffix = styled.span`
  position: absolute;
  top: 50%;
  right: 23px;
  transform: translateY(-50%);
  font-size: 16px;
  color: ${colors.gray[500]};
  pointer-events: none;
`;


const FormContainer = styled.div`
  width: 100%;
  padding: 32px 0;
  display: flex;
  gap: 20px;
  align-items: center;
  border-bottom: 1px solid ${colors.gray[200]};
`;