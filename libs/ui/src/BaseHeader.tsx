import { colors, Flex, Text } from '@entry/design-token';
import { EntryLogo, SideBarBtnIcon } from './assets';
import styled from '@emotion/styled';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

// 공통 스크롤 감지 훅
const useScrollY = () => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // mount 시 초기 스크롤 감지

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollPosition;
};

export const NoPathHeader = () => {
  const scrollPosition = useScrollY();

  return (
    <NoPathHeaderContainer scrollPosition={scrollPosition}>
      <Flex
        gap={12}
        alignItems="center"
        height="fit-content"
        width="fit-content"
      >
        <EntryLogo />
        <Text fontSize={24} fontWeight={600} color={colors.gray[500]}>
          EntryDSM
        </Text>
      </Flex>
    </NoPathHeaderContainer>
  );
};

export const AdminHeader = () => {
  const scrollPosition = useScrollY();
  const [isSideClick, setIsSideClick] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  // const [datas] = useState<{ name: string }>({ name: '홍길동' });

  const navData = [
    { name: '전형 일정 수정', path: '/admissions-schedule' },
    { name: '지원자 조회', path: '/applicants-list' },
    { name: '공지사항', path: '/notice' },
    { name: '수식', path: '/formula-calculator' },
  ];

  const navClick = (path: string) => {
    setIsSideClick(false);
    navigate(path);
  };

  return (
    <HeaderContainer scrollPosition={scrollPosition}>
      <Flex
        gap={12}
        alignItems="center"
        height="fit-content"
        width="fit-content"
        onClick={() => navigate('/')}
      >
        <EntryLogo isAdmin={true} />
        <Text fontSize={24} fontWeight={600} color={colors.gray[500]}>
          EntryDSM
        </Text>
      </Flex>
      <Flex
        gap={52}
        alignItems="center"
        height="fit-content"
        width="fit-content"
      >
        <Flex
          width="fit-content"
          height="fit-content"
          gap={28}
          alignItems="center"
        >
          {navData.map((data) => (
            <NavContent
              key={data.path}
              isPath={pathname.includes(data.path)}
              onClick={() => navClick(data.path)}
            >
              {data.name}
            </NavContent>
          ))}
        </Flex>
        <Btn>로그아웃</Btn>
        <SideBarBtnIcon onClick={() => setIsSideClick(!isSideClick)} />
      </Flex>
      {isSideClick && (
        <SideNavContainer>
          {navData.map((data) => (
            <SideNavContent key={data.path} onClick={() => navClick(data.path)}>
              {data.name}
            </SideNavContent>
          ))}
        </SideNavContainer>
      )}
    </HeaderContainer>
  );
};

export const CommonHeader = () => {
  const scrollPosition = useScrollY();
  const [isSideClick, setIsSideClick] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  // const [datas] = useState<{ name: string }>({ name: '홍길동' });
  // const { data: userInfo } = useUserInfo();

  const navData = [
    { name: '공지사항', path: '/notice' },
    { name: '자주 묻는 질문', path: '/faq' },
    { name: '성적 산출', path: '/calculate' },
    { name: '전형 요강', path: '/admission-overview' },
    { name: '학교 소개', path: '/landing' },
  ];

  const navClick = (path: string) => {
    setIsSideClick(false);
    navigate(path);
  };

  return (
    <HeaderContainer scrollPosition={scrollPosition}>
      <Flex
        gap={12}
        alignItems="center"
        height="fit-content"
        width="fit-content"
        onClick={() => navigate('/')}
      >
        <EntryLogo />
        <Text fontSize={24} fontWeight={600} color={colors.gray[500]}>
          EntryDSM
        </Text>
      </Flex>
      <Flex
        gap={52}
        alignItems="center"
        height="fit-content"
        width="fit-content"
      >
        <Flex
          width="fit-content"
          height="fit-content"
          gap={28}
          alignItems="center"
        >
          {navData.map((data) => (
            <NavContent
              key={data.name}
              isPath={pathname.includes(data.path)}
              onClick={() => navClick(data.path)}
            >
              {data.name}
            </NavContent>
          ))}
        </Flex>
        <Flex
          gap={20}
          alignItems="center"
          width="fit-content"
          height="fit-content"
        >
          <NavContent
            onClick={() => navClick('/mypage')}
            isPath={pathname === '/mypage'}
          >
            마이페이지
          </NavContent>
          <Text isSpan fontSize={18} fontWeight={500} color={colors.gray[500]}>
            {/* {userInfo?.name || '사용자'} */}
            <Text
              isSpan
              fontSize={18}
              fontWeight={400}
              color={colors.gray[500]}
            >
              님
            </Text>
          </Text>
        </Flex>
        <SideBarBtnIcon onClick={() => setIsSideClick(!isSideClick)} />
      </Flex>
      {isSideClick && (
        <SideNavContainer>
          {navData.map((data) => (
            <SideNavContent key={data.name} onClick={() => navClick(data.path)}>
              {data.name}
            </SideNavContent>
          ))}
        </SideNavContainer>
      )}
    </HeaderContainer>
  );
};

interface IAuthHeaderType {
  isAdmin: boolean;
}

export const AuthHeader = ({ isAdmin }: IAuthHeaderType) => {
  const navigate = useNavigate();

  return (
    <AuthHeaderContainer>
      <LogoContainer onClick={() => navigate('/')}>
        <EntryLogo isAdmin={isAdmin} />
        <Text fontSize={24} fontWeight={600} color={colors.gray[500]}>
          EntryDSM
        </Text>
      </LogoContainer>
    </AuthHeaderContainer>
  );
};

const Btn = styled.button`
  padding: 8px 20px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.green[400]};
  font-size: 16px;
  font-weight: 400;
  color: ${colors.extra.realWhite};
  cursor: pointer;
  &:hover {
    background-color: ${colors.green[500]};
    transition: 0.35s ease-in-out;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  gap: 12px;
  cursor: pointer;
`;

const AuthHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-self: start;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 70px;
  z-index: 10;
  padding-left: 10%;
  background-color: ${colors.extra.realWhite};
`;

const SideNavContainer = styled.nav`
  width: 100vw;
  height: auto;
  position: absolute;
  top: 70px;
  left: 0;
  @media (min-width: 1200px) {
    display: none;
  }
`;

const SideNavContent = styled.nav`
  transition: 0.2s ease-in;
  width: 100%;
  height: 52px;
  background-color: ${colors.extra.realWhite};
  padding-left: 20px;
  display: flex;
  align-items: center;
  &:hover {
    background-color: ${colors.gray[100]};
  }
`;

const HeaderContainer = styled.header<{ scrollPosition?: number }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 70px;
  display: flex;
  justify-content: space-between;
  padding: 0 120px;
  align-items: center;
  background-color: ${({ scrollPosition }) =>
    scrollPosition ? colors.extra.realWhite : 'transparent'};
  border-bottom: 1px solid
    ${({ scrollPosition }) =>
      scrollPosition ? colors.gray[200] : 'transparent'};
  transition: 0.4s ease-in-out;
  z-index: 100;
`;

const NoPathHeaderContainer = styled(HeaderContainer)`
  justify-content: flex-start;
`;

const NavContent = styled.nav<{ isPath?: boolean }>`
  padding: 8px 12px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ isPath }) =>
    isPath ? colors.gray[100] : 'transparent'};
  font-size: 18px;
  font-weight: 400;
  color: ${colors.gray[500]};
  cursor: pointer;
  &:hover {
    background-color: ${colors.gray[100]};
    transition: 0.4s ease-in-out;
  }

  @media (max-width: 1200px) {
    display: none;
  }
`;
