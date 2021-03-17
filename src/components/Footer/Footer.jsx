import React from "react";
import { Link } from "react-router-dom";

import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <section>
        <small>
          <a
            href="https://github.com/swapnil-ingle"
            rel="noreferrer"
            target="_blank"
          >
            © Swapnil Ingle
          </a>
        </small>
      </section>
      <section>
        <small>
          <Link to="/credits">Credits</Link>
        </small>
      </section>
    </div>
  );
};

export default Footer;
