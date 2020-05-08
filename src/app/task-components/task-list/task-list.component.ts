import {Component, OnInit, Input, AfterContentInit} from '@angular/core';
import {Task} from '../../models/task';
import {TaskService} from '../../task.service';
import { UserListComponent } from '../../user-components/user-list/user-list.component';

import {MatDialog} from '@angular/material/dialog';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { ThemeService } from '../../theme.service';

export interface TaskModalData {
  taskEdit: Task;
}

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  providers:  [TaskService]
})
 

export class TaskListComponent implements OnInit, AfterContentInit {
  

  tasks: Task[];
  theme:string;
  displayedColumns: string[] = ['name', 'project.projectName','duration','description','status', 'actions'];

  selectedTasks: Array<Task> = [];

  tempTask: Task;
  duration: number;
  temp:number;

    @Input()
    userIdProject: UserListComponent


  constructor(private taskService: TaskService, public dialog: MatDialog, private themeService: ThemeService) {
    this.reloadAll();
    this.userIdProject;
    this.selectedTasks = this.tasks
    this.duration = 0;
    this.temp =0;

  }
  
  ngOnInit() {
    this.duration;
    this.reloadAll();
    this.userIdProject;
    this.selectedTasks = this.tasks
    this.selectTasks(this.userIdProject)
  }

  ngAfterContentInit(){
    this.selectTasks(this.userIdProject)
    this.reloadAll();
  }

  reloadAll() {
    this.taskService.findAll().subscribe(tasks => this.tasks = tasks);
    this.durationCalc(this.selectedTasks);
  }
  
  delete(id: number) {
    this.taskService.delete(id).subscribe(() => this.reloadAll());
    this.selectTasks(this.userIdProject)
  }

  startTask(startedTask: Task){
    startedTask.status="Started";
    this.taskService.patchTask(startedTask.id, startedTask).subscribe(() => this.reloadAll());
  }

  closeTask(closedTask: Task){
    closedTask.status="Closed";
    this.taskService.patchTask(closedTask.id, closedTask).subscribe(() => this.reloadAll());
  }
  
  editTask(task: Task) {
    this.theme = this.themeService.currentActive();
    const dialogRef = this.dialog.open(TaskModalComponent, {
      width: '50%',
      data: {taskEdit : task},
      panelClass: this.theme,
    });
    
    dialogRef.afterClosed().subscribe(result=>{
      this.taskService.patchTask(result.id, result).subscribe(() => this.reloadAll());
    })
  }


  selectTasks(IdProject){
    this.selectedTasks = [];
    
    for (let index = 0; index < this.tasks.length; index++){
      if (this.tasks[index].project.id == IdProject){
        
        this.selectedTasks.push(this.tasks[index]);
      }
    }
    this.durationCalc(this.selectedTasks);
  }

  durationCalc(selectedTasks: Array<Task>){
    selectedTasks.forEach(element => {
        this.temp += element.duration;
    });
    this.duration = this.temp;
    this.temp=0;
  }


  

}