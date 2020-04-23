    
$('#logout_li').on('click',function() {
  swal({
    title: "로그아웃 하시겠습니까?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((ok) => {
    if (ok) {
      swal({
        title: "로그아웃되셨습니다.",
        text: "감사합니다.",
        icon: "success",
      }).then(function(){
        window.location.href = "main.html";
        sessionStorage.clear();
        });       
      }
    });
 });