import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class PackingListService {
  public SERVER_DEPLOY = 'http://ec2-18-220-15-216.us-east-2.compute.amazonaws.com:3030';
  public SERVER_JAVA = 'http://ec2-18-220-15-216.us-east-2.compute.amazonaws.com:3030';
  public SERVER_ROSE = 'http://localhost:3030';
  public userId: string;
  public packID: number;
  public username: string;

  constructor(private storage: Storage, public http: Http, public events: Events) {
  }

  public getList(cb) {
    console.log("it hit agendas");
    this.storage.get('userId').then(val => {
      this.http.get(`/useragendas/${val}`)
      .map(res => res.json())
      .subscribe((data) => {
        console.log(data, 'data');
        cb(data);
      }, (err) => {
        console.error(err);
      });
    });
  }

  public addList(agenda) {
    this.storage.get('username').then((name) => {
      this.storage.get('userId').then((id) => {
        let myList = { userId: id, agenda, name };
        this.http.post(`/agendas`, myList)
        .map((res) => res.json())
        .subscribe((data) => {
          console.log(data, 'post budget data');
          if (data) {
            this.events.publish("reload:List");
          }
        }, (err) => {
          console.error(err);
        });
      });
    });
  }

  public removeItem(id) {
    this.http.delete(`${this.SERVER_ROSE}/agendas/${id}`)
      .map((res) => res.json())
      .subscribe((data) => {
        console.log(data, 'delete budget data');
        if (data) {
          this.events.publish("reload:List");
        }
      }, (err) => {
        console.error(err);
      });
  }

}
