class View{
  constructor(){
    this.metadata={
      canvasMinutesClock:{
        minuteMarksWidth: 2,
        hourMarksWidth: 4,
        needle:{
          width: 7,
          x: 20
        },        
        text:{
          fontSize: '1.5rem',
          x : 11,
          y : 35
        },
      },
      canvasSecondsClock:{
        minuteMarksWidth: 2,
        hourMarksWidth: 3,
        needle:{
          width: 5,
          x: 20
        },  
        text:{
          fontSize: '1.3rem',
          x : 15,
          y : 30
        },
      },
      canvasMillisecondsClock:{
        minuteMarksWidth: 1,
        hourMarksWidth: 2,
        needle:{
          width: 3,
          x: 20
        },  
        text:{
          fontSize: '1rem',
          x : 20,
          y : 25
        },
      },
    }

    this.canvasMillisecondsClock = document.querySelector('canvas#canvasMillisecondsClock');
    this.canvasSecondsClock = document.querySelector('canvas#canvasSecondsClock');
    this.canvasMinutesClock = document.querySelector('canvas#canvasMinutesClock');
    this.generateClock(this.canvasMillisecondsClock, 'canvasMillisecondsClock');
    this.generateClock(this.canvasSecondsClock, 'canvasSecondsClock');
    this.generateClock(this.canvasMinutesClock, 'canvasMinutesClock');

    this.stopButton = document.querySelector('button#stop');
    this.intervalID = setInterval((seconds)=>{
      this.generateClock(this.canvasMillisecondsClock, 'canvasMillisecondsClock');
      this.generateClock(this.canvasSecondsClock, 'canvasSecondsClock');
      this.generateClock(this.canvasMinutesClock, 'canvasMinutesClock');
    },1);    
    stopButton.addEventListener('click', ()=>{
      clearInterval(this.intervalID);
    });    

  }

  generateClock(canvas, clockType='canvasMillisecondsClock'){
    // Checking for support
    if(canvas.getContext){    
      // Getting canvas dimensions
        let canvasWidth= Number(canvas.getAttribute('width'));
        let canvasHeight= Number(canvas.getAttribute('height'));

      // initializing
        let ctx = canvas.getContext('2d'); 
        ctx.save();      
        ctx.clearRect(0, 0, canvasWidth, canvasHeight); // clearing canvas
        ctx.translate(canvasWidth/2, canvasHeight/2); // translate to center of canvas
        ctx.scale(1,1); // scale set to 100%
        ctx.rotate(-Math.PI / 2); // to set 12/24 at the top
        ctx.strokeStyle = "black";
        ctx.fillStyle = "white";
        ctx.lineWidth = 8;
        ctx.lineCap = "round";
  
      // Drawing minute marks
        // ctx.save();
        // console.log(this.metadata)
        ctx.lineWidth = this.metadata[clockType].minuteMarksWidth; 
          for(let i=0; i<60; i++){
            if(i%5 !== 0){ // interval of 5 minutes
              ctx.beginPath();
              ctx.moveTo((canvasHeight/2)-5, 0);
              ctx.lineTo((canvasWidth/2), 0);
              ctx.stroke();
            }
            ctx.rotate(Math.PI / 30); // by 6 deg
          }
    
      // Drawing hours marks
        // ctx.save();
        ctx.lineWidth = this.metadata[clockType].hourMarksWidth; 
          for(let i=0; i<12; i++){        
              ctx.beginPath();
              ctx.rotate(Math.PI / 6); // by 30 deg
              ctx.moveTo((canvasHeight/2)-10, 0);
              ctx.lineTo((canvasWidth/2), 0);
              ctx.stroke();        
          }      
    
    
      // drawing hand/needle
        ctx.fillStyle = "black"; 
        ctx.rotate((Math.PI/180) * (6 * seconds));
        seconds +=1;
        ctx.lineWidth = this.metadata[clockType].needle.width;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo((canvasWidth/2)-this.metadata[clockType].needle.x, 0);
        ctx.stroke();
        ctx.restore();
        // writing elapsed seconds                              
          ctx.font=`bold ${this.metadata[clockType].text.fontSize} Roboto`;
          ctx.fillStyle='blue';
          ctx.fillText(seconds, (canvasWidth/2)- this.metadata[clockType].text.x, (canvasHeight/2)+ this.metadata[clockType].text.y);
          ctx.stroke();                
      }
  
  
  }  

}