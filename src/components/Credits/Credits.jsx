import React from "react";

import "./Credits.css";

const Credits = () => {
  return (
    <main>
      <div className="credits-container">
        <section>
          <img src="credits-banner.png" alt="artist-drawing" />
        </section>
        <section>
          <h2>Credit for Images</h2>
          <ul>
            <li>
              <a
                rel="noreferrer"
                target="_blank"
                href="https://pngtree.com/so/cry"
              >
                cry png from pngtree.com
              </a>
            </li>
            <li>
              <a
                rel="noreferrer"
                target="_blank"
                href="https://pngtree.com/so/artist-clipart"
              >
                artist clipart png from pngtree.com
              </a>
            </li>
            <li>
              <a rel="noreferrer" target="_blank" href="https://pngtree.com">
                calendar clipart PNG Designed By CONG from Pngtree.com
              </a>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
};

export default Credits;
