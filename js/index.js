$(function() {
	$(window).bind("resize", function(){
			autoFitPos('.clever');
	}).trigger("resize");
	
});
function autoFitPos(selector, pic_width, pic_height) {
	//auto set position keeping image width/height ratio
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