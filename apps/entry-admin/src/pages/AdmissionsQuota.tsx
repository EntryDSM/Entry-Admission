import { useState, useEffect, ChangeEvent } from "react";
import { InputSection } from "../components";
import { colors, Flex, Text } from "@entry/design-token";
import styled from '@emotion/styled';
import { Button } from "@entry/ui";
import { useNavigate } from "react-router";

type DataState = {
  daejeonGeneral: number;            // 대전 일반
  nationalGeneral: number;           // 전국 일반
  daejeonMeister: number;            // 대전 마이스터
  nationalMeister: number;           // 전국 마이스터
  daejeonSocialIntegration: number;  // 대전 사회통합
  nationalSocialIntegration: number; // 전국 사회 통합
};

export const AdmissionsQuota = () => {
  const navigate = useNavigate()
  const [datas, setDatas] = useState<DataState>({
    daejeonGeneral: 0,
    nationalGeneral: 0,
    daejeonMeister: 0,
    nationalMeister: 0,
    daejeonSocialIntegration: 0,
    nationalSocialIntegration: 0,
  });
  
  const [totalMember, setTotalMember] = useState<{
    general: number,
    meister: number,
    socialIntegration: number,
    total: number
  }>({
    general: 0,
    meister: 0,
    socialIntegration: 0,
    total: 0
  });

  // 공통 onChange handler
  const handleChange = (key: keyof DataState) => (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value) || 0; // 숫자로 변환
    setDatas(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  console.log(datas)

  // datas 변경 시 totalMember 자동 계산
  useEffect(() => {
    const general = datas.daejeonGeneral + datas.nationalGeneral;
    const meister = datas.daejeonMeister + datas.nationalMeister;
    const socialIntegration = datas.daejeonSocialIntegration + datas.nationalSocialIntegration;
    const total = general + meister + socialIntegration;

    setTotalMember({ general, meister, socialIntegration, total });
  }, [datas]);
  
  const handleSaveClick = () => {
    //저장 api
  }

  return (
    <Flex isColumn={true} width="100%" height="auto" gap={20}>
      <Flex width="100%" height="auto" alignItems="center" justifyContent="space-between">
        <Text fontSize={32} fontWeight={700}>정원 수정</Text>
        <Flex width="fit-content" height="fit-content" gap={12}>
          <Button onClick={handleSaveClick} backgroundColor={colors.green[500]} hoverBackgroundColor='none'>저장</Button>
          <Button onClick={() => navigate(-1)} backgroundColor={colors.gray[50]} hoverBackgroundColor="none" borderColor={colors.gray[200]} color={colors.gray[500]}>취소</Button>
        </Flex>
      </Flex>
        <AllContainer>
          <Flex width="fit-content" height="fit-content" isColumn={true} gap={4} alignItems="center">
            <Text fontSize={20} fontWeight={600}>일반 전형</Text>
            <Text fontSize={16} color={colors.gray[500]}>총 {totalMember.general}명</Text>
          </Flex>
          <Line/>
          <Flex width="fit-content" height="fit-content" isColumn={true} gap={4} alignItems="center">
            <Text fontSize={20} fontWeight={600}>마이스터 전형</Text>
            <Text fontSize={16} color={colors.gray[500]}>총 {totalMember.meister}명</Text>
          </Flex>
          <Line/>
          <Flex width="fit-content" height="fit-content" isColumn={true} gap={4} alignItems="center">
            <Text fontSize={20} fontWeight={600}>사회통합 전형</Text>
            <Text fontSize={16} color={colors.gray[500]}>총 {totalMember.socialIntegration}명</Text>
          </Flex>
          <Line/>
          <Flex width="fit-content" height="fit-content" isColumn={true} gap={4} alignItems="center">
            <Text fontSize={20} fontWeight={600}>총 인원</Text>
            <Text fontSize={16} color={colors.gray[500]}>총 {totalMember.total}명</Text>
          </Flex>
        </AllContainer>
      <Flex width="100%" height="auto" gap={32}>
        <Flex isColumn={true} width="100%" height="auto">
          <InputSection onChange={handleChange('daejeonGeneral')} value={datas.daejeonGeneral} label="대전 일반전형" placeholder="일반전형 (대전)" suffix="명"/>
          <InputSection onChange={handleChange('daejeonMeister')} value={datas.daejeonMeister} label="대전 마이스터전형" placeholder="마이스터전형 (대전)" suffix="명"/>
          <InputSection onChange={handleChange('daejeonSocialIntegration')} value={datas.daejeonSocialIntegration} label="대전 사회통합전형" placeholder="사회통합전형 (대전)" suffix="명"/>
        </Flex>
        <Flex isColumn={true} width="100%" height="auto">
          <InputSection onChange={handleChange('nationalGeneral')} value={datas.nationalGeneral} label="전국 일반전형" placeholder="일반전형 (전국)" suffix="명"/>
          <InputSection onChange={handleChange('nationalMeister')} value={datas.nationalMeister} label="전국 마이스터전형" placeholder="마이스터전형 (전국)" suffix="명"/>
          <InputSection onChange={handleChange('nationalSocialIntegration')} value={datas.nationalSocialIntegration} label="전국 사회통합전형" placeholder="사회통합전형 (전국)" suffix="명"/>
        </Flex>
      </Flex>
    </Flex>
  );
};

const Line = styled.div `
  width: 1px;
  height: 60px;
  background-color: ${colors.gray[300]};
`;

const AllContainer = styled.div `
  padding: 20px 30px;
  border-radius: 12px;
  border: 1px solid ${colors.gray[300]};
  display: flex;
  gap: 20px;
  align-items: center;
`;
