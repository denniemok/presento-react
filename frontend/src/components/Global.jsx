import { createGlobalStyle } from 'styled-components';
// https://getwallpapers.com/wallpaper/full/e/4/4/235121.jpg
const Global = createGlobalStyle`
  body {
    background: linear-gradient(to left, #76b852, #8DC26F);
    background: url(https://images.unsplash.com/photo-1615715757401-f30e7b27b912?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXwxMTI1NDUzfHxlbnwwfHx8fHw%3D);
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    margin: 30px 0 0;
    background-size: 100% 100%;
    background-attachment: fixed;
  }

  a {
    // color: #4CAF50;
    color: #2196f3;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  h3 {
    margin: 0 0 15px;
  }

`

export default Global;
