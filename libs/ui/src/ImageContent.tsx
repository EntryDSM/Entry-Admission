import { colors, Flex, Text } from '@entry/design-token';
import { ImageChange, Photo } from '@entry/ui';
import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { usePageData } from '@entry/ui';

interface IImgType {
  imgUrl?: string | null | File;
  setImgUrl: React.Dispatch<React.SetStateAction<string | null | File>>;
  onFileChange?: (file: File | null) => void;
}

export const ImageContent = ({ imgUrl, setImgUrl, onFileChange }: IImgType) => {
  const imgRef = useRef<HTMLInputElement>(null);
  const [isHover, setIsHover] = useState(false);
  const [{ idPhoto }] = usePageData('second');
  const lastIdPhotoRef = useRef<string | File | null>(null);

  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    if (idPhoto !== null && idPhoto !== lastIdPhotoRef.current) {
      lastIdPhotoRef.current = idPhoto;
      setImgUrl(idPhoto);
    }
  }, [idPhoto, setImgUrl]);

  // imgUrl 처리 로직 개선
  useEffect(() => {
    if (imgUrl) {
      if (typeof imgUrl === 'string') {
        setBlobUrl(imgUrl);
      } else if (imgUrl instanceof File) {
        const url = URL.createObjectURL(imgUrl);
        setBlobUrl(url);
      }
    } else {
      setBlobUrl(null);
    }
  }, [imgUrl]);

  const handleChange = () => {
    const file = imgRef.current?.files?.[0];
    if (file) {
      setImgUrl(file);
      onFileChange?.(file);
    }
  };

  return (
    <ImgSelector
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={() => imgRef.current?.click()}
      imgUrl={blobUrl}
    >
      {isHover && blobUrl && (
        <HoverSelector>
          <ImageChange />
          <Text fontSize={12} color={colors.gray[200]}>
            눌러서 사진을 변경
          </Text>
        </HoverSelector>
      )}
      <FileInput type="file" ref={imgRef} onChange={handleChange} />
      {blobUrl ? (
        <ImgContentStyled src={blobUrl} alt="img" />
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

const ImgContentStyled = styled.img`
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
