import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-office-task',
  templateUrl: './office-task.component.html',
  styleUrls: ['./office-task.component.css']
})
export class OfficeTaskComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log("office Task");
  }

}
