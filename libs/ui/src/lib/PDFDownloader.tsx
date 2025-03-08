import styled from '@emotion/styled';
import { colors, Flex } from '@entry/design-token';
import { Download, Save } from './assets';

interface IPDFType {
  data: Array<{ fileName: string; fileUrl: File | string }>;
}

export const PDFDownloader = ({ data }: IPDFType) => {
  const downloadClick = (fileName: string, fileUrl: File | string) => {
    const element = document.createElement('a');

    if (typeof fileUrl === 'string') {
      element.href = fileUrl;
    } else {
      const blob = new Blob([fileUrl], {
        type: fileUrl.type || 'application/octet-stream',
      });
      element.href = URL.createObjectURL(blob);
    }

    element.download = fileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <Container>
      <Flex gap={8} isColumn={true} alignItems="start">
        <Flex gap={12}>
          <Save size="24" />
          <Flex isColumn={true} alignItems="end" gap={8}>
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <Flex alignItems="center" key={index} gap={80} width="auto">
                  <Content>{item.fileName}</Content>
                  <Download
                    onClick={() => downloadClick(item.fileName, item.fileUrl)}
                  />
                </Flex>
              ))
            ) : (
              <Content>다운로드 할 PDF가 없습니다.</Content>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
};

const Content = styled.div`
  font-size: 16px;
  color: ${colors.gray[800]};
`;

const Container = styled.div`
  width: fit-content;
  padding: 12px 16px;
  border-radius: 12px;
  background-color: ${colors.orange[50]};
  display: flex;
  justify-content: center;
  align-items: center;
`;
