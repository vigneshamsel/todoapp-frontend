import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryColorService {

  private colors: string[] =  [
    "#7FB069", // Sage Green
    "#E07A5F", // Terra Cotta
    "#3D405B" ,// Dark Slate Blue
    "#F2CC8F", // Mellow Yellow
    "#81B29A",// Greyish Teal
    "#F4A261", // Sandy Orange
    "#6B705C", // Olive Green
    "#D4A373",// Camel
    "#588B8B", // Teal Blue
    "#A98467" ,// Warm Brown
    "#7E9680", // Muted Green
    "#9C89B8", // Soft Purple
  ];

  private categoryColors: Map<number, string> = new Map();


  getColorForCategory(category_id: number): string {
    if (!this.categoryColors.has(category_id)) {
      const randomColor = this.getRandomColor();
      this.categoryColors.set(category_id, randomColor);
    }
    return this.categoryColors.get(category_id)!;
  }

  private getRandomColor(): string {
    const index = Math.floor(Math.random() * this.colors.length);
    return this.colors[index];
  }

  constructor() { }
}
