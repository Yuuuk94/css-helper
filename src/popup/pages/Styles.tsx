import React, { useEffect, useMemo } from 'react';
import { styled } from 'styled-components';

import IconCopy from 'assets/icon-content_copy.svg';
import Btn from 'popup/components/Button';
import { useDataContext } from 'popup/hooks/useDataContext';
import useMessage from 'popup/hooks/useMessage';
import { IFRAME_MESSAGE } from 'popup/constans';
import useStyles from 'popup/hooks/useStyles';
import useColors from 'popup/hooks/useColors';

type contentType = 'text' | 'typeface';
const ColorsPage = () => {
  const { pageTitle, headingsFonts, bodyFonts, bodyStyle, assets } =
    useDataContext();

  const {
    typeFace: bodyTypeFace,
    typeFaceKey: bodyTypeFaceKey,
    styles,
    copyStyleToClipboard,
  } = useStyles(bodyStyle);
  const { rgbToHex } = useColors();

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
      title: 'Headings Font',
      content: headingsFonts.join(', '),
      type: 'text',
    },
    {
      title: 'Body Font',
      content: bodyFonts.join(', '),
      type: 'text',
    },
    { title: 'Body Typeface', content: bodyTypeFace, type: 'typeface' },
    { title: 'Body Styles' },
  ];

  const onCopyClick = (
    content: string | Record<string, string>,
    type: contentType
  ) => {
    sendMessageToApp({
      id: IFRAME_MESSAGE.SEND_CLIPBOARD,
      contents:
        type === 'text'
          ? content
          : copyStyleToClipboard('body', content as Record<string, string>),
    });
  };

  return (
    <Style.Wrap>
      {ogUrl && <Style.Thumnail $bgImg={ogUrl} />}
      <Style.ContentsWrap $hasThumb={!!ogUrl}>
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
                    onClick={() =>
                      onCopyClick(section.content, section.type as contentType)
                    }
                  >
                    <IconCopy />
                  </Btn.RoundIconBtn>
                </Style.SectionTitleWrap>
                <Style.TextContent>
                  {section.type === 'text' && (section.content as string)}
                  {section.type === 'typeface' &&
                    bodyTypeFaceKey.map((key) => (
                      <Style.StyleWrap>
                        <Style.StyleItem>{key}</Style.StyleItem>
                        <Style.StyleItem>
                          {(section.content as Record<string, string>)[key]}
                        </Style.StyleItem>
                      </Style.StyleWrap>
                    ))}
                </Style.TextContent>
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
    width: calc(100% - 24px);
    height: 166px;
    background: center / contain no-repeat url(${({ $bgImg }) => $bgImg})
      ${({ theme }) => theme.colors.text[50]};

    position: absolute;
    top: calc(48px + 24px);
    left: 12px;
    right: 12px;

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
  ContentsWrap: styled.div<{ $hasThumb: boolean }>`
    width: 100%;
    margin-top: ${({ $hasThumb }) => ($hasThumb ? '162px' : '0')};
    padding: 12px 8px;
    display: flex;
    flex-direction: column;
    gap: 18px;
  `,
  Title: styled.h2`
    font-size: 20px;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.text[900]};
    line-height: 1.2;
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
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2px;

    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text[700]};
    line-height: 1.2;
  `,
  StyleWrap: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 4px;
  `,
  StyleItem: styled.p`
    max-width: 50%;
    font-size: 12px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text[500]};
    line-height: 1.1;
  `,
};
