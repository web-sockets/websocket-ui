import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as Stomp from 'stompjs'; 
//import * as SockJS from 'sockjs-client'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'websocket-demo';
  
  ws: any;

  socketTopicIds: number[] = [];

  constructor(private httpClient: HttpClient) {
    for(var i=1; i<=200; i++) {
      this.socketTopicIds.push(i);
    }
    /* let socket = new WebSocket("ws://localhost:8080/gs-guide-websocket/websocket");

    let that = this;
    that.ws = Stomp.over(socket, {transports: ['websocket']});
    

    that.ws.debug = null

    this.ws.connect({}, function(frame) {
      that.ws.subscribe("/errors", function(message) {
        alert("Error " + message.body);
      });
      that.ws.subscribe("/topic/greetings/1", function(message) {
        console.log(message)
      });
    }, function(error) {
      alert("STOMP error " + error);
    }); */
    // this.httpClient.get<string>(`http://localhost:8080/greeting-message`).subscribe(res => {
    //   console.log("got response", res);
    // });

    /* for (let i = 0; i < 500; i++) {
      let socket = new SockJS(`http://localhost:8080/gs-guide-websocket`);
        let stompClient = Stomp.over(socket);
        stompClient.debug = null;

        stompClient.connect({}, frame => {
          console.log(stompClient);
          console.log(frame);
          // Subscribe to notification topic
          stompClient.subscribe('/topic/greetings', notification => {
          console.log("connection" + i + " --- " + notification.body);
         });
        });
    } */
  }

  messages: string[] = [];

  connect(topicId: number) {
    let ws2: any;
    let socket = new WebSocket("ws://localhost:8085/user-websocket/websocket");
    var that = this;
    ws2 = Stomp.over(socket, {transports: ['websocket']});
    ws2.debug = null;
    ws2.connect({}, function(frame) {
      ws2.subscribe("/errors", function(message) {
        alert("Error " + message.body);
      });
      // Note: Using queue, not topic, Spring always using queue with sendToUser
      ws2.subscribe(`/user/queue/1`, function(message) {
        console.log(message);
        that.messages.push(message.body);
      });
    }, function(error) {
      alert("STOMP error " + error);
    });

  }

  connectAll() {
    this.socketTopicIds.forEach(topicId => {
      /* var that=this;
      setTimeout(function(){
        that.connect(topicId);
      }, 500) */
      this.connect(topicId);
    });
  }
}
