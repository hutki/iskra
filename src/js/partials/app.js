(function ($) {
//верхний слайдер
/*

$.fn.happy_ban = function(){

var obj = $(this);
var w_img = obj.find('li').width();
var c_left = Number(obj.children('ul').css('left').replace('px',''));
var w_button = obj.find('.next').width();
/*
	$(window).resize(function() {
			itm = Math.floor((Number($('.head_ban').parent().width()) - w_button ) / w_img);
			$('.head_ban').css({'width':(itm*w_img + w_button)+'px'});
		});
*/
/*
obj.children('ul').width(w_img * obj.find('li').length);

obj.find('.next').click(function(){
	obj.children('ul').animate({'left':c_left - w_img}, 700, function () {
	obj.children('ul').append(obj.find('li:first').clone());
	obj.find('li:first').remove();
	obj.children('ul').css({'left':(c_left) + 'px'});
});

});
obj.find('.prev').click(function(){
	
	obj.children('ul').prepend(obj.find('li:last').clone());
	obj.find('li:last').remove();
	obj.children('ul').css({'left':(c_left - w_img) + 'px'});
	obj.children('ul').animate({'left':c_left}, 700);

	});

}
*/
//центральный слайдер



$.fn.carusel = function() {
var obj = $(this);
var w_img = obj.find('li').width();
//проверка существования свойства
var ul_left = obj.children('ul').css('left');

if(typeof(ul_left) != "undefined" && ul_left !== null) {
    var c_left = Number(obj.children('ul').css('left').replace('px',''));
}

	$(window).resize(function() {
			itm = Math.floor(Number($('#carusel').parent().width())  / w_img);
			$('#carusel').css({'width':itm*w_img +'px'});
		});

obj.children('ul').width(w_img * obj.find('li').length);

$('.next_cont').click(function(){
	obj.children('ul').prepend(obj.find('li:last').clone());
	obj.find('li:last').remove();
	obj.children('ul').css({'left':(c_left - w_img) + 'px'});
	obj.children('ul').animate({'left':c_left}, 500);
});

$('.prev_cont').click(function(){
	obj.children('ul').animate({'left':c_left - w_img}, 500, function () {
	obj.children('ul').append(obj.find('li:first').clone());
	obj.find('li:first').remove();
	obj.children('ul').css({'left':(c_left) + 'px'});
	});
});
}



//конец центральный слайдер

}) (jQuery)

$(document).ready(function(e){
	$('#carusel').carusel();
	//$('.head_ban').happy_ban();
});
/*
$(document).ready(function(e) {

	slider.play('#reklamma');
});
var slider = {
	speedEffects: 600,
	speedDisplay: 6000,
	slideCount: null,
	slideNow: 0,
	slideInterval: null,
play: function(param) {
		//Определяем количество слайдов
		slider.slideCount = $(param).find('li').length;
		//Задаем счетчик
		var i = slider.slideCount;
		//Задаем стили
		$(param).css({'display':'block','overflow':'hidden','position':'relative'});
		$(param).find('li').css({'display':'block','background':'transparent'}).each(function(index, element) {
			$(this).css({'position':'absolute','top':'3px','left':'3px','z-index':i});
			i -= 1;
        });
	//Первоначальный запуск переключения слайдов
		slider.switching(param);
		$(param).mouseenter(function() {
			slider.stoped();
			}).mouseleave(function() {
			slider.switching(param);
		});
	},
	switching: function(param) {
		slider.slideInterval = setInterval(function() {
			if (slider.slideNow == (slider.slideCount - 1)) {
				slider.slideNow = 0;
				$(param).find('li').eq(slider.slideNow).fadeIn(slider.speedEffects, function() {
					$(param).find('li').css({'display':'block'});
				});
			} else {
				$(param).find('li').eq(slider.slideNow).fadeOut(slider.speedEffects);
				slider.slideNow += 1;
			}
		}, slider.speedDisplay);
	},
	stoped: function() {
		clearInterval(slider.slideInterval);
	}
}*/
var hwSlideSpeed = 2000;
var hwTimeOut = 3000;
var hwNeedLinks = true;
 
$(document).ready(function(e) {
    $('.slide').css(
        {"position" : "absolute",
         "top":'0', "left": '0'}).hide().eq(0).show();
    var slideNum = 0;
    var slideTime;
    slideCount = $("#slider .slide").size();
    var animSlide = function(arrow){
        clearTimeout(slideTime);
        $('.slide').eq(slideNum).fadeOut(hwSlideSpeed);
        if(arrow == "next"){
            if(slideNum == (slideCount-1)){slideNum=0;}
            else{slideNum++}
            }
        else if(arrow == "prew")
        {
            if(slideNum == 0){slideNum=slideCount-1;}
            else{slideNum-=1}
        }
        else{
            slideNum = arrow;
            }
        $('.slide').eq(slideNum).fadeIn(hwSlideSpeed, rotator);
        $(".control-slide.active").removeClass("active");
        $('.control-slide').eq(slideNum).addClass('active');
        }
if(hwNeedLinks){
var $linkArrow = $('<a id="prewbutton" href="#"></a><a id="nextbutton" href="#"></a>')
    .prependTo('#slider');      
    $('#nextbutton').click(function(){
        animSlide("next");
 
        })
    $('#prewbutton').click(function(){
        animSlide("prew");
        })
}
    var $adderSpan = '';
    $('.slide').each(function(index) {
            $adderSpan += '<span class = "control-slide">' + index + '</span>';
        });
    $('<div class ="sli-links">' + $adderSpan +'</div>').appendTo('#slider-wrap');
    $(".control-slide:first").addClass("active");
     
    $('.control-slide').click(function(){
    var goToNum = parseFloat($(this).text());
    animSlide(goToNum);
    });
    var pause = false;
    var rotator = function(){
    if(!pause){slideTime = setTimeout(function(){animSlide('next')}, hwTimeOut);}
            }
    $('#slider-wrap').hover(    
        function(){clearTimeout(slideTime); pause = true;},
        function(){pause = false; rotator();
        });
    rotator();
});