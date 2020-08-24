import { Component, OnInit , Output, ViewChild, ElementRef} from '@angular/core';
import { CommonService } from '../common.service';
import { EventEmitter } from 'events';
import * as _ from 'underscore';
import '../dateProto';
import { MatTableDataSource } from '@angular/material/table';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import {ThemePalette} from '@angular/material/core';
import { SELECT_PANEL_PADDING_X } from '@angular/material/select';
import { element } from 'protractor';

@Component({
  selector: 'app-my-task',
  templateUrl: './my-task.component.html',
  styleUrls: ['./my-task.component.css']
})
export class MyTaskComponent implements OnInit {
  @Output() eventEmitter = new EventEmitter();
  public isAlertCloseOpen:boolean = false;
  @ViewChild("updateTask") updateTaskElement:ElementRef;
  public editMode:any;
  public editDoneMode:any;
  public dataLength:any;
  public isWaitt:any;
  public oldValue ={};
  public message:string;
  public isDoneOpen:boolean = false;
  public isShow:boolean = true;
  public oldDoneValue:any;
  public isHideTaskNameWidth:boolean = true;
  displayedColumns: string[] = ['taskName', 'status', 'deleteLogo'];
  dataSource: any = [];
  constructor(protected commonService:CommonService) {
    this.commonService.openInput=true;
    this.commonService.changeTaskTitle();
  }

  ngOnInit(): void { 
    if(window.location.hash.split('/')[1] == 'myTask') this.get('get');
    else this.get('getOffice');  
    this.commonService.eventGet.subscribe(()=>{
      let get = window.location.hash.split('/')[1] == 'myTask'? 'get' : 'getOffice';
      this.get(get);
    });  
  }
  get(url) {
    this.commonService.getTaskData(url).then(data=>{
      this.dataSource = data;
    });
  }
  deleteData(object) {
    if(confirm(`Want to delete? \n \'${object.name}\'`)){
    let param = {
      name:object.name
    };
    let deletePath = window.location.hash.split('/')[1] == 'myTask'? 'delete' : 'deleteOffice';
    let getPath = window.location.hash.split('/')[1] == 'myTask'? 'get' : 'getOffice';    
    this.commonService.deleteTaskData(param,deletePath).then(data=>{
      console.log(data);
      this.get(getPath);
      this.isAlertClose(`Task ${param.name}" Deleted`);
    });
  }
  }
  changeToInput(row){
    this.editMode = row._id;
    this.oldValue = {
      name: row.name
    };
    setTimeout(()=>{this.updateTaskElement.nativeElement.focus();},0);
  }
  updateTaskName(element){
    console.log("IN", element, this.oldValue);
    element = {
      name: element.name,
      id: element._id,
      modifiedDate: new Date().toTimeFormat()
    }
    this.editMode="";
    if(this.oldValue['name'] != element.name){
    let updatePath = window.location.hash.split('/')[1] == 'myTask'? 'update' : 'updateOffice';
    this.commonService.updateTaskdata(this.oldValue,element,updatePath);
    this.isAlertClose(`Task ${this.oldValue['name']} to "${element.name}" Updated`);
    }
  }
  isAlertClose(message?){
    if(typeof message != undefined) this.message = message;
    this.isAlertCloseOpen = !this.isAlertCloseOpen;
    setTimeout(()=>{this.isAlertCloseOpen = false;},3000)
  }
  changeToDone(element){
    this.editDoneMode = element._id;
    this.oldDoneValue = {
      isDone: element.isDone
    }
    this.isHideTaskNameWidth = false;
    }
  isTaskDone(taskValue, taskData, outSideClick?, replaceValue?){
    if(outSideClick) {
      let elementIndex = this.dataSource.map(function(arr) { return arr.name; }).indexOf(replaceValue);
      this.dataSource[elementIndex].name=this.oldValue['name'];
      this.editMode="";
      return;
  }
    if(taskValue != this.oldDoneValue.isDone){
      let element = {
        isDone : taskValue,
        modifiedDate: new Date().toTimeFormat()
      }
      this.oldDoneValue = {
        name: taskData.name
      }
      let updatePath = window.location.hash.split('/')[1] == 'myTask'? 'update' : 'updateOffice';
      let getPath = window.location.hash.split('/')[1] == 'myTask'? 'get' : 'getOffice';    
      this.commonService.updateTaskdata(this.oldDoneValue,element,updatePath).then(data=>{
        this.get(getPath);
        let isUpDown;
        if(taskValue == 'Y') isUpDown = 'Done';
        else isUpDown = ' Not Done';
        this.isAlertClose(` Task ${taskData.name} has moved to ${isUpDown} section`);
      });
    } else {
      this.isAlertClose(` Task ${taskData.name} No Changes `);
    }
    this.editDoneMode = "";
  }
}