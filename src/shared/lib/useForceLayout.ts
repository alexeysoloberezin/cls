import {
    forceSimulation,
    forceManyBody,
    forceCenter,
    forceLink,
    forceCollide
  } from 'd3-force'
  
  export function useForceLayout(nodes: any, edges: any) {
    const safeEdges = edges.map((e: any) => ({ ...e }))

    const sim = forceSimulation(nodes)
      .force('charge', forceManyBody().strength(-120))
      .force('center', forceCenter(0, 0))
      .force(
        'link',
        forceLink(safeEdges)
          .id((d: any) => d.id)
          .distance((d: any) => d.source.id === 'center' ? 180 : 120)
          .strength(1)
      )
      .force('collide', forceCollide(90).strength(0.7))
      .stop()
  
    const center = nodes.find((n: any) => n.id === 'center')
    if (center) {
      center.fx = 0
      center.fy = 0
    }
  
    for (let i = 0; i < 350; i++) sim.tick()
  
    return nodes.map((n: any) => ({
      ...n,
      position: { x: n.x ?? 0, y: n.y ?? 0 }
    }))
  }
  