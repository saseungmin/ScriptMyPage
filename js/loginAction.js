var v_tblName="memTable";
var table="session";
var sessionTable =[];
var sessionM = {};
var v_memData =[];

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

$(document).ready(function(){
    var userID=document.getElementById("userID");
    var password=document.getElementById("userPassword");

    // 저장된 쿠키값을 가져와서 ID 칸에 넣어준다. 없으면 공백으로 들어감.
    var key = getCookie("key");
    $("#userID").val(key); 
     
    if($("#userID").val() != ""){ // 그 전에 ID를 저장해서 처음 페이지 로딩 시, 입력 칸에 저장된 ID가 표시된 상태라면,
        $("#rememberuserID").attr("checked", true); // ID 저장하기를 체크 상태로 두기.
    }
     
    $("#rememberuserID").change(function(){ // 체크박스에 변화가 있다면,
        if($("#rememberuserID").is(":checked")){ // ID 저장하기 체크했을 때,
            setCookie("key", $("#userID").val(), 7); // 7일 동안 쿠키 보관
        }else{ // ID 저장하기 체크 해제 시,
            deleteCookie("key");
        }
    });
     
    // ID 저장하기를 체크한 상태에서 ID를 입력하는 경우, 이럴 때도 쿠키 저장.
    $("#userID").keyup(function(){ // ID 입력 칸에 ID를 입력할 때,
        if($("#rememberuserID").is(":checked")){ // ID 저장하기를 체크한 상태라면,
            setCookie("key", $("#userID").val(), 7); // 7일 동안 쿠키 보관
        }
    });
    $('#login').on('click',function() {
        if(userID.value==""){
            swal({
                text: "아이디를 입력하세요.",
                icon: "warning",
                button: "닫기"
            });        
            return false;
        }
        if(password.value==""){
            swal({
                text: "비밀번호를 입력하세요.",
                icon: "warning",
                button: "닫기"
            });        
            return false;
        }

        if(v_memData==""){
            swal({
                text: "회원가입 후 로그인해주세요.",
                icon: "error",
                button: "확인"
            }).then(function(){
                window.location.href = "join.html";
            });      
            return false;   
        }
        for(var i=0;i<v_memData.length;i++){
            if(v_memData[i].id==userID.value && v_memData[i].password==password.value){
                sessionM.id=userID.value;
                sessionM.password=password.value;
                sessionTable.push(sessionM);
                session = JSON.stringify(sessionTable);  
                sessionStorage.setItem(table,session);
                swal({
                    title:"success!",
                    text: "로그인되셨습니다.",
                    icon: "success",
                    button: "확인"
                }).then(function(){
                    window.location.href = "main.html";
                });       
                return true;
            }   
        }
        for(var i=0;i<v_memData.length;i++){
            if(v_memData[i].id==userID.value){
                if(v_memData[i].password!=password.value){
                    swal({
                        text: "비밀번호가 다릅니다.",
                        icon: "error",
                        button: "닫기"
                    });                   
                    return false;
                }
            }
        }
        for(var i=0;i<v_memData.length;i++){
            if(v_memData[i].id!=userID.value){
                swal({
                    text: "등록된 아이디가 없습니다.",
                    icon: "error",
                    button: "닫기"
                });   
                return false;
            }
        }
    });
});

 
function setCookie(cookieName, value, exdays){
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var cookieValue = escape(value) + ((exdays==null) ? "" : "; expires=" + exdate.toGMTString());
    document.cookie = cookieName + "=" + cookieValue;
}
 
function deleteCookie(cookieName){
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() - 1);
    document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString();
}
 
function getCookie(cookieName) {
    cookieName = cookieName + '=';
    var cookieData = document.cookie;
    var start = cookieData.indexOf(cookieName);
    var cookieValue = '';
    if(start != -1){
        start += cookieName.length;
        var end = cookieData.indexOf(';', start);
        if(end == -1)end = cookieData.length;
        cookieValue = cookieData.substring(start, end);
    }
    return unescape(cookieValue);
}
