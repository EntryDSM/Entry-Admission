import styled from '@emotion/styled';
import { colors } from '@entry/design-token';
import { Search } from '@entry/ui';

interface ISearchBarType {
  placeholder?: string;
  width?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

export const SearchBar = ({
  placeholder,
  width,
  onChange,
  value,
}: ISearchBarType) => {
  return (
    <FakeInput>
      <ImageContainer>
        <Search />
      </ImageContainer>
      <SearchInput
        type="text"
        width={width}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </FakeInput>
  );
};

const ImageContainer = styled.div`
  position: absolute;
  top: 13px;
  left: 24px;
`;

const FakeInput = styled.div`
  width: 100%;
  position: relative;
  height: 48px;
`;

const SearchInput = styled.input<Pick<ISearchBarType, 'width'>>`
  width: ${({ width }) => (width ? width : '100%')};
  height: 48px;
  border-radius: 24px;
  border: 1px solid ${colors.gray[300]};
  background-color: ${colors.extra.realWhite};
  padding: 12px 24px 12px 58px;
  font-size: 16px;
  color: ${colors.extra.realBlack};
  &::placeholder {
    color: ${colors.gray[300]};
    font-size: 16px;
  }
`;
