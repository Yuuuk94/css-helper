import { styled } from 'styled-components';

const Btn = {
  LageIconBtn: styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  `,
  RoundIconBtn: styled.button<{ $isDark?: boolean }>`
    width: 24px;
    height: 24px;
    border-radius: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
      background-color: ${({ $isDark }) =>
        $isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)'};
    }
    &.fill svg path {
      fill: ${({ $isDark, theme }) =>
        $isDark ? theme.colors.text[50] : theme.colors.text[900]};
    }
  `,
};

export default Btn;
