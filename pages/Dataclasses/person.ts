export class Person {
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
    password: string;
    confirmPassword: string;

    constructor(firstname: string, lastname: string, email: string, phone: string, password: string, confirmPassword: string) {
        this.firstName = firstname;
        this.lastName = lastname;
        this.email = email;
        this.telephone = phone;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }
}
