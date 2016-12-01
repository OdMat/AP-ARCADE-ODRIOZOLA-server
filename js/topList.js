$(document).ready(function() {
	$("#listMov").on('click', function() {
		$("#listTimes").slideUp();
		$("#listMoves").slideDown();
		$("#listTime").css("border-left","2px solid white");
		$("#listTime").css("border-bottom","2px solid white");
		$("#listTime p").css("transform","scale(1)");
		$("#listMov").css("border-bottom","0");
		$("#listMov").css("border-right","0");
		$("#listMov p").css("transform","scale(1.2)");
	});	   	          	
	$("#listTime").on('click', function() {
		$("#listMoves").slideUp();
		$("#listTimes").slideDown();
		$("#listMov").css("border-right","2px solid white");
		$("#listMov").css("border-bottom","2px solid white");
		$("#listMov p").css("transform","scale(1)");
		$("#listTime").css("border-bottom","0");
		$("#listTime").css("border-left","0");
		$("#listTime p").css("transform","scale(1.2)");
	});	
});