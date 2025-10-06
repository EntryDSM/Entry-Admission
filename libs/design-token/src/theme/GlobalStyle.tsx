import { Global, css } from '@emotion/react';
// import 'pretendard/dist/web/static/pretendard.css';

const style = css`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    border: 0;
    outline: unset;
    list-style: none;
    font-family: 'Pretendard', sans-serif;
    font-style: normal;

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  html,
  body {
    overflow-x: hidden;
  }

  label {
    cursor: pointer;
    background-color: transparent;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  textarea {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
`;

export const GlobalStyle = () => {
  return <Global styles={style} />;
};
