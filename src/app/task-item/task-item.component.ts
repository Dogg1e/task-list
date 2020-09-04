import {Component, Input, OnInit, Output, EventEmitter, DoCheck} from '@angular/core';
import {Task} from '../app.component';
import * as moment from 'moment';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit, DoCheck {

  @Input() task: Task;
  @Output() edit = new EventEmitter<string>();
  @Output() closeTask = new EventEmitter<string>();
  @Output() down = new EventEmitter<string>();
  @Output() up = new EventEmitter<string>();

  full: boolean;
  taskColor: string;

  ngOnInit(): void {
    this.getDiffDate();
  }

  ngDoCheck(): void {
    this.getDiffDate();
  }

  getDiffDate(): void{
    const diffHours = moment(this.task.date).diff(moment(), 'hours');
    const fullDays = Math.ceil(diffHours / 24);
    if (fullDays >= -3 && fullDays < 0){
      this.taskColor = 'red';
    }
    else if (fullDays > 3){
      this.taskColor = 'green';
    }
    else if (fullDays <= 3 && fullDays >= 0) {
      this.taskColor = 'yellow';
    }
  }

  onEdit(id: any): void {
    this.edit.emit(id);
  }
  onClose(id: string): void {
    this.closeTask.emit(id);
  }

  toggleFull(): void {
    this.full = !this.full;
  }
  onDown(id: string): void {
    this.down.emit(id);
  }
  onUp(id: string): void {
    this.up.emit(id);
  }
}
