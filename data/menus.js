import menuModel from '../models/menuModel';
import pricesModel from '../models/pricesModel';

export const MENU = [
    new menuModel('m1', 'p1', 'Smirnoff', '40% proof', 'Vodka', [new pricesModel('25ml', '£1.50'), new pricesModel('50ml', '£2.50')]),
    new menuModel('m2', 'p1', 'Absolute', 'Better than smirnoff!', 'Vodka', [new pricesModel('25ml', '£2.00'), new pricesModel('50ml','£3.00')])

]