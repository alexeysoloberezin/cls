interface Vuln {
    id: string,
    type: string,
    name: string,
    severity: string,
    timestamp: string,
    hosts: string[],
    realize: string
}

interface Host {
    id: string,
    ip: string,
    name: string,
    os: string
}

const getNotes = (
    { vuln, hosts, radius, users }: { vuln: Vuln[]; hosts: Host[], users: any[]; radius: number }
  ): any[] => {
    if(!hosts){
        return []
    }

    return hosts.map(e => {
      const angle = Math.random() * Math.PI * 2
      const r = radius + Math.random() * 100
  
      const vulnsForHost = Array.isArray(vuln) 
        ? vuln.filter(v => v.hosts.includes(e.id) || v.hosts.includes(e.ip) || v.hosts.includes(e.name))
        : []
      const usersForHost = Array.isArray(users) 
        ? users.filter(u => u.host === e.id || u.host === e.ip || u.host === e.name)
        : []
    
      return {
        id: e.id,
        position: {
          x: Math.cos(angle) * r,
          y: Math.sin(angle) * r
        },
        type: 'other',
        data: {
          label: e.name,
          ...e,
          vulns: vulnsForHost,
          users: usersForHost
        }
      }
    })
  }
  
export default getNotes;