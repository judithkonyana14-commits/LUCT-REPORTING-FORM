import React from "react";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  /* BODY */
  body {
    font-family: Arial, Helvetica, sans-serif;
    background-color:rgb(220, 224, 225);
    margin: 0;
    padding: 0;
    color: black;
  }

  /* CONTAINERS */
  .container {
    padding: 20px;
    margin-top: 20px;
    background-color: light brown;
    border-radius: 8px;
    box-shadow: 0 3px 8px rgba(0,0,0,0.1);
    transition: transform 0.5s ease; 
    
  }

  /* NAVBAR */
  .navbar {
    background-color:rgb(39, 173, 90) !important;
    padding: 0.8rem 1rem;
    border-radius: 0 0 8px 8px;
  }
  .navbar .navbar-brand {
    font-weight: bold;
    color: black !important;
  }
  .navbar .nav-link {
    color: black !important;
    margin-right: 10px;
  }
  .navbar .nav-link:hover {
    text-decoration: none;
  }

  /* DASHBOARD */
  .card {
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(139, 90, 33, 0.1);
    margin-bottom: 20px;
    padding: 10px;
    background-color: WHITE;
  }

  /* BUTTONS */
  .btn {
    border-radius: 5px;
    padding: 0.45rem 0.9rem;
    font-weight: 500;
  }
  .btn-primary {
    background-color:rgb(6, 142, 147);
    border-color: #0d6efd;
  }
  .btn-primary:hover {
    background-color:rgb(229, 232, 227);
    border-color: #0b5ed7;
  }
  .btn-success {
    background-color:rgb(19, 20, 19);
    border-color:rgb(3, 3, 3);
  }
  .btn-success:hover {
    background-color:rgb(9, 10, 10);
    border-color: #157347;
  }
  .btn-danger {
    background-color: #dc3545;
    border-color: #dc3545;
  }
  .btn-danger:hover {
    background-color:rgb(234, 246, 239);
    border-color: #bb2d3b;
  }

  /* TABLES */
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
  }
  table th, table td {
    padding: 10px;
    border-bottom: 1px solidrgb(8, 12, 17);
  }
  table th {
    background-color:rgb(12, 12, 13);
    text-align: right;
  }

  /* FORM ELEMENTS */
  input, select, textarea {
    border-radius: 5px;
    border: 1px solidrgb(21, 24, 26);
    padding: 6px 10px;
    width: 80%;
    margin-bottom: 10px;
  }
  input:focus, select:focus, textarea:focus {
    outline: none;
    border-color: #0d6efd;
    box-shadow: 0 0 0 0.2rem rgba(13,110,253,0.25);
  }

  /* HEADINGS */
  h3, h4, h5 {
    font-weight: 600;
    margin-bottom: 15px;
  }

  /* SMALL TEXT */
  .small {    font-size: 0.85rem;
    color:rgb(134, 30, 73);
  }

  /* LINKS */
  a {
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
    link.style.transform = 'translateX(0)';
  }
`;

export default function Styles() {
  return <GlobalStyle />;
}
