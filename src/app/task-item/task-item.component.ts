import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Task} from '../app.component';
import * as moment from 'moment';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {

  @Input() task: Task;
  @Output() onEdit = new EventEmitter<string>();
  @Output() onClose = new EventEmitter<string>();
  @Output() onDown = new EventEmitter<string>();
  @Output() onUp = new EventEmitter<string>();

  full: boolean;

  ngOnInit(): void {
  }

  edit(id: any): void {
    this.onEdit.emit(id);
  }
  close(id: string): void {
    this.onClose.emit(id);
  }

  toggleFull(): void {
    this.full = !this.full;
  }
  down(id: string): void {
    this.onDown.emit(id);
  }
  up(id: string): void {
    this.onUp.emit(id);
  }
  getStyle(date: any): any {
    const taskDate = moment(date);
    console.log(moment().diff(taskDate, 'days'));
    taskDate.diff(moment(), 'days');
    if (taskDate.diff(moment(), 'days') <= 3) {
      return 'border-left: 10px solid yellow;';
    }
    if (taskDate.diff(moment(), 'days') > 3) {
      return 'border-left: 10px solid red;';
    }

  }
}
