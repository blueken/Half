$(function() {


	bgAutoFitWindow(".autofit_window_bg");
	bgAutoFitWindow(".autofit_qa_bg");

	// $(window).bind("resize", function(){
	// 		// autoFitPos('.clever');
	// 		// autoResizeBg();
	// }).trigger("resize");

	domAutoFitWindow(".clever");


	selectClassLogin();
});
function selectClassLogin() {
	$(".control.next").click(function(){
		var li_width = $(window).width() > 640 ? 130 : 90;
		var li_margin = 10;
		var step = $(window).width() * 0.65;
		var oldpos = parseInt($("ul.menu").css("margin-left"));
		var newpos = oldpos - step;
		
		var bHiddenExist = !( Math.abs(oldpos) + $(window).width()*0.8 > $("ul.menu li").length * (li_width + li_margin) );
		if (bHiddenExist) {
			$("ul.menu").animate({
				"marginLeft": newpos+'px'
			});
		}
		
	});
	$(".control.prev").click(function(){
		var step = $(window).width() * 0.65;
		var oldpos = parseInt($("ul.menu").css("margin-left"));
		var newpos = oldpos + step;
		if (oldpos < 0) {

			$("ul.menu").animate({
				"marginLeft": newpos+'px'
			});
		}
	});
}
	
function bgAutoFitWindow(img_selector) {
	/*
	need 3 styles

	img.img_selector {
		position: fixed;
		top: 0;
		left: 0;
	}
	img.autofit_window_bgwidth {
		width: 100%;
	}
	img.autofit_window_bgheight {
		height: 100%;
	}
	*/
	var theWindow        = $(window),
    $bg              = $(img_selector),
    aspectRatio      = $bg.width() / $bg.height();

	theWindow.resize(function() {
		if ( (theWindow.width() / theWindow.height()) < aspectRatio ) {
		    $bg
		    	.removeClass()
		    	.addClass('autofit_window_bgheight');
		} else {
		    $bg
		    	.removeClass()
		    	.addClass('autofit_window_bgwidth');
		}
	}).trigger("resize");
}
function domAutoFitWindow(dom_selector) {
	var theWindow        = $(window);
	theWindow.resize(function() {
		autoFitPos(dom_selector);
	}).trigger("resize");
}

function qaAutoFitWindow() {
	var theWindow        = $(window);
	var CLOSE_WIDTH = 51;
	var CLOSE_HEIGHT = 51;
	var CLOSE_MARGIN_TOP = 51;
	var CLOSE_MARGIN_RIGHT = 27;
	var CHOOSE_WIDTH = 290;
	var CHOOSE_HEIGHT = 80;
	var CHOOSE_MARGIN_TOP = 960;
	var CLOSE_RATIO = CLOSE_WIDTH / CLOSE_HEIGHT;
	var CHOOSE_RATIO = CHOOSE_WIDTH / CHOOSE_HEIGHT;

	var PIC_HEIGHT = 1080;
	var PIC_WIDTH =  640;
	var perfect_ratio = PIC_WIDTH / PIC_HEIGHT;

	var big_fish = 0;
	var scale = 1;
	theWindow.resize(function() {
		var win_width = $(window).width();
		var win_height = $(window).height();

		if(win_width / win_height < perfect_ratio) {
			big_fish = win_height;
			scale = win_height / PIC_HEIGHT;
		} else {
			big_fish = win_width;
			scale = win_width / PIC_WIDTH;
		}

		$(".close").css("width", CLOSE_WIDTH * scale + "px");
		$(".close").css("height", CLOSE_HEIGHT * scale + "px");
		$(".close").css("margin-top", CLOSE_MARGIN_TOP * scale + "px");
		$(".close").css("margin-right", CLOSE_MARGIN_RIGHT * scale + "px");

		$(".choose").css("width", CHOOSE_WIDTH * scale + "px");
		$(".choose").css("height", CHOOSE_HEIGHT * scale + "px");
		$(".choose").css("margin-left", CHOOSE_WIDTH * (-0.5) * scale + "px");
		$(".choose").css("margin-top", CHOOSE_MARGIN_TOP  * scale + "px");
	}).trigger("resize");
}

function autoFitPos(selector, pic_width, pic_height) {
	//auto set position keeping image width/height ratio
	/*
	selector dom need has style set as:
	selector {
		position: absolute;
		left:0;
		top:0;
		display: block;
		text-indent: -2000em;
	}
	selector_concret1 {
		width: 175px;
		height: 45px;
		margin-left: 435px;
		margin-top: 311px;
	}
	*/
	var domObjs = $(selector);
	var PIC_HEIGHT = pic_width ? pic_width : 960;
	var PIC_WIDTH = pic_height ? pic_height : 640;
	var big_fish = 0;
	var scale = 1;
	var perfect_ratio = PIC_WIDTH / PIC_HEIGHT;
	var win_width = $(window).width();
	var win_height = $(window).height();

	if(win_width / win_height < perfect_ratio) {
		big_fish = win_height;
		scale = win_height / PIC_HEIGHT;
	} else {
		big_fish = win_width;
		scale = win_width / PIC_WIDTH;
	}

	// record origin value ,when first autofit
	if(! autoFitPos.did){
		autoFitPos.did = [];
		domObjs.each(function(i, e) {
			var domObj = $(this);
			
			autoFitPos.did[i] = {};
			autoFitPos.did[i].aml = parseInt(domObj.css("margin-left"));
			autoFitPos.did[i].amt = parseInt(domObj.css("margin-top"));
			autoFitPos.did[i].aw = parseInt(domObj.css("width"));
			autoFitPos.did[i].ah = parseInt(domObj.css("height"));
		});
	}

	domObjs.each(function(i, e) {
		var domObj = $(this);
		var aml = autoFitPos.did[i].aml;
		var amt = autoFitPos.did[i].amt;
		var aw = autoFitPos.did[i].aw;
		var ah = autoFitPos.did[i].ah;
		
		aml *= scale;
		amt *= scale;
		aw *= scale;
		ah *= scale;

		aml += "px";
		amt += "px";
		aw  += "px";
		ah  += "px";

		domObj.css("margin-left", aml); 
		domObj.css("margin-top", amt);
		domObj.css("width", aw);
		domObj.css("height", ah);
	});

	return scale;
}