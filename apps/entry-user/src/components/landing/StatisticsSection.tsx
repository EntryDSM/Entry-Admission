import React from 'react';
import styled from '@emotion/styled';
import { colors } from '@entry/design-token';
import { PrizeImg } from '../../assets';

export const StatisticsSection: React.FC = () => {
  const statistics = [
    {
      icon: '97%',
      title: '취업률',
      description: '작년 취업률은 97%이며,\n모든 취업을 향해 달리고 있어요!',
    },
    {
      icon: PrizeImg,
      title: '수상',
      description:
        '다양한 소프트웨어 경진 대회,\nTOPCIT 등에서 우수한\n성적을 거두고 있어요!',
    },
    {
      icon: PrizeImg,
      title: 'MOU',
      description:
        '다양한 기업과 MOU를 체결하여,\n매년 학생들의 취업으로\n이어지고 있어요!',
    },
  ];

  return (
    <Container>
      {statistics.map((stat, index) => (
        <StatCard key={index}>
          <IconWrapper>
            <Icon isText={stat.icon === '97%'}>
              {stat.icon === '97%' ? (
                stat.icon
              ) : (
                <img src={stat.icon} alt={stat.title} />
              )}
            </Icon>
          </IconWrapper>
          <Title>{stat.title}</Title>
          <Description>{stat.description}</Description>
        </StatCard>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 80px;
  padding: 60px 140px;

  @media (max-width: 1200px) {
    gap: 60px;
    padding: 50px 80px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 40px;
    padding: 40px 40px;
    align-items: center;
  }

  @media (max-width: 480px) {
    gap: 30px;
    padding: 30px 20px;
  }
`;

const StatCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  flex: 1;

  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
    max-width: 300px;
  }
`;

const IconWrapper = styled.div`
  margin-bottom: 20px;

  @media (max-width: 768px) {
    margin-bottom: 16px;
  }

  @media (max-width: 480px) {
    margin-bottom: 12px;
  }
`;

const Icon = styled.div<{ isText?: boolean }>`
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 20px;
  color: ${colors.orange[800]};
  transform: ${(props) => (props.isText ? 'translateY(-35px)' : 'none')};

  img {
    width: 60px;
    height: 60px;
    object-fit: contain;
  }

  @media (max-width: 768px) {
    font-size: 40px;
    transform: ${(props) => (props.isText ? 'translateY(-6px)' : 'none')};

    img {
      width: 50px;
      height: 50px;
    }
  }

  @media (max-width: 480px) {
    font-size: 32px;
    transform: ${(props) => (props.isText ? 'translateY(-4px)' : 'none')};

    img {
      width: 40px;
      height: 40px;
    }
  }
`;

const Title = styled.h3`
  font-size: 35px;
  font-weight: 600;
  margin: 0 0 15px 0;

  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 12px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
    margin-bottom: 10px;
  }
`;

const Description = styled.p`
  font-size: 20px;
  color: ${colors.gray[400]};
  line-height: 1.8;
  margin: 0;
  white-space: pre-wrap;

  @media (max-width: 768px) {
    font-size: 13px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;
