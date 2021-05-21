import { MainPage } from './../dynamic-layer/MainPage.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MachineData } from 'src/service/machine-data';
import { SocketIO } from 'src/service/socketIO';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit, MainPage, OnDestroy {
  pageHeight: number = 0;
  emptyCallback: Function | null = null;

  flashVars: string = "";
  data!: MachineData;
  constructor() { }

  ngOnInit() {
    SocketIO.instance.joinRoom( this.data.mac_addr );
  }

  setHeight( height: number ){
    this.pageHeight = height;
  }

  setData( data: MachineData ){
    this.flashVars = "streamName=" + data.rd_url1;
    this.data = data;
  }

  ngOnDestroy(): void {
    this.emptyCallback = null;
  }
}
