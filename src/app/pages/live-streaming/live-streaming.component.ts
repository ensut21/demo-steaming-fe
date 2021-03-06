import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as RecordRTC from 'recordrtc';
import { LiveStreamingService } from './live-streaming.service';

@Component({
  selector: 'app-live-streaming',
  templateUrl: './live-streaming.component.html',
  styleUrls: ['./live-streaming.component.scss']
})
export class LiveStreamingComponent implements OnInit {

  recorder: any;


  @ViewChild('video', { static: false })
  video!: ElementRef;

  constructor(private liveStreamingService: LiveStreamingService) { }

  ngOnInit() {

  }

  async startStreaming() {
    const displayMediaOptions = {
      video: {
        cursor: "never"
      },
      audio: false
    };

    try {
      let $ = this
      let stream = await (navigator as any).mediaDevices.getDisplayMedia(displayMediaOptions)

      this.video.nativeElement.srcObject = stream

      this.recorder = new RecordRTC(stream, {
        type: 'video',
        mimeType: 'video/webm',
        timeSlice: 1000,
        ondataavailable: (blob) => {
          $.onDataAvailable(blob);
        }
      })

      this.recorder.startRecording()
    } catch (err) {
    }
  }

  stopStreaming() {
    const tracks = this.video.nativeElement.srcObject.getTracks();
    tracks.forEach((track: any) => track.stop());
    this.video.nativeElement.srcObject = null;
  }

  onDataAvailable(blob: Blob) {
    let $ = this
    $.liveStreamingService.sendBlob(blob)
  }
}
