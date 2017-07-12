'use strict';

// 1.新建收据对象数组
function buildItemSheet(inputs)
{
  var partialItemSheet = new Array;
  var totalPrice = 0;
  for (let item of inputs)
  {
    partialItemSheet.push
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

  return partialItemSheet;
}


// 2.合并重复对象
function buildBarcode(partialItemSheet)
{
  var barcode = new Array;
  for (let i=0;i<partialItemSheet.length;i++)
  {
    for (let j=i+1;j<partialItemSheet.length;j++)
    {
      if (partialItemSheet[i].barcode == partialItemSheet[j].barcode )
       j = ++i;
    }
    barcode.push(partialItemSheet[i]);
  }
  return barcode;

}


// 3.数出每个barcode重复次数
function calculateBarcode(barcode, partialItemSheet)
{
  var count = 0;
  var itemSheet = new Array;
  for(let i=0;i<barcode.length;i++)
  {
    for (let item of partialItemSheet)
    {
      if (barcode[i].barcode == item.barcode)
      {
        count++;
      }
    }

    itemSheet[i] = { 'name': barcode[i].name, 'count': count, 'price': barcode[i].price, unit: barcode[i].unit, };
    count = 0;
  }

  return  itemSheet;
}



// 4.计算一类商品小计和总价
function buildSingleItem(itemSheet)
{
  var singleItem = [];
  var singleItemList = 0;

  var totalPrice = 0;
  for (let item of itemSheet) {
    singleItem[singleItemList ++] = {
      name: item.name,
      count: item.count ,
      unit: item.unit,
      price: item.price.toFixed(2),
      prices: parseInt(item.count) * parseInt(item.price),
    };
    totalPrice = totalPrice + parseInt(item.count).toFixed(2) * parseInt(item.price).toFixed(2);
// console.log(totalPrice);
  singleItem.totalPrice= totalPrice.toFixed(2);
  }
  return singleItem;
}

function buildSingleItemSheet(itemSheet)
{
  var singleItem = '';
  for (let item of itemSheet) {
    singleItem +=  '名称：' +item.name + '，数量：' + item.count + '，单价：' +item.price + '(元)，小计：' + item.prices.toFixed(2) + '(元)' + "\n"
  }
  let singleItemSheet = {
    singleItem: singleItem,
    totalPrice: itemSheet.totalPrice,
  }

  return singleItemSheet;
}

// 5.打印收据
function printReceipt(singleItemSheet)
{
  return `***<没钱赚商店>收据***
${singleItemSheet.singleItem}
----------------------
总计：${singleItemSheet.totalPrice}(元)
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

var partialItemSheet = buildItemSheet(inputs);
// console.log(partialItemSheet);
var barcode = buildBarcode(partialItemSheet);
// console.log(barcode);
var itemSheet = calculateBarcode(barcode, partialItemSheet);
 // console.log(itemSheet);
var itemSheets = buildSingleItem(itemSheet);
var singleItemSheet = buildSingleItemSheet(itemSheets);
// console.log(singleItemSheet);
var result = printReceipt(singleItemSheet);

console.log(result);



