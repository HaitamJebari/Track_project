import React, { useEffect, useRef } from "react";
import Glide from "@glidejs/glide";
import "./Home.css";
import vd1 from "../../assets/vd1.mp4";
import vd2 from "../../assets/vd2.mp4";
import "@glidejs/glide/dist/css/glide.core.min.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import { useState } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Home = () => {
  const glideRef = useRef(null);

  useEffect(() => {
    if (!glideRef.current) return;

    const glide = new Glide(glideRef.current, {
      type: "slider",
      focusAt: "center",
      perView: 1,
      autoplay: 3500,
      animationDuration: 1000,
      gap: 0,
      classes: {
        activeNav: "[&>*]:bg-slate-700",
      },
    });

    glide.mount();

    return () => glide.destroy();
  }, []);

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.scrollY + 1000,
      behavior: "smooth",
    });
  };


// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  // iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  // iconUrl: require('leaflet/dist/images/marker-icon.png'),
  // shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

  const [formData, setFormData] = useState({
    currentLocation: '',
    pickupLocation: '',
    dropoffLocation: '',
    currentCycle: ''
  });
  const [route, setRoute] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      const response = await fetch('http://localhost:8000/api/calculate-route/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentLocation: formData.currentLocation,
          pickupLocation: formData.pickupLocation,
          dropoffLocation: formData.dropoffLocation,
          currentCycle: formData.currentCycle
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to calculate route');
      }
  
      const data = await response.json();
      
      // Transform the backend response to match your frontend format
      setRoute({
        currentLocation: [data.route[0].lat, data.route[0].lng],
        pickupLocation: [data.route[1].lat, data.route[1].lng],
        dropoffLocation: [data.route[2].lat, data.route[2].lng],
        waypoints: data.route.map(point => [point.lat, point.lng])
      });
  
    } catch (err) {
      setError(err.message || 'Failed to calculate route. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Header />
      <div className="main_glide" ref={glideRef}>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            <li className="glide__slide">
              <video
                className="w-full h-full object-cover object-center"
                autoPlay
                muted
                loop
              >
                <source src={vd2} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </li>
            <li className="glide__slide">
              <video
                className="w-full h-full object-cover object-center"
                autoPlay
                muted
                loop
              >
                <source src={vd1} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </li>
          </ul>
        </div>
        <div className="glas_div">
          <div className="main_text">
            <p>
              The HOS regulations are found in part 395 of title 49 of the Code
              of Federal Regulations (CFR) in the Federal Motor Carrier Safety
              Regulations (FMCSRs).
            </p>
            <h2>
              These regulations are developed and enforced by the Federal Motor
              Carrier Safety Administration (FMCSA), which is part of the United
              States Department of Transportation.
            </h2>
          </div>
          <div className="buttons">
            <button className="btn " id="about">
              About The Service <i class="ri-arrow-right-line arrow"></i>
            </button>
            <button className="btn" id="create" onClick={handleScrollDown}>
              Create Trip<i class="ri-arrow-right-line arrow"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="main_content">
        <div className="main_title">
          <h1 className="title">
            <span>Plan Your Journey</span> Create <em>Trip</em>
          </h1>
        </div>
        <div className="form_container">
        <form onSubmit={handleSubmit}>
          <div className="input_grid">
            <div className="main_input">
              <input
                type="text"
                name="currentLocation"
                className="form-control"
                value={formData.currentLocation}
                onChange={handleChange}
                placeholder="Current Location"
                required
              />
            </div>
            <div className="main_input">
              <input
                type="text"
                name="pickupLocation"
                className="form-control"
                value={formData.pickupLocation}
                onChange={handleChange}
                placeholder="Pickup Location"
                required
              />
            </div>
            <div className="main_input">
              <input
                type="text"
                name="dropoffLocation"
                className="form-control"
                value={formData.dropoffLocation}
                onChange={handleChange}
                placeholder="Dropoff Location"
                required
              />
            </div>
            <div className="main_input">
              <input
                type="number"
                name="currentCycle"
                className="form-control"
                value={formData.currentCycle}
                onChange={handleChange}
                placeholder="Current Cycle Used (Hrs)"
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary" id="submit" disabled={loading}>
            {loading ? 'Calculating...' : 'Calculate Route'}
          </button>
        </form>
      </div>

      {error && <div className="error-message">{error}</div>}

      {route && (
        <div className="map-container" style={{ height: '500px', marginTop: '20px' }}>
          <MapContainer
            center={route.currentLocation}
            zoom={10}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {/* Current Location Marker */}
            <Marker position={route.currentLocation}>
              <Popup>Current Location</Popup>
            </Marker>
            
            {/* Pickup Location Marker */}
            <Marker position={route.pickupLocation}>
              <Popup>Pickup Location</Popup>
            </Marker>
            
            {/* Dropoff Location Marker */}
            <Marker position={route.dropoffLocation}>
              <Popup>Dropoff Location</Popup>
            </Marker>
            
            {/* Route Polyline */}
            <Polyline 
              positions={route.waypoints} 
              color="blue"
              weight={5}
              opacity={0.7}
            />
          </MapContainer>
        </div>
      )}
      </div>
      <Footer />
    </>
  );
};

export default Home;
