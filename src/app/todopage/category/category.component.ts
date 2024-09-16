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
  @ViewChild('categoryInput') categoryInput?: ElementRef;


  categories: Category[] = [];
  newCategoryName = '';
  isAddingCategory = false;
  
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
    if (this.categoryInput) {
      this.categoryInput.nativeElement.focus();
    } else {
      console.warn('categoryInput not found');
    }
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


  selectCategory(category: Category): void {
  }
}
