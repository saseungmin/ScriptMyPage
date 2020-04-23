var v_tblName="memTable";
var v_memData =[];
var table="session";
var sessionTable =[];
var sessionM = {};
var session;
var boarddata =[];
var boardtable="boardTable";
var btabelstr="";
var board = {};
var cntb=1;

var commentdata =[];
var commenttable="commettable";
var comment = {};

var searchBox=[];
var condata =[];
var contable="contentsTable";
var con = {};
var count=0;
var boardcnt=0;
var contentscnt=0;
var bocnt=0;

var searchData =[];
var searchTable="searchTable";
//페이지 로딩후 최초 자동 실행블락 곧 초기화 루틴
window.onload = function(){

    var commentobj = localStorage.getItem(commenttable); 
    if(commentobj){
    commentdata = JSON.parse(commentobj);  // return한 값이 배열!
    count=commentdata.length;
    console.log(commentdata);  // 값 확인!
    }
    var searchObj=localStorage.getItem(searchTable);
    if(searchObj){
        searchData = JSON.parse(searchObj);  
        console.log(searchData); 
    }
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
   var boardobj = localStorage.getItem(boardtable); 
   if(boardobj){
       boarddata = JSON.parse(boardobj);  // return한 값이 배열!
       if(boarddata==null){
            bocnt=0;
       }else{
            bocnt =searchData.length;
       }
       console.log(boarddata);  // 값 확인!
   }
   var conobj = localStorage.getItem(contable); 
   if(conobj){
        condata = JSON.parse(conobj);  // return한 값이 배열!
        if(condata!=""){
            $('#boardCtitle').val(condata[0].title);
            $('#boardCname').val(condata[0].id);
            $('#boardCcontents').val(condata[0].contents);
            var str="최종 수정일 : "
            str+=condata[0].date;
            $('#boardDate').text(str.replace("<br>","\n"));
            
        }
   }
   $('#total').text("Total:"+bocnt);
   var myBox = localStorage.getItem("searchBox"); 
   if(myBox){
        myBoxData = JSON.parse(myBox);
        if(myBoxData!=""){
            $("select[name=searchSelect]").val(myBoxData[0]);
            $("#searchBoard").val(myBoxData[1]);  
        }
    }
}



$(document).ready(function(){
    if(session){
        $("#conmentuser").val(sessionTable[0].id);
    }
    
    $("#conmentsumit").on("click",function(){
        if(session){
            var conten=$("#conmentcon").val();
            var str=""
            var date=new Date();
            str+= date.getFullYear()+"-"+date.getMonth()+1+"-"+("0"+date.getDate()).slice(-2);
            if(conten==""){
                swal({
                    text: "댓글 내용을 입력하세요.",
                    icon: "warning",
                    buttons: '확인',
                  })
                  return false;

            }else{
                swal({
                    title: "댓글을 등록하시겠습니까?",
                    icon: "info",
                    buttons: ['닫기','확인'],
                  }).then((ok) => {
                    if (ok) {
                      swal({
                        text: "등록되었습니다.",
                        icon: "success",
                      }).then(function(){
                        for(var i=0; i<boarddata.length;i++){
                            if(condata[0].num==boarddata[i].num){

                                comment.num=count++;           
                                comment.user=sessionTable[0].id;
                                comment.contents=conten;
                                comment.date=str;
                                comment.sequnce=boarddata[i].num;
                                commentdata.push(comment); 
                                commentobj = JSON.stringify(commentdata);  
                                localStorage.setItem(commenttable,commentobj);

                            }
                        }

                        location.reload();
                      })
                    }
                });
            }             
        }else{
            swal({
                title: "로그인 후 이용가능합니다.",
                icon: "error",
                buttons: "확인",
            })
        }

    })


    $(function(){ 
        if($('body').is('#contentsbody')){ 
            var conthis;
            var commentCnt=1;
            var conarr = new Array();
            for(var i=0; i< Object.keys(commentdata).length; i++){
                conarr.push(parseInt(Object.keys(commentdata)[i])+1);
            }
            for(var i=0;i<commentdata.length;i++){
    
                // if(Object.keys(commentdata).length-1<contentscnt){
                //     contentscnt=0;
                // }

                if(condata[0].num==commentdata[i].sequnce){

                    commentdata[i].num=commentCnt++;
                    localStorage.setItem(commenttable , JSON.stringify(commentdata));
                    conthis = $('<div name="contentsdiv"/>');
                    conthis.append(' <div class="form-group"><div class="col-sm-3 control-label"></div><div class="col-sm-5 control-label"><p class="text-left" name="summitUser">'+commentdata[i].num+"."+commentdata[i].user+".("+ commentdata[i].date+")"+'</p> </div></div>');
                    conthis.append('<div class="form-group"><div class="col-sm-3 control-label"></div><div class="col-sm-5 control-label"><p class="text-left" name="summitContents">'+commentdata[i].contents+'</p></div></div>');
                    conthis.append('<div class="form-group"><div class="col-sm-6 control-label"> <button type="button" class="btn btn-warning"  name="conmentupdate" data-toggle="modal" data-target="#updatemodal" >수 정</button> <button type="button" class="btn btn-danger"  name="conmentdelete" >삭 제</button> </div></div> <hr>');
                    $("#nextthis").append(conthis);

                }
                
                
    
            }

            $("button[name='conmentupdate']").on("click",function(){


                var updatestr=$(this).parent().parent().eq(0).prev().prev().children().next().children().text();
                var updateid=updatestr.split('.');
                var upstr=$(this).parent().parent().eq(0).prev().children().next().children().text();
                $("#updatename").text(updateid[1]);
                $("#updateContents").val(upstr);
                console.log(updateid);
                if(session){
                    if(updateid[1]==sessionTable[0].id){
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
                                $("#updateSumit").on("click",function(){
                                    swal({
                                        text: "댓글을 수정하시겠습니까?",
                                        icon: "warning",
                                        buttons: ["닫기",true],
                                    }).then((ok) => {
                                        if (ok) {

                                            var updatedate=""
                                            var date=new Date();
                                            updatedate+= date.getFullYear()+"-"+date.getMonth()+1+"-"+("0"+date.getDate()).slice(-2);
                                            var updateC=$("#updateContents").val();

                                            if( updateC==""){
                                                swal({
                                                    text: "수정할 댓글의 내용을 입력하세요.",
                                                    icon: "error",
                                                    buttons: '확인',
                                                  })
                                                  return false;
                                            }

                                            for(var i=0;i<commentdata.length;i++){

                                                if(condata[0].num==commentdata[i].sequnce){
                                            
                                                    if(updateid[0]==commentdata[i].num){
                                                        var thisname=$("#updatename").text();
                                                        var thisContents=$("textarea#updateContents").val();
                                                        commentdata[i].user=thisname;
                                                        commentdata[i].contents=thisContents;
                                                        commentdata[i].date=updatedate;
                                                        localStorage.setItem(commenttable , JSON.stringify(commentdata));
                                                    }

                                                
                                                }
                                            }
                                            swal({
                                                title: "댓글이 수정되었습니다.",
                                                icon: "success",
                                            }).then(function(){
                                                location.reload();
                                            });       
                                        }     
                                    })
                                })
                            }else{
                                swal({
                                    title: "비밀번호가 다릅니다.",
                                    text: "비밀번호를 확인해주세요.",
                                    icon: "error",
                                    dangerMode: true,
                                })
                                $('#updatemodal').modal("hide"); 
                                return false;
                            }
                        })
                    }else{
                        swal({
                            title: "작성자가 아닙니다.",
                            text: "삭제할 수 없습니다.",
                            icon: "error",
                            dangerMode: true,
                        })
                        return false;  
                    }
                }else{
                    swal({
                        title: "로그인 후 이용가능합니다.",
                        text: "로그인페이지로 이동합니다.",
                        icon: "error",
                        buttons: "확인",
                    }).then(function(){
                        window.location.href = "login.html";
                    });

                }


            })




            $("button[name='conmentdelete']").on("click",function(){
                var deltstr=$(this).parent().parent().eq(0).prev().prev().children().next().children().text();
                var removecon=$(this).parent().parent().parent();
                var dset=deltstr.substr(0,1);
                var delid=deltstr.split('.');
                if(session){
                    if(delid[1]==sessionTable[0].id){
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
                                swal({
                                    title: "댓글을 삭제하시겠습니까?",
                                    text: "삭제 후 복원할 수 없습니다.",
                                    icon: "warning",
                                    buttons: true,
                                    dangerMode: true,
                                }).then((ok) => {
                                    if (ok) {
                                        removecon.remove();
                                        for(var i=0;i<commentdata.length;i++){

                                            if(condata[0].num==commentdata[i].sequnce){
                                            
                                                if(dset==commentdata[i].num){
                                                    commentdata.splice(i,1);
                                                    commentobj = JSON.stringify(commentdata);  
                                                    localStorage.setItem(commenttable,commentobj);
                                                }
                                            }
                                            // if(parseInt(dset)==parseInt(Object.keys(commentdata)[i])+1){
                                                
                                            //     commentdata.splice(i,1);
                                            //     commentobj = JSON.stringify(commentdata);  
                                            //     localStorage.setItem(commenttable,commentobj);
                                            // }
                                        }
                                        swal({
                                            title: "댓글이 삭제되었습니다.",
                                            icon: "success",
                                        }).then(function(){
                                            location.reload();
                                        });      
                                    }else{
                                        return false;
                                    }
                                });
                              }else{
                                swal({
                                    title: "비밀번호가 다릅니다.",
                                    text: "비밀번호를 확인해주세요.",
                                    icon: "error",
                                    dangerMode: true,
                                })
                                return false;

                              }
                            });

                    }else{
                        swal({
                            title: "작성자가 아닙니다.",
                            text: "삭제할 수 없습니다.",
                            icon: "error",
                            dangerMode: true,
                        })
                        return false;  
                    }
                }else{
                    swal({
                        title: "로그인 후 이용가능합니다.",
                        text: "로그인페이지로 이동합니다.",
                        icon: "error",
                        buttons: "확인",
                    }).then(function(){
                        window.location.href = "login.html";
                    });
                }


            })

            
       // }
    }      
});


    $('#write').on('click',function(){
        if(session){
            $("#userName").text(sessionTable[0].id);
            $("#myModal").on("hidden.bs.modal", function(){
                $("#usertitle").val("");
                $("textarea#contents").val("");

            });
        }else{
            swal({
                title: "로그인 후 이용가능합니다.",
                text: "로그인페이지로 이동합니다.",
                icon: "error",
                buttons: "확인",
            }).then(function(){
                window.location.href = "login.html";
            });  

        }

        $('#modalSumit').on('click',function(){
            var str=""
            var date=new Date();
            str+= date.getFullYear()+"-"+date.getMonth()+1+"-"+("0"+date.getDate()).slice(-2)+"<br>"+date.getHours()+"시 "+("0"+date.getMinutes()).slice(-2)+"분";
            var usertitle=$("#usertitle").val();
            var userID=$("#userName").text();
            var userContents=$("#contents").val();
            board = {};
            if(usertitle==""){
                swal({
                    text: "제목을 입력하세요.",
                    icon: "error",
                    buttons: '확인',
                  })
                  return false;
            }else if(userContents==""){
                swal({
                    text: "게시글 내용을 입력하세요.",
                    icon: "error",
                    buttons: '확인',
                  })
                  return false;
            }

            swal({
                title: "게시글을 등록하시겠습니까?",
                icon: "info",
                buttons: ['닫기','확인'],
              }).then((ok) => {
                if (ok) {
                  swal({
                    title: "등록되었습니다.",
                    text: "감사합니다.",
                    icon: "success",
                  }).then(function(){
                    var cnt=1;
                    var sercnt=1;
                    var boardComment={};

                    board.num=cntb;
                    board.boardtitle=usertitle;
                    board.boardID=userID;
                    board.boarddate=str;
                    board.boardContents=userContents;
                    board.sequnce=cntb;
                    boarddata.push(board);
                    for(var i=0; i<boarddata.length;i++){
                        boarddata[i].num=cnt++;
                        boarddata[i].sequnce=sercnt++;
                    }
                    boardobj = JSON.stringify(boarddata);
                    localStorage.setItem(searchTable,boardobj);
                    localStorage.setItem(boardtable,boardobj);
        
                    $('#myModal').modal("hide"); 
                    location.reload();
        
                    });       
                    }
                });

        });
        
    });

    $(function(){ 
        if($('body').is('#boardbody')){ 
            var $pagination = $('#pagination'),
            displayRecords = [],
            recPerPage = 5,
            totalRecords = 0,
            records = [],
            page = 1,
            totalPages = 0;        
            records=boarddata;

           $('#searchButton').on('click',function(){
                var text = $("select[name=searchSelect]").val();
                var searchBoard=$("#searchBoard").val();
                searchBox.push(text);
                searchBox.push(searchBoard);
                localStorage.setItem("searchBox",JSON.stringify(searchBox));
                var searchCnt=1;
                if(searchBoard==null || searchBoard==""){
                    localStorage.removeItem(searchTable);
                    searchData.splice(0,searchData.length);
                    for(var i=0;i<boarddata.length;i++){
                        var search = {};
                        search.num=searchCnt++;
                        search.boardtitle=boarddata[i].boardtitle;
                        search.boardID=boarddata[i].boardID;
                        search.boarddate=boarddata[i].boarddate;
                        search.boardContents=boarddata[i].boardContents;
                        search.sequnce=boarddata[i].sequnce;

                        searchData.push(search); 
                        searchObj = JSON.stringify(searchData);  
                        localStorage.setItem(searchTable,searchObj);
                    }
                }else{
                    if(text=="제목"){
                        var searchCnt=1;
                        var noCorrect=[];
                        localStorage.removeItem(searchTable);
                        searchData.splice(0,searchData.length);
                        for(var i=0;i<boarddata.length;i++){
                            if(boarddata[i].boardtitle.indexOf(searchBoard)!=-1){
                                var search = {};
                                search.num=searchCnt++;
                                search.boardtitle=boarddata[i].boardtitle;
                                search.boardID=boarddata[i].boardID;
                                search.boarddate=boarddata[i].boarddate;
                                search.boardContents=boarddata[i].boardContents;
                                search.sequnce=boarddata[i].sequnce;
                                searchData.push(search); 
                                searchObj = JSON.stringify(searchData);  
                                localStorage.setItem(searchTable,searchObj);
                            }else{
                                noCorrect.push(boarddata[i].boardtitle);
                            }
                        }
                        if(noCorrect.length==boarddata.length){
                            swal({
                                text: "일치하는 제목이 없습니다.",
                                icon: "error",
                                buttons: '확인',
                            })
                            var searchCnt=1;

                            localStorage.removeItem(searchTable);
                            searchData.splice(0,searchData.length);
                            for(var i=0;i<boarddata.length;i++){
                                var search = {};
                                search.num=searchCnt++;
                                search.boardtitle=boarddata[i].boardtitle;
                                search.boardID=boarddata[i].boardID;
                                search.boarddate=boarddata[i].boarddate;
                                search.boardContents=boarddata[i].boardContents;
                                search.sequnce=boarddata[i].sequnce;

                                searchData.push(search); 
                                searchObj = JSON.stringify(searchData);  
                                localStorage.setItem(searchTable,searchObj);
                            }

                            return false;
                        }
                    }else if(text=="작성자"){
                        var searchCnt=1;
                        var noCorrect=[];
                        localStorage.removeItem(searchTable);
                        searchData.splice(0,searchData.length);
                        for(var i=0;i<boarddata.length;i++){
                            if(boarddata[i].boardID.indexOf(searchBoard)!=-1){
                                var search = {};
                                search.num=searchCnt++;
                                search.boardtitle=boarddata[i].boardtitle;
                                search.boardID=boarddata[i].boardID;
                                search.boarddate=boarddata[i].boarddate;
                                search.boardContents=boarddata[i].boardContents;
                                search.sequnce=boarddata[i].sequnce;

                                searchData.push(search); 
                                searchObj = JSON.stringify(searchData);  
                                localStorage.setItem(searchTable,searchObj);
                            }else{
                                noCorrect.push(boarddata[i].boardtitle);

                            }
                        }
                        if(noCorrect.length==boarddata.length){
                            swal({
                                text: "일치하는 작성자가 없습니다.",
                                icon: "error",
                                buttons: '확인',
                            })

                            var searchCnt=1;

                            localStorage.removeItem(searchTable);
                            searchData.splice(0,searchData.length);
                            for(var i=0;i<boarddata.length;i++){
                                var search = {};
                                search.num=searchCnt++;
                                search.boardtitle=boarddata[i].boardtitle;
                                search.boardID=boarddata[i].boardID;
                                search.boarddate=boarddata[i].boarddate;
                                search.boardContents=boarddata[i].boardContents;
                                search.sequnce=boarddata[i].sequnce;

                                searchData.push(search); 
                                searchObj = JSON.stringify(searchData);  
                                localStorage.setItem(searchTable,searchObj);
                            }


                            return false;
                        }
                    }else if(text=="내용"){
                        var searchCnt=1;
                        var noCorrect=[];
                        localStorage.removeItem(searchTable);
                        searchData.splice(0,searchData.length);
                        for(var i=0;i<boarddata.length;i++){
                            if(boarddata[i].boardContents.indexOf(searchBoard)!=-1){
                                var search = {};
                                search.num=searchCnt++;
                                search.boardtitle=boarddata[i].boardtitle;
                                search.boardID=boarddata[i].boardID;
                                search.boarddate=boarddata[i].boarddate;
                                search.boardContents=boarddata[i].boardContents;
                                search.sequnce=boarddata[i].sequnce;

                                searchData.push(search); 
                                searchObj = JSON.stringify(searchData);  
                                localStorage.setItem(searchTable,searchObj);

                            }else{
                                noCorrect.push(boarddata[i].boardtitle);
                            }
                        }
                        if(noCorrect.length==boarddata.length){
                            swal({
                                text: "일치하는 내용이 없습니다.",
                                icon: "error",
                                buttons: '확인',
                              })

                              var searchCnt=1;

                              localStorage.removeItem(searchTable);
                              searchData.splice(0,searchData.length);
                              for(var i=0;i<boarddata.length;i++){
                                  var search = {};
                                  search.num=searchCnt++;
                                  search.boardtitle=boarddata[i].boardtitle;
                                  search.boardID=boarddata[i].boardID;
                                  search.boarddate=boarddata[i].boarddate;
                                  search.boardContents=boarddata[i].boardContents;
                                  search.sequnce=boarddata[i].sequnce;

                                  searchData.push(search); 
                                  searchObj = JSON.stringify(searchData);  
                                  localStorage.setItem(searchTable,searchObj);
                              }
                              
                              return false;
                        }
                    }
                }                
                
                location.reload();
            });
            
                totalRecords=searchData.length;
                totalPages= Math.ceil(totalRecords / recPerPage);

            if(totalPages>0){
                apply_pagination();
                changepage();
                boardcontents();
                editcont();
            }else{
                $pagination.twbsPagination('destroy');
            }
            var num=1;
            function generate_table(){
                var tr;
                $('#mytable tbody').html('');

                for (var i = 0; i < displayRecords.length; i++) {
                    tr = $('<tr/>');
                    tr.append('<td name="contentsform">' + displayRecords[i].num + "</td>");
                    var comcnt=0;
                    for(var j=0;j<commentdata.length;j++){

                        if(displayRecords[i].sequnce==commentdata[j].sequnce){
                            comcnt++;
                            
                        }
                        
                    }
                    tr.append('<td name="contentsform">' + displayRecords[i].boardtitle+" ("+comcnt +")" + "</td>");
                    tr.append('<td name="contentsform">' + displayRecords[i].boardID + "</td>");
                    tr.append('<td name="contentsform">' + displayRecords[i].boarddate + "</td>");
                    tr.append('<td name="contentsform" style="display:none;" >' + displayRecords[i].sequnce + "</td>");
                    tr.append('<td name="editboard" data-toggle="modal" data-target="#editmodal"><p data-placement="top" data-toggle="tooltip" title="Edit"><button  name="edit" class="btn btn-primary btn-xs" data-title="Edit" data-toggle="modal" data-target="#edit" ><span class="glyphicon glyphicon-pencil"></span></button></p></td>');
                    tr.append('<td><p data-placement="top" data-toggle="tooltip" title="Delete"><button name="delete" class="btn btn-danger btn-xs" data-title="Delete" data-toggle="modal" data-target="#delete" ><span class="glyphicon glyphicon-trash"></span></button></p></td>');
                    $('#mytable tbody').append(tr);
                }   
        
            }
            function apply_pagination() {
                $pagination.twbsPagination({
                    totalPages: totalPages,
                    visiblePages: 5,
                    prev: "이전",
                    next: "다음",
                    first: '<span aria-hidden="true">«</span>',
                    last: '<span aria-hidden="true">»</span>',
                    onPageClick: function (event, page) {
                        displayRecordsIndex = Math.max(page - 1, 0) * recPerPage;
                        endRec = (displayRecordsIndex) + recPerPage;
                        displayRecords = searchData.slice(displayRecordsIndex, endRec);
                        generate_table();
                    }
                }).on('page',function(event,page){
                    apply_pagination();
                    changepage();
                    boardcontents();
                    editcont();
                });
            }
        
            function changepage() {
                $("button[name='delete']").click(function(){
                    var boardsame = new Array();
                    var s=$(this).closest("tr").children();
                    
                    s.each(function(i){	
                        boardsame.push(s.eq(i).text());
                    });

                    console.log(boardsame);
                    if(session){
                        if(boardsame[2]==sessionTable[0].id){
                        
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
                                      
                                    swal({
                                        title: "게시글을 삭제하시겠습니까?",
                                        text: "삭제 후 복원할 수 없습니다.",
                                        icon: "warning",
                                        buttons: true,
                                        dangerMode: true,
                                    }).then((ok) => {
                                        if (ok) {
                                            
                                            $(this).closest("tr").remove();
                                            var tdArr = new Array();    // 배열 선언
                                            var checkBtn = $(this);
                                            var tr = checkBtn.closest("tr");
                                            var td = tr.children();
                                
                                            console.log("지우려는 tr모든 값 : "+tr.text());
                
                                                td.each(function(i){	
                                                    tdArr.push(td.eq(i).text());
                                                });
                
                                            
                                                console.log("지우려는 td 번호 값 : "+ tdArr[4]);
                                                for(var i=0;i<boarddata.length;i++){
                                                    if(tdArr[4]==(parseInt(Object.keys(boarddata)[i])+1)){
                                                        boarddata.splice(i,1);  
                                                    }
                                                }
                                                for(var i=0;i<searchData.length;i++){
                                                    if(tdArr[0]==(parseInt(Object.keys(searchData)[i])+1)){
                                                        searchData.splice(i,1);  
                                                    }
                                                }
                                                var delcnt=1;
                                                var delsearchcnt=1;
                                                for(var i=0;i<boarddata.length;i++){
                                                    boarddata[i].num=delcnt++
                                                }
                                                for(var i=0;i<searchData.length;i++){
                                                    searchData[i].num=delsearchcnt++
                                                }
                                                boardobj = JSON.stringify(boarddata);  
                                                searchObj = JSON.stringify(searchData);  
                                                localStorage.setItem(boardtable,boardobj);
                                                localStorage.setItem(searchTable,searchObj);

                                                swal({
                                                    title: "게시글이 삭제되었습니다.",
                                                    icon: "success",
                                                }).then(function(){
                                                    location.reload();
                                                });    
                                        }
                    
                                    });
                                }else{
        
                                    swal({
                                        title: "비밀번호가 다릅니다.",
                                        text: "비밀번호를 확인해주세요.",
                                        icon: "error",
                                        dangerMode: true,
                                    })
                                    return false;
        
                                }
                            });
                        }else{
                            swal({
                                title: "작성자가 아닙니다.",
                                text: "삭제할 수 없습니다.",
                                icon: "error",
                                dangerMode: true,
                            })
                            return false;  
                        }   
                    }else{
                        swal({
                            title: "로그인 후 이용가능합니다.",
                            text: "로그인페이지로 이동합니다.",
                            icon: "error",
                            buttons: "확인",
                            dangerMode: true,
                        }).then(function(){
                            window.location.href = "login.html";
                        });   
                    }
                });
            }
        } 
    }); 

   
 
function boardcontents(){
    
    $("td[name='contentsform']").on('click',function(){

        var contArr = new Array();    // 배열 선언
        var contentsclick = $(this);
        var trc = contentsclick.closest("tr");
        var tdc = trc.children();
        tdc.each(function(i){	
            contArr.push(tdc.eq(i).text());
        });
        console.log(contArr);
        for(var i=0;i<searchData.length;i++){
            if(contArr[0]==(parseInt(Object.keys(searchData)[i])+1)){

                con.num=searchData[i].sequnce;
                con.id=searchData[i].boardID;
                con.title=searchData[i].boardtitle;
                con.contents=searchData[i].boardContents;
                con.date=searchData[i].boarddate;
                condata.push(con); 
                conobj = JSON.stringify(condata);  
                localStorage.setItem(contable,conobj);
            }
        }
        window.location.href = "boardcontents.html";
    });
}





// $('#boardmain').on('click',function(){
//     condata.splice(0,1);
//     conobj = JSON.stringify(condata);  
//     localStorage.removeItem(commenttable);
//     localStorage.setItem(contable,conobj);
//     window.location.href = "board.html";

// });



function editcont(){


        $("button[name='edit']").on('click',function(){

            var editArr = new Array();    // 배열 선언
            var editbtn = $(this);
            var edittr = editbtn.closest("tr");
            var edittd = edittr.children();

            
            if(session){
                $("#editname").text(sessionTable[0].id);
                // $("#editmodal").on("hidden.bs.modal", function(){
                //     $("#editTitle").val("");
                //     $("textarea#editContents").val("");
                    
                // });
                console.log("수정할려는 tr모든 값 : "+edittr.text());
                    edittd.each(function(i){	
                        editArr.push(edittd.eq(i).text());
                    });
                    console.log("수정할려는 td 번호 값 : "+ editArr[4]);


                    
                    if(editArr[2]==sessionTable[0].id){
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
                                
                                for(var i=0;i<searchData.length;i++){
                                    if(editArr[0]==(parseInt(Object.keys(searchData)[i])+1)){
                                        $("#editTitle").val(searchData[i].boardtitle);
                                        $("textarea#editContents").val(searchData[i].boardContents);
                                    }
                                }
            
                                $('#editSumit').on('click',function(){

                                    swal({
                                        title: "게시글을 수정하시겠습니까?",
                                        text: "수정 후 복원할 수 없습니다.",
                                        icon: "warning",
                                        buttons: ["닫기",true],
                                    }).then((ok) => {
                                        if(ok){
                                            var editT=$("#editTitle").val();
                                            var editC=$("textarea#editContents").val();
                                            var strdate=""
                                            var date=new Date();
                                            strdate+= date.getFullYear()+"-"+date.getMonth()+1+"-"+("0"+date.getDate()).slice(-2)+"<br>"+date.getHours()+"시 "+("0"+date.getMinutes()).slice(-2)+"분";

                                            if(editT==""){
                                                swal({
                                                    text: "수정할 제목을 입력하세요.",
                                                    icon: "error",
                                                    buttons: '확인',
                                                  })
                                                  return false;
                                            }else if(editC==""){
                                                swal({
                                                    text: "수정할 게시글 내용을 입력하세요.",
                                                    icon: "error",
                                                    buttons: '확인',
                                                  })
                                                  return false;
                                            }
                                            var thisTitle;
                                            var thisContents;
                                            for(var i=0;i<boarddata.length;i++){
                                                if(editArr[4]==(parseInt(Object.keys(boarddata)[i])+1)){
                                                    thisTitle=$("#editTitle").val();
                                                    thisContents=$("textarea#editContents").val();
                                                    boarddata[i].boardtitle=thisTitle;
                                                    boarddata[i].boardContents=thisContents;
                                                    boarddata[i].boarddate=strdate;
                                                    localStorage.setItem(boardtable , JSON.stringify(boarddata));
                                                }
                                            }
                                            for(var i=0;i<searchData.length;i++){
                                                if(editArr[0]==(parseInt(Object.keys(searchData)[i])+1)){
                                                    searchData[i].boardtitle=thisTitle;
                                                    searchData[i].boardContents=thisContents;
                                                    searchData[i].boarddate=strdate;
                                                    localStorage.setItem(searchTable , JSON.stringify(searchData));
                                                }
                                            }
                                            
                                            swal({
                                                title: "게시글이 수정되었습니다.",
                                                icon: "success",
                                            }).then(function(){
                                                location.reload();
                                            });       
                                        }                        
                                    });
                                });
                                    
                            }else{
                                    swal({
                                        title: "비밀번호가 다릅니다.",
                                        text: "비밀번호를 확인해주세요.",
                                        icon: "error",
                                        dangerMode: true,
                                    })
                                    $('#editmodal').modal("hide"); 
                                    return false;
                            }
                        });
                    }else{
                        swal({
                            title: "작성자가 아닙니다.",
                            text: "수정할 수 없습니다.",
                            icon: "error",
                            dangerMode: true,
                        })
                        return false;  
                    }
            }else{
                swal({
                    title:"로그인 후 이용하세요.",
                    text: "로그인 페이지로 이동합니다.",
                    icon: "warning",
                    button: "확인"
                }).then(function(){
                    $('#editmodal').modal("hide"); 
                    window.location.href = "login.html";
                });          
            }

        });

    }
});



