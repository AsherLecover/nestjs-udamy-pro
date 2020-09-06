export interface Task {
    id: string;
    title: string;
    descrption: string;
    status: TaskStatus;
}
export enum TaskStatus {
OPEN ='OPEN',
IN_PROGESS = 'IN_PROGRESS',
DONE = 'DONE'
}