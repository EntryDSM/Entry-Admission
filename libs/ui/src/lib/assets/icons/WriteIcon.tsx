import { colors } from '@entry/design-token';

type IIconType = {
  size?: number;
  isAdmin?: boolean;
};

export const WriteIcon = ({ size = 44, isAdmin }: IIconType) => {
  return (
    <>
      <svg
        width={size}
        height={size}
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M34.3947 23.6018V35.8037C34.3947 38.0129 32.6039 39.8037 30.3947 39.8037H8C5.79086 39.8037 4 38.0129 4 35.8037V9C4 6.79086 5.79086 5 8 5H31.091C32.9156 5 34.3947 6.47912 34.3947 8.30371V8.30371M12.2895 15.3471H24.2632M12.2895 22.8722H16.8947M12.2895 30.3973H15.0526M33 13.3037L34.7218 11.5819C35.7039 10.5998 37.2961 10.5998 38.2782 11.5819V11.5819C39.2379 12.5417 39.2628 14.0899 38.3344 15.0801L36.5 17.0365M33 13.3037L23.1388 23.3643C22.9846 23.5215 22.8575 23.7031 22.7626 23.9018L20.8088 27.9895C20.4102 28.8234 21.2593 29.7053 22.1077 29.3387L25.7967 27.7445C26.0346 27.6417 26.2503 27.4937 26.4317 27.3086L36.5 17.0365M33 13.3037L36.5 17.0365"
          stroke={isAdmin ? colors.green[500] : colors.orange[500]}
          stroke-width="2.5"
          stroke-linecap="round"
        />
      </svg>
    </>
  );
};
