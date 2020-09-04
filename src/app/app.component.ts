import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';

export interface Task {
  id: string;
  title: string;
  description: string;
  date: any;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {

  editTaskMode = false;
  editTask: Task;

  tasks = [
    {id: 't1t1t1', title: 'First task', description: 'task description', date: moment().add(2, 'day').format('yyyy-MM-DD')},
    {id: 't2t2t2', title: 'Second task', description: 'task description', date: moment().subtract(1, 'day').format('yyyy-MM-DD')},
    {id: 't3t3t3', title: 'Thirty task', description: 'task description', date: moment().add(1, 'day').format('yyyy-MM-DD')},
    {id: 't4t4t4', title: 'Four task', description: 'task description', date: moment().add(4, 'day').format('yyyy-MM-DD')},
    ];

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
    this.tasks.forEach((value) => {
      if (value.id === id)
      {
        this.editTask = {
          id,
          title: value.title,
          description: value.description,
          date: new Date(value.date),
        };
      }
    });
    this.editTaskForm = new FormGroup({
      title: new FormControl(this.editTask.title, Validators.required),
      description: new FormControl(this.editTask.description, Validators.required),
      date: new FormControl(moment(this.editTask.date).format('YYYY-MM-DD'), Validators.required)
    });
  }
  onClose(id: string): void {
    this.tasks = this.tasks.filter(value => value.id !== id);
  }

  submitEdit(): void {
    const { id } = this.editTask;
    const { title, description, date} = this.editTaskForm.value;
    this.tasks.map((el) => {
      if (el.id === id){
        el.title = title;
        el.description = description;
        el.date = date;
      }
    });
    this.editTaskMode = false;
    this.editTaskForm.reset();

  }

  onDown(id: string): void {
    const array = this.tasks.slice();
    array.forEach((el, index) => {
      if (el.id === id) {
        this.tasks.splice(index, 1);
        this.tasks.splice(++index, 0, el);
      }
    });
  }
  onUp(id: string): void {
    const array = this.tasks.slice();
    array.forEach((el, index) => {
      if (el.id === id) {
        this.tasks.splice(index, 1);
        this.tasks.splice(--index, 0, el);
      }
    });
  }


}
