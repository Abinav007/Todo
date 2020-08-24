import { Component, ViewChild, ElementRef ,OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../common.service';
import '../dateProto';
@Component({
  selector: 'app-root-nav',
  templateUrl: './root-nav.component.html',
  styleUrls: ['./root-nav.component.css']
})
export class RootNavComponent implements OnInit{
  @ViewChild('taskField') taskElement: ElementRef; 
  opened = false;
  public taskName:String;
  public taskGroup:String
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private HttpClient:HttpClient, public commonService:CommonService) {
    this.commonService.openInput=true;
    this.commonService.taskTitle.subscribe(()=> {
      this.taskGroup = window.location.hash.split('/')[1] == 'myTask'? 'My Task' : 'Office Task';
    }); 
  }
  ngOnInit(){  }
  showTextbox() {
    this.commonService.openInput= !this.commonService.openInput;
    if(this.commonService.openInput == false){
      setTimeout(()=>{this.taskElement.nativeElement.focus();},0);
  }
}
  saveTask(){
    if(this.taskName == null || this.taskName === ""){
      alert("Please Enter the Name");
      return;
    }
    console.log("Save Task" , this.taskName);
    let params = {
      name: this.taskName,
      isDone: 'N',
      date: new Date().toFormat(),
      modifiedDate: new Date().toTimeFormat()
    };
    this.taskName="";
    let save = window.location.hash.split('/')[1] == 'myTask'? 'save' : 'saveOffice';
    this.commonService.saveTaskData(params,save).then(data => {
      console.log(data);
      this.showTextbox();
      this.commonService.getTaskEventEmitter();
    });
  }
}
