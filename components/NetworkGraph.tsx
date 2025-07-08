import React, { useEffect, useRef, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { useIsMobile } from '@/hooks/use-mobile';

type Node = {
  id: string;
  name: string;
  val: number;
  color: string;
  group?: string;
};

type Link = {
  source: string;
  target: string;
  value: number;
};

type GraphData = {
  nodes: Node[];
  links: Link[];
};

type NetworkGraphProps = {
  centerNodeId?: string;
  segment?: string;
};

const generateRandomNodes = (count: number, centerNodeId: string, segment?: string): Node[] => {
  const nodes: Node[] = [
    {
      id: centerNodeId,
      name: 'FlameBorn Hub',
      val: 6,
      color: '#FF6B35', // FlameBorn orange for center node
      group: 'center'
    }
  ];

  const segmentColors: Record<string, string> = {
    'Primary Healthcare Centers': '#00A86B', // Medical green
    'District Hospitals': '#0077B5', // Professional blue
    'Community Health Workers': '#9B59B6', // Community purple
    'Mobile Health Units': '#E74C3C', // Emergency red
    'Maternal Health Clinics': '#F39C12', // Maternal gold
    'Vaccination Centers': '#27AE60', // Vaccine green
    'default': '#7F8C8D' // Grey for unspecified health actors
  };

  // Generate random positions in a circle
  for (let i = 1; i <= count; i++) {
    const isSegmentNode = Math.random() > 0.6; // 40% chance to be a segment node
    const group = isSegmentNode && segment ? segment : 'default';
    const nodeSize = Math.random() > 0.8 ? 4 : Math.random() > 0.5 ? 3 : 2;
    
    const healthActorNames = [
      'Lagos General Hospital', 'Nairobi Health Center', 'Accra Medical Clinic',
      'Dr. Amara Kone', 'Nurse Sarah Okafor', 'CHW John Mwangi',
      'Mobile Unit Alpha', 'Vaccination Team Beta', 'Emergency Response Unit',
      'Maternal Care Center', 'Child Health Clinic', 'Community Outreach'
    ];
    
    nodes.push({
      id: `actor-${i}`,
      name: healthActorNames[i % healthActorNames.length] + ` ${Math.ceil(i / healthActorNames.length)}`,
      val: nodeSize,
      color: isSegmentNode && segment ? segmentColors[segment] : segmentColors['default'],
      group: group
    });
  }

  return nodes;
};

const generateRandomLinks = (nodes: Node[], centerNodeId: string): Link[] => {
  const links: Link[] = [];
  
  // Connect all nodes to the center node
  nodes.forEach(node => {
    if (node.id !== centerNodeId) {
      links.push({
        source: centerNodeId,
        target: node.id,
        value: 1
      });
    }
  });
  
  // Add some random connections between other nodes (about 10% of possible connections)
  const nonCenterNodes = nodes.filter(node => node.id !== centerNodeId);
  const totalPossibleConnections = nonCenterNodes.length * (nonCenterNodes.length - 1) / 2;
  const numAdditionalConnections = Math.floor(totalPossibleConnections * 0.05); // 5% of possible connections
  
  for (let i = 0; i < numAdditionalConnections; i++) {
    const sourceIndex = Math.floor(Math.random() * nonCenterNodes.length);
    let targetIndex = Math.floor(Math.random() * nonCenterNodes.length);
    
    // Ensure we don't connect a node to itself
    while (targetIndex === sourceIndex) {
      targetIndex = Math.floor(Math.random() * nonCenterNodes.length);
    }
    
    links.push({
      source: nonCenterNodes[sourceIndex].id,
      target: nonCenterNodes[targetIndex].id,
      value: 1
    });
  }
  
  return links;
};

const NetworkGraph: React.FC<NetworkGraphProps> = ({ 
  centerNodeId = 'center-node',
  segment
}) => {
  const graphRef = useRef<any>();
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] });
  
  useEffect(() => {
    // Generate random data
    const nodes = generateRandomNodes(100, centerNodeId, segment);
    const links = generateRandomLinks(nodes, centerNodeId);
    
    setGraphData({ nodes, links });
  }, [centerNodeId, segment]);
  
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };
    
    // Initial size
    updateDimensions();
    
    // Add resize listener
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);
  
  useEffect(() => {
    if (graphRef.current && centerNodeId) {
      // Find center node
      const centerNode = graphData.nodes.find(node => node.id === centerNodeId);
      if (centerNode) {
        // Center the view on the central node
        graphRef.current.centerAt(0, 0, 1000);
        graphRef.current.zoom(2, 2000);
      }
    }
  }, [graphData, centerNodeId]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full bg-linkedin-black"
    >
      {dimensions.width > 0 && dimensions.height > 0 && (
        <ForceGraph2D
          ref={graphRef}
          graphData={graphData}
          width={dimensions.width}
          height={dimensions.height}
          nodeRelSize={5}
          nodeVal={node => (node as Node).val}
          nodeColor={node => (node as Node).color}
          linkWidth={0.3}
          linkColor={() => "rgba(255,255,255,0.1)"}
          cooldownTime={15000} // Extended cooldown for continuous movement
          enableNodeDrag={false}
          enableZoomInteraction={true}
          enablePanInteraction={true}
          d3AlphaDecay={0.01} // Slower decay for more movement
          d3VelocityDecay={0.2} // Less velocity decay for continuous motion
          warmupTicks={100}
          onEngineStop={() => {
            // Restart the simulation periodically to keep nodes moving
            setTimeout(() => {
              if (graphRef.current) {
                graphRef.current.d3ReheatSimulation();
              }
            }, 3000);
          }}
          nodeCanvasObject={(node, ctx, globalScale) => {
            const { x, y, color, val, id } = node as Node & { x: number, y: number };
            const time = Date.now() * 0.001; // Time for animations
            
            // Animated pulse effect for center node
            const isPulseNode = id === centerNodeId;
            const pulseIntensity = isPulseNode ? 1 + Math.sin(time * 2) * 0.2 : 1;
            const baseSize = val * 4;
            const size = baseSize * pulseIntensity;
            
            // Subtle floating animation for other nodes
            const floatOffset = isPulseNode ? 0 : Math.sin(time + parseInt(id.slice(-2) || '0')) * 0.5;
            const nodeY = y + floatOffset;
            
            // Main node circle
            ctx.beginPath();
            ctx.arc(x, nodeY, size, 0, 2 * Math.PI);
            ctx.fillStyle = color;
            
            // Enhanced glow effect with animation
            if (isPulseNode) {
              // Animated glow for center node
              const glowIntensity = 15 + Math.sin(time * 3) * 5;
              ctx.shadowColor = color;
              ctx.shadowBlur = glowIntensity;
            } else {
              // Subtle glow for other nodes
              ctx.shadowColor = color;
              ctx.shadowBlur = 3 + Math.sin(time * 0.5) * 2;
            }
            
            ctx.fill();
            
            // Add animated ring around center node
            if (isPulseNode) {
              ctx.beginPath();
              const ringRadius = size + 8 + Math.sin(time * 4) * 3;
              ctx.arc(x, nodeY, ringRadius, 0, 2 * Math.PI);
              ctx.strokeStyle = color + '40'; // Semi-transparent
              ctx.lineWidth = 2;
              ctx.stroke();
            }
            
            // Reset shadow for performance
            ctx.shadowBlur = 0;
          }}
        />
      )}
    </div>
  );
};

export default NetworkGraph;
