export class UserInfo {
    constructor(
        public name: string = '',
        public email: string = '',
        public phone?: number,
        public address1: string = '',
        public address2: string = '',
        public city: string = '',
        public country: string = 'Select',
        public province: string = 'Select',
        public postal: string = '',
    ) {}
}
