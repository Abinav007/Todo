import { Injectable ,Output,EventEmitter} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  openInput = true;
  url:String = "http://192.168.64.5:30266/";
  @Output() eventGet = new EventEmitter();
  @Output() taskTitle = new EventEmitter();
  constructor(private HttpModule:HttpClient) { }

  getTaskData(taskGroup):Promise<any> {
    return this.HttpModule.get("/"+taskGroup).toPromise();
  }

  deleteTaskData(param,path):Promise<any> {
    param = JSON.stringify(param);
    return this.HttpModule.delete(`/${path}/${param}`).toPromise();
  }

  updateTaskdata(oldValue , newValue, path):Promise<any> {
    oldValue = JSON.stringify(oldValue)
    return this.HttpModule.patch(`/${path}/${oldValue}`, newValue).toPromise();
  }

  saveTaskData(params, save):Promise<any> {
    return this.HttpModule.post('/'+save, params).toPromise();
  }

  getTaskEventEmitter(){
    this.eventGet.emit();
  } 
  changeTaskTitle(){
    this.taskTitle.emit();
  }
}