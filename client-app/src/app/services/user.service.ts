import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';

@Injectable()

export class UserService {

    commonApiPath: string = this.configService.commonApiPath;
    userDetailsToBeEdit;

    constructor(private http: HttpClient, private configService: ConfigService) {

    }

    // To get Users
    getUsers() {
        return this.http.get(this.commonApiPath + '/api/Users');
    }

    // To register User
    registerUser(userObj: Object) {
        return this.http.post(this.commonApiPath + '/api/Users', userObj);
    }

    // To edit user details
    editUserDetails(userId: number, userobj: Object) {
        return this.http.put(this.commonApiPath + '/api/Users/' + userId, userobj);
    }

    // To delete user
    deleteUser(userId: number) {
        return this.http.delete(this.commonApiPath + '/api/Users/' + userId);
    }

    // To upload resume file
    uploadResume(fd: FormData) {
        return this.http.post(this.commonApiPath + '/api/Users/upload', fd);
    }
}