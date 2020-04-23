$(document).ready(function(){

    $('#boardmain,#clickmain1,#clickmain2,#clickboard,#login_li,#join_li,#userSetting,#agree_li,#footMain,#footBoard,#footLogin').on('click',function(){
        condata.splice(0,1);
        conobj = JSON.stringify(condata);  
        localStorage.setItem(contable,conobj);
        window.location.href = "board.html";
    
    
    });


    
});

