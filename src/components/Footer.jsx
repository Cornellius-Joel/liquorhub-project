import React from 'react';

const Footer = () => {
  return (
    <>
      <section className="row bg-dark text-warning p-4 mt-4">
        {/* Logo Section */}
        <div className="col-12 text-center mb-3">
          <img 
            src="/images/logo.png"   // replace with your actual logo path
            alt="Liquor Hub Logo" 
            className="img-fluid" 
            style={{ maxHeight: "80px" }} 
          />
        </div>

        <div className="col-md-4 border-end">
          <h4 className="text-center">About Us</h4>
          <p>
            <b>Our Motto</b>: Pouring quality, delivering joy.....
          </p>
        </div>

        <div className="col-md-4 border-end">
          <h4 className="text-center">Contact Us</h4>
          <form>
            <input
              type="email"
              placeholder="Enter your email..."
              className="form-control"
              required
            />
            <br />
            <textarea
              cols="30"
              rows="6"
              placeholder="Leave a comment..."
              className="form-control"
              required
            ></textarea>
            <br />
            <input
              type="submit"
              value="Send a message"
              className="btn btn-danger"
            />
          </form>
        </div>

        <div className="col-md-4 text-center">
<h4>Stay Connected</h4>
<a href="https://www.facebook.com">
  <img src="/images/fblogo.png" alt="Facebook" class="social-icon" />
</a>
<a href="https://www.instagram.com/yb._.cjey" target="_blank">
  <img src="images/ig.jpg" alt="Instagram" class="social-icon" />
</a>

<a href="https://www.x.com">
  <img src="images/xlogo.png" alt="X" class="social-icon" />
</a>
          <p className="mt-3">
            🍷✨ “Why settle for ordinary nights when you can turn them into unforgettable experiences? At Liquor Hub, we bring the finest selection of premium wines, spirits, and beers right to your doorstep. Whether you’re celebrating a milestone, hosting friends, or simply unwinding after a long day, we’ve got the perfect bottle waiting for you. Indulge in quality, savor the taste, and let every sip tell a story.”
          </p>
        </div>
      </section>

      <section className="row bg-dark text-warning text-center p-6">
        <h4>Developed by CJEY. &copy;2026. All rights Reserved</h4>
      </section>
    </>
  );
};

export default Footer;
