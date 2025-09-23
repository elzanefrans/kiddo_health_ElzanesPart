import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import heroImage1 from '../images/image4.jpg';
import heroImage2 from '../images/image5.jpg';
import parentImage1 from '../images/image1.jpg';
import parentImage2 from '../images/image2.jpg';
import parentImage3 from '../images/image3.jpg';
import parentImage4 from '../images/image4.jpg';
import parentImage5 from '../images/image5.jpg';
import parentImage6 from '../images/image6.jpg';
import './Patient.css';

const PatientDashboard = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const parentImages = [
    { src: parentImage1, alt: "Parent with newborn baby" },
    { src: parentImage2, alt: "Doctor examining child" },
    { src: parentImage3, alt: "Happy family at park" },
    { src: parentImage4, alt: "Parent reading to child" },
    { src: parentImage5, alt: "Teenager with pediatrician" },
    { src: parentImage6, alt: "Children playing together" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % parentImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [parentImages.length]);

  return (
    <div className="patient-dashboard">
      {/* Full-width Parents Slideshow Section */}
      <div className="full-width-container">
        <section className="parents-section">
          <div className="parents-slideshow">
            <div 
              className="slideshow-container"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {parentImages.map((image, index) => (
                <div key={index} className="slide">
                  {/* Use picture element for better image optimization */}
                  <picture>
                    <source srcSet={`${image.src}?w=1920&q=80`} media="(min-width: 1200px)" />
                    <source srcSet={`${image.src}?w=1200&q=80`} media="(min-width: 768px)" />
                    <source srcSet={`${image.src}?w=800&q=80`} media="(min-width: 480px)" />
                    <img 
                      src={`${image.src}?w=480&q=80`} 
                      alt={image.alt}
                      loading="lazy"
                    />
                  </picture>
                  <div className="slide-content">
                    
                    <p>
                      Advice on children's health, behavior, and growth – from before birth through the teen years.
                    </p>
                    <div className="parent-links">
                      <Link to="/Appointmennt" className="parent-link">Appointment →</Link>
                    
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="slideshow-dots">
              {parentImages.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Transition Message Section */}
        <section className="transition-message">
          <div className="content-container">
            <h3>Caring for Newborns to Young Adults</h3>
            <p>Comprehensive pediatric care at every stage of your child's development</p>
          </div>
        </section>
      </div>

      {/* Contained sections */}
      <div className="content-container">
        {/* First Hero Section */}
        <section 
          className="hero-section"
          style={{ 
            backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${heroImage1})`,
          }}
        >
          <div className="hero-content">
            <h1>Care Centered on You</h1>
            <p className="hero-subtitle">
              Delivering innovative, high-quality health care for every child and family — because it takes a village to raise, and a community to care
            </p>
          </div>
        </section>

        {/* Second Hero Section */}
        <section 
          className="purpose-hero-section"
          style={{ 
            backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${heroImage2})`,
          }}
        >
          <div className="purpose-content">
            <h2>OUR PURPOSE</h2>
            <h3>Quality Care Matters</h3>
            <p>
              Family HealthCare Network is united by the common goal to protect and preserve
              the health of our communities and provide access to quality healthcare for all.
            </p>
          </div>
        </section>

        {/* Services Section */}
<section className="services-section">
  <div className="services-header">
    <h2>Services</h2>
    <p>We offer services to cover your entire family, from obstetrics to dental, and more.</p>
  </div>
  
  <div className="services-cta">
  
    <div className="services-options">
      <div className="service-option">
        <h4>Health Tips</h4>
        <p>From Tummy Aches to Tiny Toes – We’ve Got You.Healthy Starts for Every Child..</p>
        <Link to="/health-tips" className="service-button">More Information</Link>
      </div>
      
      <div className="service-option">
        <h4>Our Locations</h4>
        <p>Easily search by location or service name to find the health center nearest you.</p>
        <Link to="/locations" className="service-button">FIND A LOCATION</Link>
      </div>
    </div>
  </div>
</section>

      </div>
    </div>
  );
};

export default PatientDashboard;