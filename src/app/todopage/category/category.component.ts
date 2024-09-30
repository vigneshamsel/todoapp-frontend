import { Component } from '@angular/core';
import { Category } from '../model/category.model';
import { CategoryService } from '../service/category.service';
import { NgFor } from '@angular/common';
import { NgIf } from '@angular/common';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { AutoFocusDirective } from '../../customdirective/auto-focus.directive';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [NgFor,NgIf,FormsModule,AutoFocusDirective],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

  hoveredIndex: number | null = null;
  

  onHover(index: number | null) {
    this.hoveredIndex = index;
  }


  categories: Category[] = [];
  newCategoryName = '';
  isAddingCategory = false;
  showIcons = false;
  editingIndex=-1;
  editedCategoryName='';
  selectedCategory:Category|null=null;



  
  private categoryService: CategoryService;


  constructor(categoryService : CategoryService){
    this.categoryService=categoryService;
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(
      (categories: Category[]) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Error fetching categories', error);
      }
    );
  }

  showNewCategoryInput() {
    this.isAddingCategory = true;
 
    }

  addCategory() {
    if (this.newCategoryName.trim()) {
      const category = new Category(this.newCategoryName);
      this.categoryService.createCategory(category).subscribe(
        response=> {
          this.categories.push(response)
          this.newCategoryName = '';
          this.isAddingCategory=false;
        }

      )
    }
  }

  cancelNewCategory() {
    this.newCategoryName = '';
    this.isAddingCategory = false;
  }


  startEditing(index: number, category: Category): void {
    this.editingIndex = index;
    this.editedCategoryName=category.name;
  }

  editCategory(category:Category): void {
    const updatedCategoryName= this.editedCategoryName.trim();
    if (updatedCategoryName) {
      this.categoryService.updateCategory(category).subscribe(
        () => {
          category.name=updatedCategoryName;
          this.editingIndex = -1; 
        },
        (error) => {
          console.error('Error updating category', error);
        }
      );
    }
  }

  canceleditCategory(){
    this.editedCategoryName = '';
    this.editingIndex = -1;

  }

  selectCategory(category: Category){
    console.log(this.selectCategory);

    this.selectedCategory=category;
    this.categoryService.updateSelectedCategory(category);
  }


  deleteCategory(category: Category): void {
      this.categoryService.deleteCategory(category).subscribe(
        () => {
          this.categories = this.categories.filter(c => c.id !== category.id);
        },
        (error) => {
          console.error('Error deleting category', error);
        }
      );
    }
}


 

