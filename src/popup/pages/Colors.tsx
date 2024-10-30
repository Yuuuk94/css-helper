import React, { useEffect } from 'react';
import { styled } from 'styled-components';

import IconColorize from 'assets/icon-colorize.svg';
import Btn from 'popup/components/Button';
import { useDataContext } from 'popup/hooks';

const ColorsPage = () => {
  const { colors } = useDataContext();

  const onCopyClick = (color: string) => {
    alert(color);
  };

  return (
    <Style.Wrap>
      {colors.sort().map((color, idx) => {
        const isLight = false;
        return (
          <Style.ColorItem key={color + `-color-list-` + idx} $color={color}>
            <Style.ColorInfo $isLight={isLight}>{color}</Style.ColorInfo>
            <Btn.RoundIconBtn
              $isLight={isLight}
              className="fill"
              onClick={() => onCopyClick(color)}
            >
              <IconColorize />
            </Btn.RoundIconBtn>
          </Style.ColorItem>
        );
      })}
    </Style.Wrap>
  );
};

export default ColorsPage;

const Style = {
  Wrap: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  ColorItem: styled.div<{ $color: string }>`
    width: 100%;
    height: 100%;
    min-height: 80px;
    padding: 24px;
    background-color: ${({ $color }) => $color};
    display: flex;
    justify-content: space-between;
    align-items: end;
  `,
  ColorInfo: styled.p<{ $isLight: boolean }>`
    font-size: 14px;
    font-weight: 500;
    color: ${({ $isLight, theme }) =>
      $isLight ? theme.colors.text[900] : theme.colors.text[50]};
  `,
};
