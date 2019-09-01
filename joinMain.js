try {
	if($.browser.msie && parseInt($.browser.version) <= parseInt(8)){
	}
	else {
		Kakao.init(key_kakao);
	}	
} catch(err) {
	//
}	

var myGlobalLoginId; // = fn_isLogin();

$(document).ready(function() {

	myGlobalLoginId = fn_isLogin();

	if ( !myGlobalLoginId ){
		fn_SnsLogout();
	}

	// 카카오톡 로그인 버튼
	$(".btn_login_kakao").click(function(e) {
		
		if($.browser.msie && parseInt($.browser.version) <= parseInt(8)){
			alert("인터넷 익스플로러(IE) 8 브라우저에서는 해당 서비스를 사용할 수 없습니다.");
		}
		else {	
			if ( !myGlobalLoginId ) {
				Kakao.Auth.logout();
				var isJoin = "N";
				if ($(this).data("info") == "join")
				{
					$("#jl_gbn").val("J");
				}
				else
				{
					$("#jl_gbn").val("L");
				}
	
				if ( $("#jl_gbn").val() == "J" ) isJoin = "Y";
	
				Kakao.Auth.getStatus(function(res) {
					//console.log(res);
					//console.log(res.status);
					//console.log(res.user.id);
					if (res.status == "connected" )
					{				
						//console.log(res);
						$("#sns_gbn").val("K");
						$("#sns_id").val(res.user.id);//res.properties.nickname
						$("#sns_email").val(res.user.email);
						if (isJoin == "Y" ){
							fn_joinSNS();
						}else {
							fn_SNSlogin();
						}
					}
					else
					{
						loginWithKakao();
					}
				});	
				
				/*Kakao.Auth.logout(function(p) {
					loginWithKakao();
				});	// 카카오톡 로그아웃*/
	
			} else {
				loginWithKakao();
			}
		}
	});

	// 네이버 로그인 버튼
	$(".btn_login_naver").click(function(e) {
		if ($(this).data("info") == "join")
		{
			$("#jl_gbn").val("J");
		}
		else
		{
			$("#jl_gbn").val("L");
		}
		window.open("https://nid.naver.com/oauth2.0/authorize?response_type=token&amp;client_id="+key_naver+"&amp;redirect_uri="+uri_naver+"&amp;state=", 'naverloginpop', 'titlebar=1, resizable=1, scrollbars=yes, width=600, height=550'); 
	});
	
	// 페이스북 로그인 버튼
	$(".btn_login_facebook").click(function(e) {
//		alert('페이스북은 당분간 모바일웹에서 로그인 할 수 있습니다.');
//		return false;

		if ($(this).data("info") == "join")
		{
			$("#jl_gbn").val("J");
		}
		else
		{
			$("#jl_gbn").val("L");
		}

		checkLoginState();

	});
		
});


/*
 * SNS 회원가입
 */
function fn_joinSNS() {
	if ($("#sns_email").val() == '' || $("#sns_email").val() == 'undefined') {
		switch ($("#sns_gbn").val()) {
			case 'N' :
				alert('네이버 이메일 정보 제공을 동의하지 않으셨습니다.\n일반회원으로 가입해주세요.');
				break;
			case 'F' :
				alert('페이스북 이메일 정보 제공을 동의하지 않으셨습니다.\n일반회원으로 가입해주세요.');
				break;
			case 'K' :
				alert('카카오톡 이메일 정보 제공을 동의하지 않으셨습니다.\n일반회원으로 가입해주세요.');
				break;
		}
		
	}
	else {
		$("#joinSNS").val("Y");

		$.ajax({
			type:"POST",
			data:$("#Loginfrm").serialize(),
			url:"/?_c=mypage&_m=joinmain&_a=joinsnsoverlap",
			dataType:"json",
			success:function(reparam){

				if (reparam[0].RESULTNO == 0)
				{
					var f = $('<form action="/?_c=mypage&_m=joinmain&_a=agree" method="post"></form>');
					f.append('<input type="hidden" name="hdnSnsGbn" value="'+ $("#sns_gbn").val() +'" />');
					f.append('<input type="hidden" name="hdnSnsID" value="'+ $("#sns_id").val() +'" />');
					f.append('<input type="hidden" name="hdnSnsEmail" value="'+ $("#sns_email").val() +'" />');
					f.append('<input type="hidden" name="hdnJoinSNS" value="'+ $("#joinSNS").val() +'" />');

					f.appendTo('body').submit().remove();
				}
				else
				{
					alert(reparam[0].RESULTMESSAGE);
					window.location.href = "/";
				}
			},
			error:function(reparam){
				//console.log(reparam);
				//console.log("error");
			}
		});
	}

}
	//}
function fn_applySNS() {
	$("#sns_gbn").val( $("#hdnSnsGbn").val() );
	$("#sns_id").val( $("#hdnSnsID").val() );
	$("#sns_email").val( $("#hdnSnsEmail").val() );
	$("#joinSNS").val( $("#hdnJoinSNS").val() );

	$.ajax({
		type:"POST",
		data:$("#Loginfrm").serialize(),
		url:"/?_c=mypage&_m=joinmain&_a=joinact",
		dataType:"text",
		success:function(reparam){
			//console.log(" fn_joinSNS "+ reparam)
			arr_resultJoin = reparam.split("||");
			resultNo = jQuery.trim(arr_resultJoin[0]);
			resultMessage = arr_resultJoin[1];
			userId = arr_resultJoin[2];
			userNm = arr_resultJoin[3];
			userEmail = arr_resultJoin[4];
			joinRoute = arr_resultJoin[5];
			resultNick = arr_resultJoin[6];

			if (resultNo == "1") {
				window.document.location.href="/?_c=mypage&_m=JoinMain&_a=joinresult";
				return;
			} else if (resultNo == "-3") {
				fn_SnsLogout();
				alert( resultMessage );
				return false;
			} else if (resultNo == "-2") {
				//$("#frm").attr({action:"/?c=user&m=joinSnsAgree",method:"post"});
				//$("#frm").submit();
				//window.location.href='/?c=user&m=joinSnsAgree&sns_gbn='+$("#sns_gbn").val()+'&sns_id='+$("#sns_id").val()+'&sns_email='+$("#sns_email").val();
				return false;
			}
		},
		error:function(reparam){
			//console.log(reparam);
			//console.log("error");
		}
	});
}

/*
 * 카카오톡 로그인
 */
function loginWithKakao() {
	
	var isJoin = "N";
	if ( $("#jl_gbn").val() == "J" ) isJoin = "Y";

	if($.browser.msie && parseInt($.browser.version) <= parseInt(8)){
		alert("인터넷 익스플로러(IE) 8 브라우저에서는 해당 서비스를 사용할 수 없습니다.");
	}
	else {
		//console.log(isJoin)
		Kakao.Auth.cleanup();
		  Kakao.Auth.login({
			 throughTalk: false,
			success: function(authObj) {
			  Kakao.API.request({
				  url: '/v1/user/me',
				  success: function(res) {
					//console.log("login auth : "+JSON.stringify(res));
					//console.log(res);
					$("#sns_gbn").val("K");
					$("#sns_email").val(res.kaccount_email);//res.properties.nickname
					$("#sns_id").val(res.id);//res.properties.nickname
					if (isJoin == "Y" ){
						fn_joinSNS();
					}else {
						fn_SNSlogin();
					}
				  },
				  fail: function(error) {
					//console.log("login request error : "+JSON.stringify(error));
				  }
			  });
			},
			fail: function(err) {
			  //console.log("login auth error: "+JSON.stringify(err));
			}
		});
	}
}


/*
 * 일반 회원 로그인 
 * 특정페이지로 이동필요시 화면페이지에 <input type="hidden" id="loginGoUrl" value="이동할 URL"> 삽입
 */
function fn_login() {
	$("#sns_gbn").val("");
	$("#sns_id").val("");
	$("#sns_email").val("");
	$("#loginSNS").val("N");

	if ( !$("#user_id").val() ){
		alert("아이디를 입력해주세요");
		return ;
	}

	if ( !$("#user_pw").val() ){
		alert("비밀번호를 입력해주세요");
		return ;
	}
	
	fn_ProtocolUrlLogin();
		
}

/*
 * 도메인 정보 조회
 */
function fn_ProtocolUrlLogin() {
	
	var goHttpDir = "";
	
	$.ajax({
		type:"POST",
		url: "/?_c=comm&_m=secure&_a=protocolUrl",
		dataType:"text",
		success:function(reparam){		
			fn_ExecLogin(reparam);
		},
		error:function(reparam){	
			return goHttpDir;	
		}		
	});
	
}

/*
 * 일반 회원 로그인 
 * 특정페이지로 이동필요시 화면페이지에 <input type="hidden" id="loginGoUrl" value="이동할 URL"> 삽입
 */
function fn_ExecLogin(goHttpDir) {
	
	var currentUrl = window.location.href;	
	var dataType;
/*	
	if (goHttpDir) = "" {
		dataType = "text";		
	}
	else {
		dataType = "jsonp";
	}
*/
	$("#sns_gbn").val("");
	$("#sns_id").val("");
	$("#sns_email").val("");
	$("#loginSNS").val("N");

	$.ajax({
			type:"GET",
			data:$("#Loginfrm").serialize(),
			url:goHttpDir + "/?_c=mypage&_m=login",
			dataType:"jsonp",
			success:function(data){
				var reparam;
				var arr_reparam;
				var res = eval(data);
				reparam = res.data;
				arr_reparam = reparam.split("||");
				if (res.result == "ok" && arr_reparam[0] == "1") {
					/* 나의 활동 저장 */
					r114Logger.syncAllLogDB();
					//r114Logger.syncAllLogDB("r114ResearchTag");
					/* 나의 활동 저장 */
	
					// 특정페이지로 이동 여부 
					//if ( $("#loginGoUrlParam", parent.document).length  && $("#loginGoUrlParam", parent.document).val() ){
					//	top.location.href =  $("#loginGoUrlParam", parent.document).val() ;
					//}else {
					//	top.location.reload();
					//}
					
					var pageVariableLoginGoUrl = $("input[type=hidden][name=loginGoUrl]");
					
					if (pageVariableLoginGoUrl.val().match("_m=asksell") || pageVariableLoginGoUrl.val().match("_m=askbuy"))
					{
						closeLp('#lp_layout_login');
					//	top.location.reload();
						checkAskCertification(pageVariableLoginGoUrl.val());					
					}
					else
					{
						if (pageVariableLoginGoUrl.val() != "") {	
							if (pageVariableLoginGoUrl.val().indexOf("#NewWin") == -1) {
								top.location.href = pageVariableLoginGoUrl.val().replace('#NewWin','');
							}
							else {
								closeLp('#lp_layout_login');
								fnWinUrlReload(pageVariableLoginGoUrl.val().replace('#NewWin',''), '_blank', '', '', '', '');
							}
						} 
						else {
							setLoggedIn();
	
							if (currentUrl.toLowerCase().match("_m=asksell") 
								|| currentUrl.toLowerCase().match("_m=askbuy")
								|| currentUrl.toLowerCase().match("_m=communitywrite")
								|| currentUrl.toLowerCase().match("_m=counselsave")
								|| currentUrl.toLowerCase().match("_m=directdealsellpersonal")
								|| currentUrl.toLowerCase().match("_m=directdealsellEnterprise")
								)
							{ 
								closeLp('#lp_layout_login');
							}
							else
							{
								top.location.reload();
							}
	
							//top.location.href = currentUrl;
							//top.location.href = '/?_c=mypage&_m=mypage';
							//top.location.reload();
						}	
					}
				} else {
					$("#sns_gbn").val("");
					$("#sns_id").val("");
					$("#sns_email").val("");
					alert( arr_reparam[1]);
					return false;
				}
			},
			error:function(reparam){
				//console.log(JSON.stringify(reparam));
				//console.log("error");
			}
		});
}

/* 
 * SNS 로그인 
 * 특정페이지로 이동필요시 화면페이지에 <input type="hidden" id="loginGoUrl" value="이동할 URL"> 삽입
 */ 
function fn_SNSlogin() {
	fn_SnsLogout();

	$("#loginSNS").val("Y");
	$.ajax({
		type:"POST",
		//data:JSON.parse(jText),
		data:$("#Loginfrm").serialize(),
		url:"/?_c=mypage&_m=login",
		dataType:"jsonp",
		success:function(data){
			var reparam;
			var arr_reparam;
			var res = eval(data);
			reparam = res.data;
			arr_reparam = reparam.split("||");
			if (arr_reparam[0] == "1") {
				/* 나의 활동 저장 */
				r114Logger.syncAllLogDB();
				//r114Logger.syncAllLogDB("r114ResearchTag");
				/* 나의 활동 저장 */

				// 특정페이지로 이동 여부 
				//if ( $("#loginGoUrlParam", parent.document).length  && $("#loginGoUrlParam", parent.document).val() ){
				//	top.location.href =  $("#loginGoUrlParam", parent.document).val() ;
				//}else {
				//	top.location.reload();
				//}
				
				var currentUrl = window.location.href ;

				var pageVariableLoginGoUrl = $("input[type=hidden][name=loginGoUrl]");
				
				if (pageVariableLoginGoUrl.val().match("_m=asksell") || pageVariableLoginGoUrl.val().match("_m=askbuy"))
				{
					closeLp('#lp_layout_login');
					top.location.reload();
					checkAskCertification(pageVariableLoginGoUrl.val());					
				}
				else
				{
					if	(pageVariableLoginGoUrl.val() != "") {
						if (pageVariableLoginGoUrl.val().indexOf("#NewWin") == -1) {
							top.location.href = pageVariableLoginGoUrl.val();
						}
						else {
							closeLp('#lp_layout_login');
							fnWinUrlReload(pageVariableLoginGoUrl.val().replace('#NewWin',''), '_blank', '', '', '', '');
						}
					} 
					else {
						setLoggedIn();

						if (currentUrl.toLowerCase().match("_m=asksell") 
							|| currentUrl.toLowerCase().match("_m=askbuy")
							|| currentUrl.toLowerCase().match("_m=communitywrite")
							|| currentUrl.toLowerCase().match("_m=counselsave")
							|| currentUrl.toLowerCase().match("_m=directdealsellpersonal")
							|| currentUrl.toLowerCase().match("_m=directdealsellEnterprise")
							)
						{ 
							closeLp('#lp_layout_login');
						}
						else
						{
							top.location.reload();
						}

						//top.location.href = currentUrl;
						//top.location.href = '/?_c=mypage&_m=mypage';
						//top.location.reload();
					}	
				}

			} else {
				if (arr_reparam[0] == "-2") {
					alert(arr_reparam[1]);
					top.location.href="/?_c=mypage&_m=joinmain";
				}
				else {
					alert(arr_reparam[1]);
					fn_logout();
				}
			}
		},
		error:function(reparam){
			//console.log(JSON.stringify(reparam));
			//console.log("error");
		}
	});
	$("#txt_pwd").attr("disabled",false);
}


/*
 * SNS 로그아웃
 */ 
function fn_SnsLogout(){
	if($.browser.msie && parseInt($.browser.version) <= parseInt(8)){
	}
	else {
		Kakao.Auth.logout();
	}
	document.cookie = "nvtk=;path=/;expires=-1;";
}

/* 
 * 페이스북 로그인
 */
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/ko_KR/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
window.fbAsyncInit = function() {
  FB.init({
    appId      : key_facebook,
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.8' // use graph api version 2.8
  });
  //FB.getLoginStatus(function(response) {
	    //statusChangeCallback(response);
  //});
};

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

function statusChangeCallback(response) {
    //console.log('statusChangeCallback');
    //console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      testAPI();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      //console.log(response.status);
      testAPI();
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
        //console.log(response.status);
		testAPI();
    }
}

/*
 * 
 */
function testAPI() {
	//console.log('Welcome!  Fetching your information.... ');
	/*FB.api('/me', {fields:'id,name,email'}, function(response) {
		console.log('Successful login for: ' + response.id+","+response.email);
	});*/
	FB.login(function(response) {
		// handle the response
		if (response.status === 'connected') {
			// Logged into your app and Facebook.
			FB.api('/me', {fields:'id,name,email'}, function(response) {
				$("#sns_gbn").val("F");
				$("#sns_id").val(response.id);
				$("#sns_email").val(response.email);
				
				var isJoin = "N";
				if ( $("#jl_gbn").val() == "J" ) isJoin = "Y";

				if (isJoin == "Y" ){
					fn_joinSNS();
				}else {
					fn_SNSlogin();
				}

			});
		} else if (response.status === 'not_authorized') {
			alert("페이스북에 연결된 정보가 존재합니다.\n페이스북 사이트에서 로그아웃 후 다시 시도해주세요.");
			top.location.reload();

		} else {
			// The person is not logged into Facebook, so we're not sure if
			// they are logged into this app or not.
		}
	} ,{scope: 'public_profile,email'});
}

/*
 * 아이디, 비밀번호 찾기
 */
function fn_findInfo( info ){
	
	$(".noMemberEmail").css("display", "none");
	$(".noMemberEmail").html('');

	var ajaxUrl = "";
	if ( info == "id" ){
		if(	!(jQuery.trim($("#find_email").val())) ) {
			alert("가입하신 이메일 주소를 입력해 주세요.");
			return false;		
		}
		ajaxUrl = "/?_c=mypage&_m=myinfo&_a=findid"
	}
	else if( info == "pw" ) {
		if(	!(jQuery.trim($("#find_id").val())) ) {
			alert("아이디를 입력해 주세요.");
			return false;		
		}
		if(	!(jQuery.trim($("#find_email2").val())) ) {
			alert("가입하신 이메일 주소를 입력해 주세요.");
			return false;		
		}
		ajaxUrl = "/?_c=mypage&_m=myinfo&_a=findpw"
	}

	if ( ajaxUrl ){

		$.ajax({
			type:"POST",
			data: {
				find_email : jQuery.trim($("#find_email").val())
				, find_id : jQuery.trim($("#find_id").val())
				, find_email2 : jQuery.trim($("#find_email2").val())
			},
			url: ajaxUrl,
			dataType:"text",
			success:function(reparam){
				fn_findInfoResult( info,  reparam );
			},
			error:function(reparam){
				//console.log(reparam);
				//console.log("error");
			}
		});
	}
}

/*
 * 
 */
function fn_findInfoResult( info, reparam ){
	//  resultNo &"||"& resultMessage 
	arr_resultJoin = reparam.split("||");
	resultNo = jQuery.trim(arr_resultJoin[0]);
	resultMessage = arr_resultJoin[1];

	if ( info == "id" ){
		if  ( resultNo == "1" ) {
			viewText = '<p class="txt_info_s m_t_20" style="color:#000">개인정보 보호를 위해 뒷자리는 **로 표시합니다</p>'
			viewText += '<p class="txt_info_s m_t_20" style="color:#000">'+ arr_resultJoin[2] +'</p>'
			viewText += '<p class="txt_info_s m_t_20" style="color:#000">'+ arr_resultJoin[3].substr(0,4) +'년 '+ arr_resultJoin[3].substr(4,2) +'월 '+ arr_resultJoin[3].substr(6,2) +'일 가입</p>';
			$(".noMemberEmail").html( viewText );
			$(".noMemberEmail").css("display", '');

		}else if  ( resultNo == "-2" ) {
			alert(resultMessage);
		}else {
			$(".noMemberEmail").html('<span class="ico_comm_s warning"></span>등록된 이메일이 없습니다.');
			$(".noMemberEmail").css("display", "");
		}
	}else if ( info == "pw" ){ 
		if  ( resultNo == "1" ) {
			alert("임시비밀번호가 발송되었습니다\n\n이메일을 확인해주세요");					
		}else if  ( resultNo == "-1" ) {
			alert(resultMessage);
		}
	}
}

/*
 * 로그 아웃
 */
function fn_logout(){
	// 파라미터 설명
	// 0. url (로그아웃 후 이동할 URL)

	var url = arguments[0];
	var goReturnUrl;	

	(url != undefined) ? goReturnUrl = url : goReturnUrl = '/';

	$.ajax({
		type:"POST",
		data:{},
		url:"/?_c=mypage&_m=login&_a=logout",
		dataType:"text",
		success:function(reparam){
			if (reparam == "OK") {
				fn_SnsLogout();
				top.location.href = goReturnUrl;
			} else {
				alert("다시 로그아웃 하시기 바랍니다.");
				return false;
			}
		},
		error:function(reparam){
			//console.log("error");
		}
	});
}

/*
 *  실명인증 팝업창 
 */  
function fn_SelfCertPopUp(){
	var newwin = window.open("/?_c=comm&_m=certification&_a=SelfCert","_selfCert","width=550,height=550"); 
	if (newwin == null){ 
		alert("팝업 차단기능이 동작중입니다. 팝업 차단 기능을 해제한 후 다시 시도하세요."); 
	}
}


/* 
 * 실명인증 결과값 반환
 */
function fn_SelfCertResult(jsonData){
	setSelfJson = jQuery.parseJSON( jsonData );
	if ( setSelfJson.ResultCode == "0000")
	{
		$("#hdnAuthCheck").val("true")	;
		$("#obj_span_mobile_auth").html( "<p class=\"confirmation_finish\"><span>OK</span>인증이 완료되었습니다.</p>" );
	}

	$("body").append('<span class="seflCert_LGD_RESPCODE"></span><span class="seflCert_LGD_MOBILENUM"></span><span class="seflCert_LGD_MOBILE_SUBAUTH_NAME"></span>');
	$(".seflCert_LGD_RESPCODE").html( setSelfJson.ResultCode ) ; // "0000" 이면
																	// 인증완료
	$(".seflCert_LGD_MOBILENUM").html( setSelfJson.ResultData[0]["LGD_MOBILENUM"] );      // 인증 폰
																							// 번호
	$(".seflCert_LGD_MOBILE_SUBAUTH_NAME").html( setSelfJson.ResultData[0]["LGD_MOBILE_SUBAUTH_NAME"] ); // 인증
																											// 실명
	//console.log( $(".seflCert_LGD_RESPCODE").html() );
	// 결과값은 $(".seflCert_LGD_RESPCODE").html() 로 스크립트에서 확인
	// 세부결과는 /W1/Views/Comm/SelfCertificationRes.asp 파일에서 확인 가능

}

function fn_enter(e){
	if ( e.keyCode == "13"){
		fn_login();
	}
}

function setLoggedIn() {
	$('ul.my_utils .login_status').attr('onclick', 'fn_logout();').addClass('on').text('로그아웃');
	$('ul.my_utils .mypage').attr('href', '/?_c=mypage&_m=mypage').text('마이페이지');
	$('ul.my_utils .myact').attr('href', '/?_c=mypage&_m=mytrace').text('나의관심');
}