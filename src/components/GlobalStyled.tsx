import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    /*! minireset.css v0.0.6 | MIT License | github.com/jgthms/minireset.css */
    html,
    body,
    p,
    ol,
    ul,
    li,
    dl,
    dt,
    dd,
    blockquote,
    figure,
    fieldset,
    legend,
    textarea,
    pre,
    iframe,
    hr,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
    margin: 0;
    padding: 0;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
    font-size: 100%;
    font-weight: normal;
    }

    ul, li {
    list-style: none;
    }

    button,
    input,
    select {
    margin: 0;
    }

    html {
    box-sizing: border-box;
    }

    *,
    *::before,
    *::after {
        box-sizing: border-box;

        word-break: keep-all;
    -webkit-tap-highlight-color: transparent;
    }

    img {
    vertical-align: middle;
    border-style: none;
    }

    iframe {
    border: 0;
    }

    table {
    border-collapse: collapse;
    border-spacing: 0;
    }

    td,
    th {
    padding: 0;
    }

    a {
    text-decoration: none;
    }

    *, *::before, *::after {
    }

    body {
        font-family: Roboto, -apple-system, 'Apple SD Gothic', 'Apple Color Emoji', sans-serif;
        font-size: 14px;
    }
`;

export default GlobalStyle;
