import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Task} from '../app.component';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {

  @Input() task: Task;
  @Output() onEdit = new EventEmitter<string>();

  full: boolean;

  ngOnInit(): void {
  }

  edit(id: any): void {
    this.onEdit.emit(id);
    console.log(id);
  }

  toggleFull(): void {
    this.full = !this.full;
  }
}
