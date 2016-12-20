const FS = require('fs');
const FILE = "info.json";

const READLINE = require('readline');

const RL = READLINE.createInterface({
  input: process.stdin,
  output: process.stdout
});

FS.readFile(FILE, 'utf8', function (error, data) {
  if (error){
      if(error.code == "ENOENT"){
          createJson();
      } else {
          console.error(error);
      }
      
  } else
  sub(JSON.parse(data));
});

// create the Json if don't exist
function createJson(){
    
    var currentDate = new Date(Date.now());
    var data = { 
        number:335, 
        subNumber:15, 
        date:{
            day: currentDate.getDate(), 
            month: currentDate.getMonth() + 1,
            year: currentDate.getFullYear()
        }, 
        dateSub1:{
            day: 10, 
            month: 8
        }, 
        dateSub2:{
            day: 25, 
            month: 12
        } 
    }
    FS.writeFile(FILE, JSON.stringify(data, null, 4));
    
    console.log("info saved number = " + data.number);

}

//sub the value comparing current date to Json date
function sub(pInfo){
    
    var currentDate = new Date(Date.now());
    var startMonth = pInfo.date.month;

    if(pInfo.date.year != currentDate.getFullYear()){
        
       for(k = pInfo.date.year; k < currentDate.getFullYear(); k++){
            crossYear(startMonth, 12,31);
            startMonth = 1;
        }

        crossYear(startMonth, currentDate.getMonth() + 1, currentDate.getDate());
        
    } else crossYear(pInfo.date.month,currentDate.getMonth() + 1,currentDate.getDate()); 
    
        
        
    pInfo.date.day = currentDate.getDate();
    pInfo.date.month = currentDate.getMonth() + 1;
    pInfo.date.year = currentDate.getFullYear();
    FS.writeFile(FILE, JSON.stringify(pInfo, null, 4));

    console.log("info saved number = " + pInfo.number);
        
    //cross a year
    function crossYear(monthStart,monthFine,dayFine){
            
        for(i = monthStart; i <= monthFine; i++){
            
            testDateSub(pInfo.dateSub1);
            testDateSub(pInfo.dateSub2);
            
        }

        //test if a sub data is passed
        function testDateSub(dateSub){
            
            if(i == dateSub.month){

                if(monthFine == i){

                    for(j = 0; j <= dayFine; j++)
                        if(j == dateSub.day)
                            pInfo.number -= pInfo.subNumber;
                    
                } else  pInfo.number -= pInfo.subNumber;
                
            }
        }
    }
}