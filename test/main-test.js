'use strict';

describe('pos0.1', () => {

  const inputs = [
    {
      barcode: 'ITEM000000',
      name: '可口可乐',
      unit: '瓶',
      price: 3.00

    },
    {
      barcode: 'ITEM000000',
      name: '可口可乐',
      unit: '瓶',
      price: 3.00
    },
    {
      barcode: 'ITEM000000',
      name: '可口可乐',
      unit: '瓶',
      price: 3.00
    },
    {
      barcode: 'ITEM000000',
      name: '可口可乐',
      unit: '瓶',
      price: 3.00
    },
    {
      barcode: 'ITEM000000',
      name: '可口可乐',
      unit: '瓶',
      price: 3.00
    },
    {
      barcode: 'ITEM000001',
      name: '雪碧',
      unit: '瓶',
      price: 3.00
    },
    {
      barcode: 'ITEM000001',
      name: '雪碧',
      unit: '瓶',
      price: 3.00
    },
    {
      barcode: 'ITEM000004',
      name: '电池',
      unit: '个',
      price: 2.00
    }
  ];
  const expectText = `***<没钱赚商店>收据***
名称：可口可乐，数量：5瓶，单价：3.00(元)，小计：15.00(元)
名称：雪碧，数量：2瓶，单价：3.00(元)，小计：6.00(元)
名称：电池，数量：1个，单价：2.00(元)，小计：2.00(元)
----------------------
总计：23.00(元)
**********************`;

  it('1.新建收据对象数组', () => {

    expect(turnStringtoArray(inputs)).toEqual(
      [ { barcode: 'ITEM000000',
      name: '可口可乐',
      unit: '瓶',
      price: 3,
      count: undefined,
      smallPriceTotal: NaN },
      { barcode: 'ITEM000000',
        name: '可口可乐',
        unit: '瓶',
        price: 3,
        count: undefined,
        smallPriceTotal: NaN },
      { barcode: 'ITEM000000',
        name: '可口可乐',
        unit: '瓶',
        price: 3,
        count: undefined,
        smallPriceTotal: NaN },
      { barcode: 'ITEM000000',
        name: '可口可乐',
        unit: '瓶',
        price: 3,
        count: undefined,
        smallPriceTotal: NaN },
      { barcode: 'ITEM000000',
        name: '可口可乐',
        unit: '瓶',
        price: 3,
        count: undefined,
        smallPriceTotal: NaN },
      { barcode: 'ITEM000001',
        name: '雪碧',
        unit: '瓶',
        price: 3,
        count: undefined,
        smallPriceTotal: NaN },
      { barcode: 'ITEM000001',
        name: '雪碧',
        unit: '瓶',
        price: 3,
        count: undefined,
        smallPriceTotal: NaN },
      { barcode: 'ITEM000004',
        name: '电池',
        unit: '个',
        price: 2,
        count: undefined,
        smallPriceTotal: NaN } ]

    );

  });


  it(' 2.合并重复对象', () => {

    expect(buildBarcode(ItemSheetArray)).toEqual(
      [ { barcode: 'ITEM000000',
      name: '可口可乐',
      unit: '瓶',
      price: 3,
      count: undefined,
      smallPriceTotal: NaN },
      { barcode: 'ITEM000001',
        name: '雪碧',
        unit: '瓶',
        price: 3,
        count: undefined,
        smallPriceTotal: NaN },
      { barcode: 'ITEM000004',
        name: '电池',
        unit: '个',
        price: 2,
        count: undefined,
        smallPriceTotal: NaN } ]

    );

  });

  it('3.数出每个barcode重复次数', () => {

    expect(calculateBarcode(barcode, ItemSheetArray)).toEqual(
      [ { name: '可口可乐', count: 5, price: 3, unit: '瓶' },
        { name: '雪碧', count: 2, price: 3, unit: '瓶' },
        { name: '电池', count: 1, price: 2, unit: '个' } ]

    );

  });

  it('4.计算一类商品小计和总价', () => {

    expect(calculateSmallPriceTotalPrice(calculatedBarcode)).toEqual(
      [ { name: '可口可乐',
        count: 5,
        unit: '瓶',
        price: '3.00',
        smallPrice: 15 },
        { name: '雪碧', count: 2, unit: '瓶', price: '3.00', smallPrice: 6 },
        { name: '电池', count: 1, unit: '个', price: '2.00', smallPrice: 2 },
        totalPrice: '23.00' ]

    );

  });

  it('5.汇总的收据数组转为对象', () => {

    expect(turnArraytoObject(SmallPriceTotalPrice)).toEqual(
      { singleItem: '名称：可口可乐，数量：5瓶，单价：3.00(元)，小计：15.00(元)\n名称：雪碧，数量：2瓶，单价：3.00(元)，小计：6.00(元)\n名称：电池，数量：1个，单价：2.00(元)，小计：2.00(元)\n',
        totalPrice: '23.00' }
    );

  });

  it(' 6.打印收据', () => {

    expect(printReceipt(ItemSheetObj)).toEqual(expectText);

  });


});
