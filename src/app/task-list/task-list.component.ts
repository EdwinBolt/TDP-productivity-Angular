import {Component, OnInit, Input} from '@angular/core';
import {Task} from '../task';
import {TaskService} from '../task.service';
import {Project} from '../project';
import { UserListComponent } from '../user-list/user-list.component';

import {MatDialog} from '@angular/material/dialog';
import { TaskModalComponent } from '../task-modal/task-modal.component';



export interface TaskModalData {
  taskEdit: Task;
}

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  providers:  [TaskService]
})
export class TaskListComponent implements OnInit {

  tasks: Task[];
  displayedColumns: string[] = ['id', 'name', 'project.id','project.projectName','duration','description', 'actions'];


    @Input()
  userIdProject: UserListComponent

  constructor(private taskService: TaskService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.reloadAll();
    
    this.userIdProject;
  }

  reloadAll() {
    this.taskService.findAll().subscribe(tasks => this.tasks = tasks);
  }
  
  delete(id: number) {
    this.taskService.delete(id).subscribe(
      () => this.reloadAll()
    );
  }

  editTask(task: Task) {
    const dialogRef = this.dialog.open(TaskModalComponent, {
      width: '50%',
      data: {taskEdit : task}
    });

    dialogRef.afterClosed().subscribe(result=>{
      this.taskService.patchTask(result.id, result).subscribe(() => this.reloadAll());
    })
  }
}