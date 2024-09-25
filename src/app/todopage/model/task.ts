export class Task {
    id?: number;
    title: string;
    categoryId?: number;
    completed: boolean;
    categoryname?: string;

    constructor (title: string = '', category: number = -1, completed: boolean = false){
        this.title=title;
        this.categoryId=category;
        this.completed=completed;
    }
  }