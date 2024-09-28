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
import { AutoFocusDirective } from '../../customdirective/auto-focus.directive';





@Component({
  selector: 'app-task',
  standalone: true,   // Add this line
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  imports: [FormsModule, NgFor, NgClass,NgIf,AutoFocusDirective] // Add necessary Angular modules
})

export class TaskComponent {

  readonly GENERAL_CATEGORY = 'General';


  // To store all tasks
  tasks: Task[] = [];

  // To store category list
  categories: Category[] = [];

  // Task to hold new Task being edited
  tasktoBeAdded:Task= new Task();

  // Task to hold task being edited
  editTask:Task= new Task();

  // to store index of the value being edited
  editIndex=-1;


  // To store selected category (Null added , initially empty value is expected)
  selectedCategory: Category | null = null;

  // To store tasks filtered after catgory selection
  filteredTasks = this.tasks;


  // services 
  private categoryService:CategoryService;
  private taskService: TaskService;




  constructor( private task_service: TaskService,private category_service: CategoryService) {
    this.taskService=task_service;
    this.categoryService=category_service;
  }



  ngOnInit(): void {
    // Initial fetch of categories
        this.category_service.categories$.subscribe(categories => {
          this.categories = categories;
          this.tasktoBeAdded.categoryId=categories[0].id;
          // if category renames , it need to be reflects in task
          this.refreshtaskRenames();
        });
    
        // Initial fetch of tasks
        this.fetchTasksOnce();  
    
        // to subscribe to  selected category category
        this.category_service.selectedCategory$.subscribe(category => {
          this.selectedCategory = category;
          this.filterTasks();
        });
 
  }

  // Filters tasks based on chosen category
  filterTasks() {
    if (!this.selectedCategory|| this.selectedCategory.name==this.GENERAL_CATEGORY) {
      this.filteredTasks = this.tasks;
    } else {
      this.filteredTasks = this.tasks.filter(task => task.categoryname === this.selectedCategory?.name);
    }
    console.log(this.filteredTasks);
  }
  
  
  fetchTasksOnce(): void {
      this.taskService.getTasks().subscribe(
      (tasks) => {
      this.tasks = tasks.map(task=>{
        console.log(task);
        const category = this.categories.find(categories=> categories.id=== task.categoryId);
        return{...task,categoryname:category?category.name:'General'}
       });
       this.filterTasks();
     }
    )}

   
    refreshtaskRenames(){
      if(this.tasks){
         this.tasks = this.tasks.map(task=>this.mapTaskAndCategory(task))
      }
    }

    // Since API Returns only id of task category
    mapTaskAndCategory(task:Task):Task{
      const category = this.categories.find(categories=> categories.id=== task.categoryId);
      return{...task,categoryname:category?category.name:this.GENERAL_CATEGORY}
    }

 

  addTask():void{
    const taskTitle=this.tasktoBeAdded.title.trim();
    if(taskTitle){
      this.taskService.addTask(this.tasktoBeAdded).subscribe((task)=>{
        this.tasks.push(this.mapTaskAndCategory(task));
        this.tasktoBeAdded.title=''
        // TODO: Handle better
        this.filterTasks();
      });
   }
  }

  startEditing(index: number, task: Task): void {
    this.editIndex = index;
    this.editTask.title=task.title
  }

  canceleditTask(){
    this.editIndex=-1;
  }

  editTaskName(task: Task){
    const editedtaskTitle=this.editTask.title.trim();
    if(editedtaskTitle){
      task.title=editedtaskTitle;
      this.taskService.updateTask(task).subscribe((task)=>{
        task.title=editedtaskTitle;
        this.editIndex=-1;
        this.filterTasks();
      }
    )}
  }



  deleteTask(task : Task){
    this.taskService.deleteTask(task).subscribe(()=>{
      this.tasks= this.tasks.filter(tas=>task.id!=tas.id);
      this.filterTasks();

    })

  }
  
}
