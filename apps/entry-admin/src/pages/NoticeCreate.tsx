import { useState } from 'react';
import styled from '@emotion/styled';
import { colors, Flex, Text } from '@entry/design-token';
import { Button, AuthInput } from '@entry/ui';
import { useNavigate } from 'react-router-dom';

interface AttachmentFile {
  id: string;
  name: string;
  file: File;
}

export const NoticeCreate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: 'admission' as 'admission' | 'orientation',
    content: '',
  });
  const [attachments, setAttachments] = useState<AttachmentFile[]>([]);

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newAttachments: AttachmentFile[] = Array.from(files).map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        file
      }));
      setAttachments(prev => [...prev, ...newAttachments]);
    }
  };

  const handleRemoveAttachment = (id: string) => {
    setAttachments(prev => prev.filter(att => att.id !== id));
  };

  const handleSubmit = () => {
    if (!formData.title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }
    if (!formData.content.trim()) {
      alert('내용을 입력해주세요.');
      return;
    }

    console.log('Create notice:', {
      ...formData,
      attachments: attachments.map(att => ({ name: att.name, file: att.file }))
    });

    navigate('/notice');
  };

  const handleCancel = () => {
    if (confirm('작성 중인 내용이 사라집니다. 정말 취소하시겠습니까?')) {
      navigate('/notice');
    }
  };

  return (
    <Container>
      <Flex isColumn={true} gap={32} width="100%" height="fit-content">
        <HeaderSection>
          <Text fontSize={32} fontWeight={600} color={colors.gray[400]}>
            공지사항 작성
          </Text>
        </HeaderSection>

        <FormContainer>
          <FormRow>
            <FormLabel>카테고리</FormLabel>
            <Select 
              value={formData.category} 
              onChange={handleInputChange('category')}
            >
              <option value="admission">입학 공지사항</option>
              <option value="orientation">예비 신입생 안내</option>
            </Select>
          </FormRow>

          <FormRow>
            <FormLabel>제목</FormLabel>
            <AuthInput
              placeholder="공지사항 제목을 입력하세요"
              value={formData.title}
              onChange={handleInputChange('title')}
              height="fit-content"
            />
          </FormRow>

          <FormRow>
            <FormLabel>내용</FormLabel>
            <ContentTextArea
              placeholder="공지사항 내용을 입력하세요"
              value={formData.content}
              onChange={handleInputChange('content')}
              rows={15}
            />
          </FormRow>

          <FormRow>
            <FormLabel>첨부파일</FormLabel>
            <FileUploadSection>
              <FileInput
                type="file"
                multiple
                onChange={handleFileUpload}
                id="file-upload"
              />
              <FileUploadButton htmlFor="file-upload">
                파일 선택
              </FileUploadButton>
              <FileUploadText>
                여러 파일을 선택할 수 있습니다.
              </FileUploadText>
            </FileUploadSection>
          </FormRow>

          {attachments.length > 0 && (
            <FormRow>
              <FormLabel>업로드된 파일</FormLabel>
              <AttachmentList>
                {attachments.map((attachment) => (
                  <AttachmentItem key={attachment.id}>
                    <AttachmentName>{attachment.name}</AttachmentName>
                    <RemoveButton onClick={() => handleRemoveAttachment(attachment.id)}>
                      ×
                    </RemoveButton>
                  </AttachmentItem>
                ))}
              </AttachmentList>
            </FormRow>
          )}
        </FormContainer>

        <ButtonSection>
          <Button
            backgroundColor="#9ca3af"
            hoverBackgroundColor="#6b7280"
            onClick={handleCancel}
          >
            취소
          </Button>
          <Button
            backgroundColor="#22c55e"
            hoverBackgroundColor="#16a34a"
            onClick={handleSubmit}
          >
            작성 완료
          </Button>
        </ButtonSection>
      </Flex>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FormLabel = styled.label`
  font-size: 16px;
  font-weight: 600;
  color: ${colors.gray[400]};
`;

const Select = styled.select`
  padding: 12px 16px;
  border: 1px solid ${colors.gray[300]};
  border-radius: 8px;
  font-size: 14px;
  color: ${colors.gray[400]};
  background-color: white;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

const ContentTextArea = styled.textarea`
  padding: 16px;
  border: 1px solid ${colors.gray[300]};
  border-radius: 8px;
  font-size: 14px;
  color: ${colors.gray[400]};
  font-family: inherit;
  resize: vertical;
  min-height: 200px;
  line-height: 1.6;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
  
  &::placeholder {
    color: ${colors.gray[400]};
  }
`;

const FileUploadSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const FileInput = styled.input`
  display: none;
`;

const FileUploadButton = styled.label`
  padding: 10px 16px;
  background-color: #3b82f6;
  color: white;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #2563eb;
  }
`;

const FileUploadText = styled.span`
  font-size: 12px;
  color: ${colors.gray[400]};
`;

const AttachmentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const AttachmentItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background-color: ${colors.gray[50]};
  border: 1px solid ${colors.gray[200]};
  border-radius: 6px;
`;

const AttachmentName = styled.span`
  font-size: 14px;
  color: ${colors.gray[600]};
`;

const RemoveButton = styled.button`
  width: 24px;
  height: 24px;
  background-color: #ef4444;
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  
  &:hover {
    background-color: #dc2626;
  }
`;

const ButtonSection = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  width: 100%;
`;
