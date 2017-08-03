import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController, Events, ModalController } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import { Config } from '../app/config';

@Injectable()

export class YelpService {
  public SERVER_DEPLOY = 'http://ec2-18-220-15-216.us-east-2.compute.amazonaws.com:3030';
  public SERVER_ROSE = 'http://192.168.1.113:3030';
  public userId: string;
  public packID: number;
  public userID: number;
  public yelp: any;
  public countLikes: any;
  public countUnlikes: any;
  public date: any;

  public header = new Headers({
    'Content-Type' : 'application/x-www-form-urlencoded',
    'Authorization': `Bearer ${this.config.YELP_ACCESS_TOKEN}`,
  });

  public g_options = new RequestOptions({
    headers: this.header,
  });

  constructor(
  public navCtrl: NavController,
  public alertCtrl: AlertController,
  public http: Http,
  public storage: Storage,
  public events: Events,
  public modalCtrl: ModalController,
  public config: Config) {
    this.storage.get('packId').then((val) => this.packID = val);
    this.storage.get('userId').then((val) => this.userID = val);
  }

  public yelpSearch(searchQuery, cb) {
    console.log(searchQuery, 'search query in yelp svs');
    this.http.post(`${this.SERVER_DEPLOY}/yelp`, searchQuery)
      .map((res) => res.json())
      .subscribe((response) => {
        response = JSON.parse(response);
        console.log(response, 'in service');
        cb(response);
      }, error => {
        console.error(error);
      });
  }

  public addItem(yelpData) {
    this.yelp = yelpData;
    const prompt = this.alertCtrl.create({
      title: "Add to your itinerary?",
      message: `Do you want to add ${yelpData.name} to your itinerary?`,
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          },
        },
        {
          text: 'Add',
          handler: data => {
            this.addYelpData(this.yelp);
          },
        },
      ],
    });
    prompt.present();
  }

  public addYelpData(yelp){
    let item = {
      name: this.yelp.name,
      img: this.yelp.image_url,
      link: this.yelp.url,
      userId: this.userID,
      packId: this.packID,
      like: 0,
      unlike: 0,
    }

    console.log(item, 'post to db')
    this.http.post(`${this.SERVER_ROSE}/itineraries`, item)
    .map((res) => res.json())
    .subscribe((data) => {
      console.log(data);
    }, (err) => {
      console.error(err);
    });
  }

  public fetchItinerary(cb){
    this.storage.get('packId').then(val => {
      this.http.get(`${this.SERVER_ROSE}/itineraries?packId=${val}&$sort[id]=-1`)
      .map(res => res.json())
      .subscribe(({ data }) => {
        console.log(data, 'itinerary data');
        cb(data)
      }, (err) => {
        console.error(err);
      });
    })
  }

  public updatDates(id, date) {
    console.log(date, 'update hit');
    this.http.patch(`${this.SERVER_ROSE}/itineraries/${id}`, date)
    .map(res=> res.json())
    .subscribe((data) => {
      if(data){
        this.events.publish("update:like");
      }
      console.log('date updated');
    }, (err) => {
      console.error(err);
    });
  }

  public like(id, likes){
    console.log(id, likes, 'in like')
    this.countLikes = { like: (likes += 1) };
    console.log(this.countLikes);
    this.http.patch(`${this.SERVER_ROSE}/itineraries/${id}`, this.countLikes)
    .map(res => res.json())
    .subscribe((data) => {
      if(data){
        this.events.publish("update:like")
      }
      console.log('likes submitted');
    }, (err) => {
      console.error(err);
    })
  }

  public unlike(id, unlikes){
    console.log(unlikes, 'unliking')
    this.countUnlikes = { unlike: (unlikes += 1) };
    console.log(this.countUnlikes);
    this.http.patch(`${this.SERVER_ROSE}/itineraries/${id}`, this.countUnlikes)
    .map(res => res.json())
    .subscribe((data) => {
      if(data){
        this.events.publish("update:like")
      }
    }, (err) => {
      console.error(err);
    })
  }  
}
