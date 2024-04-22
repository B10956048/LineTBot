const Stationinfo = require('./traininfo.json');
const flexWrap = (flex, alt) => {
    return {
      type:"flex",
      altText:alt,
      contents: flex
    }
  }

const WELCOME_FLEX ={
    "type": "bubble",
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "TRAIN TAIPEI",
          "weight": "bold",
          "color": "#1DB446",
          "size": "sm",
          "contents": [
            {
              "type": "span",
              "text": "Train",
              "color": "#00789B"
            },
            {
              "type": "span",
              "text": "LINEBOT",
              "color": "#3DAF36"
            }
          ]
        },
        {
          "type": "text",
          "text": "嗨！我是台鐵小精靈！",
          "weight": "bold",
          "size": "xl",
          "margin": "md"
        },
        {
          "type": "text",
          "text": "使用我的方式如下：",
          "size": "sm",
          "offsetTop": "xs",
          "offsetBottom": "none"
        },
        {
          "type": "separator",
          "margin": "lg"
        },
        {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "- 想知道某個站的資訊，輸入站名",
              "offsetTop": "none",
              "wrap": true,
              "margin": "xxl",
              "contents": [
                {
                  "type": "span",
                  "text": "- 想知道某個站的資訊，輸入",
                  "size": "md"
                },
                {
                  "type": "span",
                  "text": "站名",
                  "weight": "bold",
                  "size": "md",
                  "style": "normal",
                  "decoration": "none",
                  "color": "#ed9600"
                }
              ],
              "size": "md"
            },
            {
              "type": "text",
              "offsetTop": "none",
              "wrap": true,
              "margin": "xl",
              "contents": [
                {
                  "type": "span",
                  "text": "- 想知道當下A站到B站的列車，輸入"
                },
                {
                  "type": "span",
                  "text": "A站名到B站名",
                  "weight": "bold",
                  "decoration": "none",
                  "color": "#ed9600"
                }
              ]
            },
            {
              "type": "text",
              "text": "- 想知道某個站的資訊，輸入站名",
              "offsetTop": "none",
              "wrap": true,
              "margin": "xxl",
              "contents": [
                {
                  "type": "span",
                  "text": "- 想知道今日某時間點A站到B站的列車，輸入",
                  "size": "sm"
                },
                {
                  "type": "span",
                  "text": "A站名到B站名-HHMM(ex:0308)",
                  "weight": "bold",
                  "size": "sm",
                  "style": "normal",
                  "decoration": "none",
                  "color": "#ed9600"
                }
              ],
              "size": "md"
            },
            {
              "type": "text",
              "text": "- 想知道某個站的資訊，輸入站名",
              "offsetTop": "none",
              "wrap": true,
              "margin": "xxl",
              "contents": [
                {
                  "type": "span",
                  "text": "- 想知道某天某時間點A站到B站的列車，輸入"
                },
                {
                  "type": "span",
                  "text": "A站名到B站名:YYYYMMDD-HHMM(ex:20220701-0308)",
                  "weight": "bold",
                  "size": "sm",
                  "style": "normal",
                  "decoration": "none",
                  "color": "#ed9600"
                }
              ],
              "size": "md"
            },
            {
              "type": "text",
              "contents": [
                {
                  "type": "span",
                  "text": "-想搜尋車次?輸入"
                },
                {
                  "type": "span",
                  "text": "車次__",
                  "color": "#ed9600",
                  "weight": "bold",
                  "decoration": "none"
                }
              ],
              "margin": "xl",
              "text": "1",
              "wrap": true,
              "offsetTop": "none"
            }
          ]
        }
      ]
    },
    "styles": {
      "footer": {
        "separator": true
      }
    }
  }
  
  const USER_MANUAL_FLEX = {
    "type": "bubble",
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "TRAIN TAIPEI",
          "weight": "bold",
          "color": "#1DB446",
          "size": "sm",
          "contents": [
            {
              "type": "span",
              "text": "Train",
              "color": "#00789B"
            },
            {
              "type": "span",
              "text": "LINEBOT",
              "color": "#3DAF36"
            }
          ]
        },
        {
          "type": "text",
          "text": "台鐵小精靈的",
          "margin": "md",
          "size": "xs"
        },
        {
          "type": "text",
          "text": "使用手冊",
          "weight": "bold",
          "size": "xxl",
          "margin": "md"
        },
        {
          "type": "separator",
          "margin": "lg"
        },
        {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "- 想知道某個站的資訊，輸入站名",
              "offsetTop": "none",
              "wrap": true,
              "margin": "xl",
              "contents": [
                {
                  "type": "span",
                  "text": "- 想知道某個站的資訊，輸入"
                },
                {
                  "type": "span",
                  "text": "站名",
                  "weight": "bold",
                  "size": "md",
                  "style": "normal",
                  "decoration": "none",
                  "color": "#ed9600"
                }
              ]
            },
            {
              "type": "text",
              "offsetTop": "none",
              "wrap": true,
              "margin": "xl",
              "contents": [
                {
                  "type": "span",
                  "text": "- 想知道當下A站到B站的列車，輸入"
                },
                {
                  "type": "span",
                  "text": "A站名到B站名",
                  "weight": "bold",
                  "decoration": "none",
                  "color": "#ed9600"
                }
              ]
            },
            {
              "type": "text",
              "offsetTop": "none",
              "wrap": true,
              "margin": "xl",
              "contents": [
                {
                  "type": "span",
                  "text": "- 想知道今日某時間點A站到B站的列車，輸入",
                  "size": "sm"
                },
                {
                  "type": "span",
                  "text": "A站名到B站名-HHMM(ex:0308)",
                  "weight": "bold",
                  "decoration": "none",
                  "color": "#ed9600",
                  "size": "sm"
                }
              ]
            },
            {
              "type": "text",
              "text": "- 想知道某個站的資訊，輸入站名",
              "offsetTop": "none",
              "wrap": true,
              "margin": "xl",
              "contents": [
                {
                  "type": "span",
                  "text": "- 想知道某天某時間點A站到B站的列車，輸入"
                },
                {
                  "type": "span",
                  "text": "A站名到B站名:YYYYMMDD-HHMM(ex:20220701-0308)",
                  "weight": "bold",
                  "size": "sm",
                  "style": "normal",
                  "decoration": "none",
                  "color": "#ed9600"
                }
              ]
            },
            {
              "type": "text",
              "contents": [
                {
                  "type": "span",
                  "text": "-想搜尋車次?輸入"
                },
                {
                  "type": "span",
                  "text": "車次__",
                  "color": "#ed9600",
                  "weight": "bold",
                  "decoration": "none"
                }
              ],
              "margin": "xl",
              "text": "1",
              "wrap": true,
              "offsetTop": "none"
            }
          ]
        }
      ]
    },
    "styles": {
      "footer": {
        "separator": true
      }
    }
  }
const STATION_INFO_FLEX = (station) => {
  
    return flexWrap({
      "type": "bubble",
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "text": "TRAIN TAIPEI",
            "weight": "bold",
            "color": "#1DB446",
            "size": "sm",
            "contents": [
              {
                "type": "span",
                "text": "TRAIN",
                "color": "#00789B"
              },
              {
                "type": "span",
                "text": "LINEBOT",
                "color": "#3DAF36"
              }
            ]
          },
          {
            "type": "text",
            "text": "hello, world",
            "contents": [
              {
                "type": "span",
                "text": station.name,
                "size": "3xl"
              },
              {
                "type": "span",
                "text": station.ename
              }
            ]
          },
          {
            "type": "separator",
            "margin": "lg"
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "text",
                "text": "- 想知道某個站的資訊，輸入站名",
                "offsetTop": "none",
                "wrap": true,
                "margin": "xl",
                "contents": [
                  {
                    "type": "span",
                    "text": `位置${station.stationAddrTw}`
                  }
                ]
              },
              {
                "type": "text",
                "offsetTop": "none",
                "wrap": true,
                "margin": "xl",
                "contents": [
                  {
                    "type": "span",
                    "text": `電話${station.stationTel}`
                  }
                ]
              },
              {
                "type": "button",
                "action": {
                  "type": "uri",
                  "label": "打開GoogleMap",
                  "uri": `https://maps.google.com/maps?q=${encodeURI(station.gps)},${encodeURI(station.lng)}`
                }
              }
              
            ]
          }
        ]
      },
      "styles": {
        "footer": {
          "separator": true
        }
      }
    } , `${station.name}資訊`)
    }
    
const PATH_INFO_FLEX = (start,end,allinfo,price)  => {
    let a = []
    for (let i = 0 ; i<allinfo.length;i++){
        let h = allinfo[i].arrivalStartDepartureTime.substring(0, 2) //5
        let m = allinfo[i].arrivalStartDepartureTime.substring(3,5) //49

        let h2 = allinfo[i].arrivalDestinationStationTime.substring(0, 2) //8
        let m2 = allinfo[i].arrivalDestinationStationTime.substring(3,5) //15
        if (h == 0){
            h = 24
        }
        if(h2 == 0){
            h2 = 24 
        }
        let s2 = h2*60+m2;
        let s = h*60+m ;
        let timegap = parseInt((s2-s)/60);
        let timegap1 = parseInt(timegap/100);
        let timegap2 = (s2-s)%60;
        let price2;
        if(allinfo[i].trainType.includes('太魯閣') || allinfo[i].trainType.includes('普悠瑪') || allinfo[i].trainType.includes('自強')){
         price2 = price[0];
        }
        if(allinfo[i].trainType.includes('莒光')){
            price2 = price[2];
           }
        if(allinfo[i].trainType.includes('區間')){
            price2 = price[4];
           }
      //  let timegap = h2 - h ;
      //  let timegap2 = m2 - m;
   // let timegap = Math.abs(d1 - d2)/36e5;
        a.push(
            {
                "type": "bubble",
                "body": {
                  "type": "box",
                  "layout": "vertical",
                  "spacing": "md",
                  "action": {
                    "type": "uri",
                    "uri": "https://www.railway.gov.tw/tra-tip-web/tip/tip001/tip121/query"
                  },
                  "contents": [
                    {
                      "type": "box",
                      "layout": "vertical",
                      "spacing": "sm",
                      "contents": [
                        {
                          "type": "box",
                          "layout": "baseline",
                          "contents": [
                            {
                              "type": "text",
                              "text": `車種:${allinfo[i].trainType}`,
                              "weight": "bold",
                              "margin": "sm",
                              "flex": 0
                            },
                            {
                              "type": "text",
                              "text": `車次:${allinfo[i].trainNo}`,
                              "size": "sm",
                              "align": "end"
                            }
                          ]
                        },
                        {
                          "type": "box",
                          "layout": "baseline",
                          "contents": [
                            {
                              "type": "text",
                              "text": "開車",
                              "weight": "bold",
                              "margin": "sm",
                              "flex": 0
                            },
                            {
                              "type": "text",
                              "text": "抵達",
                              "size": "sm",
                              "align": "end"
                            }
                          ]
                        },
                        {
                          "type": "box",
                          "layout": "baseline",
                          "contents": [
                            {
                              "type": "text",
                              "text": allinfo[i].arrivalStartDepartureTime
                            },
                            {
                              "type": "text",
                              "text": "------->",
                              "size": "xl",
                              "margin": "lg",
                              "weight": "bold",
                              "align": "center"
                            },
                            {
                              "type": "text",
                              "text": allinfo[i].arrivalDestinationStationTime,
                              "align": "end"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "type": "text",
                      "text": `${timegap1}小時${timegap2}分`,
                      "wrap": true,
                      "size": "sm",
                      "align": "center"
                    },
                    {
                      "type": "separator",
                      "color": "#202020"
                    }
                  ]
                },
                "footer": {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "box",
                      "layout": "vertical",
                      "contents": [
                        {
                          "type": "text",
                          "text": `NT$:${price2}元`
                        }
                      ]
                    },
                    {
                      "type": "button",
                      "style": "primary",
                      "color": "#0367D3",
                      "margin": "xxl",
                      "action": {
                        "type": "uri",
                        "label": "線上訂票",
                        "uri": "https://www.railway.gov.tw/tra-tip-web/tip/tip001/tip121/query"
                      }
                      
                    },
                    {
                        "type": "button",
                        "style": "primary",
                        "color": "#0367D3",
                        "margin": "xxl",
                        "action": {
                          "type": "message",
                          "label": "查看車次",
                          
                          "text": `車次${allinfo[i].trainNo}`
                        }
                    }
                  ]
                }
              }
            
        )
        }
            return flexWrap ({      
                    "type": "carousel",
                    "contents": a
        }, `${start}=>${end}`)
}
const Sequence_INFO_FLEX = (No,InquireNo,getType) => {
    let b = [];
    b.push( {
        "type": "box",
        "layout": "horizontal",
        "contents": [
          {
            "type": "text",
            "contents": [
              {
                "type": "span",
                "text": "停靠站  ",
                "size": "md",
                "weight": "bold"
              },
              {
                "type": "span",
                "text": "000000",
                "size": "md",
                "color": "#FFFFFF"
              },
              {
                "type": "span",
                "text": "到站",
                "weight": "bold"
              },
              {
                "type": "span",
                "text": "000000",
                "color": "#FFFFFF"
              },
              {
                "type": "span",
                "text": "離站",
                "weight": "bold"
              }
            ]
          }
        ]
      })

    for(let j = 0 ; j<InquireNo.length;j++){
       b.push(
            {
              
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                        {
                            "type": "text",
                            "text": "hello, world",
                            "contents": [
                                {
                                    "type": "span",
                                    "text": InquireNo[j].StationName,
                                    "size": "sm"
                                },
                                {
                                    "type": "span",
                                    "text": "0000000",
                                    "color": "#FFFFFF"
                                },
                                {
                                    "type": "span",
                                    "text": InquireNo[j].ArrivalTime,
                                    "size": "sm"
                                },
                                {
                                    "type": "span",
                                    "text": "0000000",
                                    "color": "#FFFFFF",
                                    "size": "sm"
                                },
                                {
                                    "type": "span",
                                    "text": InquireNo[j].DepartureTime,
                                    "size": "sm"
                                }
                            ]
                        }
                    ],
                    "margin": "md"
            
        },
        )
    }
    
    return flexWrap ({     

        "type": "bubble",
        "size": "mega",
        "header": {
            "type": "box",
            "layout": "vertical",
            "contents": [
                {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                        {
                            "type": "text",
                            "text": "Akihabara",
                            "color": "#ffffff",
                            "size": "xl",
                            "flex": 4,
                            "weight": "bold",
                            "contents": [
                                {
                                    "type": "span",
                                    "text": `車次:${No}`
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                        {
                            "type": "text",
                            "text": "Shinjuku",
                            "color": "#ffffff",
                            "size": "xl",
                            "flex": 4,
                            "weight": "bold",
                            "contents": [
                                {
                                    "type": "span",
                                    "text": `車種:${getType[0].TrainTypeName}`
                                }
                            ]
                        }
                    ]
                }
            ],
            "paddingAll": "20px",
            "backgroundColor": "#0367D3",
            "spacing": "xl",
            "height": "110px",
            "paddingTop": "22px",
            "margin": "none"
        },
    
    
        "body": {
            "type": "box",
            "layout": "vertical",
            "contents": b
          }
                
    }, '車次')
}

// const allStationinfo = () => {
//   let stationall = Stationinfo ;
//   let c = [] ;
//   console.log(stationall.length);
//   for(var k = 0 ; k<50;k++){
//       c.push({
//         "type": "box",
//         "layout": "horizontal",
//         "contents": [
//           {
//             "type": "text",
//             "text": "132",
//             "size": "md",
//             "color": "#555555",
//             "flex": 0
//           },
//           {
//             "type": "text",
//             "text": "詳細",
//             "size": "sm",
//             "color": "#111111",
//             "align": "end",
//             "action": {
//               "type": "message",
//               "label": "action",
//               "text": "車站nameeeee"
//             },
//             "offsetEnd": "lg",
//             "decoration": "underline"
//           }
//         ]
//       },)
// 
//     }
// 
//     return flexWrap ({
//       
//         "type": "bubble",
//         "body": {
//           "type": "box",
//           "layout": "vertical",
//           "contents": [
//             {
//               "type": "text",
//               "text": "RECEIPT",
//               "weight": "bold",
//               "color": "#1DB446",
//               "size": "sm",
//               "contents": [
//                 {
//                   "type": "span",
//                   "text": "TRAIN",
//                   "color": "#00789B"
//                 },
//                 {
//                   "type": "span",
//                   "text": "LINEBOT",
//                   "color": "#3DAF36"
//                 }
//               ]
//             },
//             {
//               "type": "text",
//               "text": "台鐵車站",
//               "weight": "bold",
//               "size": "xxl",
//               "margin": "xl"
//             },
//             {
//               "type": "separator",
//               "margin": "xxl"
//             },
//             {
//               "type": "box",
//               "layout": "vertical",
//               "margin": "xxl",
//               "spacing": "sm",
//               "contents":  c
//             } 
//     ]
//   }
// }, "資訊")
//   


//}

  module.exports = {
    WELCOME_FLEX: flexWrap(WELCOME_FLEX, '歡迎及使用手冊'),
    USER_MANUAL_FLEX: flexWrap(USER_MANUAL_FLEX,'使用手冊'),
   
    STATION_INFO_FLEX , //站介紹
    PATH_INFO_FLEX,//站到站
    Sequence_INFO_FLEX     //車次                
    //allStationinfo, // 全站介紹
  }
