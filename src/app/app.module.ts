import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
// import { SplashScreen } from '@ionic-native/splash-screen';
// import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Packs } from '../pages/packs/packs';
import { Chat } from '../pages/chat/chat';
import { Itinerary } from '../pages/itinerary/itinerary';
import { ItinerarySearch } from '../pages/itinerary-search/itinerary-search';
import { Photos } from '../pages/photos/photos';
import { PackForm } from "../pages/pack-form/pack-form";
import { Contacts } from "../pages/contacts/contacts";
import { Budget } from "../pages/budget/budget";
import { FindMyPack } from "../pages/find-my-pack/find-my-pack";
import { BudgetAddon } from "../pages/budget-addon/budget-addon";
import { AuthService } from "../services/auth.service";
import { PackService } from "../services/pack.service";
import { YelpService } from "../services/yelp.service";
import { ChatService } from "../services/chat.service";
import { BudgetService } from "../services/budget.service";
import { Signup } from "../pages/signup/signup";
import { Geolocation } from '@ionic-native/geolocation';
import { JwtHelper } from 'angular2-jwt';
import { Config } from './config';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Profile } from "../pages/profile/profile";
import { PackingList } from '../pages/packing-list/packing-list';
import { Flights } from '../pages/flights/flights';
import { PackingListService } from "../services/packingList.service";
import { InAppBrowser } from '@ionic-native/in-app-browser';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Packs,
    Chat,
    Itinerary,
    ItinerarySearch,
    Photos,
    PackForm,
    Contacts,
    Budget,
    FindMyPack,
    BudgetAddon,
    Signup,
    Profile,
    PackingList,
    Flights,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Packs,
    Chat,
    Itinerary,
    ItinerarySearch,
    Photos,
    PackForm,
    Contacts,
    Budget,
    FindMyPack,
    BudgetAddon,
    Signup,
    Profile,
    Flights,
    PackingList,
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService, PackService, BudgetService, YelpService, ChatService, PackingListService,
    File,
    Transfer,
    Camera,
    FilePath,
    Geolocation,
    JwtHelper,
    Config,
    PhotoViewer,
    InAppBrowser,
  ],
})
export class AppModule {}
