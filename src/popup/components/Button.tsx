import { styled } from 'styled-components';

const Btn = {
  IconBtn: styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  `,
  RoundIconBtn: styled.button<{ $isLight?: boolean; $isSmall?: boolean }>`
    width: ${({ $isSmall }) => ($isSmall ? '18px' : '24px')} !important;
    min-width: ${({ $isSmall }) => ($isSmall ? '18px' : '24px')} !important;
    height: ${({ $isSmall }) => ($isSmall ? '18px' : '24px')} !important;
    border-radius: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
      background-color: ${({ $isLight }) =>
        $isLight ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)'};
    }
    &.fill svg path {
      fill: ${({ $isLight, theme }) =>
        $isLight ? theme.colors.text[900] : theme.colors.text[50]};
    }
  `,
};

export default Btn;
