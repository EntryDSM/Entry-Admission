import styled from '@emotion/styled';
import { colors, Flex, Text } from '@entry/design-token';
import { useEffect, useRef, useState } from 'react';
import { ImageChange, Photo } from './assets';
import { PreviousButton } from './PreviousButton';

interface IPhotoUploadModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onFileUpload: (file: File | null) => void;
  initialImgUrl?: string | File | null;
  isLoading?: boolean;
}

export const PhotoUploadModal = ({
  isOpen,
  setIsOpen,
  onFileUpload,
  initialImgUrl = null,
  isLoading = false,
}: IPhotoUploadModalProps) => {
  const imgRef = useRef<HTMLInputElement>(null);
  const backRef = useRef(null);
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
  };

  const backClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (backRef.current === e.target && !isLoading) {
      setIsOpen(false);
    }
  };

  const handleUpload = () => {
    if (!isLoading) {
      onFileUpload(fileObj);
    }
  };

  const handleCancel = () => {
    if (!isLoading) {
      setIsOpen(false);
    }
  };

  return (
    isOpen && (
      <Back ref={backRef} onClick={backClick}>
        <Modal>
          <Flex
            width="fit-content"
            height="fit-content"
            isColumn={true}
            gap={24}
            alignItems="center"
          >
            <Text fontSize={28} fontWeight={700}>
              증명 사진 업로드
            </Text>
            <ImgSelector
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
              onClick={() => !isLoading && imgRef.current?.click()}
              imgUrl={imgUrl}
              isDisabled={isLoading}
            >
              {isHover && imgUrl && (
                <HoverSelector>
                  <ImageChange />
                  <Text fontSize={12} color={colors.gray[200]}>
                    눌러서 사진을 변경
                  </Text>
                </HoverSelector>
              )}
              <FileInput
                type="file"
                ref={imgRef}
                onChange={handleChange}
                accept="image/jpeg, image/png"
              />
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
            <Text fontSize={14} fontWeight={400} color={colors.gray[400]}>
              증명사진은 3×4cm 규격이어야 하며, 파일 형식은 JPG·PNG만 가능합니다.
            </Text>
            <Text fontSize={14} fontWeight={400} color={colors.gray[400]}>
              파일 용량은 5MB 이하로 제한됩니다.
            </Text>
          </Flex>
          <Flex gap={16} width="fit-content" height="fit-content">
            <PreviousButton
              backgroundColor={colors.extra.realWhite}
              color={colors.gray[500]}
              borderColor={colors.gray[300]}
              hoverBackgroundColor="none"
              onClick={handleCancel}
              isBlocked={isLoading}
            >
              취소
            </PreviousButton>
            <PreviousButton
              backgroundColor={colors.orange[800]}
              hoverBackgroundColor={colors.orange[850]}
              onClick={handleUpload}
              isBlocked={!fileObj || isLoading}
            >
              {isLoading ? '업로드 중...' : '업로드'}
            </PreviousButton>
          </Flex>
        </Modal>
      </Back>
    )
  );
};

const Modal = styled.div`
  padding: 44px 60px;
  border-radius: 24px;
  background-color: ${colors.extra.realWhite};
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
`;

const Back = styled.div`
  z-index: 120;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(0, 0, 0, 0.2);
`;

const ImgSelector = styled.div<{ imgUrl?: string | null; isDisabled?: boolean }>`
  position: relative;
  width: 200px;
  height: 250px;
  border-radius: 4px;
  border: 1px solid ${colors.gray[300]};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${(props) => (props.isDisabled ? 'not-allowed' : 'pointer')};
  opacity: ${(props) => (props.isDisabled ? 0.6 : 1)};
  overflow: hidden;
`;

const ImgContentStyled = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
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
