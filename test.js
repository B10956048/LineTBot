//let a  =[
//
//    {
//      "distance": {
//        "text": "2,377 km",
//        "value": 2377214
//      },
//      "duration": {
//        "text": "1 day 4 hours",
//        "value": 100519
//      },
//      "status": "OK"
//    },
//    {
//      "distance": {
//        "text": "1,900 km",
//        "value": 1899609
//      },
//      "duration": {
//        "text": "20 hours 6 mins",
//        "value": 72365
//      },
//      "status": "OK"
//    }
//]
////let b = []
////b.push(a)
//console.log(a[0].distance.value);

//let a = [
//  {
//    "rows": [
//      {
//        "elements": [
//          {
//            "distance": {
//              "text": "2,377 公里",
//              "value": 2377214
//            },
//            "duration": {
//              "text": "1 天 4 小時",
//              "value": 100519
//            },
//            "status": "OK"
//          },
//          {
//            "distance": {
//              "text": "1,900 公里",
//              "value": 1899609
//            },
//            "duration": {
//              "text": "20 小時 6 分鐘",
//              "value": 72365
//            },
//            "status": "OK"
//          }
//        ]
//      },
//      {
//        "elements": [
//          {
//            "distance": {
//              "text": "1,880 公里",
//              "value": 1880092
//            },
//            "duration": {
//              "text": "21 小時 9 分鐘",
//              "value": 76136
//            },
//            "status": "OK"
//          },
//          {
//            "distance": {
//              "text": "1,258 公里",
//              "value": 1257613
//            },
//            "duration": {
//              "text": "13 小時 27 分鐘",
//              "value": 48405
//            },
//            "status": "OK"
//          }
//        ]
//      }
//    ],
//    "originAddresses": [
//      "5 Great Carleton Pl, Edinburgh EH16 4TX英國",
//      "英國倫敦格林威治"
//    ],
//    "destinationAddresses": [
//      "瑞典斯德哥爾摩",
//      "Staroměstské nám. 1/3, Staré Město, 110 00 Praha-Praha 1, 捷克"
//    ]
//  }
//]
let b = [456,78,28]
let a = []
let temp;
a.push(0)
for (let i = 0 ; i <3 ;i++){
  a.push(b[i])
  for (let j = i+1 ; j <4 ;j++){
  if(a[i] > a[j]){
    console.log("s")
    temp = a[i]
    a[i] = a[j]
    a[j] = temp
  }
}
}
console.log(a);