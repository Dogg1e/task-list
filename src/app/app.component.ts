import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

export interface Task {
  id: string;
  title: string;
  description: string;
  date: Date;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {

  @Input('FormControl')
  editTaskMode = false;
  editTask: Task;

  tasks = [{id: 't1t1t1', title: 'First task', description: 'task description', date: new Date()}];

  addTaskform: FormGroup;
  editTaskForm: FormGroup;


  ngOnInit(): void {
    this.addTaskform = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required)
    });

  }

  submitAdd(): void{
    const {title, description, date} = this.addTaskform.value;
    const task: Task = {
      id: `id${Math.floor((Math.random() * 1e8))}`,
      title,
      description,
      date
    };
    this.tasks.push(task);
    this.addTaskform.reset();
  }

  onEdit(id: string): void{
    this.editTaskMode = true;
    this.tasks.forEach((value, index) => {
      if (value.id === id)
      {
        this.editTask = {
          id,
          title: value.title,
          description: value.description,
          date: new Date(value.date)
        };
      }
    });
    this.editTaskForm = new FormGroup({
      title: new FormControl(this.editTask.title, Validators.required),
      description: new FormControl(this.editTask.description, Validators.required),
      date: new FormControl(this.editTask.date, Validators.required)
    });
  }

  submitEdit(): void {
    const {id, title, description, date} = this.editTask;
    console.log(title);

  }


}
