import { Flex } from "@entry/design-token"
import { FormElement } from '../../components';
import { usePageData } from "@entry/ui"

export const GuardianInfo = () => {
  const [datas, setDatas] = usePageData('guardianInfo')
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
      />
      <FormElement
        width="300px"
        type="input"
        label="지원자 연락처"
        inputType="phone"
        placeholder="전화번호를 입력해주세요."
        onInputChange={handleInputChange("applicantNumber")}
        value={datas.applicantNumber}
      />
      <FormElement
        width="300px"
        type="input"
        label="보호자 연락처"
        inputType="phone"
        placeholder="전화번호를 입력해주세요."
        onInputChange={handleInputChange("guardianNumber")}
        value={datas.guardianNumber}
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