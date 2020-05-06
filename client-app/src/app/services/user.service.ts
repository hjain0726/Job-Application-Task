import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

// Services imports
import { ConfigService } from './config.service';

// Model import
import { User } from '../models/user.model';

@Injectable()

export class UserService {

    commonApiPath: string = this.configService.commonApiPath;
    userDetailsToBeEdit: User;
    currentPage: number = 1;

    constructor(private http: HttpClient, private configService: ConfigService) {

    }

    // To get All Users
    getUsers() {
        return this.http.get(this.commonApiPath + '/api/Users');
    }

    // To get users per page
    getUsersPerPage(pageNumber, pageCount) {

        // Setting query params
        let params = new HttpParams();
        params = params.append('pageNumber', pageNumber);
        params = params.append('pageCount', pageCount);

        return this.http.get(this.commonApiPath + '/api/Users/userPerPage', { params: params })
    }

    // To register User
    registerUser(userObj: Object) {
        return this.http.post(this.commonApiPath + '/api/Users', userObj);
    }

    // To upload resume file
    uploadResume(fd: FormData) {
        return this.http.post(this.commonApiPath + '/api/Users/upload', fd);
    }

    // To edit user details
    editUserDetails(userId: number, userobj: User) {
        return this.http.put(this.commonApiPath + '/api/Users/' + userId, userobj);
    }

    // To delete user
    deleteUser(userId: number) {
        return this.http.delete(this.commonApiPath + '/api/Users/' + userId);
    }

}