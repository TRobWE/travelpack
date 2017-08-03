import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { Chat } from '../chat/chat';
import { ItinerarySearch } from '../itinerary-search/itinerary-search';
import { YelpService } from '../../services/yelp.service';
import { LoadingController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-itinerary',
  templateUrl: 'itinerary.html',
  providers: [YelpService],
})

export class Itinerary {
  public todos: any;
  public year: any;
  public month: any;
  public day: any;
  public allDays = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public yelpSvs: YelpService,
    private iab: InAppBrowser) {
    for (let i = 1; i < 32; i++) {
      this.allDays.push(i);
    }
    console.log(this.allDays)
    events.subscribe("update:like", () => {
      yelpSvs.fetchItinerary(this.getItinerary.bind(this));
    });
  }

  public ionViewWillEnter() {
    console.log('ionViewDidLoad ItineraryPagePage');
    this.yelpSvs.fetchItinerary(this.getItinerary.bind(this));
  }

  public getItinerary(data) {
    if (data) {
      console.log(data, 'before reassigned');
      this.todos = data;
    }
  }

  public goToLink(link) {
    this.iab.create(link);
  }

  public itinerarySearch() {
    this.navCtrl.push(ItinerarySearch);
  }
  public updatePoll(data) {
    console.log(data);
    // this.todos = data;
    // for(var i = 0; i < this.todos.length; i++){
    //   if(this.todos[i].id === data.id){
    //     this.todos[i].id = data.id;
    //     console.log(this.todos[i].id)
    //   }
    // }
  }
  public postUnlike(id, unlikes) {
    this.yelpSvs.unlike(id, unlikes);
  }
  public postLike(id, likes) {
    console.log(likes, 'likes')
    this.yelpSvs.like(id, likes);
  }

  public backClick() {
    this.navCtrl.push(Chat);
  }

  public submitDate(id) {
    console.log(id, 'on submit');
    if (this.day && this.month && this.year) {
      let date = { "date": `${this.month} ${this.day}, ${this.year}`};
      this.yelpSvs.updatDates(id, date);
      this.day = '';
      this.month = '';
      this.year = '';
    }
  }
}
