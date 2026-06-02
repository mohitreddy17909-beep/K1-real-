/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { METRICS } from '../data';
import * as Icons from 'lucide-react';

export default function IsometricMetrics() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pb-12 pt-6" id="isometric-metrics-container">
      {METRICS.map((metric, idx) => {
        // Dynamically resolve Icon names
        const IconComponent = (Icons as any)[metric.iconName] || Icons.HelpCircle;
        const isHovered = hoveredIdx === idx;

        return (
          <div
            key={metric.id}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            className="relative cursor-pointer transition-all duration-500 ease-out preserve-3d perspective-1000"
            id={`isometric-box-wrapper-${metric.id}`}
          >
            {/* Architectural Isometric Card */}
            <div
              className={`p-8 rounded-2xl transition-all duration-500 ease-out glass-panel-heavy border-b-4 border-r-4 ${
                isHovered
                  ? 'border-emerald-500 shadow-2xl bg-white'
                  : 'border-sky-500/20 shadow-lg'
              }`}
              style={{
                // Beautiful isometric state: Rotated on X&Y axis. On hover, the plane physically flattens & lifts upwards
                transform: isHovered
                  ? 'rotateX(15deg) rotateY(-10deg) skewX(1deg) translateY(-14px) translateZ(30px)'
                  : 'rotateX(25deg) rotateY(-15deg) skewX(3deg) translateY(0px) translateZ(0px)',
                transformStyle: 'preserve-3d',
                boxShadow: isHovered 
                  ? '30px 40px 60px rgba(15, 23, 42, 0.12), 0 0 30px rgba(16, 185, 129, 0.08)' 
                  : '15px 20px 30px rgba(15, 23, 42, 0.05)',
              }}
              id={`isometric-box-${metric.id}`}
            >
              {/* Back shadows to reinforce architectural construction lines */}
              <div 
                className={`absolute inset-x-0 bottom-0 h-2 bg-gradient-to-t from-sky-500/10 to-transparent transition-opacity duration-300 ${
                  isHovered ? 'opacity-100' : 'opacity-40'
                }`} 
              />

              {/* Icon Container with dynamic 3D pop */}
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br from-sky-500/10 to-emerald-500/20 text-emerald-600 border border-emerald-500/40 mb-6 transition-transform duration-500 ease-out"
                style={{ 
                  transform: isHovered ? 'translateZ(30px) rotateY(15deg)' : 'translateZ(10px)' 
                }}
              >
                <IconComponent size={26} className={isHovered ? 'animate-pulse' : ''} />
              </div>

              {/* Number Value text */}
              <div 
                className="font-display text-5xl font-extrabold text-white tracking-tight mb-2 flex items-baseline gap-1"
                style={{ 
                  transform: isHovered ? 'translateZ(40px)' : 'translateZ(15px)' 
                }}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-emerald-500 to-emerald-600">
                  {metric.value}
                </span>
              </div>

              {/* Heading */}
              <h4 
                className="text-lg font-display font-bold text-slate-800 tracking-wide mb-2 uppercase"
                style={{ 
                  transform: isHovered ? 'translateZ(25px)' : 'translateZ(10px)' 
                }}
              >
                {metric.label}
              </h4>

              {/* Supporting context info */}
              <p 
                className="text-slate-600 text-xs leading-relaxed"
                style={{ 
                  transform: isHovered ? 'translateZ(15px)' : 'translateZ(0px)' 
                }}
              >
                {metric.description}
              </p>

              {/* Wireframe coordinates graphic overlays in corner representing DTCP plot layout designs */}
              <div className="absolute top-4 right-4 pointer-events-none opacity-20 font-mono text-[9px] text-emerald-500 flex flex-col items-end">
                <span>COORD_Z_LIFT</span>
                <span>{isHovered ? '+30DP' : '+10DP'}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
