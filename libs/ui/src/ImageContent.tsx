import { colors, Flex, Text } from '@entry/design-token';
import { ImageChange, Photo } from './assets';
import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';

interface IImgType {
  onFileChange?: (file: File | null) => void;
  initialImgUrl?: string | File | null;
  onClick?: () => void;
}

export const ImageContent = ({ onFileChange, initialImgUrl = null, onClick }: IImgType) => {
  const imgRef = useRef<HTMLInputElement>(null);
  const [isHover, setIsHover] = useState(false);
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [fileObj, setFileObj] = useState<File | null>(null);

  useEffect(() => {
    // 초기 이미지 URL 혹은 File이 바뀌면 업데이트
    if (typeof initialImgUrl === 'string') {
      setImgUrl(initialImgUrl);
      setFileObj(null);
    } else if (initialImgUrl instanceof File) {
      setFileObj(initialImgUrl);
    } else {
      setImgUrl(null);
      setFileObj(null);
    }
  }, [initialImgUrl]);

  useEffect(() => {
    if (!fileObj) return;

    const url = URL.createObjectURL(fileObj);
    setImgUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [fileObj]);

  const handleChange = () => {
    const file = imgRef.current?.files?.[0] ?? null;

    if (!file) {
      onFileChange?.(null);
      setFileObj(null);
      setImgUrl(null);
      return;
    }

    const validTypes = ['image/jpeg', 'image/png'];
    const maxSizeMB = 5;

    if (!validTypes.includes(file.type)) {
      alert('JPG 또는 PNG 형식의 이미지 파일만 업로드할 수 있어요.');
      return;
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      alert('파일 크기는 5MB 이하로 업로드해주세요.');
      return;
    }

    setFileObj(file);
    onFileChange?.(file);
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      imgRef.current?.click();
    }
  };

  return (
    <ImgSelector
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={handleClick}
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
      <FileInput type="file" ref={imgRef} onChange={handleChange} accept="image/jpeg, image/png" />
      {imgUrl ? (
        <ImgContentStyled src={imgUrl} alt="img" />
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

const ImgSelector = styled.div<{ imgUrl?: string | null }>`
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
