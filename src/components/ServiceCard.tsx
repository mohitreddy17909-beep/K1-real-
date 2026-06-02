/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { Service } from '../types';
import * as Icons from 'lucide-react';

interface ServiceCardProps {
  key?: string;
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    const rX = -(mouseY / (height / 2)) * 10;
    const rY = (mouseX / (width / 2)) * 10;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  // Dynamically resolve icon component
  const IconComponent = (Icons as any)[service.iconName] || Icons.HelpCircle;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative rounded-2xl cursor-default perspective-1000 group h-full"
      id={`service-card-wrapper-${service.id}`}
    >
      <div
        className={`p-8 rounded-2xl h-full glass-panel-heavy preserve-3d transition-all duration-500 ease-out flex flex-col justify-between ${
          isHovered ? 'ring-2 ring-emerald-500/40 shadow-3xl' : 'shadow-xl'
        }`}
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${
            isHovered ? '10px' : '0'
          })`,
          transformStyle: 'preserve-3d',
        }}
        id={`service-card-${service.id}`}
      >
        <div>
          {/* Layered Icon Configuration */}
          <div className="relative w-16 h-16 mb-8 preserve-3d" style={{ transform: 'translateZ(20px)' }}>
            {/* Background layered glowing plate matching the green/blue colors */}
            <div 
              className={`absolute inset-0 rounded-2xl bg-sky-500/10 border border-sky-500/20 shadow-inner transition-transform duration-300 ${
                isHovered ? 'scale-110 -translate-x-1.5 -translate-y-1.5 opacity-80' : 'scale-100 opacity-40'
              }`} 
              style={{ transform: 'translateZ(-10px)' }}
            />
            {/* Mid plate solid shadow */}
            <div 
              className={`absolute inset-1 rounded-2xl bg-white border border-slate-200 shadow-sm transition-transform duration-500 ${
                isHovered ? 'scale-105 rotate-3' : 'scale-100'
              }`}
            />
            {/* Frontmost layer: The actual icon translated forward on the Z-Axis */}
            <div 
              className="absolute inset-0 flex items-center justify-center text-emerald-600 font-bold transition-transform duration-500"
              style={{ transform: isHovered ? 'translateZ(30px) scale(1.05)' : 'translateZ(10px)' }}
            >
              <IconComponent size={30} className={isHovered ? 'rotate-6 duration-300' : ''} />
            </div>
          </div>

          <h3 
            className="text-xl font-display font-semibold text-slate-800 tracking-tight mb-4 group-hover:text-emerald-600 transition-colors duration-300"
            style={{ transform: 'translateZ(15px)' }}
          >
            {service.title}
          </h3>

          <p 
            className="text-slate-600 text-sm leading-relaxed mb-6"
            style={{ transform: 'translateZ(10px)' }}
          >
            {service.description}
          </p>
        </div>

        {/* Floating Detailed Benefits Stack */}
        <ul 
          className="space-y-2 border-t border-slate-200/60 pt-5 mt-auto preserve-3d"
          style={{ transform: 'translateZ(5px)' }}
        >
          {service.benefits.map((benefit, bIdx) => (
            <li key={bIdx} className="flex items-center gap-2.5 text-xs text-slate-600">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500/80" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}
