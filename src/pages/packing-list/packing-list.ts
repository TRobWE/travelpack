import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { PackingListService } from "../../services/packingList.service";

@Component({
  selector: 'page-packing-list',
  templateUrl: 'packing-list.html',
})
export class PackingList {
  public list: any;
  public listItem: string = '';

  constructor(public events: Events, private plSvs: PackingListService, public navCtrl: NavController, public navParams: NavParams) {
    this.events.subscribe('reload:List', () => this.plSvs.getList(this.listItems.bind(this)));
  }

  public ionViewDidLoad() {
    console.log('ionViewDidLoad PackingListPagePage');
  }

  public ionViewDidEnter() {
    this.plSvs.getList(this.listItems.bind(this));
  }

  public listItems(data) {
    this.list = data;
  }
  public addItem(item) {
    this.plSvs.addList(item);
    this.listItem = '';
  }

  public removeItem(item): void {
    this.plSvs.removeItem(item);
  }
}
