import React, { useEffect, useRef, useState, useCallback } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  connections: number[];
  isMainNode?: boolean;
}

interface OrbitParticle {
  angle: number;
  speed: number;
  radiusX: number;
  radiusY: number;
  rotation: number;
  pathRotation: number;
  pathSpeed: number;
}

interface NetworkBackgroundProps {
  children: React.ReactNode;
  nodeCount?: number;
  connectionDistance?: number;
  mouseInfluence?: number;
}

export const NetworkBackground: React.FC<NetworkBackgroundProps> = ({
  children,
  nodeCount = 80,
  connectionDistance = 120,
  mouseInfluence = 150
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const orbitParticlesRef = useRef<OrbitParticle[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Initialize orbit particles for React Native atom effect
  const initializeOrbitParticles = useCallback(() => {
    const orbits: OrbitParticle[] = [];
    
    // Create 3 elliptical orbits with different orientations
    for (let i = 0; i < 3; i++) {
      const baseRadius = 35;
      const radiusVariation = i * 8;
      
      orbits.push({
        angle: (i * 120) * (Math.PI / 180),
        speed: 0.015 + i * 0.004,
        radiusX: baseRadius + radiusVariation,
        radiusY: (baseRadius + radiusVariation) * 0.35,
        rotation: i * 60 * (Math.PI / 180),
        pathRotation: 0,
        pathSpeed: 0
      });
    }
    
    orbitParticlesRef.current = orbits;
  }, []);

  // Initialize nodes
  const initializeNodes = useCallback((width: number, height: number) => {
    const nodes: Node[] = [];
    
    // Create main node positioned on the right side (fixed position)
    const mainNodeX = width * 0.75; // 75% from left (right side)
    const mainNodeY = height * 0.4; // 40% from top
    
    nodes.push({
      x: mainNodeX,
      y: mainNodeY,
      vx: 0,
      vy: 0,
      connections: [],
      isMainNode: true
    });

    // Create regular nodes
    for (let i = 1; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        connections: []
      });
    }

    nodesRef.current = nodes;
    initializeOrbitParticles();
  }, [nodeCount, initializeOrbitParticles]);

  // Calculate connections between nodes
  const calculateConnections = useCallback(() => {
    const nodes = nodesRef.current;
    
    nodes.forEach(node => {
      node.connections = [];
    });

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
          nodes[i].connections.push(j);
          nodes[j].connections.push(i);
        }
      }
    }
  }, [connectionDistance]);

  // Update orbit particles
  const updateOrbitParticles = useCallback((mouseDistance: number) => {
    orbitParticlesRef.current.forEach(orbit => {
      // Update particle position (particles move)
      orbit.angle += orbit.speed;
      if (orbit.angle > Math.PI * 2) {
        orbit.angle -= Math.PI * 2;
      }
      
      // Orbit rotation based on mouse proximity
      if (mouseDistance < mouseInfluence) {
        const influence = (mouseInfluence - mouseDistance) / mouseInfluence;
        orbit.pathSpeed = influence * 0.02; // Slow rotation when mouse is near
      } else {
        orbit.pathSpeed = 0; // Stop rotation when mouse is away
      }
      
      // Update path rotation
      orbit.pathRotation += orbit.pathSpeed;
      if (orbit.pathRotation > Math.PI * 2) {
        orbit.pathRotation -= Math.PI * 2;
      }
    });
  }, [mouseInfluence]);

  // Update node positions
  const updateNodes = useCallback((width: number, height: number) => {
    const nodes = nodesRef.current;
    const mouse = mouseRef.current;
    const mainNode = nodes.find(node => node.isMainNode);

    // Calculate distance from mouse to main node
    let mouseDistance = Infinity;
    if (mainNode) {
      const dx = mouse.x - mainNode.x;
      const dy = mouse.y - mainNode.y;
      mouseDistance = Math.sqrt(dx * dx + dy * dy);
    }

    nodes.forEach((node, index) => {
      if (node.isMainNode) {
        // Main node stays in fixed position (doesn't follow cursor)
        // Only slight movement for natural feel
        const centerX = width * 0.75;
        const centerY = height * 0.4;
        
        // Gentle drift back to center position
        const driftX = (centerX - node.x) * 0.01;
        const driftY = (centerY - node.y) * 0.01;
        
        node.x += driftX;
        node.y += driftY;
        
        // Add subtle floating animation
        const time = Date.now() * 0.001;
        node.x += Math.sin(time * 0.5) * 0.3;
        node.y += Math.cos(time * 0.3) * 0.2;
      } else {
        // Regular nodes move with physics
        node.x += node.vx;
        node.y += node.vy;

        // Mouse influence on nearby nodes
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseInfluence) {
          const force = (mouseInfluence - distance) / mouseInfluence;
          const angle = Math.atan2(dy, dx);
          node.vx += Math.cos(angle) * force * 0.01;
          node.vy += Math.sin(angle) * force * 0.01;
        }

        // Apply friction
        node.vx *= 0.99;
        node.vy *= 0.99;

        // Boundary collision
        if (node.x < 0 || node.x > width) {
          node.vx *= -0.8;
          node.x = Math.max(0, Math.min(width, node.x));
        }
        if (node.y < 0 || node.y > height) {
          node.vy *= -0.8;
          node.y = Math.max(0, Math.min(height, node.y));
        }

        // Add slight random movement
        node.vx += (Math.random() - 0.5) * 0.01;
        node.vy += (Math.random() - 0.5) * 0.01;

        // Limit velocity
        const maxVel = 2;
        const vel = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
        if (vel > maxVel) {
          node.vx = (node.vx / vel) * maxVel;
          node.vy = (node.vy / vel) * maxVel;
        }
      }
    });

    updateOrbitParticles(mouseDistance);
  }, [mouseInfluence, updateOrbitParticles]);

  // Draw orbit particles around main node
  const drawOrbitParticles = useCallback((ctx: CanvasRenderingContext2D, mainNode: Node) => {
    const orbits = orbitParticlesRef.current;
    
    orbits.forEach((orbit, index) => {
      // Calculate position on elliptical orbit
      const rotatedX = Math.cos(orbit.angle) * orbit.radiusX;
      const rotatedY = Math.sin(orbit.angle) * orbit.radiusY;
      
      // Apply orbit rotation (includes mouse-influenced pathRotation)
      const totalRotation = orbit.rotation + orbit.pathRotation;
      const finalX = mainNode.x + (rotatedX * Math.cos(totalRotation) - rotatedY * Math.sin(totalRotation));
      const finalY = mainNode.y + (rotatedX * Math.sin(totalRotation) + rotatedY * Math.cos(totalRotation));
      
      // Draw orbit path with rotation
      ctx.save();
      ctx.translate(mainNode.x, mainNode.y);
      ctx.rotate(totalRotation);
      
      // Outer glow layer
      const outerGradient = ctx.createLinearGradient(-orbit.radiusX, 0, orbit.radiusX, 0);
      outerGradient.addColorStop(0, 'rgba(147, 51, 234, 0.15)');
      outerGradient.addColorStop(0.5, 'rgba(147, 51, 234, 0.4)');
      outerGradient.addColorStop(1, 'rgba(147, 51, 234, 0.15)');
      
      ctx.strokeStyle = outerGradient;
      ctx.lineWidth = 3;
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.ellipse(0, 0, orbit.radiusX + 1, orbit.radiusY + 1, 0, 0, Math.PI * 2);
      ctx.stroke();
      
      // Main orbit path - solid and bright
      const mainGradient = ctx.createLinearGradient(-orbit.radiusX, 0, orbit.radiusX, 0);
      mainGradient.addColorStop(0, 'rgba(147, 51, 234, 0.6)');
      mainGradient.addColorStop(0.5, 'rgba(147, 51, 234, 0.9)');
      mainGradient.addColorStop(1, 'rgba(147, 51, 234, 0.6)');
      
      ctx.strokeStyle = mainGradient;
      ctx.lineWidth = 2;
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.ellipse(0, 0, orbit.radiusX, orbit.radiusY, 0, 0, Math.PI * 2);
      ctx.stroke();
      
      // Inner highlight
      ctx.strokeStyle = 'rgba(147, 51, 234, 0.95)';
      ctx.lineWidth = 1;
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.ellipse(0, 0, orbit.radiusX - 0.5, orbit.radiusY - 0.5, 0, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.restore();
      
      // Draw orbit particle with enhanced glow
      const gradient = ctx.createRadialGradient(finalX, finalY, 0, finalX, finalY, 6);
      gradient.addColorStop(0, 'rgba(147, 51, 234, 1)');
      gradient.addColorStop(0.3, 'rgba(147, 51, 234, 0.9)');
      gradient.addColorStop(0.7, 'rgba(147, 51, 234, 0.4)');
      gradient.addColorStop(1, 'rgba(147, 51, 234, 0.1)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(finalX, finalY, 3, 0, Math.PI * 2);
      ctx.fill();
      
      // Add pulsing glow effect
      const pulseIntensity = 0.8 + 0.2 * Math.sin(orbit.angle * 3);
      ctx.shadowColor = `rgba(147, 51, 234, ${pulseIntensity * 0.8})`;
      ctx.shadowBlur = 12;
      ctx.fillStyle = `rgba(147, 51, 234, ${pulseIntensity})`;
      ctx.beginPath();
      ctx.arc(finalX, finalY, 1.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      
      // Add trailing effect
      const trailLength = 4;
      for (let i = 1; i <= trailLength; i++) {
        const trailAngle = orbit.angle - (i * 0.06);
        const trailX = Math.cos(trailAngle) * orbit.radiusX;
        const trailY = Math.sin(trailAngle) * orbit.radiusY;
        
        const trailFinalX = mainNode.x + (trailX * Math.cos(totalRotation) - trailY * Math.sin(totalRotation));
        const trailFinalY = mainNode.y + (trailX * Math.sin(totalRotation) + trailY * Math.cos(totalRotation));
        
        const trailOpacity = (trailLength - i) / trailLength * 0.3;
        const trailSize = 1.5 * (trailLength - i) / trailLength;
        
        ctx.fillStyle = `rgba(147, 51, 234, ${trailOpacity})`;
        ctx.beginPath();
        ctx.arc(trailFinalX, trailFinalY, trailSize, 0, Math.PI * 2);
        ctx.fill();
      }
    });
  }, []);

  // Render the network
  const render = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Clear canvas with dark background
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, width, height);

    const nodes = nodesRef.current;
    const mainNode = nodes.find(node => node.isMainNode);

    // Draw connections
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)';
    ctx.lineWidth = 1;
    
    nodes.forEach((node, i) => {
      node.connections.forEach(connectionIndex => {
        if (connectionIndex > i) {
          const connectedNode = nodes[connectionIndex];
          const dx = node.x - connectedNode.x;
          const dy = node.y - connectedNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          const opacity = Math.max(0, 1 - distance / connectionDistance);
          
          if (node.isMainNode || connectedNode.isMainNode) {
            ctx.strokeStyle = `rgba(147, 51, 234, ${opacity * 0.8})`;
            ctx.lineWidth = 2;
          } else {
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity * 0.4})`;
            ctx.lineWidth = 1;
          }

          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(connectedNode.x, connectedNode.y);
          ctx.stroke();
        }
      });
    });

    // Draw orbit particles around main node (React Native atom effect)
    if (mainNode) {
      drawOrbitParticles(ctx, mainNode);
    }

    // Draw nodes
    nodes.forEach(node => {
      ctx.beginPath();
      
      if (node.isMainNode) {
        // Main node - smaller size
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 12);
        gradient.addColorStop(0, 'rgba(147, 51, 234, 1)');
        gradient.addColorStop(0.3, 'rgba(147, 51, 234, 0.9)');
        gradient.addColorStop(0.6, 'rgba(147, 51, 234, 0.5)');
        gradient.addColorStop(1, 'rgba(147, 51, 234, 0.1)');
        
        ctx.fillStyle = gradient;
        ctx.arc(node.x, node.y, 8, 0, Math.PI * 2);
        ctx.fill();
        
        // Add pulsing glow effect
        const time = Date.now() * 0.003;
        const pulseIntensity = 0.7 + 0.3 * Math.sin(time);
        ctx.shadowColor = `rgba(147, 51, 234, ${pulseIntensity})`;
        ctx.shadowBlur = 20;
        ctx.fillStyle = `rgba(147, 51, 234, ${pulseIntensity})`;
        ctx.arc(node.x, node.y, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      } else {
        // Regular nodes
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 6);
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.9)');
        gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.6)');
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0.1)');
        
        ctx.fillStyle = gradient;
        ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Core
        ctx.fillStyle = 'rgba(59, 130, 246, 0.8)';
        ctx.arc(node.x, node.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    });
  }, [connectionDistance, drawOrbitParticles]);

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = dimensions;
    
    updateNodes(width, height);
    calculateConnections();
    render(ctx, width, height);

    animationRef.current = requestAnimationFrame(animate);
  }, [dimensions, updateNodes, calculateConnections, render]);

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const canvas = canvasRef.current;
      if (!canvas || !e.touches[0]) return;

      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  // Handle resize and initialization
  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setDimensions({ width, height });
      setIsMobile(width < 768);
      
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = width;
        canvas.height = height;
        
        // Set initial mouse position to center
        mouseRef.current = { x: width / 2, y: height / 2 };
        
        initializeNodes(width, height);
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, [initializeNodes]);

  // Start animation
  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      animate();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, dimensions]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ 
          width: '100%', 
          height: '100%',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)'
        }}
      />
      
      {/* Content overlay */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Subtle overlay for better text readability */}
      <div 
        className="absolute inset-0 z-5 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(15, 23, 42, 0.3) 100%)'
        }}
      />
    </div>
  );
};