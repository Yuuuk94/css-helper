import React, { useEffect, useMemo } from 'react';
import { styled } from 'styled-components';

import IconColorize from 'assets/icon-colorize.svg';
import Btn from 'popup/components/Button';
import { useDataContext } from 'popup/hooks';

const ColorsPage = () => {
  const { bodyStyle, assets } = useDataContext();
  const ogUrl = useMemo(() => {
    return Object.keys(assets).reduce((acc, value) => {
      if (assets[value].includes('open graph')) {
        acc = value;
      }
      return acc;
    }, '');
  }, [assets]);
  return (
    <Style.Wrap>
      <Style.Thumnail $bgImg={ogUrl} />
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
  Thumnail: styled.p<{ $bgImg: string }>`
    width: 100%;
    height: 168px;
    background: center / contain no-repeat url(${({ $bgImg }) => $bgImg})
      ${({ theme }) => theme.colors.text[50]};
    &::before {
      content: '';
      height: 1px;
      width: 100%;
      position: absolute;
      top: calc(75px + 168px);
      left: 0;
      right: 0;
      transform: translateY(-50%);
      border: 1px solid ${({ theme }) => theme.colors.text[700]};
    }
  `,
};
