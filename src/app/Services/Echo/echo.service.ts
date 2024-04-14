import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import Echo from 'laravel-echo';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '@environments/environments';

declare global {
  interface Window {
    Echo: Echo | undefined;
    Pusher: any;
  }
}

@Injectable({
  providedIn: 'root'
})
export class EchoService {
  private echo?: Echo;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeEcho();
    }
  }

  private initializeEcho(): void {
    import('pusher-js').then((Pusher) => {
      window.Pusher = Pusher.default;
      this.setupEcho();
    });
  }

  private setupEcho(): void {
    this.echo = new Echo({
      broadcaster: 'pusher',
      key: environment.pusher.key,
      cluster: environment.pusher.cluster,
      encrypted: true, 
      disableStats: true,
      logToConsole: true, 
    });
  }

  public listen(channel: string, event: string, callback: Function): void {
    this.echo?.channel(channel).listen(event, (data: any) => {
      callback(data);
    });
  }

  public leaveChannel(channel: string): void {
    this.echo?.leave(channel);
  }

  public listenToNewGpsData(callback: (e: any) => void) {
    this.echo?.channel('gpschann').listen('.gpsevent', (e: any) => {
      callback(e);
    });
  }
  
  public listentestevent(callback: (e: any) => void) {
    this.echo?.channel('test-channel').listen('.*', (e: any) => {
      callback(e);
    });
  }

  public listenToAllEvents(channel: string, callback: (e: any, event: string) => void) {
    const echoChannel = this.echo?.channel(channel);
  
    echoChannel?.listen('.*', (e: any, event: string) => {
      callback(e, event);
    });
  }
  
}
