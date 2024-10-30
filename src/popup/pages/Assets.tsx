import React from 'react';
import { styled } from 'styled-components';
import IconDownload from 'assets/icon-download.svg';

import { useDataContext } from 'popup/hooks';
import Btn from 'popup/components/Button';

const AssetsPage = () => {
  const { assets } = useDataContext();

  return (
    <Style.Wrap>
      {Object.keys(assets).map((asset, idx) => (
        <Style.AssetsItem key={asset + '-assets-list-' + idx}>
          <Style.Thumnail $bgImg={asset} />
          <Style.InfoWrap>
            <Style.Info>{assets[asset]}</Style.Info>
            <Btn.RoundIconBtn>
              <IconDownload />
            </Btn.RoundIconBtn>
          </Style.InfoWrap>
        </Style.AssetsItem>
      ))}
    </Style.Wrap>
  );
};

export default AssetsPage;

const Style = {
  Wrap: styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    &::before {
      content: '';
      width: 1px;
      height: calc(100% - 75px - 8px);
      position: absolute;
      top: 75px;
      bottom: 8px;
      left: 50%;
      transform: translateX(-50%);
      border: 1px solid ${({ theme }) => theme.colors.text[700]};
    }
  `,
  AssetsItem: styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
  `,
  Thumnail: styled.p<{ $bgImg: string }>`
    width: 100%;
    height: 110px;
    background: center / contain no-repeat url(${({ $bgImg }) => $bgImg})
      ${({ theme }) => theme.colors.text[50]};
  `,
  InfoWrap: styled.div`
    width: 100%;
    padding: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 4px;
  `,
  Info: styled.p`
    font-size: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text[700]};
    white-space: pre-wrap;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  `,
};
