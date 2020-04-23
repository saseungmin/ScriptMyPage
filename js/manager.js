
var v_tblName="memTable";
var v_memData =[];
var sessionTable =[];
var sessionM = {};
var session;
var table="session";



//made by vipul mirajkar thevipulm.appspot.com
var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);




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
};