export interface IUser {
    createDate: Date;
    photo: { id: number, name: string };
    countryCode: string;
    address: string;
    firstname: string;
    lastname: string;
    uid: string;
    fcmToken?: string;
}
