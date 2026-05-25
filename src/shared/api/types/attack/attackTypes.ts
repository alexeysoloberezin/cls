export enum AttackStatus {
    Exec = 'exec',
    Stop = 'stop',
    Error = 'error',
    Finish = 'finish',
    Ready = 'ready'
}

export type AttackItem = {
    cidr: string,
    endtime: string,
    id: string,
    starttime: string,
    status: AttackStatus,
    name: string,
    user: string
} 
