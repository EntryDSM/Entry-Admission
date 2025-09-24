import React from 'react';
import { colors, Text } from '@entry/design-token';
import  styled  from '@emotion/styled';

interface IDropDownSectionType {
  label: string
  value?: string,
  onChange?: (e : React.ChangeEvent<HTMLInputElement>) => void;
}

export const DropDownSection: React.FC<IDropDownSectionType> = React.memo(
  ({ value, onChange,label }) => {

    return (
      <FormContainer>
        <Text fontSize={20}>{label}</Text>
        <input type="datetime-local" value={value} onChange={onChange}/>
      </FormContainer>
    );
  }
);


const FormContainer = styled.div`
  width: 100%;
  padding: 32px 0;
  display: flex;
  gap: 20px;
  align-items: center;
  border-bottom: 1px solid ${colors.gray[200]};
`;