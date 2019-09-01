	/* 본인인증 */	
	function checkAskCertification(url) {
		$.ajax({
			url : "/?_c=ask&_m=asksell&_a=CheckCertification.ajax",
			type: "POST",		
			success:function(data){
				requestAskCertification(data, url);	 
			},					
			error: function (jqXHR, textStatus, errorThrown) {
				alert("본인인증  중 오류가 발생했습니다.");	
			}
		});
	}
	
	/* 본인인증 */
	function requestAskCertification(result, url) {
		if (result == "0000") {
			if (url.indexOf("#NewWin") == -1) {
				window.location.href = url;
			}
			else {
				fnWinUrlReload(url.replace('#NewWin',''), '_blank', '', '', '', '');
			}
		}
		else {
			alert("본인인증 후 이용가능합니다.");	

			fn_SelfCertPopUp();
		}
	
	}
	
	/* 내놓기등록 페이지로 이동 */
	function goAskSellPage() {
		
		var url = "/?_c=ask&_m=asksell";
		if (fn_isLogin() == "") {
			alert(ALERT_REQUEST_LOGIN);
			fn_loginDiv(url);
		} else {
			//window.location.href = url;
			checkAskCertification(url);
		}
		
	}
	
	/* 찾아주세요등록 페이지로 이동  */
	function goAskBuyPage() {
		
		var url = "/?_c=ask&_m=askbuy";
		if (fn_isLogin() == "") {
			alert(ALERT_REQUEST_LOGIN);
			fn_loginDiv(url);
		} else {
			//window.location.href = url;
			checkAskCertification(url);
		}
		
	}

	/* 우측배너*/	
	function loadAskRightBanner() {
		
		$.ajax
		({
			url : "/?_c=research&_a=ResearchRight", 
			type: "POST",
			success: function(data, textStatus, jqXHR){
				$("#divAskRight").html(data);
			},
			error: function (jqXHR, textStatus, errorThrown){
				return "";
			}
		});	
		
	}
	
	/* 우측배너*/
	//$(document).ready(function(){
	$(window).load(function(){	
/*
		$("#divAskRight").each(function()
		{
			$.ajax
			({
				url : "/?_c=research&_a=ResearchRight", 
				type: "POST",
				success: function(data, textStatus, jqXHR){
					$("#divAskRight").html(data);
				},
				error: function (jqXHR, textStatus, errorThrown){
					return "";
				}
			});	

		});
*/
	});