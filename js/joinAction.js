var v_tblName="memTable";
var v_memData =[];
var table="session";
var sessionTable =[];
var sessionM = {};
var cnt=0;
$(document).ready(function(){


    var userID=document.getElementById("userID");
    var userPassword1=document.getElementById("userPassword1");
    var userPassword2=document.getElementById("userPassword2");
    var userName=document.getElementById("userName");
    var userBirthdate=document.getElementById("userBirthdate");
    var userEmail=document.getElementById("userEmail");
    var userNumber=document.getElementById("userNumber");
    var userAddress=document.getElementsByName("Address");
    var termAgree=document.getElementsByName("termagree");
    var agrees=document.getElementsByName("Agree");
    var v_member = {};



    $('#signup').on('click',function() {
        if(userID.value==""){
            swal({
                text: "아이디를 입력하세요.",
                icon: "warning",
                button: "닫기"
            });        
            return false;
        }else if(userPassword1.value==""){
            swal({
                text: "비밀번호를 입력하세요.",
                icon: "warning",
                button: "닫기"
            });        
            return false;
        }else if(userPassword2.value==""){
            swal({
                text: "비밀번호 확인란을 입력하세요.",
                icon: "warning",
                button: "닫기"
            });
            return false;
        }else if(userName.value==""){
            swal({
                text: "이름을 입력하세요.",
                icon: "warning",
                button: "닫기"
            });        
            return false;
        }else if(userBirthdate.value==""){
            swal({
                text: "생년월일을 입력하세요.",
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
        }else if(userAddress[0].value=="" || userAddress[1].value=="" || userAddress[2].value==""){
            swal({
                text: "주소를 입력하세요.",
                icon: "warning",
                button: "닫기"
            });                    
            return false;
        }else if(userNumber.value==""){
            swal({
                text: "휴대번호를 입력하세요.",
                icon: "warning",
                button: "닫기"
            });                   
            return false;
        }else if(!termAgree[0].checked){
            swal({
                text: "약관에 동의하세요.",
                icon: "warning",
                button: "닫기"
            });                    
            return false;
        }


        if(userPassword1.value.length<8){
            swal({
                text: "비밀번호를 8자리 이상 입력하세요.",
                icon: "error",
                button: "닫기"
            });                    
            return false;
        }
        if(userPassword1.value!=userPassword2.value){
            swal({
                text: "비밀번호가 서로 다릅니다.",
                icon: "error",
                button: "닫기"
            });              
            return false;
        }
        if(userNumber.value.indexOf('-')>0){
            swal({
                text: "전화번호란에 - 를 빼고 입력하세요.",
                icon: "error",
                button: "닫기"
            });           
            return false;
        }
        if(isNaN(userNumber.value)){
            swal({
                text: "전화번호를 숫자로 입력하세요.",
                icon: "error",
                button: "닫기"
            });              
            return false;
        }

        var str = "";
        cnt++;
        v_member.priKey = cnt;
        v_member.id=userID.value;
        v_member.password=userPassword1.value;
        v_member.name=userName.value;
        v_member.birth=userBirthdate.value;
        v_member.email=userEmail.value;
        v_member.img="http://placehold.it/300x300";
        for(var i=0;i<userAddress.length;i++){
            if(i==0){
                 v_member.userPostCode=userAddress[0].value;
            }else{
                str +=userAddress[i].value;

            }
        }
        v_member.userAddress = str;
        v_member.number=userNumber.value;
        for(var i=0;i<agrees.length;i++){
            if(agrees[i].checked){
                if(i==0){
                    v_member.emailagree=agrees[i].value;
                }else if(i==1){
                    v_member.smsagree=agrees[i].value;
                }
            }else{
                if(i==0){
                    v_member.emailagree=null;
                }else if(i==1){
                    v_member.smsagree=null;
                }
            }
        }

        swal({
            title: "회원가입 하시겠습니까?",
            text: "입력정보가 정확한지 확인하세요.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((ok) => {
            if (ok) {
                v_member.tAgree=termAgree[0].value;
                v_memData.push(v_member);
                v_objStr = JSON.stringify(v_memData);  
                localStorage.setItem(v_tblName,v_objStr);
        
              swal({
                title: "회원가입이 완료되었습니다.",
                text: "로그인 창으로 이동합니다.",
                icon: "success",
              }).then(function(){
                window.location.href = "login.html";
            });       
            return true;
            }
        });
                

    });
});


    //페이지 로딩후 최초 자동 실행블락 곧 초기화 루틴
    window.onload = function(){
        var v_objStr = localStorage.getItem(v_tblName); 
         if(v_objStr){
            v_memData = JSON.parse(v_objStr);  // return한 값이 배열!
            cnt =v_memData.length;
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

    //8자 이하
    var bad = /(?=.{8,}).*/;
    //숫자와 영어8자이상
    var good = /^(?=\S*?[a-z])(?=\S*?[0-9])\S{8,}$/;
    //적어도 하나의 대문자, 소문자 및 (숫자 또는 특수 문자)를 포함.
    var better = /^(?=\S*?[A-Z])(?=\S*?[a-z])((?=\S*?[0-9])|(?=\S*?[^\w\*]))\S{8,}$/;
    // 적어도 하나의 대문자, 소문자 및 (숫자와 하나의 특수 문자)를 포함.
    var best = /^(?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9])(?=\S*?[^\w\*])\S{8,}$/;
    
    $('#userPassword1').on('keyup', function () {
        var password = $(this);
        var pass = password.val();
        var passLabel = $('[for="userPassword1"]');
        var stength = 'Weak';
        var pclass = 'danger';
        if (best.test(pass) == true) {
            stength = '매우 안전';
            pclass = 'success';
        } else if (better.test(pass) == true) {
            stength = '안전';
            pclass = 'warning';
        } else if (good.test(pass) == true) {
            stength = '보통';
            pclass = 'warning';
        } else if (bad.test(pass) == true) {
            stength = '약함';
        } else {
            stength = '매우 약함';
        }
    
        var popover = password.attr('data-content', stength).data('bs.popover');
        popover.setContent();
        popover.$tip.addClass(popover.options.placement).removeClass('danger success info warning primary').addClass(pclass);
    
    });
    
    $('input[data-toggle="popover"]').popover({
        placement: 'top',
        trigger: 'focus'
    });
    
    $('#userID').on('keyup',function(){
        for(var i=0; i<v_memData.length; i++){
            if(v_memData[i].id==userID.value){
                document.getElementById("idhelp").innerHTML="이미 아이디가 가입되어있습니다.";
                return false;
            }else{
                document.getElementById("idhelp").innerHTML="";
            }
        }
    });
    $('#userEmail').on('keyup',function(){
        for(var i=0; i<v_memData.length; i++){
            if(v_memData[i].email==userEmail.value){
                document.getElementById("emailhelp").innerHTML="이미 이메일이 등록되었습니다.";
                return false;
            }else{
                document.getElementById("emailhelp").innerHTML="";
            }
        }
    });
});


    function getAddr() {
        new daum.Postcode({
            oncomplete: function(data) {
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                var addr = ''; // 주소 변수
                var extraAddr = ''; // 참고항목 변수

                //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                    addr = data.roadAddress;
                } else { // 사용자가 지번 주소를 선택했을 경우(J)
                    addr = data.jibunAddress;
                }

                // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
                if(data.userSelectedType === 'R'){
                    // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                    if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                        extraAddr += data.bname;
                    }
                    // 건물명이 있고, 공동주택일 경우 추가한다.
                    if(data.buildingName !== '' && data.apartment === 'Y'){
                        extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                    if(extraAddr !== ''){
                        extraAddr = ' (' + extraAddr + ')';
                    }
                    // 조합된 참고항목을 해당 필드에 넣는다.
                    var extraAddr1=extraAddr;
                
                } else {
                    document.getElementById("userAddress1").value = '';
                }

                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                document.getElementById('userAddress').value = data.zonecode;
                document.getElementById("userAddress1").value = addr+extraAddr1;
                // 커서를 상세주소 필드로 이동한다.
                document.getElementById("userAddress2").focus();
            }
        }).open();
    }

    if ('WebSocket' in window) {
		(function () {
			function refreshCSS() {
				var sheets = [].slice.call(document.getElementsByTagName("link"));
				var head = document.getElementsByTagName("head")[0];
				for (var i = 0; i < sheets.length; ++i) {
					var elem = sheets[i];
					var parent = elem.parentElement || head;
					parent.removeChild(elem);
					var rel = elem.rel;
					if (elem.href && typeof rel != "string" || rel.length == 0 || rel.toLowerCase() == "stylesheet") {
						var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, '');
						elem.href = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_cacheOverride=' + (new Date().valueOf());
					}
					parent.appendChild(elem);
				}
			}
			var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
			var address = protocol + window.location.host + window.location.pathname + '/ws';
			var socket = new WebSocket(address);
			socket.onmessage = function (msg) {
				if (msg.data == 'reload') window.location.reload();
				else if (msg.data == 'refreshcss') refreshCSS();
			};
			if (sessionStorage && !sessionStorage.getItem('IsThisFirstTime_Log_From_LiveServer')) {
				console.log('Live reload enabled.');
				sessionStorage.setItem('IsThisFirstTime_Log_From_LiveServer', true);
			}
		})();
	}
	else {
		console.error('Upgrade your browser. This Browser is NOT supported WebSocket for Live-Reloading.');
	}