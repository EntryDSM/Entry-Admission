import styled from '@emotion/styled';
import { colors } from '@entry/design-token';

interface IApplicantExportBtnType {
  text: string;
  onClick: () => void;
}

export const ApplicantExortBtn = ({
  text,
  onClick,
}: IApplicantExportBtnType) => {
  return <Button onClick={onClick}>{text}</Button>;
};

const Button = styled.button`
  color: ${colors.green[500]};
  border: 1px solid ${colors.green[500]};
  background: none;
  border-radius: 6px;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 0.2s ease;

  @media (max-width: 600px) {
    padding: 10px 12px;
    font-size: 12px;
  }

  @media (max-width: 400px) {
    padding: 8px 10px;
    font-size: 11px;
  }

  &:hover {
    background-color: ${colors.green[100]};
  }
`;
