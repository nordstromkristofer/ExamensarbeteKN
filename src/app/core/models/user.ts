import { JwtHelperService } from '@auth0/angular-jwt';

export class User {
    private static readonly jwtHelper = new JwtHelperService();


    _employeeId: string;
    _userName: string;


    get id() {
        return this._employeeId;
    }


    get name() {
        return this._userName;
    }


    constructor(employeeId: string, userName: string) {
        this._employeeId = employeeId;
        this._userName = userName;
    }

    static fromJwtToken(token: string): User {

        const decodedToken = this.jwtHelper.decodeToken(token);

        return new User(
            decodedToken.sub,
            decodedToken.email);

        return null!;
    }
}
