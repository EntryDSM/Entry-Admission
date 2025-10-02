import styled from '@emotion/styled';
import { search } from '../assets';
import { colors } from '@entry/design-token';
import { useState } from 'react';

interface IFindApplicantInputType {
  onSearch: (keyword: string) => void;
}

export const FindApplicantInput = ({ onSearch }: IFindApplicantInputType) => {
  const [keyword, setKeyword] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeyword(value);
    onSearch(value);
  };

  return (
    <InputContainer>
      <img src={search} alt="" />
      <input
        type="text"
        value={keyword}
        onChange={handleChange}
        placeholder="지원자 검색"
      />
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
