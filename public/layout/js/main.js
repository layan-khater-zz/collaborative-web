
////////////backend//////
$(function()
{
    //clear placeholder after focus
    $('[placeholder]').focus(function()
    {
        $(this).attr('data-set',$(this).attr('placeholder'));
        $(this).attr('placeholder',' ');
    }).blur(function()
    {

        $(this).attr('placeholder',$(this).attr('data-set'));

    });

 

  
    


    $(".sign-in").click(function(){
        $("#id01").css("display","block");
        
        
     });
     $(".sign-up").click(function(){
        $("#id02").css("display","block");
        
        
     });
    
     
    
 


    
    /*==================================================================
    [ Show pass ]*/
    var showPass = 0;
    $('.btn-show-pass').on('click', function(){
        if(showPass == 0) {
            $(this).next('input').attr('type','text');
            $(this).addClass('active');
            showPass = 1;
        }
        else {
            $(this).next('input').attr('type','password');
            $(this).removeClass('active');
            showPass = 0;
        }
        
    });
            
     
    
     
    
     
    
});
