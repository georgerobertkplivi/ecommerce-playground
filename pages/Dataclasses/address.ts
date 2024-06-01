export class Address {

    firstName: string

    lastName: string

    company: string

    addressLine1: string

    addressLine2: string

    city: string

    postCode: string

    country: string

    region: string

    constructor(
        firstName: string,
        lastName: string,
        company: string,
        addressLine1: string,
        addressLine2: string,
        city: string,
        postCode: string,
        country: string,
        region: string
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.company = company;
        this.addressLine1 = addressLine1;
        this.addressLine2 = addressLine2;
        this.city = city;
        this.postCode = postCode;
        this.country = country;
        this.region = region;


    }
}