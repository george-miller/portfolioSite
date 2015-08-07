var prevMouse = false;

    $(document).ready(function(){

      $("#expandWidth").css('width', '100%');
      $("#expandWidthFade").delay(300).fadeIn(500);



      $("#slideDown").delay(1000).slideDown();
      var i = 0;
      for (;i < 40; i++){
        $(".wrapper").append("<div class='circle' id='circle" + i + "' style='background-color:rgba(" + Math.round(Math.random()) + "," + Math.round(150*Math.random()) + "," + Math.round(200*Math.random()) + ", .8);'></div>");
      }

      $(".circle").mousemove(function(event){
        
        var offset = [prevMouse[0] - event.pageX ,  prevMouse[1] - event.pageY];
        prevMouse = [event.pageX, event.pageY];
        if (offset[0] < 30 && offset[1] < 30){
          $(this).css({
            top:  Math.round($(this).css('top').replace(/[^-\d\.]/g, '') - offset[1]/1.4),
            left: Math.round($(this).css('left').replace(/[^-\d\.]/g, '') - offset[0]/1.4)
          });
        }
     
      
      });
      $(".circle").mouseleave(function(){
        prevMouse = false;
      });
     
    });