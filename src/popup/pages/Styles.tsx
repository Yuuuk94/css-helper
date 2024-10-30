import React, { useEffect, useMemo } from 'react';
import { styled } from 'styled-components';

import IconCopy from 'assets/icon-content_copy.svg';
import Btn from 'popup/components/Button';
import { useDataContext } from 'popup/hooks/useDataContext';
import useMessage from 'popup/hooks/useMessage';
import { IFRAME_MESSAGE } from 'popup/constans';

const ColorsPage = () => {
  const { pageTitle, headingsFonts, bodyFonts, bodyStyle, assets } =
    useDataContext();
  const { sendMessageToApp } = useMessage();

  const ogUrl = useMemo(() => {
    return Object.keys(assets).reduce((acc, value) => {
      if (assets[value].includes('open graph')) {
        acc = value;
      }
      return acc;
    }, '');
  }, [assets]);

  const sectionList = [
    {
      title: 'Headings Fonts',
      content: headingsFonts.join(', '),
      type: 'text',
    },
    {
      title: 'Body Fonts',
      content: bodyFonts.join(', '),
      type: 'text',
    },
    { title: 'Body Typeface' },
    { title: 'Body Styles' },
  ];

  const onCopyClick = (content: string) => {
    sendMessageToApp({ id: IFRAME_MESSAGE.SEND_CLIPBOARD, contents: content });
  };

  return (
    <Style.Wrap>
      {ogUrl && <Style.Thumnail $bgImg={ogUrl} />}
      <Style.ContentsWrap>
        <Style.Title>{pageTitle}</Style.Title>
        {sectionList.map((section, idx) => {
          if (section.content)
            return (
              <Style.Section key={'main-style-section-' + idx}>
                <Style.SectionTitleWrap>
                  <Style.SectionTitle>{section.title}</Style.SectionTitle>
                  <Btn.RoundIconBtn
                    $isLight
                    $isSmall
                    onClick={() => onCopyClick(section.content)}
                  >
                    <IconCopy />
                  </Btn.RoundIconBtn>
                </Style.SectionTitleWrap>
                {section.type === 'text' && (
                  <Style.TextContent>{section.content}</Style.TextContent>
                )}
              </Style.Section>
            );
        })}
      </Style.ContentsWrap>
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
    height: 166px;
    background: center / contain no-repeat url(${({ $bgImg }) => $bgImg})
      ${({ theme }) => theme.colors.text[50]};

    position: relative;

    &::before {
      content: '';
      height: 1px;
      width: calc(100% + 24px);
      position: absolute;
      bottom: 0;
      left: -12px;
      right: -12px;
      border: 1px solid ${({ theme }) => theme.colors.text[700]};
    }
  `,
  ContentsWrap: styled.div`
    width: 100%;
    padding: 12px 8px;
    display: flex;
    flex-direction: column;
    gap: 18px;
  `,
  Title: styled.h2`
    font-size: 16px;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.text[900]};
    line-height: 1.4;
  `,
  Section: styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 4px;
  `,
  SectionTitleWrap: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  SectionTitle: styled.h3`
    font-size: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text[100]};
    line-height: 1;
    text-transform: capitalize;
  `,
  TextContent: styled.p`
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text[700]};
    line-height: 1.4;
  `,
};
