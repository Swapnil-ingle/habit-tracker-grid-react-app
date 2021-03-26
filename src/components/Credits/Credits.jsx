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
                Cry.png (pngtree.com)
              </a>
            </li>
            <li>
              <a
                rel="noreferrer"
                target="_blank"
                href="https://pngtree.com/so/artist-clipart"
              >
                Artist-Clipart.png (pngtree.com)
              </a>
            </li>
            <li>
              <a rel="noreferrer" target="_blank" href="https://pngtree.com">
                Calendar-Clipart.png (Designed By CONG - pngtree.com)
              </a>
            </li>
            <li>
              <a
                rel="noreferrer"
                target="_blank"
                href="https://pngtree.com/so/flat-user-avatar-astronaut"
              >
                Flat-user-avatar-astronaut.png (pngtree.com)
              </a>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
};

export default Credits;
