import styled from '@emotion/styled';
import { colors } from '@entry/design-token';

interface IDepartmentType {
  isSide?: boolean;
  title: string;
  grade: string;
  content: string;
  img: string;
}

export const Department = ({
  isSide,
  title,
  grade,
  content,
  img,
}: IDepartmentType) => {
  return (
    <DepartmentContainer isSide={isSide}>
      <ImgContainer>
        <Image src={img} alt="학과 이미지" />
      </ImgContainer>
      <ContentContainer>
        <TitleContainer>
          <Title>{title}</Title>
          <Grade>{grade}</Grade>
        </TitleContainer>
        <Content>{content}</Content>
      </ContentContainer>
    </DepartmentContainer>
  );
};

const DepartmentContainer = styled.div<Pick<IDepartmentType, 'isSide'>>`
  width: ${({ isSide }) => (isSide ? 960 : 400)}px;
  display: flex;
  flex-direction: ${({ isSide }) => !isSide && 'column'};
  gap: 32px;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  width: 464px;
`;

const ImgContainer = styled.div`
  width: 400px;
  height: 300px;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${colors.gray[100]};
`;

const Title = styled.div`
  font-size: 32px;
  font-weight: 600;
  color: ${colors.orange[500]};
`;

const Grade = styled.div`
  font-size: 20px;
  color: ${colors.gray[600]};
`;

const Content = styled.div`
  width: 100%;
  font-size: 24px;
  color: ${colors.gray[800]};
`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: end;
  gap: 4px;
`;

const ContentContainer = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 16px;
`;
