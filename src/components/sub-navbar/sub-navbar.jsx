import React, { useState } from 'react';
import { Link } from "react-router-dom";

import './sub-navbar.styles.scss'

const SubNavBar = ({categories, onCategoryClick}) => {
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
<div class="mt-3" style={{marginLeft:"20%"}}>
    <nav class="collectionPage-nav">
      <button class='navbar-toggler' onMouseOver={handleMouseOver} type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <i className="fas fa-bars"></i> <span class="ml-3">All Categories</span>
      </button>

      <div class={`collapse navbar-collapse ${toggle}`} onMouseLeave={handleMouseLeave} id="navbarNav">
        <ul class="navbar-nav">
          {
            categories && categories.length ?
            categories.map(category =>
              <li key={category.id}>
                <Link onClick={onCategoryClick} className="nav-link ml-3" to={`/categories/${category.id}`}>{category.name}</Link>
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
