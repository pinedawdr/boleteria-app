// src/styles/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Poppins', sans-serif;
    background-color: #f8f9fa;
    color: #333;
    line-height: 1.6;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
  }

  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .gradient-btn {
    background: linear-gradient(45deg, #eb004b, #ff6b6b);
    color: white;
    border-radius: 30px;
    padding: 10px 25px;
    font-weight: 600;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(255, 51, 102, 0.3);
  }

  .gradient-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 7px 20px rgba(255, 51, 102, 0.4);
  }

  .gradient-input {
    border: 2px solid transparent;
    border-radius: 8px;
    padding: 12px 15px;
    background-image: linear-gradient(white, white), 
                      linear-gradient(45deg, #eb004b, #ff6b6b);
    background-origin: border-box;
    background-clip: padding-box, border-box;
    transition: all 0.3s ease;
  }

  .gradient-input:focus {
    box-shadow: 0 0 0 3px rgba(255, 51, 102, 0.2);
    outline: none;
  }

  .section {
    padding: 80px 0;
  }

  .section-title {
    font-size: 2.5rem;
    margin-bottom: 40px;
    text-align: center;
    font-weight: 700;
  }

  .section-subtitle {
    font-size: 1.2rem;
    margin-bottom: 50px;
    text-align: center;
    color: #6c757d;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
  }
`;

export default GlobalStyles;