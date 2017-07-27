import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Chat } from "../chat/chat";
import { Geolocation } from '@ionic-native/geolocation';
import { LocationTracker } from '../../providers/location-tracker/location-tracker';

declare var google;

@Component({
  selector: 'page-find-my-pack',
  templateUrl: 'find-my-pack.html'
})
export class FindMyPack {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation, public locationTracker: LocationTracker) {}

  ionViewDidLoad() {
    this.loadMap();
    console.log('ionViewDidLoad FindMyPackPagePage');
  }

  backClick() {
    this.navCtrl.push(Chat);
  }

  loadMap(){
 
    this.geolocation.getCurrentPosition().then((position) => {
 
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.addMarker()
 
    }, (err) => {
      console.log(err);
    });
 
  }

  addMarker(){
 
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });
  
    console.log(this.map);
    let content = "<h4>Information!</h4>";          
  
    this.addInfoWindow(marker, content);
 
  }

  addInfoWindow(marker, content){
  
    let infoWindow = new google.maps.InfoWindow({
      content: "TRob Location"
    });
  
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
 
  }

   start(){
    this.locationTracker.startTracking();
  }
 
  stop(){
    this.locationTracker.stopTracking();
  }
}
