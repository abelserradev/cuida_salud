// estilo sustraido de la pagina uiverse

'use client';

import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  @keyframes autoRun3d {
    from {
      transform: perspective(1200px) rotateY(-360deg);
    }
    to {
      transform: perspective(1200px) rotateY(0deg);
    }
  }

  @keyframes animateBrightness {
    0%, 100% {
      filter: brightness(1);
    }
    50% {
      filter: brightness(0.6);
    }
  }

  .card-3d-container {
    width: 100%;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    perspective: 1200px;
  }

  .card-3d {
    position: relative;
    width: 280px;
    height: 280px;
    transform-style: preserve-3d;
    transform: perspective(1200px);
    animation: autoRun3d 16s linear infinite;
    will-change: transform;
  }

  .card-3d-item {
    position: absolute;
    width: 180px;
    height: 240px;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    border: solid 2px rgba(255, 255, 255, 0.3);
    border-radius: 0.75rem;
    top: 50%;
    left: 50%;
    transform-origin: center center;
    animation: animateBrightness 16s linear infinite;
    transition-duration: 200ms;
    will-change: transform, filter;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    backdrop-filter: blur(10px);
  }

  .card-3d:hover {
    animation-play-state: paused !important;
  }

  .card-3d:hover .card-3d-item {
    animation-play-state: paused !important;
  }

  /* Posiciones de las 4 tarjetas */
  .card-3d-item:nth-child(1) {
    transform: translate(-50%, -50%) rotateY(0deg) translateZ(200px);
    animation-delay: 0s;
  }

  .card-3d-item:nth-child(2) {
    transform: translate(-50%, -50%) rotateY(90deg) translateZ(200px);
    animation-delay: -4s;
  }

  .card-3d-item:nth-child(3) {
    transform: translate(-50%, -50%) rotateY(180deg) translateZ(200px);
    animation-delay: -8s;
  }

  .card-3d-item:nth-child(4) {
    transform: translate(-50%, -50%) rotateY(270deg) translateZ(200px);
    animation-delay: -12s;
  }

  /* Contenido de las tarjetas */
  .card-content {
    padding: 1rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
    position: relative;
    z-index: 1;
  }

  .icon-wrapper {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;
  }

  .age-range {
    font-size: 1rem;
    font-weight: bold;
    margin: 0.5rem 0;
  }

  .price {
    font-size: 0.875rem;
    font-weight: bold;
    margin: 0.5rem 0;
  }

  .price-label {
    font-size: 0.875rem;
    opacity: 0.8;
  }

  /* Colores específicos para cada tarifa */
  .card-blue {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }

  .card-green {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    color: white;
  }

  .card-purple {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    color: white;
  }

  .card-orange {
    background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
    color: white;
  }
`;

interface TarifaData {
  rangoEdad: string;
  precio: number;
  color: string;
  iconPath: string;
}

const tarifas: TarifaData[] = [
  {
    rangoEdad: '0 - 50 años',
    precio: 15,
    color: 'card-blue',
    iconPath: 'M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5'
  },
  {
    rangoEdad: '51 - 70 años',
    precio: 20,
    color: 'card-green',
    iconPath: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
  },
  {
    rangoEdad: '71 - 90 años',
    precio: 25,
    color: 'card-purple',
    iconPath: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
  },
  {
    rangoEdad: '91+ años',
    precio: 30,
    color: 'card-orange',
    iconPath: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
  }
];

export default function TarifasCard3D() {
  return (
    <StyledWrapper>
      <div className="card-3d-container">
        <div className="card-3d">
          {tarifas.map((tarifa, index) => (
            <div key={index} className={`card-3d-item ${tarifa.color}`}>
              <div className="card-content">
                <div>
                  <div className="icon-wrapper" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                    <svg 
                      className="w-8 h-8" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      style={{ width: '2rem', height: '2rem' }}
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d={tarifa.iconPath}
                      />
                    </svg>
                  </div>
                  <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                    Rango de Edad
                  </h3>
                  <p className="age-range">{tarifa.rangoEdad}</p>
                </div>
                
                <div style={{ 
                  borderTop: '2px solid rgba(255, 255, 255, 0.3)', 
                  paddingTop: '1rem',
                  marginTop: '1rem'
                }}>
                  <p className="price-label">Cuota Anual</p>
                  <p className="price">${tarifa.precio}</p>
                  <p className="price-label">USD por año</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StyledWrapper>
  );
}