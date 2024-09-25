import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { NgClass } from '@angular/common';
import { NgModule } from '@angular/core';
import { CategoryService } from '../service/category.service';
import { NgIf } from '@angular/common';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { TaskService } from '../service/task.service';
import { Task } from '../model/task';
import { Category } from '../model/category.model';
import { forkJoin } from 'rxjs';





@Component({
  selector: 'app-task',
  standalone: true,   // Add this line
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  imports: [FormsModule, NgFor, NgClass] // Add necessary Angular modules
})

export class TaskComponent {

  private taskService: TaskService;

  tasks: Task[] = [];
  categories: Category[] = [];
  editTask:Task= new Task();

  constructor( private task_service: TaskService,private category_service: CategoryService) {
    this.taskService=task_service;
    this.category_service.categories$.subscribe(categories => {
      this.categories = categories;
      this.editTask.categoryId=categories[0].id;
      this.refreshtaskRenames();
    });
  }

  refreshtaskRenames(){
    this.tasks = this.tasks.map(task=>{
      console.log(task);
      const category = this.categories.find(categories=> categories.id=== task.categoryId);
      return{...task,categoryname:category?category.name:'General'}
     });
  }

  ngOnInit(): void {
    this.fetchTasksOnce();
  }
  
  fetchTasksOnce(): void {
      this.taskService.getTasks().subscribe(
      (tasks) => {
      this.tasks = tasks.map(task=>{
        console.log(task);
        const category = this.categories.find(categories=> categories.id=== task.categoryId);
        return{...task,categoryname:category?category.name:'General'}
       });
     }
    )}

  addTask():void{
    const taskTitle=this.editTask.title.trim();
    if(taskTitle){
      this.taskService.addTask(this.editTask).subscribe((task)=>{
        this.tasks.push(task);
        this.editTask.title=''
      });
   }
  }
  
}
