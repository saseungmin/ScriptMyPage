
var v_tblName="memTable";
var v_memData =[];
var sessionTable =[];
var sessionM = {};
var session;
var table="session";





window.onload = function(){

    var v_objStr = localStorage.getItem(v_tblName); 
    if(v_objStr){
       v_memData = JSON.parse(v_objStr);  // return한 값이 배열!
       console.log(v_memData);  // 값 확인!    
   }

    session = sessionStorage.getItem(table); 
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



   
   $(document).ready(function(){
       if(session){
            swal({
                content: {
                  element: "input",
                  attributes: {
                    placeholder: "비밀번호를 입력하세요.",
                    type: "password",
                  },
                },
              }).then((value) => {
                  if(sessionTable[0].password==value){ 


                    for(var i=0;i<v_memData.length;i++){
                        if(sessionTable[0].id==v_memData[i].id){
                            $("#memberTitle").text(v_memData[i].name+" 님의 회원정보");
                            $("#memberName").text(" "+v_memData[i].name);
                            $("#memberId").text(" "+v_memData[i].id);
                            $("#memberNumber").text(" "+v_memData[i].number);
                            $("#memberEmail").text(" "+v_memData[i].email);
                            $('#myImage').attr("src",v_memData[i].img);
                            $('#memberAddress').text(" "+v_memData[i].userAddress)
                        
                        }
                    }

                    $("#id_file").on("change",function(){
                        var v_file = document.getElementById("id_file").files[0];
                        var v_formData = new FormData(); // 이름=값 형식으로 보내기 위한 form
                        v_formData.append("fileToUpload",v_file);
                        
                        $.ajax({
                        method:"post", // 파일업로드는 무조건 post
                        url: "../php/uploads.php",
                        // data에 파일 객체를 넘겨줘야 함
                        data: v_formData, // 생성된 file데이타가 포함된 FormData를 붙여준다
                        cache: false, // 필수는 아니고 추천
                        // 파일업로드 구현시에는 꼭 cotentType과 processData속성을 false로
                        contentType:false, // 전송데이타 인코딩 방식 url-encoded, 생략가능
                        processData: false, // 전송데이타를 자동으로 url-encoded 방식으로 바꿈, 생략가능
                        success:function(p_result){
                            for(var i=0;i<v_memData.length;i++){
                                if(sessionTable[0].id==v_memData[i].id){
                                    v_memData[i].img=p_result;
                                    v_objStr = JSON.stringify(v_memData);  
                                    localStorage.setItem(v_tblName,v_objStr);
            
                                    $('#myImage').attr("src",v_memData[i].img);
                                }
                               
                            }
            
                        }
                        });
                    });



                  }else{
                    swal({
                        title: "비밀번호가 다릅니다.",
                        text: "비밀번호를 확인해주세요.",
                        icon: "error",
                        dangerMode: true,
                    }).then(function(){
                        window.location.href = "main.html";
                    });

                }
            });



       }
       



    });
}
