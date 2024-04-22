'use strict';

const line = require('@line/bot-sdk');
const express = require('express');
const trainHandler = require('./train_handler');
const flex = require('./flex');



// create LINE SDK config from env variables
const config = {
  channelAccessToken: "NfrJJ059KhU/3r6az9bbPw/Lp5lP02usjMXHstks6s/ELalJBoyL+3JrsvXSRsA5e2KqawrsYRGqH9Q/zmpgBl29KhEQtidQvMOwdwOf5WlTmZAJIFvWsutGLK8Jv1UN0TLkEbdgi2Asc6hI7EzRYwdB04t89/1O/w1cDnyilFU=",
  channelSecret: "07c3c924edecf25970acfd0bf8c40fc4",
};

const {getTrainInfo, listAllStations,TrainNoInquire , allStation , nearylo} = trainHandler() ;
// create LINE SDK client
const lineclient = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// event handler
const handleEvent = async e => {
  
  if(e.type === "follow"){
    //console.log(flex.WELCOME_FLEX)
    return lineclient.replyMessage(e.replyToken,flex.WELCOME_FLEX)
  }
  else if (e.type === 'message'){
   // if(e.message.type === 'location'){
   //   var loca = [];
   //    loca.push(e.message);
   //   let addr = loca[0].address
   //   let lat = loca[0].latitude
   //   let lont = loca[0].longitude
   //    // console.log(`location sucesse${loca.address}`)
   //    console.log("location sucesse"+addr,lat,lont)
   //    let locationinfo = await nearylo(addr,lat,lont)//
   //
   //   return lineclient.replyMessage(e.replyToken, {type:'text', text:'LOCATION。'});
   //    // console.log("locataioninfo:"+JSON.stringify(locationinfo))
   //  }
     if(e.message.type === 'text'){
       let reply = {type:'text', text:'？'}
     if(e.message.text[e.message.text.length-1]==='站'){ 
        reply = await listAllStations(e.message.text)
      //  console.log(reply)
      //  location_message = LocationSendMessage(
      //   title = "古羅馬廣場",
      //   address = "Via della Salara Vecchia, 5/6, 00186 Roma RM, 義大利",
      //   latitude = 41.892575,
      //   longitude = 12.485349,
      // )
       //return lineclient.replyMessage(e.replyMessage,location_message)
      }
      else if(e.message.text.includes('嗨')||e.message.text.includes('哈囉')||e.message.text.includes('你好')){
        reply = {type:'text', text:'嗨！忘記怎麼問我問題可以輸入「使用手冊」喔。'}
    }
    else if(e.message.text[e.message.text.length-1]==="？" || e.message.text[e.message.text.length-1]==="?"){
      reply = {type:'text', text:'請輸入正確的指令我才能回答你喔，忘記怎麼問可以輸入「使用手冊」。'}
    }
    else if (e.message.text.includes('車次')){
      reply = await TrainNoInquire(e.message.text)
    }
   // else if (e.message.text.includes('搜尋火車站')){
   //   reply = await allStation();
   // 
   //     return lineclient.replyMessage(e.replyToken, reply);
   //   }
   // }
    else{
      switch (e.message.text) {
        case '使用手冊':
          reply = flex.USER_MANUAL_FLEX
          break;
        default:
          reply = await getTrainInfo(e.message.text);
          break;
     }
    }// use reply API
    return lineclient.replyMessage(e.replyToken, reply);
  }
  }
   //create a echoing text message
   return Promise.resolve(null);
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
// 第一次 測試 follow ; clone 到本地 然後push 有效!
// 第二次 用 async e 測試 將follow改為 ===  ; async可行 但follow出不來
// 第三 改follow "" ; 沒用
// 4: follow replyMessage 改 token ;
// 5 follow 成功 
// 6 作全部測試 ; 沒錯 index完成

// 7 加入train_handler.js 並沒調用 ; 壞掉!!
// 8 把舊的刪掉更新packaage.json ; 錯誤;
// 9 把7的train 拿掉 ; 也錯 
// 10 舊的pack並拿掉train測試 ; 壞掉 可能是package的問題

// 11 開新的echobot 做看看 有const trainhandler; 錯
// 12 無const train ; 功能正常!!

// 13 直接更新package.js ; 功能正常
// 14 加入train.js 無調用; 正常
// 15 加入traininfo.json ; 正常
// 16 加入flex 並未做完 無調用 ; 正常 
// 16 const train 開始調用 rainHandler.listAllStations(e.message.text) ; 錯誤
