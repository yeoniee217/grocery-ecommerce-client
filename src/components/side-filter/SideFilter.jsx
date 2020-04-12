import React from 'react'

import './SideFilter.styles.scss'

const SideFilter = ({categoryName, radioBtn, onChange, showCategoryName}) => {
  return (
    <div class="card mt-5" style={{height:"fit-content"}}>
      {
        showCategoryName ?
        <h4 class="card-header font-weight-bold"><span>{categoryName}</span> <i class="fas fa-arrow-circle-right ml-1"></i></h4>
        :
        null
      }
      <article class="card-group-item card-border-top">
        <header class="card-header"><h6 class="title">Filter Products</h6></header>
        <div class="filter-content">
          <div class="card-body">
            <label class="form-check">
              <input class="form-check-input" type="radio" checked={radioBtn === 'all'}
                onChange={onChange} name="radioBtn" value="all"/>
              <span class="form-check-label">
                All
              </span>
            </label>
            <label class="form-check">
              <input class="form-check-input" type="radio" checked={radioBtn === 'new'}
                onChange={onChange} name="radioBtn" value="new"/>
              <span class="form-check-label">
                New
              </span>
            </label>
            <label class="form-check">
              <input class="form-check-input" type="radio" checked={radioBtn === 'onSale'}
                onChange={onChange}  name="radioBtn" value="onSale"/>
              <span class="form-check-label">
                On Sale
              </span>
            </label>
            <label class="form-check">
              <input class="form-check-input" type="radio" checked={radioBtn === 'recUpdated'}
                onChange={onChange} name="radioBtn" value="recUpdated"/>
              <span class="form-check-label">
                Recently Updated
              </span>
            </label>
          </div>
        </div>
        {/* <div class="filter-content">
          <div class="list-group list-group-flush">
            <a href="#" class="list-group-item">On Sale<span class="float-right badge badge-light round">142</span> </a>
            <a href="#" class="list-group-item">New<span class="float-right badge badge-light round">3</span>  </a>
            <a href="#" class="list-group-item">Recently Updated<span class="float-right badge badge-light round">32</span>  </a>
            <a href="#" class="list-group-item">Place Holder <span class="float-right badge badge-light round">12</span>  </a>
          </div>
        </div> */}
      </article>
      <article class="card-group-item">
        <header class="card-header card-border-top"><h6 class="title">Place Holder</h6></header>
        <div class="filter-content">
          <div class="card-body">

          </div>
        </div>
      </article>
    </div>
  )}

export default SideFilter;
