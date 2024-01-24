'use strict';
class View{

  constructor(){
    this.currentDate = new Date();
    
    this.metadata={
      color:{
        tickMinutes: 'rgb(71 85 105)', 
        tickHours : 'rgb(30 41 59)',
        text: 'rgb(71 85 105)',
        needleStokeHours: 'rgb(20 83 45)', 
        needleStokeMinutes: 'rgb(22 101 52)', 
        needleStokeSeconds: 'rgb(245 158 11)', 
        backgroundClock: 'rgb(214 211 209)',
        outlineClock : 'rgb(5 46 22)', 
      },  
      canvasHoursClock:{
        elapsedTime : (this.currentDate.getHours() % 12)+ (this.currentDate.getMinutes()/60),
        // elapsedTime : 0,
        minuteMarksWidth: 3,
        hourMarksWidth: 3,
        needle:{
          width: 10,
          x: 80
        },        
        text:{
          fontSize: '1.2rem',
          x : 60,
          y : 60
        },
      },
      canvasMinutesClock:{
        elapsedTime : this.currentDate.getMinutes(),
        // elapsedTime : 0,
        minuteMarksWidth: 2,
        hourMarksWidth: 2,
        needle:{
          width: 5,
          x: 50
        },        
        text:{
          fontSize: '1.5rem',
          x : 7,
          y : 27
        },
      },

      canvasSecondsClock:{
        elapsedTime : this.currentDate.getSeconds(),
        minuteMarksWidth: 1,
        hourMarksWidth: 2,
        needle:{
          width: 3,
          x: 30
        },  
        text:{
          fontSize: '1.5rem',
          x : 15,
          y : 25
        },
      },
      canvasMillisecondsClock:{
        elapsedTime : 0,
        minuteMarksWidth: 1,
        hourMarksWidth: 1,
        needle:{
          width: 2,
          x: 10
        },  
        text:{
          fontSize: '1.3rem',
          x : 20,
          y : 25
        },
      },
    }

  // fetching DOM 
    this.clock = document.querySelector('canvas#clock');


  // initially drawing on screen the stop watches
    this.drawStopWatchInitialState();

  // Keeping track of interval IDs     
    this.intervalsIDs ={
      canvasMillisecondsClock:null,
      canvasSecondsClock:null,
      canvasMinutesClock:null,
      canvasHoursClock:null,
    };



    // Start watch
    this.startWatch();
  }

  drawStopWatchInitialState(){
    this.generateClock(this.clock);
  }

  startWatch(){
    this.intervalsIDs.clock = setInterval(()=>{
      this.generateClock(this.clock, 'clock');
    },1000);  

  }

  stopWatch(){    
      clearInterval( this.intervalsIDs.clock);
  }



  generateClock(canvas){
    // Checking for support
    if(canvas.getContext){    
      // Getting canvas dimensions
        let canvasWidth= Number(canvas.getAttribute('width'));
        let canvasHeight= Number(canvas.getAttribute('height'));

      // initializing
        let ctx = canvas.getContext('2d'); 
        // console.log(canvasWidth, canvasHeight);
        ctx.save();
        ctx.globalAlpha = 1; 
        ctx.clearRect(0, 0, canvasWidth, canvasHeight); // clearing canvas            
        ctx.translate(canvasWidth/2, canvasHeight/2); // translate to center of canvas
        ctx.scale(1,1); // scale set to 100%
        ctx.rotate(-Math.PI / 2); // to set 12/24 at the top
        ctx.strokeStyle = "red";
        ctx.fillStyle = "red";
        ctx.lineWidth = 8;
        ctx.lineCap = "round";
        // ctx.restore();

      // background circle
          ctx.save();
          ctx.fillStyle = this.metadata.color.backgroundClock;
          ctx.strokeStyle = this.metadata.color.outlineClock;
          ctx.lineWidth = 14;
          ctx.beginPath();
          // ctx.moveTo(0,0);  
          ctx.rotate(0);        
          ctx.arc(0,0, Math.floor(canvasHeight/2)-10, 360, 1, true);
          ctx.fill();
          ctx.stroke();
          ctx.restore();

      // Drawing minute marks     
          ctx.save();            
          ctx.strokeStyle = this.metadata.color.tickMinutes;
          ctx.lineWidth = this.metadata['canvasHoursClock'].minuteMarksWidth;  
                 
          for(let i=0; i<60; i++){
            if(i%5 !== 0){ // interval of 5 minutes             
              ctx.beginPath();
              ctx.moveTo((canvasHeight/2)-30, 0);
              ctx.lineTo((canvasWidth/2)-25, 0);
              ctx.stroke();              
            }
            ctx.rotate(Math.PI / 30); // by 6 deg
          }
          ctx.restore();


      // Drawing hours marks
          ctx.save();
          ctx.strokeStyle = this.metadata.color.tickHours;
          ctx.lineWidth = this.metadata['canvasHoursClock'].hourMarksWidth; 
          for(let i=0; i<12; i++){        
              ctx.beginPath();
              ctx.rotate(Math.PI / 6); // by 30 deg
              ctx.moveTo((canvasHeight/2)-40, 0);
              ctx.lineTo((canvasWidth/2)-25, 0);
              ctx.stroke();        
          }                
          ctx.restore();
    
      // drawing hours hand
        ctx.save(); 
        let clockType = 'canvasHoursClock';
        ctx.fillStyle = this.metadata.color.needleStokeHours;
        ctx.strokeStyle = this.metadata.color.needleStokeHours; 
        ctx.lineWidth = this.metadata[clockType].needle.width;       
        ctx.rotate((Math.PI/180) * (6 * this.metadata[clockType].elapsedTime) *5);         
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo((canvasWidth/2)-this.metadata[clockType].needle.x, 0);
        ctx.stroke();
        ctx.restore(); 

      // drawing minutes hand
        ctx.save();
        clockType = 'canvasMinutesClock';      
        ctx.fillStyle = this.metadata.color.needleStokeMinutes;
        ctx.strokeStyle = this.metadata.color.needleStokeMinutes; 
        ctx.lineWidth = this.metadata[clockType].needle.width;        
        ctx.rotate((Math.PI/180) * (6 * this.metadata[clockType].elapsedTime));         
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo((canvasWidth/2)-this.metadata[clockType].needle.x, 0);
        ctx.stroke();    
        ctx.restore(); 
        
      // drawing seconds hand
        // ctx.save()      
        clockType = 'canvasSecondsClock';        
        ctx.fillStyle = this.metadata.color.needleStokeSeconds;
        ctx.strokeStyle = this.metadata.color.needleStokeSeconds; 
        ctx.lineWidth = this.metadata[clockType].needle.width;  
        ctx.rotate((Math.PI/180) * (6 * this.metadata[clockType].elapsedTime));         
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo((canvasWidth/2)-this.metadata[clockType].needle.x, 0);
        ctx.stroke();                     
        ctx.restore();
        
  

      // Resetting 
        if(this.metadata['canvasSecondsClock'].elapsedTime >= 60){
          this.metadata['canvasSecondsClock'].elapsedTime = 0;
             
        }

        if(this.metadata['canvasMinutesClock'].elapsedTime >= 60){
          this.metadata['canvasMinutesClock'].elapsedTime = 0;                  
        }
        
        if(this.metadata['canvasHoursClock'].elapsedTime > 12){
          this.metadata['canvasHoursClock'].elapsedTime = 1;
        }else if(this.metadata['canvasHoursClock'].elapsedTime ===0){
          this.metadata['canvasHoursClock'].elapsedTime = 12;
        }
        
      
        // this.metadata['canvasHoursClock'].elapsedTime = this.metadata['canvasMinutesClock'].elapsedTime/60;
      

  
       


      // writing elapsed seconds                    
        // ctx.save();                              
        ctx.fillStyle = this.metadata.color.text;
        clockType= 'canvasHoursClock';
        // ctx.rotate(Math.PI/2);
        ctx.font = `bold ${this.metadata[clockType].text.fontSize} Roboto`; 
        let AMorPM = this.currentDate.getHours() >=12 ? 'PM' : 'AM';
        let elapsedTime =  `${Math.floor(this.metadata['canvasHoursClock'].elapsedTime)} : ${Math.floor(this.metadata['canvasMinutesClock'].elapsedTime)} : ${this.metadata['canvasSecondsClock'].elapsedTime} ${AMorPM}`;
        // ctx.save();
        ctx.globalAlpha = 1;
        ctx.fillText(elapsedTime, (canvasWidth/2)- this.metadata[clockType].text.x, (canvasHeight/2)+ this.metadata[clockType].text.y);        
       
        // ctx.fillText(elapsedTime, -75,50);        
                     
        // ctx.restore();
        // ctx.restore();
        // // updating time
        this.metadata['canvasSecondsClock'].elapsedTime +=1;       
        this.metadata['canvasMinutesClock'].elapsedTime +=1/60;       
        this.metadata['canvasHoursClock'].elapsedTime +=1/3600; 
    
        
        

      }
          
      }
  
  
  }  

