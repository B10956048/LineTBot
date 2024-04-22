const axios = require('axios');
const qs = require('qs');
const {sortBy, indexOf, includes, add} = require('lodash');
const flex_msg = require('./flex')

//const {Client} = require("@googlemaps/google-maps-services-js");

//const client = new Client({});

const LINES = require('./traininfo.json');

var getjug = 0 ;
const getToken = async () => {
    const CLIENT_ID = 'b10956048-e2b2423b-8158-40f9';
    const CLIENT_SECRET = '16c9aa00-b0f6-492d-9669-ee63accf1392';

    try {
        const data = qs.stringify({
            grant_type: 'client_credentials',
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET
        });
        const response = await axios.post('https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token', data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return response.data.access_token;
    } catch (e) {
        console.log(e);
    }
}

const getLocationDescription =  async (station_name) => {//花蓮
    
    const token = await getToken()
    
    const response = await axios.get(`https://tdx.transportdata.tw/api/basic/v2/Rail/THSR/Station?%24select=StationAddress&%24filter=StationName%2FZh_tw%20eq%20%27${encodeURI(station_name)}%27&%24format=JSON`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    });
    return response.data.map(exit => {
        return {Address: exit.StationAddress};
    });
}

  

const   getTrainsByStartAndEndStations = async (startStationId, destinationStationId,hour,minutes,year,month,day) => {
        try {
            // 板橋 to 花蓮
          //  console.log("gh"+hour)
          //  console.log("gm"+minutes)
            if(getjug == 1){
                hour = hour
                
            }
            if(getjug == 0){
                hour = hour
            }
            console.log(`yearmonthday${year}${month}${day}`)
           console.log ("now h:"+hour);
           console.log ("now m:"+minutes);
           const staid = LINES.find(station=>station.name===startStationId);
           //> Object { stationCode: "0900", stationName: "基隆", stationEName: "Keelung", name: "基隆", ename: "Keelung", stationAddrTw: "基隆市中山區民治里1鄰中山一路16之 1號", stationAddrEn: "No. 16-1, Zhongshan 1st Rd, Zhongshan Dist., Keelung City", stationTel: "02-24263743", gps: "25.13401 121.74013" }
           const desid = LINES.find(station=>station.name===destinationStationId);
           const token = await getToken();
            console.log("staid.stationCode"+staid.stationCode);
            const response = await axios.get(`https://tdx.transportdata.tw/api/basic/v3/Rail/TRA/DailyTrainTimetable/OD/${staid.stationCode}/to/${desid.stationCode}/${year}-${month}-${day}`, {
                headers: {

                    authorization: `Bearer ${token}`
                }
            });
            
            let trains = response.data.TrainTimetables;
            let jug = []
            let timeTables = trains.map(train => {
                return {
                    trainNo: train.TrainInfo.TrainNo,  //"202"
                    trainType: train.TrainInfo.TrainTypeName.Zh_tw, //"普悠瑪"
                    arrivalStartDepartureTime: train.StopTimes[0].DepartureTime, //"05:49"
                    arrivalDestinationStationTime: train.StopTimes[1].ArrivalTime, // "08:15"
                };
            }).sort();
           //console.log("timeTable arrival:"+parseInt(timeTables[0].arrivalStartDepartureTime))
           timeTables = sortBy(timeTables, ['arrivalStartDepartureTime']);
           
            for(let i = 0 ; i<timeTables.length;i++){
            
              let h = timeTables[i].arrivalStartDepartureTime.substring(0, 2)
              let m = timeTables[i].arrivalStartDepartureTime.substring(3,5)
               // console.log("h:"+h)
               // console.log("m:"+m)
                if((h>hour || (h==hour && m >minutes)) && jug.length <12 ){
                    jug.push(timeTables[i])
                }
               
            }
            //console.log("jug trainno:"+jug[0].trainNo);
            return jug; //順序
        } 
        catch (e) {
            console.log(e);
        }

    }

    
    
const     getTicket = async (start_station_name, end_station_name) => { //板橋 花蓮
        let price = []
        const staid = LINES.find(station=>station.name===start_station_name);
           //> Object { stationCode: "0900", stationName: "基隆", stationEName: "Keelung", name: "基隆", ename: "Keelung", stationAddrTw: "基隆市中山區民治里1鄰中山一路16之 1號", stationAddrEn: "No. 16-1, Zhongshan 1st Rd, Zhongshan Dist., Keelung City", stationTel: "02-24263743", gps: "25.13401 121.74013" }
           const desid = LINES.find(station=>station.name===end_station_name);

        const token = await getToken()    //1020 to 7000
        const response = await axios.get(`https://tdx.transportdata.tw/api/basic/v2/Rail/TRA/ODFare/${staid.stationCode}/to/${desid.stationCode}?%24top=30&%24format=JSON`, {
            headers: {                    
                authorization: `Bearer ${token}`
            }
        });
        price.push(response.data[0].Fares[0].Price,response.data[0].Fares[1].Price,response.data[0].Fares[5].Price,response.data[0].Fares[6].Price,response.data[0].Fares[10].Price,response.data[0].Fares[11].Price)
        return price ;
    }


 const    makePath = async (a_name, b_name,hour,minutes,year,month,day)=>{ // 板橋  to 花蓮
      //  let path = [];
      //  let extra = null;
        let start_station_name = a_name;
        let end_station_name = b_name;
        let alldata = [];
       // console.log("hr"+hour)
        //        console.log("mi"+minutes)
    if(start_station_name!==end_station_name){
    //let start_station = await getAStation(start_station_name) //right
   // let end_station = await getAStation(end_station_name)
    //if(!start_station || !end_station) return null;
   // console.log("makepath test ");
    alldata = await getTrainsByStartAndEndStations(start_station_name, end_station_name,hour,minutes,year,month,day)

    return alldata;
}

    
}

const getStopSequence = async (trainNo) => {
    const token = await getToken()    //1020 to 7000
        const response = await axios.get(`https://tdx.transportdata.tw/api/basic/v2/Rail/TRA/DailyTimetable/Today/TrainNo/${trainNo}?%24select=StopTimes&%24top=30&%24format=JSON
        `, {
            headers: {                    
                authorization: `Bearer ${token}`
            }
        });
       // let trainsNol = response.data.StopTimes;
        return response.data[0].StopTimes.map (trains => {
            return{
               // TrainTypeName: trains.GeneralTimetable.GeneralTrainInfo.TrainTypeName.Zh_tw,//普悠瑪
                StopSequence: trains.StopSequence, //1
                StationName: trains.StationName.Zh_tw, // 樹林
                ArrivalTime: trains.ArrivalTime, //15:58
                DepartureTime: trains.DepartureTime, //16:03
            }
        } );
        //console.log("StopSequencesucss");
        //return sortBy(trainNoTables, ['StopSequence']);
}

//const distances = async () =>{
    
//}
const getTrainType = async (trainNo) =>{
    const token = await getToken()    //1020 to 7000
        const response = await axios.get(`https://tdx.transportdata.tw/api/basic/v2/Rail/TRA/GeneralTrainInfo/TrainNo/${trainNo}?%24top=30&%24format=JSON

        `, {
            headers: {                    
                authorization: `Bearer ${token}`
            }
        });
        console.log("getTrainsucss");
        return response.data.map(TypeName => {
            console.log("getTrainsucss");
            return {TrainTypeName : TypeName.TrainTypeName.Zh_tw}
        })
}

//keyword
const Train_handler = ()=>{
const getTrainInfo = async (keyword)=>{
        // 板橋到花蓮
            
            let dao_id = keyword.search('到')  
            let kh ;
            let km ;
            let kyear;
            let kmonth;
            let kday;
            let path ;
            var Time=new Date();
            
            let year = Time.getFullYear();
            let month = Time.getMonth()+1;
            month = `${month < 0 ? '0' : ''}${month}`
            let day = String(Time.getDate()).padStart(2, '0');
            console.log("dayyyyy"+day);
            
            let hour = Time.getHours();
            let minutes =  Time.getMinutes();
            let timejug ;
            let dayjug;
            if(dao_id===0){
                // if station exit
                // ask for start station
                return {type:"text", text:`你想從哪裡出發${keyword}? 請完整輸入「__${keyword}」`}
            }
            else if(dao_id===keyword.length-1){
                //if station exit
                //ask for end station
                return {type:"text", text:`你想從${keyword}哪裡?，請完整輸入「${keyword}__」`}
            }
            else if(dao_id!==-1){
                // path decision
                let start_name = keyword.slice(0,dao_id)
                let end_name = keyword.slice(dao_id+1, keyword.length)

                if(start_name==end_name){
                    return {type:'text', text:'同一站就不用搭了。'}
                }
            if(keyword.length>=5 && keyword.includes('到') && keyword.length<10){
                console.log("5y"+year)
                console.log("5m"+month)
                console.log("5d"+day)
                getjug = 0
                 path = await makePath(start_name, end_name,hour,minutes,year,month,day) 
                 
            }//板橋 花蓮
            else if(keyword.length>=10 && keyword.includes('-') && keyword.includes('到') && keyword.length<15){
              //  console.log("keywordsucc"+keyword.length)
              //  console.log("kh"+kh)
              //  console.log("km"+km)
                timejug = keyword.search('-')
                kh =keyword.slice(timejug+1,timejug+3);//05
                km = keyword.slice(timejug+3,keyword.length);//19
                if(km>60 || kh >= 24){
                    return {type:"text", text:"請照格式查詢唷(-HHmm)。"};
                }
                 start_name = keyword.slice(0,dao_id)
                 end_name = keyword.slice(dao_id+1, dao_id+3)
                 getjug = 1
                 path = await makePath(start_name, end_name,kh,km,year,month,day) 
                 
            }//板橋 花蓮
            else if(keyword.length>=15 &&keyword.includes('-') && keyword.includes('到') && keyword.includes(':')){
                console.log("keywordsucc"+keyword.length)
                
                timejug = keyword.search('-')
                dayjug = keyword.search(':')
                kh =keyword.slice(timejug+1,timejug+3);//05
                km = keyword.slice(timejug+3,keyword.length);//19
                kyear = keyword.slice(dayjug+1,dayjug+5)
                kmonth = keyword.slice(dayjug+5,dayjug+7)
                kday = keyword.slice(dayjug+7,dayjug+9)
            //    console.log("kyear"+kyear)
            //    console.log("kmonth"+kmonth)
            //    console.log("kday"+kday)
            if(km>60 || kh >= 24){
                return {type:"text", text:"請照格式查詢唷(:YYYYMMDD-HHmm)。"};
            }
                 getjug = 1 ;
                 start_name = keyword.slice(0,dao_id)
                 end_name = keyword.slice(dao_id+1, dao_id+3)
                 path = await makePath(start_name, end_name,kh,km,kyear,kmonth,kday) 
                 
            }
                if(!path && getjug == 0 ){
                    return {type:"text", text:"這兩個站其中有一個查不到，請確認站名是否輸入正確。"}
                }
                else if (!path && getjug == 1){
                    return {type:"text", text:"無提供查詢過往及超過60天的資料。"};
                }
                else if (path.length == 0){
                    return {type:"text", text:"沒有直達車或沒有班次。"};
                }
                else{
                    let price = await getTicket(start_name, end_name) //板橋 花蓮   
                   // console.log("length:"+path.timeTables.trainNo);
                    
                    return flex_msg.PATH_INFO_FLEX(start_name,end_name,path,price) // alldata price
                }
            }
            
            else{
                // find a station
                //let stationf = LINES.find(station=>station.name===keyword);
                //let station = await getAStation(keyword);                          
                //if(stationf){
                    //stationf_loca = await getLocationDescription(stationf.name)
                    //station.directions = await getDirections(station.name.tw)
                  //  return flex_msg.STATION_INFO_FLEX()
               // }else{
                    return {type:"text", text:`查不到「${keyword}」站，我只認識火車站喔。`}  
                }
            }
        
    
const   listAllStations = async (line_name)=>{ //基隆站 //想改為車次
           let line = LINES.find(line=>line.stationName==line_name)
           console.log("listAllStationssuess")
      //   //   line: {
      //   //      stationCode: string;
      //   //      stationName: string;
      //   //      stationEName: string;
      //   //      name: string;
      //   //      ename: string;
      //   //      stationAddrTw: string;
      //   //      stationAddrEn: string;
      //   //      stationTel: string;
      //   //      gps: string;
      //   //  } | undefined
           if(line){
              let stationsadd = await getLocationDescription(line.name)
                return flex_msg.STATION_INFO_FLEX(line,stationsadd)//line = 板橋, station = location
           }else{
               return { type:'text', text:`查不到這站喔`} 
           }
        
        }
    const TrainNoInquire = async (keyword)=>{
        console.log("TrainNoInquire")
        let key_No = keyword.search('次')
        let No = keyword.slice(key_No+1,keyword.length) //TrainNo
        let InquireNo ;
        let getType;
        InquireNo = await getStopSequence(No); 
        getType = await getTrainType(No);
        console.log("StationName"+InquireNo[0].StationName)
        console.log("ArrivalTime"+InquireNo[0].ArrivalTime)
        console.log("DepartureTime"+InquireNo[0].DepartureTime)
        console.log("TrainTypeName"+getType[0].TrainTypeName)
       
        return flex_msg.Sequence_INFO_FLEX(No,InquireNo,getType);

    }

 //   const allStation = async () => {
 //       
 //       return flex_msg.allStationinfo();
//
 //   }

//const nearylo = async (address,latitude,longitude) => {
//    var rea ;
//    let a  = address
//    let b = a.slice(5,8) //b = 屏東縣
//    var d = []
//    let latt = []
//    let lngg = []
//    let re = []
//    let disadress = []
//    let temp;
//for (let i = 0 ; i <LINES.length ; i++){
//    if(LINES[i].stationAddrTw.indexOf(b) > -1){
//      d.push(LINES[i])
//      //console.log("1")
//    }
//}
//console.log("dlength"+d.length)
//// d = all statinaddrtw
//re.push(0)
//for (let i = 1 ; i <d.length ; i++){
//   //  latt = d[i].gps
//   // console.log("dgps"+d[i].gps)
//    // lngg = d[i].lng 
//    //console.log("dlng"+d[i].lng)
//    client.distancematrix ({
//        params: {     
//         "origins": [
//             {
//               "lat": latitude, //23.04564 
//               "lng": longitude //121.16441
//             },
//             address
//           ],
//           "destinations": [
//             d[i].stationAddrTw,
//             {
//               "lat": d[i].gps,
//               "lng": d[i].lng
//             }
//           ],
//           "travelMode": "DRIVING",
//           "unitSystem": 0,
//           "avoidHighways": false,
//           "avoidTolls": false,
//         key: "AIzaSyBg3kLsyuIwNqpwz68aozJvZB1Sj-UAh7M"
//        },
//        timeout: 1000 // milliseconds
//      }, this.axiosInstance)
//      .then(r => {  
//       
//         //console.log(r.data.rows[0].elements);
//        rea = r.data.rows[0].elements //value 里程
//        console.log("re"+JSON.stringify(rea[0].distance.value))
//        re.push(JSON.stringify(rea[0].distance.value))
//        for (let j = i+1 ; j <d.length+1 ;j++){
//            if(re[i] > re[j]){
//              //console.log("s")
//              temp = a[i]
//              a[i] = a[j]
//              a[j] = temp
//            }
//          }
//        
//        if(re.length == d.length){
//            
//        }
//      })
//      .catch(e => {
//        console.log(e);
//      });
//    }
 //   for (let i = 0 ; i < re.length ;i++){
 //       for(let j = i+1 ; j <re.length ; j++ ){
 //       if(re[i]>re[j]){
 //         temp = re[i]  ;
 //         re[i] = re[j]
 //         re[j] = temp; 
 //       }
 //   }
 //       
 //     }
 //     console.log(re)
//
 //     for (let i = 0 ; i <d.length ; i++){
 //       //  latt = d[i].gps
 //       // console.log("dgps"+d[i].gps)
 //        // lngg = d[i].lng 
 //        //console.log("dlng"+d[i].lng)
 //        client.distancematrix ({
 //            params: {     
 //             "origins": [
 //                 {
 //                   "lat": latitude, //23.04564 
 //                   "lng": longitude //121.16441
 //                 },
 //                 address
 //               ],
 //               "destinations": [
 //                 d[i].stationAddrTw,
 //                 {
 //                   "lat": d[i].gps,
 //                   "lng": d[i].lng
 //                 }
 //               ],
 //               "travelMode": "DRIVING",
 //               "unitSystem": 0,
 //               "avoidHighways": false,
 //               "avoidTolls": false,
 //             key: "AIzaSyBg3kLsyuIwNqpwz68aozJvZB1Sj-UAh7M"
 //            },
 //            timeout: 1000 // milliseconds
 //          }, this.axiosInstance)
 //          .then(r => {  
 //           rea = r.data.rows[0].elements
 //           if(re[i] == JSON.stringify(rea[0].distance.value))
 //           {
 //               console.log("r.data.originAddresses "+r.data[0].destinationAddresses[1])
 //               console.log("r.data.originAddresses json "+JSON.stringify(r.data[0].destinationAddresses[1]))
 //               //console.log("r.data.originAddresses"+r.data.originAddresses)
 //               disadress.push(JSON.stringify(r.data[0].destinationAddresses[1]))
 //           }
 //             //console.log(r.data.rows[0].elements);
 //            //value 里程
 //           // console.log("re"+JSON.stringify(rea[0].distance.value))
 //            //re.push(JSON.stringify(rea[0].distance.value))
 //          })
 //          .catch(e => {
 //            console.log(e);
 //          });
 //        }
 //        console.log("disadress y04"+disadress[0])
         //console.log("disadress[0]"+disadress[0])

 //let disdata = [] ;
 //let tea = await distances ()
 //console.log("Tea"+re)
 
 //disdata.push(re)
 //console.log(disdata)
 
 //console.log(disdata.value)


  //  }

    


        return  { getTrainInfo, listAllStations, TrainNoInquire } //allStation , nearylo}
    }
module.exports = Train_handler;
//用法：
//
//const trainHandler = require("./train_handler");
//
//const response = await trainHandler.getTrainsByStartAndEndStations(1020,7000,'2022-06-13' )
