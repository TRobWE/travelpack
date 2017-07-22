import { Injectable } from '@angular/core';
import { AlertController, Events } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class ContactsService {
  public SERVER_DEPLOY = 'http://ec2-18-220-15-216.us-east-2.compute.amazonaws.com:3030';
  public SERVER_ROSE = 'http://192.168.1.113:3030';
  public packID: number;
  constructor(public alertCtrl: AlertController, public http: Http, public storage: Storage, public events: Events) {
    this.storage.get('packId').then((val) => this.packID = val);
  }

  public showPrompt() {
    const prompt = this.alertCtrl.create({
      title: 'Add new user to Pack',
      message: "Enter the email of the user you wish to add to this Pack",
      inputs: [
        {name: 'contact', placeholder: 'username'},
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          },
        },
        {
          text: 'Save',
          handler: (data) => {
            console.log(data);
            let contact = { packId: this.packID, username: data.contact };
            console.log(contact, 'contact');
            this.http.post('/groups', data)
              .subscribe((response) => {
                console.log("All good");
                // if(response){ this.events.pubish('get:contacts')}
              }, (error) => {
                console.error(error, "ERROR");
              });
          },
        },
      ],
    });
    prompt.present();
  }

  public getContacts(cb) {
    this.storage.get('packId').then((val) => {
      this.http.get(`${this.SERVER_ROSE}/groups?packId=${val}`)
        .map(res => res.json())
        .subscribe(response => {
          console.log(response);
          cb(response);
        }, error => {
          console.error(error);
        });
    });
  }
}
