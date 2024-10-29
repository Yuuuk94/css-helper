import React, { useMemo } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import IconClose from 'assets/icon-close.svg';
import IconBack from 'assets/icon-arrow_back.svg';
import Btn from 'popup/components/Button';

import { AppTitle, AppMenuList, ROUTE_PATH } from '../constans';

const Layout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isDetail = pathname === ROUTE_PATH.SETTINGS;

  const currentPage = useMemo(() => {
    return AppMenuList.find((menu) => menu.path === pathname);
  }, [pathname]);

  const onClickMenu = (path: string) => {
    navigate(path);
  };

  const onClickBack = () => {
    // FIXME
    navigate('/');
  };

  const onClickClose = () => {
    window.close();
  };

  return (
    <Style.Wrap>
      <Style.Header>
        {isDetail && (
          <Btn.LageIconBtn onClick={onClickBack}>
            <IconBack />
          </Btn.LageIconBtn>
        )}
        <Style.AppTitle>
          {isDetail ? currentPage?.label || '' : AppTitle}
        </Style.AppTitle>
        <Btn.LageIconBtn onClick={onClickClose}>
          <IconClose />
        </Btn.LageIconBtn>
      </Style.Header>
      {!isDetail && (
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
      )}
      <Style.ContentsContainer $isDetail={isDetail}>
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
    max-height: 600px;
    background-color: white;
    position: relative;

    &::before {
      content: '';
      width: 1px;
      height: 100%;
      position: absolute;
      top: 0;
      left: calc(12px - 1px);
      bottom: 0;
      z-index: 100;
      border: 1px solid ${({ theme }) => theme.colors.text[700]};
    }
    &::after {
      content: '';
      width: 1px;
      height: 100%;
      position: absolute;
      top: 0;
      right: calc(12px - 1px);
      bottom: 0;
      z-index: 100;
      border: 1px solid ${({ theme }) => theme.colors.text[700]};
    }
  `,
  Header: styled.header`
    width: 100%;
    padding: 12px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background-color: white;

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    &::before {
      content: '';
      width: 100%;
      height: 1px;
      position: absolute;
      top: 8px;
      left: 0;
      right: 0;
      z-index: 100;
      border: 1px solid ${({ theme }) => theme.colors.text[700]};
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
      border: 1px solid ${({ theme }) => theme.colors.text[700]};
    }
  `,
  AppTitle: styled.h1`
    font-size: 20px;
    font-weight: 800;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.text[900]};
  `,
  AppMenuWrap: styled.nav`
    width: 100%;
    padding: 4px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    position: relative;

    position: absolute;
    top: 48px;
    left: 0;
    right: 0;
    background-color: white;

    &::after {
      content: '';
      width: 100%;
      height: 1px;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 100;
      border: 1px solid ${({ theme }) => theme.colors.text[700]};
    }
  `,
  MenuItem: styled.li`
    font-size: 16px;
    font-weight: 600;
    text-transform: capitalize;
    color: ${({ theme }) => theme.colors.text[900]};
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  `,
  ContentsContainer: styled.div<{ $isDetail: boolean }>`
    width: 100%;
    height: 100%;
    padding: ${({ $isDetail }) => ($isDetail ? '48px' : '75px')} 12px 8px;
    overflow: auto;
    &::after {
      content: '';
      width: 100%;
      height: 1px;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 8px;
      z-index: 100;
      border: 1px solid ${({ theme }) => theme.colors.text[700]};
    }
  `,
};
