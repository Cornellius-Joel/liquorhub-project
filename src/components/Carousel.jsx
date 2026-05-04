import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Carousel = () => {
  return (
    <section className="row mb-2 mt-2">
      <div className="col-md-12">
        <div id="mycarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="/images/slide1.png" alt="carousel" className="w-100 d-block" />
            </div>
            <div className="carousel-item">
              <img src="/images/slide2.png" alt="carousel" className="w-100 d-block" />
            </div>
            <div className="carousel-item">
              <img src="/images/slide3.png" alt="carousel" className="w-100 d-block" />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#mycarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon bg-danger"></span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#mycarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon bg-danger"></span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Carousel;
