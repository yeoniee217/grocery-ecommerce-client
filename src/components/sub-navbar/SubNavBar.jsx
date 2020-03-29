import React, { useState, useRef  } from 'react';
import { Link } from "react-router-dom";

import './SubNavBar.styles.scss'

const SubNavBar = ({categories}) => {
  const [toggle, setToggle] = useState(
    ''
  );

  const handleMouseOver = () => {
    setToggle('show')
  }

  const handleMouseLeave = () => {
    setToggle('')
  }

  return (
<div class="mt-3">
    <nav class="collectionPage-nav">
      <button class='navbar-toggler' onMouseOver={handleMouseOver} type="button" data-toggle="collapse" collapse={false} data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <i className="fas fa-bars"></i> <span class="ml-4">All Categories</span>
      </button>

      <div class={`collapse navbar-collapse ${toggle}`} onMouseLeave={handleMouseLeave} id="navbarNav">
        <ul class="navbar-nav">
          {
            categories.length ?
            categories.map(category =>
              <li>
                <Link className="nav-link ml-3" to={{ pathname:`/categories/${category.id}` }}>{category.name}</Link>
              </li>
            )
            :
            null
          }

        </ul>
      </div>
    </nav>
  </div>
  )

};

export default SubNavBar;
