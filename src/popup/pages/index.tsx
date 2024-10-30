import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Layout from '../components/Layout';
import { ROUTE_PATH } from 'popup/constans';

const PopupIndex = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === ROUTE_PATH.HOME) navigate(ROUTE_PATH.STYLES);
  }, [pathname]);

  return <Layout />;
};

export default PopupIndex;
