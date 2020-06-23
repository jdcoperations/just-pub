import menuModel from '../models/menuModel';
import pricesModel from '../models/pricesmodel';
import optionsModel from '../models/options';

export const MENU = [
    new menuModel('m1', 'ade565a9-82a8-4111-808a-bdd111a6f4e3', 'Smirnoff', '40% proof', 'Vodka', [new pricesModel('25ml', 1.50), new pricesModel('Double up for £1 extra!', 2.50)], [new optionsModel('Ice', false), new optionsModel('Slice', false)]),
    new menuModel('m2', 'ade565a9-82a8-4111-808a-bdd111a6f4e3', 'Absolute', 'Better than smirnoff!', 'Vodka', [new pricesModel('25ml', 1.75), new pricesModel('50ml', 3.00)], [new optionsModel('Ice', false), new optionsModel('Slice', false)]),
    new menuModel('m3', 'ade565a9-82a8-4111-808a-bdd111a6f4e3', 'Fosters', 'Chemical beer','Lager', [new pricesModel('1/2 pint', 1.90), new pricesModel('Pint', 3.90)], [new optionsModel('Tops',false), new optionsModel('Lime', false), new optionsModel('Shandy',false)]),
    new menuModel('m4', '6c69c5dc-2d64-4c85-9009-3ad0562d4b6d', 'Fosters', 'Chemical beer','Lager', [new pricesModel('1/2 pint', 1.90), new pricesModel('Pint', 3.90)], [new optionsModel('Tops',false), new optionsModel('Lime', false), new optionsModel('Shandy',false)])

]