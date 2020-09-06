import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
'uuid/v1';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto):Task[]{
    const { status, search} = filterDto;
    let tasks = this.getAllTasks()

    if(status){
      tasks = tasks.filter(task => task.status === status)
    }
    if(search){
      tasks = tasks.filter(task => 
        task.title.includes(search) ||
        task.descrption.includes(search)
        ); 
    }


    return tasks
  }

  getTaskById(id: string): Task {
    return this.tasks.find(task => task.id === id);
  }

  deleteTaskById(id: string): void {
    this.tasks = this.tasks.filter(task => task.id != id)
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, descrption } = createTaskDto;
    const task: Task = {
      id: Math.floor(Math.random() * 10000000).toString(),
      title,
      descrption,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  updateTaskStatus(id: string, taskStatus: TaskStatus): Task{
    const task = this.getTaskById(id);
    task.status = taskStatus
    return task

   
  }
}
