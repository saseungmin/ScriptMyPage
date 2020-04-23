var v_tblName="memTable";
var v_memData =[];
var table="session";
var sessionTable =[];
var sessionM = {};

    $(document).ready(function(){
        var userName=document.getElementById("userName");
        var userEmail=document.getElementById("userEmail");
        var userNumber=document.getElementById("userNumber");
        var userbrith=document.getElementById("userbrith");

        $('#findId').on('click',function() {
            if(userName.value==""){
                swal({
                    text: "이름을 입력하세요.",
                    icon: "warning",
                    button: "닫기"
                  });
                return false;
            }else if(userEmail.value==""){
                swal({
                    text: "이메일을 입력하세요.",
                    icon: "warning",
                    button: "닫기"
                  });        
                return false;
            }else if(userNumber.value==""){
                swal({
                    text: "휴대전화번호를 입력하세요.",
                    icon: "warning",
                    button: "닫기"
                  });        
                return false;
            }else if(userbrith.value==""){
                swal({
                    text: "생년월일을 입력하세요.",
                    icon: "warning",
                    button: "닫기"
                  });        
                return false;
            }
            for(var i=0;i<v_memData.length;i++){

                if(userName.value==v_memData[i].name && userEmail.value==v_memData[i].email && userNumber.value==v_memData[i].number && userbrith.value==v_memData[i].birth){

                    swal({
                        title: "Success!",
                        text: userName.value+"님의 아이디는 "+v_memData[i].id+"입니다.",
                        icon: "success",
                        }).then(function(){
                                window.location.href = "login.html";
                        });
                    return true;
                }
            }
                    for(var i=0;i<v_memData.length;i++){
            if(userName.value!=v_memData[i].name || userEmail.value!=v_memData[i].email || userNumber.value!=v_memData[i].number || userbrith.value!=v_memData[i].birth){
                swal({
                    title: "정보가 맞지 않습니다.",
                    text: "다시 확인해주세요.",
                    icon: "error",
                    button: "확인"
                  });                        
                  return false;
            }
        }
        });

    });
    
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
     this.document.getElementById('logout_li').style.display = 'none';
     this.document.getElementById('login_li').style.display = 'block';
     this.document.getElementById('userSetting').style.display = 'none';
    }
}