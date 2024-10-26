import React from 'react';
import styled from 'styled-components';

const SettingsPage = () => {
  return (
    <Style.Wrap>
      <Style.Section>
        <Style.SectionTitle>color mode</Style.SectionTitle>
      </Style.Section>
    </Style.Wrap>
  );
};

export default SettingsPage;

const Style = {
  Wrap: styled.div`
    width: 100%;
    padding: 8px 16px;
  `,
  Section: styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 4px;
  `,
  SectionTitle: styled.h2`
    font-size: 16px;
    font-weight: 600;
    color: ${({  theme }) => theme.colors.text[900]};
  `,
};
