import React from 'react';

const Footer = () => {
  return (
    <footer id="sticky-footer" class="py-4 bg-dark text-white-50" style={{marginTop:"20%"}}>
      <div class="container text-center">
        <div style={{display:"flex", justifyContent:"space-between"}}>
          <div style={{display:"inline-block"}}>
            <small style={{fontSize:"14px"}}>Copyright &copy; 2020 SuperiorStore</small>
            <a href="/about" class="ml-3">About</a>
            <a href="/contact" class="ml-3" style={{}}>Contact</a>
          </div>
          <div style={{textAlign:"right",display:"inline-block"}}>
            Developed by Jihyeon Lee <i class="far fa-smile ml-1"></i>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
