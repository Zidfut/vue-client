import moment from 'moment';

export interface Product {
    name: string;
    price: number | null;
    description: string;
    date: moment.Moment | null | string;
    time: moment.Moment | null | string;

}
