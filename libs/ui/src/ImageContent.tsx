import { colors, Flex, Text } from '@entry/design-token';
import { ImageChange, Photo } from '@entry/ui';
import styled from '@emotion/styled';
import { useRef, useState } from 'react';

interface IImgType {
  imgUrl?: string | null;
  setImgUrl: React.Dispatch<React.SetStateAction<string | null>>;
  onFileChange?: (file: File | null) => void;
}

export const ImageContent = ({ imgUrl, setImgUrl, onFileChange }: IImgType) => {
  const imgRef = useRef<HTMLInputElement>(null);
  const [isHover, setIsHover] = useState(false);

  const handleChange = () => {
    const file = imgRef.current?.files?.[0];
    if (file) {
      const newUrl = URL.createObjectURL(file);
      setImgUrl(newUrl);
      onFileChange?.(file);
    }
  };

  return (
    <ImgSelector
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={() => imgRef.current?.click()}
      imgUrl={imgUrl}
    >
      {isHover && imgUrl && (
        <HoverSelector>
          <ImageChange />
          <Text fontSize={12} color={colors.gray[200]}>
            눌러서 사진을 변경
          </Text>
        </HoverSelector>
      )}
      <FileInput type="file" ref={imgRef} onChange={handleChange} />
      {imgUrl ? (
        <ImgContent src={imgUrl} alt="img" />
      ) : (
        <Flex
          isColumn={true}
          width="100%"
          height="fit-content"
          gap={16}
          alignItems="center"
        >
          <Photo />
          <Text fontSize={12} color={colors.gray[300]}>
            눌러서 사진을 업로드
          </Text>
        </Flex>
      )}
    </ImgSelector>
  );
};

const ImgSelector = styled.div<{ imgUrl?: string | File | null }>`
  position: relative;
  width: 150px;
  height: 190px;
  border-radius: 4px;
  border: 1px solid ${colors.gray[300]};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  overflow: hidden;
`;

const ImgContent = styled.img`
  width: 100%;
`;

const HoverSelector = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 16px;
  background-color: #0000003e;
`;

const FileInput = styled.input`
  display: none;
`;
