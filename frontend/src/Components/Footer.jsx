import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="section__container footer__container">
        <div className="footer__col">
          <h4>CONTACT INFO</h4>
          <p>
            <span>
              <i className="ri-map-pin-2-fill"></i>
            </span>
            123, London Bridge Street, London
          </p>
          <p>
            <span>
              <i className="ri-mail-fill"></i>
            </span>
            support@lebaba.com
          </p>
          <p>
            <span>
              <i className="ri-phone-fill"></i>
            </span>
            (+012) 3456 789
          </p>
        </div>

        <div className="footer__col">
            <h4>COMPANY</h4>
            <a href="/">Home</a>
            <a href="/">About Us</a>
            <a href="/">Work With Us</a>
            <a href="/">Our Blogs</a>
            <a href="/">Terms & Conditions</a>
        </div>

        <div className="footer__col">
            <h4>USEFUL LINK</h4>
            <a href="/">Help</a>
            <a href="/">Track My Order</a>
            <a href="/">Men</a>
            <a href="/">Women</a>
            <a href="/">Dresses</a>
        </div>

        <div className="footer__col">
            <h4>Instagram</h4>
            <div className="instagram__grid">
               
            </div>
        </div>
      </footer>

      <div className="footer__bar">
        Copyright &copy; 2025 by Lebaba. All rights reserved.
      </div>
    </>
  );
};

export default Footer;