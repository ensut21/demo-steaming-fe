import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class LiveStreamingService {
  private socket: Socket;

  constructor() { 
    this.socket = io('http://localhost:8988');
  }

  // EMITTER
  public sendBlob(blob: Blob) {
    this.socket.emit('recordedChunk', blob);
  }
}
