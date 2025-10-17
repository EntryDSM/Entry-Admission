import { Flex, Text } from "@entry/design-token"
import { EntryLogo } from "./assets"

interface IErrorPageType {
  errorMsg: string
}

export const ErrorPage = ({errorMsg} : IErrorPageType) => {
  return (
    <Flex backgroundColor="#FF7326" isColumn justifyContent="space-between" width="100%" height="100vh" paddingTop="80px" paddingBottom="80px" paddingLeft="80px" paddingRight="80px">
      <Flex isColumn gap={27} width="fit-content" height="fit-content">
        <EntryLogo width={50} height={50}/>
        <Flex isColumn gap={11} width="fit-content" height="fit-content">
          <Text fontSize={28} fontWeight={700} color="#FEE9E7">처리 중 문제가 발생했습니다</Text>
          <Text fontSize={28} fontWeight={700} color="#FEE9E7">1분 후 다시 시도해주세요</Text>
          <Text fontSize={20} fontWeight={300} color="#FEE9E7">에러코드 : {errorMsg}</Text>
        </Flex>
      </Flex>
      <Text fontSize={32} fontWeight={700} color="#FEE9E7">잠시후 홈 화면으로 이동합니다</Text>
    </Flex>
  )
}