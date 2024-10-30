import React, { useEffect } from 'react';
import { styled } from 'styled-components';

import IconColorize from 'assets/icon-colorize.svg';
import Btn from 'popup/components/Button';
import { useDataContext } from 'popup/hooks/useDataContext';
import useColors from 'popup/hooks/useColors';
import useMessage from 'popup/hooks/useMessage';
import { IFRAME_MESSAGE } from 'popup/constans';

const ColorsPage = () => {
  const { colors } = useDataContext();
  const { sendMessageToApp } = useMessage();
  const { isLightColor, colorSort, rgbToHex } = useColors();

  const onCopyClick = (color: string) => {
    sendMessageToApp({ id: IFRAME_MESSAGE.SEND_CLIPBOARD, contents: color });
  };

  return (
    <Style.Wrap>
      {colorSort(colors).map((color, idx) => {
        const isLight = isLightColor(color);
        const labelColor = rgbToHex(color);
        return (
          <Style.ColorItem key={color + `-color-list-` + idx} $color={color}>
            <Style.ColorInfo $isLight={isLight}>
              {labelColor.hex}
            </Style.ColorInfo>
            {labelColor.opacity && (
              <Style.ColorInfo $isLight={isLight}>
                opacity: {labelColor.opacity}
              </Style.ColorInfo>
            )}
            <Btn.RoundIconBtn
              $isLight={isLight}
              className="fill"
              onClick={() => onCopyClick(labelColor.hex)}
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
    width: 90px;
    font-size: 14px;
    font-weight: 500;
    color: ${({ $isLight, theme }) =>
      $isLight ? theme.colors.text[900] : theme.colors.text[50]};
  `,
};
