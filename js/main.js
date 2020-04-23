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
    this.document.getElementById('logout_li').style.display = 'none';
    this.document.getElementById('login_li').style.display = 'block';
    this.document.getElementById('userSetting').style.display = 'none';
   }
}


$(document).ready(function(){
    $(".dropdown").hover(            
        function() {
            $('.dropdown-menu', this).stop( true, true ).slideDown("fast");
            $(this).toggleClass('open');        
        },
        function() {
            $('.dropdown-menu', this).stop( true, true ).slideUp("fast");
            $(this).toggleClass('open');       
        }
    );
});

$(document).ready( function() {


    $('#myCarousel').carousel({
        interval:   4000
	});
	
	var clickEvent = false;
	$('#myCarousel').on('click', '.nav a', function() {
			clickEvent = true;
			$('.nav li').removeClass('active');
			$(this).parent().addClass('active');		
	}).on('slid.bs.carousel', function(e) {
		if(!clickEvent) {
			var count = $('.nav').children().length -1;
			var current = $('.nav li.active');
			current.removeClass('active').next().addClass('active');
			var id = parseInt(current.data('slide-to'));
			if(count == id) {
				$('.nav li').first().addClass('active');	
			}
		}
		clickEvent = false;
    });
    



    $("#emailmodal").on("click",function(){
        $("#emailmodal").on("hidden.bs.modal", function(){
            $("#email").val("");
            $("textarea#message-text").val("");
            $('#emailsummit').html('이메일 보내기').removeClass('disabled');
    
        });
        $("#emailsummit").on("click",function(){
            var formdata=$("#emailform").serialize();
            var emailcontents=$("#email").val();
            var messagetext=$("#textarea#message-text").val();

            if(emailcontents==""){
                swal({
                    title: "이메일을 입력하세요.",
                    icon: "warning",
                    buttons: '확인',
                  })
                  return false;
            }else if(messagetext==""){
                swal({
                    title: "보낼 메시지를 입력하세요.",
                    icon: "warning",
                    buttons: '확인',
                  })
                  return false;
            }else if(emailcontents.indexOf('@')<0){
                swal({
                    title: "이메일 형식으로 입력하세요.",
                    icon: "warning",
                    buttons: '확인',
                  })
                  return false;
            }
            swal({
                title: "이메일을 보내시겠습니까?",
                icon: "info",
                buttons: ['닫기','확인'],
              }).then((ok) => {
                if (ok) {
                        $('#emailsummit').html('<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>Loading...').addClass('disabled');
                    $.ajax({
                        cache:false,
                        url:"https://script.google.com/macros/s/AKfycbyP3hXWDy9f_BpFU1a8Ryr3YY80DMXRY6gF0Nku/exec",
                        type:"POST",
                        data:formdata,
                        success: function(){
                            swal({
                                title: "전송되었습니다.",
                                icon: "success",
                                buttons: '확인',
                              }).then(function(){
                                $('#emailmodal').modal("hide"); 
                              })
                        },
                        error : function(xhr, status) {
                            swal({
                                title: xhr,
                                text:status+"에러 입니다.",
                                icon: "error",
                                buttons: '닫기',
                              })
                              return false;
                        }
                    })
        
                }
            })
        
        })
        
    })


});




(function( $ ) {

    //Function to animate slider captions 
	function doAnimations( elems ) {
		//Cache the animationend event in a variable
		var animEndEv = 'webkitAnimationEnd animationend';
		
		elems.each(function () {
			var $this = $(this),
				$animationType = $this.data('animation');
			$this.addClass($animationType).one(animEndEv, function () {
				$this.removeClass($animationType);
			});
		});
	}
	
	//Variables on page load 
	var $myCarousel = $('#sg-carousel'),
		$firstAnimatingElems = $myCarousel.find('.item:first').find("[data-animation ^= 'animated']");
		
	//Initialize carousel 
	
	//Animate captions in first slide on page load 
	doAnimations($firstAnimatingElems);
	
	//Pause carousel  
	
	
	//Other slides to be animated on carousel slide event 
	$myCarousel.on('slide.bs.carousel', function (e) {
		var $animatingElems = $(e.relatedTarget).find("[data-animation ^= 'animated']");
		doAnimations($animatingElems);
	});  
   
	
})(jQuery);	
