import { Injectable } from '@angular/core';
import { Storage} from '@ionic/storage';
import { Http, Headers, RequestOptions } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()

export class AuthService {
  public jwtHelper: JwtHelper = new JwtHelper();
  public payload: any;
  public headers = new Headers({ 'Content-Type': 'application/json' });
  public SERVER_DEPLOY = 'http://ec2-18-220-15-216.us-east-2.compute.amazonaws.com:3030';
  public SERVER_ROSE = 'http://localhost:3030';

  constructor(private storage: Storage, public http: Http, public reqOptions: RequestOptions) {}

  public loginUser(user, cb) {
    console.log(user);
    this.http.post(`${this.SERVER_DEPLOY}/auth`, user)
      .map(res => res.json())
      .subscribe((data) => {
        console.log(data.accessToken);
        this.storage.set('jwt', data.accessToken).then(token => {
          this.payload = this.jwtHelper.decodeToken(token);
          console.log(this.payload, 'my payload');
          this.storage.set('userId', this.payload.userId);
          this.storage.set('username', this.payload.username);
          this.storage.set('avatar', this.payload.avatar);
        });
        cb(data.accessToken);
        // this.storage.set("token", data.accessToken);
        // let headers = new Headers();
        // headers.append("Authorization", `Bearer ${this.storage.get('')}`);
      }, (err) => {
        console.error(err);
      });
  }

  public signupUser(user, cb) {
    this.http.post(`${this.SERVER_DEPLOY}/users`, user)
      .map((res) => res.json())
      .subscribe((data) => {
        cb(data);
        console.log(data, 'data');
        cb(data)
      }, (err) => {
        console.error(err);
      });
  }

  public logoutUser() {
    this.storage.get('token').then(val => {
      const headers = new Headers();
      // console.log(val, "token");
      headers.append("Authorization", `Bearer ${val}`);
      let options = new RequestOptions({headers});
      console.log(headers, "headers")
      this.http.delete(`${this.SERVER_DEPLOY}/auth`, options)
      .map((res) => res.json())
      .subscribe((data) => {
        // cb(data);
        console.log(data, 'data');
      }, (err) => {
        console.error(err);
      });
    });
  }

}
