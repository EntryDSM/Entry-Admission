import { InputHTMLAttributes } from 'react';
import styled from '@emotion/styled';
import { colors } from '@entry/design-token';

interface ISearchBar extends InputHTMLAttributes<HTMLInputElement> {
  width?: string;
}

export const SearchBar = ({ width = '384px', ...props }: ISearchBar) => {
  return (
    <SearchBarContainer width={width}>
      <Search {...props} />
      <SearchIcon
        width="19"
        height="19"
        viewBox="0 0 19 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M13.3516 6.30021C13.3516 2.86657 10.5681 0.083313 7.13406 0.083313C3.70006 0.083313 0.916504 2.86657 0.916504 6.30021C0.916504 9.73384 3.70006 12.5171 7.13406 12.5171C8.4796 12.5171 9.73022 12.0863 10.7519 11.3524L14.2202 14.8117C14.5833 15.1741 15.1713 15.1738 15.5341 14.8111L15.6443 14.7009C16.0077 14.3375 16.0072 13.7482 15.6431 13.3854L12.1745 9.93469C12.916 8.90997 13.3516 7.65308 13.3516 6.30021ZM2.8296 6.30021C2.8296 8.68176 4.75226 10.6042 7.13406 10.6042C9.51586 10.6042 11.4385 8.68176 11.4385 6.30021C11.4385 3.91866 9.51586 1.9962 7.13406 1.9962C4.75226 1.9962 2.8296 3.91866 2.8296 6.30021Z"
          fill="#B0B0B0"
        />
      </SearchIcon>
    </SearchBarContainer>
  );
};

const SearchIcon = styled.svg`
  position: absolute;
  width: 19px;
  height: 19px;
  align-self: center;
  right: 0;
  margin-right: 18px;
`;

const Search = styled.input`
  width: 100%;
  padding-left: 16px;
  padding-right: 40px;
  font-size: 16px;
  border: 1px solid ${colors.gray[100]};
  border-radius: 8px;

  &:focus {
    outline: none;
  }
`;

const SearchBarContainer = styled.div<{ width: string }>`
  width: ${({ width }) => width};
  height: 48px;
  position: relative;
  display: flex;
`;
