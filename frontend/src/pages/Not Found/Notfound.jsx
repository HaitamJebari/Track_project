import React from 'react';
import errorImg from '../../assets/errorimg.svg'; 

function Notfound  () {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        height: '100vh'
    }}>
        <div>
            <img src={errorImg} width="500" alt="404" />
            <h1 style={{ fontSize: '2.5rem', paddingTop: '1rem' }}>Opps!!!</h1>
            <h4 style={{ fontSize: '1.5rem', margin: '2rem 0' }}>This page you are looking for could not be found.</h4>
            <button 
                style={{
                    borderRadius: '50px',
                    padding: '0.5rem 2rem',
                    backgroundColor: '#1976d2', 
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    marginBottom: '1rem'
                }}
                onClick={() => window.location.href = '/'}
            >
                Go Back to Home
            </button>
        </div>
    </div>
    );
};

export default Notfound;