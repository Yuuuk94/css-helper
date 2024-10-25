import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import IconClose from 'assets/icon-close.svg';

import { AppTitle, AppMenuList } from '../constans';


const Layout = () => {
  const navigate = useNavigate();
  const onClickMenu = (path: string) => {
    navigate(path);
  };
  return (
    <Style.Wrap>
      <Style.Header>
        <Style.AppTitle>{AppTitle}</Style.AppTitle>
        <IconClose />
      </Style.Header>
      <Style.AppMenuWrap>
        {AppMenuList.map((menu, idx) => (
          <Style.MenuItem
            key={`app-menu-` + idx}
            onClick={() => onClickMenu(menu.path)}
          >
            {menu.label}
          </Style.MenuItem>
        ))}
      </Style.AppMenuWrap>
      <Style.ContentsContainer>
      <Outlet />
      </Style.ContentsContainer>
    </Style.Wrap>
  );
};

export default Layout;

const Style = {
  Wrap: styled.div`
    width: 100%;
    max-width: 320px;
    min-width: 320px;
    height: 100%;
    min-height: 600px;
    max-width: 600px;
    position: relative;

    &::before {
      content: '';
      width: 1px;
      height: 100%;
      position: absolute;
      top: 0;
      left: 12px;
      bottom: 0;
      z-index: 100;
      border: 1px solid ${({ theme }) => theme.colors.text['700']};
    }
    &::after {
      content: '';
      width: 1px;
      height: 100%;
      position: absolute;
      top: 0;
      right: 12px;
      bottom: 0;
      z-index: 100;
      border: 1px solid ${({ theme }) => theme.colors.text['700']};
    }
  `,
  Header: styled.header`
    width: 100%;
    padding: 12px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select:none;
    &::before {
      content: '';
      width: 100%;
      height: 1px;
      position: absolute;
      top: 8px;
      left: 0;
      right: 0;
      z-index: 100;
      border: 1px solid ${({ theme }) => theme.colors.text['700']};
    }
    &::after {
      content: '';
      width: 100%;
      height: 1px;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 100;
      border: 1px solid ${({ theme }) => theme.colors.text['700']};
    }
  `,
  AppTitle: styled.h1`
    font-size: 20px;
    font-weight: 800;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.text['900']};
  `,
  AppMenuWrap: styled.nav`
    width: 100%;
    padding: 4px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    position: relative;

    &::after {
      content: '';
      width: 100%;
      height: 1px;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 100;
      border: 1px solid ${({ theme }) => theme.colors.text['700']};
    }
  `,
  MenuItem: styled.li`
    font-size: 14px;
    font-weight: 600;
    text-transform: capitalize;
    color: ${({ theme }) => theme.colors.text['900']};
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select:none; 
  `,
  ContentsContainer: styled.div`
    width: 100%;
    height: 100%;
    min-height: 518px;
    padding: 0 12px 8px;
    position: relative;

    &::after {
      content: '';
      width: 100%;
      height: 1px;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 100;
      border: 1px solid ${({ theme }) => theme.colors.text['700']};
    }
  `
};
