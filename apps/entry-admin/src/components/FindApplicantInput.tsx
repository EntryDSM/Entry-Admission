import styled from '@emotion/styled';
import { SearchIcon } from '../assets';
import { colors } from '@entry/design-token';

export const FindApplicantInput = () => {
  return (
    <InputContainer>
      <img src={SearchIcon} alt="" />
      <input type="text" placeholder="지원자 검색" />
    </InputContainer>
  );
};

const InputContainer = styled.div`
  display: flex;
  width: 60%;
  height: 48px;
  border: 1px solid ${colors.gray[300]};
  padding-left: 27px;
  border-radius: 24px;

  @media (max-width: 768px) {
    width: 80%;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding-left: 20px;
  }

  img {
    width: 18px;
  }

  input {
    width: 100%;
    padding-left: 13px;
    border-radius: 24px;
    border: none;
    outline: none;
    background: transparent;

    &:placeholder-shown {
      color: ${colors.gray[300]};
      font-size: 16px;
    }

    &::placeholder {
      color: ${colors.gray[300]};
      font-size: 16px;
    }
  }
`;
