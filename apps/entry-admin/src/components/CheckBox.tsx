import styled from '@emotion/styled';
import { colors } from '@entry/design-token';

interface ICheckBoxType {
  isChecked: boolean;
  label: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CheckBox = ({ isChecked, label, onChange }: ICheckBoxType) => {
  return (
    <Container>
      <Label>
        <input type="checkbox" checked={isChecked} onChange={onChange} />
        {label}
      </Label>
    </Container>
  );
};

const Container = styled.div`
  input[type='checkbox'] {
    accent-color: ${colors.green[400]};
  }
`;

const Label = styled.label`
  margin-left: 8px;
  font-size: 16px;
  color: ${colors.gray[400]};
  cursor: pointer;
  white-space: nowrap;

  @media (max-width: 480px) {
    font-size: 14px;
  }

  input[type='checkbox'] {
    margin-right: 8px;

    @media (max-width: 480px) {
      margin-right: 6px;
    }
  }
`;
