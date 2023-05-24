const ROULETTE_NUMBERS = [
    '00',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
    '32',
    '33',
    '34',
    '35',
    '36'
];
const ROULETTE_NUMBERS_GREEN = [
    '0', '00'
];
const ROULETTE_NUMBERS_RED = [
    '1', '3', '5', '7', '9', '12', '14', '16', '18', '19', '21', '23', '25', '27', '30', '32', '34', '36'
];
const ROULETTE_NUMBERS_BLACK = [
    '2', '4', '6', '8', '10', '11', '13', '15', '17', '20', '22', '24', '26', '28', '29', '31', '33', '35'
];
const ROULETTE_NUMBERS_ODD = [
    '1', '3', '5', '7', '9', '11', '13', '15', '17', '19', '21', '23', '25', '27', '29', '31', '33', '35'
];
const ROULETTE_NUMBERS_EVEN = [
    '2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22', '24', '26', '28', '30', '32', '34', '36'
];
const ROULETTE_NUMBERS_LOW = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'
];
const ROULETTE_NUMBERS_HIGH = [
    '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36'
];
const ROULETTE_NUMBERS_DOZ1 = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'
];
const ROULETTE_NUMBERS_DOZ2 = [
    '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'
];
const ROULETTE_NUMBERS_DOZ3 = [
    '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36'
];
const ROULETTE_NUMBERS_COL1 = [
    '1', '4', '7', '10', '13', '16', '19', '22', '25', '28', '31', '34'
];
const ROULETTE_NUMBERS_COL2 = [
    '2', '5', '8', '11', '14', '17', '20', '23', '26', '29', '32', '35'
];
const ROULETTE_NUMBERS_COL3 = [
    '3', '6', '9', '12', '15', '18', '21', '24', '27', '30', '33', '36'
];
const CHIP_AMOUNTS = [1, 5, 25, 100, 500, 1000];

const CHIP_AMOUNT_INDEX_1 = 0;
const CHIP_AMOUNT_INDEX_5 = 1;
const CHIP_AMOUNT_INDEX_25 = 2;
const CHIP_AMOUNT_INDEX_100 = 3;
const CHIP_AMOUNT_INDEX_500 = 4;
const CHIP_AMOUNT_INDEX_1000 = 5;

// TODO: Make the rest of these
const ID_X6_1TO6 = 'x6-1-6';
const ID_X6_4TO9 = 'x6-4-9';
const ID_X6_7TO12 = 'x6-7-12';
const ID_X6_10TO15 = 'x6-10-15';
const ID_X6_13TO18 = 'x6-13-18';
const ID_X6_16TO21 = 'x6-16-21';
const ID_X6_19TO24 = 'x6-19-24';
const ID_X6_22TO27 = 'x6-22-27';
const ID_X6_25TO30 = 'x6-25-30';
const ID_X6_28TO33 = 'x6-28-33';
const ID_X6_31TO36 = 'x6-31-36';
const ID_X12_DOZ1 = 'x12-doz1';
const ID_X12_DOZ2 = 'x12-doz2';
const ID_X12_DOZ3 = 'x12-doz3';
const ID_X12_COL1 = 'x12-col1';
const ID_X12_COL2 = 'x12-col2';
const ID_X12_COL3 = 'x12-col3';

// DOM IDs for hotspots
const HOTSPOT_IDENTIFIERS = [
    'x2-0-3',
    'x3-0-3',       // 0-2-3
    'x2-0-2',
    'x3-0-2',       // 0-1-2
    'x2-0-1',
    'x4-0-3',       // 4 number bet 0-1-2-3 for Single Zero
    'x1-3',
    'x2-2-3',
    'x1-2',
    'x2-1-2',
    'x1-1',
    'x3-1-3',
    'x2-3-6',
    'x4-2-6',
    'x2-2-5',
    'x4-1-5',
    'x2-1-4',
    'x6-1-6',
    'x1-6',
    'x2-5-6',
    'x1-5',
    'x2-4-5',
    'x1-4',
    'x3-4-6',
    'x2-6-9',
    'x4-5-9',
    'x2-5-8',
    'x4-4-8',
    'x2-4-7',
    'x6-4-9',
    'x1-9',
    'x2-8-9',
    'x1-8',
    'x2-7-8',
    'x1-7',
    'x3-7-9',
    'x2-9-12',
    'x4-8-12',
    'x2-8-11',
    'x4-7-11',
    'x2-7-10',
    'x6-7-12',
    'x1-12',
    'x2-11-12',
    'x1-11',
    'x2-10-11',
    'x1-10',
    'x3-10-12',
    'x2-12-15',
    'x4-11-15',
    'x2-11-14',
    'x4-10-14',
    'x2-10-13',
    'x6-10-15',
    'x1-15',
    'x2-14-15',
    'x1-14',
    'x2-13-14',
    'x1-13',
    'x3-13-15',
    'x2-15-18',
    'x4-14-18',
    'x2-14-17',
    'x4-13-17',
    'x2-13-16',
    'x6-13-18',
    'x1-18',
    'x2-17-18',
    'x1-17',
    'x2-16-17',
    'x1-16',
    'x3-16-18',
    'x2-18-21',
    'x4-17-21',
    'x2-17-20',
    'x4-16-20',
    'x2-16-19',
    'x6-16-21',
    'x1-21',
    'x2-20-21',
    'x1-20',
    'x2-19-20',
    'x1-19',
    'x3-19-21',
    'x2-21-24',
    'x4-20-24',
    'x2-20-23',
    'x4-19-23',
    'x2-19-22',
    'x6-19-24',
    'x1-24',
    'x2-23-24',
    'x1-23',
    'x2-22-23',
    'x1-22',
    'x3-22-24',
    'x2-24-27',
    'x4-23-27',
    'x2-23-26',
    'x4-22-26',
    'x2-22-25',
    'x6-22-27',
    'x1-27',
    'x2-26-27',
    'x1-26',
    'x2-25-26',
    'x1-25',
    'x3-25-27',
    'x2-27-30',
    'x4-26-30',
    'x2-26-29',
    'x4-25-29',
    'x2-25-28',
    'x6-25-30',
    'x1-30',
    'x2-29-30',
    'x1-29',
    'x2-28-29',
    'x1-28',
    'x3-28-30',
    'x2-30-33',
    'x4-29-33',
    'x2-29-32',
    'x4-28-32',
    'x2-28-31',
    'x6-28-33',
    'x1-33',
    'x2-32-33',
    'x1-32',
    'x2-31-32',
    'x1-31',
    'x3-31-33',
    'x2-33-36',
    'x4-32-36',
    'x2-32-35',
    'x4-31-35',
    'x2-31-34',
    'x6-31-36',
    'x1-36',
    'x2-35-36',
    'x1-35',
    'x2-34-35',
    'x1-34',
    'x3-34-36'
];

const HOTSPOTS_0_ONLY = [
    'x2-0-3',
    'x3-0-3',       // 0-2-3
    'x4-0-3'        // 0-1-2-3 "Top Line" Bet
];
const HOTSPOTS_0_00_OVERLAP = [
    'x2-0-1',
    'x2-0-2',
    'x3-0-2'        // 0-1-2
];
const HOTSPOTS_00_ONLY = [
    'x1-00',
    'x2-0-00',
    'x2-00-2',
    'x2-00-3',
    'x3-00-3',      // 00-2-3
    'x3-basket',    // 0-00-2 - Can't call this 'x3-0-2' becuase that's already
    'x5-topline'    // 0-00-1-2-3
];

const HOTSPOT_INSIDE_WIDTH = 26;
const HOTSPOT_INSIDE_HEIGHT = 38;
const EQUITY_WIDTH = 52;
const EQUITY_HEIGHT = 30;
const HIGHLIGHT_WIDTH = 52;
const HIGHLIGHT_WIDTH_0_0 = 40;
const HIGHLIGHT_HEIGHT = 76;

const HOTSPOT_OUTSIDE_DOZEN_WIDTH = 208;
const HOTSPOT_OUTSIDE_EVEN_MONEY_WIDTH = 104;
const HOTSPOT_OUTSIDE_COLUMN_WIDTH = 77;

const HOTSPOT_OUTSIDE_COLUMN_HEIGHT = 77;
const HOTSPOT_OUTSIDE_HEIGHT = 52;

const HOTSPOT_INSIDE_ABSOLUTE_LEFT = 87;
const HOTSPOT_INSIDE_ABSOLUTE_TOP = 87;
const HOTSPOT_OUTSIDE_ABSOLUTE_LEFT = 100;
const HOTSPOT_OUTSIDE_ABSOLUTE_TOP = 298;
const EQUITY_ABSOLUTE_LEFT = 100;
const EQUITY_ABSOLUTE_TOP = 815;
const WINLOSS_ABSOLUTE_LEFT = 100;
const WINLOSS_ABSOLUTE_TOP = 465;
const HIGHLIGHT_ABSOLUTE_LEFT = 100;
const HIGHLIGHT_ABSOLUTE_TOP = 69;

const CHIP_WIDTH = 30;
const CHIP_HEIGHT = 30;

// TODO: These URLs should be configured via CSS, not hard coded in javascript
const IMG_SRC_CHIP_1_BLANK = '/assets/img/chips/chip_1_blank-50x50.png';
const IMG_SRC_CHIP_5_BLANK = '/assets/img/chips/chip_5_blank-50x50.png';
const IMG_SRC_CHIP_25_BLANK = '/assets/img/chips/chip_25_blank-50x50.png';
const IMG_SRC_CHIP_100_BLANK = '/assets/img/chips/chip_100_blank-50x50.png';
const IMG_SRC_CHIP_500_BLANK = '/assets/img/chips/chip_500_blank-50x50.png';
const IMG_SRC_CHIP_1000_BLANK = '/assets/img/chips/chip_1000_blank-50x50.png';

const WHEEL_TYPE_0 = 0;
const WHEEL_TYPE_00 = 1;
const WHEEL_TYPE_0_LAYOUT_IMG_SRC = '/assets/img/roulette/roulette-layout-800x450.png';
const WHEEL_TYPE_00_LAYOUT_IMG_SRC = '/assets/img/roulette/roulette-layout-00-800x450.png';
const WHEEL_TYPE_0_BUTTON_IMG_SRC = '/assets/img/roulette/0_g-47x30.png';
const WHEEL_TYPE_00_BUTTON_IMG_SRC = '/assets/img/roulette/00_g-47x30.png';

const GRAPH_WIDTH = 775;
const GRAPH_HEIGHT = 150;
