import { Flex } from "@entry/design-token"
import { FormElement } from '../../components';
import { usePageData } from "@entry/ui"
import { useEffect, useState } from "react";
import { getUserInfo } from "@entry/util-config";

export const GuardianInfo = () => {
  const [datas, setDatas] = usePageData('guardianInfo')
  const [userInfoDatas, setUserInfoDatas] = useState<{isParent: boolean}>({
    isParent: false
  })


  const formRadioData = [
    {
      name: '성별',
      data: ['남성', '여성'],
    },
  ];

  const formDropDownData = [
    {
      data: [
        { label:'', content: ['부', '모', '그외'] },
      ],
    },
  ];


  const handleInputChange = (key: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setDatas({ ...datas, [key]: value });
  };

  const handleGenderSelection = (value: string) => {
    setDatas({ ...datas, gender: value });
  };

  const handleDropdownChange = (values: (string | number)[]) => {
    setDatas({ ...datas, relationship: values });
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDatas({ postalCode: e.target.value });
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDatas({ address: e.target.value });
  };

  const handleDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDatas({ addressDetail: e.target.value });
  };

  const formatPhoneNumber = (phoneNumber: string) => {
    const cleaned = phoneNumber.replace(/\D/g, '');
  
    if (cleaned.length === 11) {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7)}`;
    } else if (cleaned.length === 10) {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
  
    return phoneNumber;
  };

  useEffect(() => {
      const fetchUserInfo = async () => {
        const userInfo = await getUserInfo();
        setUserInfoDatas({
          isParent: userInfo.isParent,
        });
  
        if(userInfo.isParent) {
          setDatas({
            ...datas,
            guardianName: userInfo.name,
            guardianNumber: formatPhoneNumber(userInfo.phoneNumber)
          })
        }
        
      };
  
      fetchUserInfo();
    }, []);


  return (
    <Flex isColumn={true} width="100%" height="fit-content">
      <FormElement
        width="300px"
        type="input"
        label="보호자 성명"
        inputType="text"
        placeholder="보호자 성명을 입력해주세요."
        onInputChange={handleInputChange("guardianName")}
        value={datas.guardianName}
        readonly={userInfoDatas.isParent ? true : false}
      />
      <FormElement
        width="300px"
        type="input"
        label="보호자 연락처"
        inputType="phone"
        placeholder="전화번호를 입력해주세요."
        onInputChange={handleInputChange("guardianNumber")}
        value={datas.guardianNumber}
        readonly={userInfoDatas.isParent ? true : false}
      />
      <FormElement
        label={formRadioData[0].name}
        type="radio"
        radioDatas={formRadioData[0].data}
        selectedRadio={datas.gender}
        setSelectedRadio={handleGenderSelection}
      />
      <FormElement
        label="지원자와의 관계"
        type="dropDown"
        dropDownDatas={formDropDownData[0].data}
        dropDownValues={datas.relationship}
        onDropDownChange={handleDropdownChange}
      />
      <FormElement
        label="주소"
        type="address"
        addressDetailValue={datas.addressDetail}
        addressValue={datas.address}
        postalCodeValue={datas.postalCode}
        handleAddressChange={handleAddressChange}
        handleCodeChange={handleCodeChange}
        handleDetailChange={handleDetailChange}
      />
    </Flex>
  );
};