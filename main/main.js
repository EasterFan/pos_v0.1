'use strict';

// 1.新建收据对象数组
function turnStringtoArray(inputs)
{
  var ItemSheetArray = new Array;
  var totalPrice = 0;
  for (let item of inputs)
  {
    ItemSheetArray.push
    (
      {
        barcode: item.barcode,
        name: item.name,
        unit: item.unit,
        price: item.price,
        count:item.count,
        productTotal: item.price * item.count
      }

    );
    totalPrice = totalPrice + parseInt(item.count).toFixed(2) * parseInt(item.price).toFixed(2);
  }

  return ItemSheetArray;
}


// 2.合并重复对象
function buildBarcode(ItemSheetArray)
{
  var barcode = new Array;
  for (let i=0;i<ItemSheetArray.length;i++)
  {
    for (let j=i+1;j<ItemSheetArray.length;j++)
    {
      if (ItemSheetArray[i].barcode == ItemSheetArray[j].barcode )
       j = ++i;
    }
    barcode.push(ItemSheetArray[i]);
  }
  return barcode;

}


// 3.数出每个barcode重复次数
function calculateBarcode(barcode, ItemSheetArray)
{
  var count = 0;
  var calculatedBarcode = new Array;
  for(let i=0;i<barcode.length;i++)
  {
    for (let item of ItemSheetArray)
    {
      if (barcode[i].barcode == item.barcode)
      {
        count++;
      }
    }

    calculatedBarcode[i] = { 'name': barcode[i].name, 'count': count, 'price': barcode[i].price, unit: barcode[i].unit, };
    count = 0;
  }

  return  calculatedBarcode;
}



// 4.计算一类商品小计和总价
function calculateSmallPriceTotalPrice(calculatedBarcode)
{
  var SmallPriceTotalPrice = [];
  var singleItemList = 0;

  var totalPrice = 0;
  for (let item of calculatedBarcode) {
    SmallPriceTotalPrice[singleItemList ++] = {
      name: item.name,
      count: item.count ,
      unit: item.unit,
      price: item.price.toFixed(2),
      smallPrice: parseInt(item.count) * parseInt(item.price),
    };
    totalPrice = totalPrice + parseInt(item.count).toFixed(2) * parseInt(item.price).toFixed(2);

    SmallPriceTotalPrice.totalPrice= totalPrice.toFixed(2);
  }

  return SmallPriceTotalPrice;
}

// 5.汇总的收据数组转为对象
function turnArraytoObject(SmallPriceTotalPrice)
{
  var singleItem = '';
  for (let item of SmallPriceTotalPrice) {
    singleItem +=  '名称：' +item.name + '，数量：' + item.count + item.unit + '，单价：' +item.price + '(元)，小计：' + item.smallPrice.toFixed(2) + '(元)' + "\n"
  }
  let ItemSheetObj = {
    singleItem: singleItem,
    totalPrice: SmallPriceTotalPrice.totalPrice,
  }

  return ItemSheetObj;
}

// 6.打印收据
function printReceipt(ItemSheetObj)
{
  return `***<没钱赚商店>收据***
${ItemSheetObj.singleItem}
----------------------
总计：${ItemSheetObj.totalPrice}(元)
**********************`

}

/*
 var inputs = [
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

*/
var ItemSheetArray = turnStringtoArray(inputs);
 // console.log(partialItemSheet);
var barcode = buildBarcode(ItemSheetArray);
// console.log(barcode);
var calculatedBarcode = calculateBarcode(barcode, ItemSheetArray);
//  console.log(calculatedBarcode);
var SmallPriceTotalPrice = calculateSmallPriceTotalPrice(calculatedBarcode);
// console.log(SmallPriceTotalPrice);
var ItemSheetObj = turnArraytoObject(SmallPriceTotalPrice);
 // console.log(ItemSheet);
var result = printReceipt(ItemSheetObj);

 console.log(result);



