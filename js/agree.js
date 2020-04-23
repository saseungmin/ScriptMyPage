var v_tblName="memTable";
var v_memData =[];
var table="session";
var sessionTable =[];
var sessionM = {};

    
//페이지 로딩후 최초 자동 실행블락 곧 초기화 루틴
window.onload = function(){
    var v_objStr = localStorage.getItem(v_tblName); 
        if(v_objStr){
        v_memData = JSON.parse(v_objStr);  // return한 값이 배열!
        console.log(v_memData);  // 값 확인!
    }
    var session = sessionStorage.getItem(table); 
    if(session){
       sessionTable = JSON.parse(session);  // return한 값이 배열!
       this.document.getElementById('logout_li').style.display = 'block';
       this.document.getElementById('login_li').style.display = 'none';
       $('#users').text(this.sessionTable[0].id+"님 환영합니다.");
       $('#join_li').prop('class', 'disabled');
       $('li.disabled a').click(function(){
           return false;
       })

       console.log(sessionTable);  // 값 확인!
   }else{
    this.document.getElementById('userSetting').style.display = 'none';
    this.document.getElementById('logout_li').style.display = 'none';
    this.document.getElementById('login_li').style.display = 'block';
   }
}