import React from "react";

import "./Footer.css";

import Facebook from "../images/gg_facebook.png";
import Instagram from "../images/ri_instagram-fill.png";
import Twitter from "../images/twitter.png";

function Footer() {
  return (
    <div className="footer">
      <div className="footer_cover">
        <div className="left_footer">
          <div className="footer_title">Vidkart</div>
          <div className="tag_line">We help you find your usefull product</div>
          <div className="social_icons">
            <img src={Facebook} className="circle" />
            <img src={Instagram} className="circle" />
            <img src={Twitter} className="circle" />
          </div>
        </div>

        <div className="right_footer">
          <table>
            <tr>
              <th>Information</th>
              <th>Company</th>
              <th>Contact</th>
            </tr>
            <tr>
              <td>About</td>
              <td>Community</td>
              <td>Getting Started</td>
            </tr>
            <tr>
              <td>Product</td>
              <td>Career</td>
              <td>Pricing</td>
            </tr>
            <tr>
              <td>Blog</td>
              <td>Our Story</td>
              <td>Resources</td>
            </tr>
          </table>
        </div>
      </div>
      <div className="copyright">
        2023 all Right Reserved Term of use VIDKART
      </div>
    </div>
  );
}

export default Footer;
