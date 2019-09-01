function setCookie(item,value,dates) {
	var today = new Date();
	if (dates) {
		today.setDate(today.getDate()+dates);
	}
	else {
		today.setDate(today.getDate()+365);
	}
	document.cookie = item+"="+encodeURIComponent(value)+";path=/;expires="+today.toGMTString()+";";
}

function setCookieAdd(item,value,dates) {
	document.cookie = item+"="+encodeURIComponent(value)+";path=/;expires="+dates.toGMTString()+";";
}

function setCookieAt00(item,value,expiredays ) {   
    var todayDate = new Date();   
    todayDate = new Date(parseInt(todayDate.getTime() / 86400000) * 86400000 + 54000000);  
    if ( todayDate > new Date() )  {  
    	expiredays = expiredays - 1;  
    }  
    todayDate.setDate( todayDate.getDate() + expiredays );   
    document.cookie = item + "=" + encodeURIComponent( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";";   
 }

function getCookie(item) {
	var allcookies = document.cookie;
	var cookies = allcookies.split("; ");
    for (var i = 0; i < cookies.length; i++) {
    	var ch = cookies[i].split("=");
    	if (decodeURIComponent(ch[0]) == item) {
    		return ch[1];
    	}
    }
    return "";
}

function getCookieReturnDecode(item) {
	var allcookies = document.cookie;
	var cookies = allcookies.split("; ");
    for (var i = 0; i < cookies.length; i++) {
    	var ch = cookies[i].split("=");
    	if (decodeURIComponent(ch[0]) == item) {
    		return decodeURIComponent(ch[1]);
    	}
    }
    return "";
}

function delCookie(item) {
	var today = new Date();
	today.setDate(today.getDate()-1);
	document.cookie = item+"=;domain=;path=/;expires="+today.toGMTString()+";";
}

// 비밀번호 유효성 검사
function fn_comm_check_password_regex(checkStr) {
	var regex_default = /^[a-zA-Z0-9\`\~\!\@\#\$\%\^\&\*\(\)\-\=\_\+\[\]\\\{\}\|\,\.\/\<\>\?]{10,20}$/;
	var regex1 = /[a-z]/;
	var regex2 = /[A-Z]/;
	var regex3 = /[0-9]/;
	var regex4 = /[\`\~\!\@\#\$\%\^\&\*\(\)\-\=\_\+\[\]\\\{\}\|\,\.\/\<\>\?]/;
	var regex_count = 0;

	if (!regex_default.test(checkStr)) {
		alert("비밀번호는 10~20자의 영문 (소/대), 숫자, 특수기호 중 2종류 이상 조합하여야 가능합니다");
		return false;
	}
	else {
		for (var i=1; i<5; i++) {
			var _obj = eval("regex"+i);
            if (checkStr.search(_obj) >= 0) regex_count++;
		}

		if (regex_count >= 2) {
			return true;
		}
		else {
			alert("비밀번호는 10~20자의 영문 (소/대), 숫자, 특수기호 중 2종류 이상 조합하여야 가능합니다");
			return false;
		}
	}
}

// 비밀번호 체크
function fn_comm_check_password(inputPwdId,inputTxtId,inputPwdId2,inputTxtId2) {
	var inputId = inputPwdId;
	if ($("#"+inputPwdId).css("display") == "none") {
		inputId = inputTxtId;
	}

	if ($("#"+inputId).val() == "") {
		alert("비밀번호를 입력해주세요.");
		$("#"+inputPwdId).addClass("warning");
		$("#"+inputTxtId).addClass("warning");
		$("#"+inputId).focus();
		return false;
	}
	if (typeof(inputPwdId2) != "undefined") {
		if (!fn_comm_check_password_regex($("#"+inputId).val())) {
			$("#"+inputPwdId).addClass("warning");
			$("#"+inputTxtId).addClass("warning");
			$("#"+inputId).focus();
			return false;
		}

		var inputId2 = inputPwdId2;
		if ($("#"+inputPwdId2).css("display") == "none") {
			inputId2 = inputTxtId2;
		}

		if ($("#"+inputId2).val() == "") {
			alert("비밀번호를 입력해주세요.");
			$("#"+inputPwdId2).addClass("warning");
			$("#"+inputTxtId2).addClass("warning");
			$("#"+inputId2).focus();
			return false;
		}
		if (!fn_comm_check_password_regex($("#"+inputPwdId2).val())) {
			$("#"+inputPwdId2).addClass("warning");
			$("#"+inputTxtId2).addClass("warning");
			$("#"+inputId2).focus();
			return false;
		}

		if ($("#"+inputId).val() != $("#"+inputId2).val()) {
			alert("비밀번호를 확인해주세요.");
			$("#"+inputPwdId2).addClass("warning");
			$("#"+inputTxtId2).addClass("warning");
			$("#"+inputId2).focus();
			return false;
		}
	}
	return true;
}

// 비밀번호 마스킹 처리
function fn_comm_text_mask_password(btnId,inputPwdId,inputTxtId) {
	// 비밀번호 입력 필드 동기화
    $("#" + inputPwdId).on('change', function(e) {
		$("#"+inputTxtId).val($("#"+inputPwdId).val());
	});
    $("#" + inputTxtId).on('change', function(e) {
		$("#"+inputPwdId).val($("#"+inputTxtId).val());
	});

	// 비밀번호 입력 눈 모양 버튼
    $("#" + btnId).on('click', function(e) {
		if($("#"+inputPwdId).css("display") == "none") {
			$("#"+inputPwdId).show();
			$("#"+inputTxtId).hide();
		} else {
			$("#"+inputPwdId).hide();
			$("#"+inputTxtId).show();
		}
	});
}

// 이메일 유효성 검사
function fn_comm_check_email(checkStr) {
	var atCnt = 0;
	if (checkStr.length < 5) return false;

	for (i = 0; i < checkStr.length; i++) {
		if (checkStr.charAt(i) == '@') {
			if (i == 0 || i == checkStr.length - 1) {return false;}
			atCnt++;
		} else if (checkStr.charCodeAt(i) > 255) {return false;} // Korean
	}

	if (atCnt != 1) {return false;}

	return true;
}

// 이메일 자동완성
function fn_comm_set_auto_email() {	// onload 후에 호출할 것
	var domainList = new Array();
	var domainArr = new Array();
	$.ajax({
		type:"POST",
		url:"./?c=user&m=emailDomain&p=AJAX",
		dataType:"json",
		success:function(reparam){
			$.each(reparam, function(index, entry) {
				domainArr = new Array();
				domainArr[0] = entry.code;
				domainArr[1] = entry.codeNm;
				domainArr[2] = entry.key1;
				domainList[index] = domainArr;
			});
		},
		error:function(reparam){
			//console.log(reparam);
			//console.log("error");
		}
	});

	$(".autoComplete .inp_txt").keyup(function (e) {
		if($(this).val().indexOf("@") > -1){	// "@" 입력시에 자동완성목록 표시()
			var emailId = $(this).val().split("@")[0];
			var emailDom = $(this).val().split("@")[1];
			$(".autoComplete_list >").remove();	// 모두 제거하고 다시 그려야 한다
			for (var i=0; i<domainList.length; i++) {
				if (domainList[i][2].indexOf(emailDom) == 0) {
					$(".autoComplete_list").append('<li><a href="#">'+emailId+'@'+domainList[i][2]+'</a></li>');
				}
			}
			$(".autoComplete_list").append('<li class="btn"><a href="#">취소</a></li>');
		}
	});

	// 자동완성 목록 클릭시
	$(document).on('click', '.autoComplete_list li:not(.btn) ', function() {
		$(".autoComplete .inp_txt").val($(this).text());
		$(this).parents(".autoComplete").find('.autoComplete_list').removeAttr("style");
	});
	// 자동완성 목록 취소 클릭시
	$(document).on('click', '.autoComplete_list .btn ', function() {
		//$(".autoComplete .inp_txt").val("");
		$(this).parents(".autoComplete").find('.autoComplete_list').removeAttr("style");
	});
	//$(".autoComplete").blur(function (e) {
	//	$(this).find('.autoComplete_list').removeAttr("style");
	//});
}

//확인창
//fn_comm_layer_alert('','이미 참여되셨습니다.','확인',fn_callback);
//fn_comm_layer_alert('공개상담','열람료를 지불한 회원에게 모두 공개됩니다.','확인',fn_callback);
function fn_comm_layer_alert(txtTitle, txtBody, txtButton, callbackFn) {
	document.activeElement.blur();
	openPop("id_m4232");
	if (txtTitle == "") { $("#lp_layout .id_m4232 .title").remove(); }
	else { $("#lp_layout .id_m4232 .title").text(txtTitle); }
	$("#lp_layout .id_m4232 .txt").html(txtBody);
	$("#lp_layout .id_m4232 #btn_popup_ok").text(txtButton);
	$("#lp_layout .id_m4232 #btn_popup_ok").unbind("click");
	$("#lp_layout .id_m4232 #btn_popup_ok").click('click', function (e) {
		e.stopPropagation();
		e.preventDefault();

		if (jQuery.isFunction(callbackFn) || jQuery.isFunction(callbackFn) == true)
		{
			callbackFn(1);
		}
		closePop();
		//$("#"+focusInput).focus();
	});
}
// 확인취소창
// fn_comm_layer_confirm('댓글 작성','투표에 참여해주셔서 감사합니다.<br />댓글 페이지로 이동하시겠습니까?<br />','등록',fn_callback,'취소',취소용fn_callback);
function fn_comm_layer_confirm(txtTitle, txtBody, txtButton, callbackFn, c_txtButton, c_callbackFn) {
	document.activeElement.blur();
	openPop("id_sample");

	if (txtButton == "") { txtButton = "확인"; }
	if (c_txtButton == "") { c_txtButton = "취소"; }

	$("#lp_layout .id_sample .title").text(txtTitle);
	$("#lp_layout .id_sample .txt").html(txtBody);
	$("#lp_layout .id_sample #btn_popup_ok").text(txtButton);
	$("#lp_layout .id_sample #btn_popup_cancel").text(c_txtButton);
	$("#lp_layout .id_sample #btn_popup_ok").unbind("click");
	$("#lp_layout .id_sample #btn_popup_ok").click(function (e) {
		callbackFn(1);
		closePop();
		//$("#"+focusInput).focus();
	});
	$("#lp_layout .id_sample #btn_popup_cancel").unbind("click");
	$("#lp_layout .id_sample #btn_popup_cancel").click(function (e) {
		c_callbackFn(1);
		closePop();
		//$("#"+focusInput).focus();
	});
}

// 필명 수정 팝업
function fn_comm_layer_open_nickNm(callbackFn) {
	$("#lp_layout .id_m4226 #txt_popup_newNickNm").val("");
	fn_comm_layer_clear_nickNm();
	openPop("id_m4226");
	$.ajax({
		type:"POST",
		url:"./?c=user&m=findNickNm&p=AJAX",
		dataType:"json",
		success:function(reparam){
			if (reparam.resultNo == "-9999") {
				if (confirm("로그인이 필요합니다.")) {
					window.location.href = "/?c=user&m=login";
				}
				return false;
			} else {
				$("#lp_layout .id_m4226 #div_popup_nickNm").text(reparam.nickNm);
			}
		},
		error:function(reparam){
			//console.log(reparam);
			//console.log("error");
		}
	});

	$("#lp_layout .id_m4226 #txt_popup_newNickNm").keyup(function(e) {
		fn_comm_layer_clear_nickNm();
	});
	$("#lp_layout .id_m4226 #btn_popup_dupCheck").click(function(e) {
		fn_comm_layer_find_nickNm();
	});
	$("#lp_layout .id_m4226 #btn_popup_ok").click(function(e) {
		fn_comm_layer_update_nickNm(callbackFn);
	});
}
// 필명 초기화
function fn_comm_layer_clear_nickNm() {
	$("#lp_layout .id_m4226 .formBox").removeClass("warning");
	$("#lp_layout .id_m4226 #lbl_popup_okNickNm #lbl_popup_newNickNm").text("");
	$("#lp_layout .id_m4226 #lbl_popup_okNickNm").hide();
	$("#lp_layout .id_m4226 #div_popup_btnSet1").show();
	$("#lp_layout .id_m4226 #div_popup_btnSet2").hide();
}
// 필명 중복 확인
function fn_comm_layer_find_nickNm() {
	var newNickNm = $("#lp_layout .id_m4226 #txt_popup_newNickNm").val();
	$.ajax({
		type:"POST",
		data:JSON.parse('{"nick_nm":"'+newNickNm+'"}'),
		url:"./?c=user&m=findNickNm&p=AJAX",
		dataType:"json",
		success:function(reparam){
			if (reparam.resultNo == "-9999") {
				if (confirm("로그인이 필요합니다.")) {
					window.location.href = "/?c=user&m=login";
				}
				return false;
			} else {
				if (reparam.nickNm == "") {
					$("#lp_layout .id_m4226 .formBox").removeClass("warning");
					$("#lp_layout .id_m4226 #lbl_popup_okNickNm #lbl_popup_newNickNm").text(newNickNm);
					$("#lp_layout .id_m4226 #lbl_popup_okNickNm").show();
					$("#lp_layout .id_m4226 #div_popup_btnSet1").hide();
					$("#lp_layout .id_m4226 #div_popup_btnSet2").show();
				} else {
					$("#lp_layout .id_m4226 .formBox").addClass("warning");
					$("#lp_layout .id_m4226 #lbl_popup_okNickNm").hide();
					$("#lp_layout .id_m4226 #div_popup_btnSet1").show();
					$("#lp_layout .id_m4226 #div_popup_btnSet2").hide();
				}
				//$("#lp_layout .id_m4226 #div_nickNm").text(reparam.nickNm);
			}
		},
		error:function(reparam){
			//console.log(reparam);
			//console.log("error");
		}
	});
}
// 필명 수정
function fn_comm_layer_update_nickNm(callbackFn) {
	var newNickNm = $("#lp_layout .id_m4226 #txt_popup_newNickNm").val();
	$.ajax({
		type:"POST",
		data:JSON.parse('{"nick_nm":"'+newNickNm+'"}'),
		url:"./?c=user&m=updateNickNm&p=AJAX",
		success:function(reparam){
			if (reparam.resultNo == "-9999") {
				if (confirm("로그인이 필요합니다.")) {
					window.location.href = "/?c=user&m=login";
				}
				return false;
			} else {
				callbackFn(1);
			}
		},
		error:function(reparam){
			//console.log(reparam);
			//console.log("error");
		}
	});
}

// textarea 창
function fn_comm_layer_textarea(txtTitle,callbackFn) {
	openPop("id_m152");
	$("#lp_layout .id_m152 .title").text(txtTitle);
	$("#lp_layout .id_m152 #btn_popup_ok").unbind("click");
	$("#lp_layout .id_m152 #btn_popup_ok").click(function (e) {
		callbackFn(1);
		closePop();
	});
}

// SNS 공유하기
function fn_comm_layer_share_sns(txtUrl) {
	openPop("id_m101");
	$("#lp_layout .id_m101 input:text").val(txtUrl);
}

//이미지갤러리 창
function fn_comm_layer_gallery(img1,img2,img3,img4,img5) {
	openPop("id_m1031");
	if (img1 != "") {
		$("#lp_layout .id_m1031 #li_img1").attr("src",img1);
	}
	if (img2 != "") {
		$("#lp_layout .id_m1031 #li_img2").attr("src",img2);
	}
	if (img3 != "") {
		$("#lp_layout .id_m1031 #li_img3").attr("src",img3);
	}
	if (img4 != "") {
		$("#lp_layout .id_m1031 #li_img4").attr("src",img4);
	}
	if (img5 != "") {
		$("#lp_layout .id_m1031 #li_img5").attr("src",img5);
	}
}

//이미지갤러리 창2
function fn_comm_layer_gallery2(jsonArr) {
	$("#lp_layout .id_m1032 ul >").remove();
	$.each(jsonArr,function(index,entry) {
		//console.log(entry.srcUrl);
		if (entry.mediaGbn == "1") {
			$("#lp_layout .id_m1032 ul").append('<li><img src="'+entry.srcUrl+'" alt="사진'+index+'"></li>');
		} else if (entry.mediaGbn == "2") {
			$("#lp_layout .id_m1032 ul").append('<li><video style="width:100%;" controls><source src="'+entry.srcUrl+'" type="video/mp4"></video></li>');
		}
	});
	openPop("id_m1032");
	open_touchSliderManual();
	$(".sliderBox > ul > li > img").load(function(){	// 동적으로 생성된 사진list의 경우 약간의 시간차가 발생하여 height가 먹히지 않으므로 이미지를 모두 load 한 후에 height 처리
		sliderBox_height();
	});
	$('.sliderBox > ul > li > video').on('loadeddata', function() {	// 동적으로 생성된 동영상list의 경우 약간의 시간차가 발생하여 height가 먹히지 않으므로 동영상을 모두 load 한 후에 height 처리
		sliderBox_height();
	});
}

//필터
function fn_comm_layer_filter(selectedFilter,selectedTags,callbackFn) {
	openPop2("id_m3110");

	//초기화
	$("#lp_layout2 .id_m3110 .result_tag >").remove();
//	if (selectedFilter == "") selectedFilter = 2;	// 투자선택

//	$("#lp_layout2 .id_m3110 [name=filter_type]:radio[value='"+selectedFilter+"']").trigger("click");	// 필터 선택된 값으로 셋팅

	// 태그 선택된 값들 셋팅
	if (selectedTags != "") {
		$("#lp_layout2 .id_m3110 .result_tag").show();
		var selectedTagArr = selectedTags.split(",");
		for (var i=0; i<selectedTagArr.length; i++) {
			$("#lp_layout2 .id_m3110 .result_tag").append('<button type="button" class="fc_purple">'+selectedTagArr[i]+' <span class="ico_comm del_item">삭제</span></button>');
		}
	}

//	$("#lp_layout2 .id_m3110 [name=filter_type]").change(function(e) {	// 필터 선택시
//		$("#lp_layout2 .id_m3110 .result_tag >").remove();
//		$("#lp_layout2 .id_m3110 .inp_txt").focus();
//	});

	$("#lp_layout2 .id_m3110 .inp_txt").keyup(function() {	// 태그 검색시
		if($(this).val() == ""){
			$(this).parent().parent().find('.search_result').removeAttr("style");
		} else if ($(this).val().length >= 2) {	// 2글자 이상시 자동완성목록 표시
			$(this).parent().parent().find('.search_result').show();
			$("#lp_layout2 .id_m3110 .list_result >").remove();
			$.ajax({
				type:"POST",
				data:{"tag":$(this).val()},
				url:"./?c=comm&m=tagList&p=AJAX",
				dataType:"json",
				success:function(reparam){
					$("#lp_layout2 .id_m3110 .list_result >").remove();
					if (reparam.length < 1) {
						$("#lp_layout2 .id_m3110 .list_result").append('<li>검색 결과가 없습니다.</li>');
					} else {
						$.each(reparam, function(index, entry) {
							$("#lp_layout2 .id_m3110 .list_result").append('<li><a href="#none" onclick="fn_setTag(\''+entry.tag+'\')"><span class="txt_result">#'+entry.tag+'</span></a></li>')
						});
					}
				},
				error:function(reparam){
					//console.log(reparam);
					//console.log("error");
				}
			});
		}
	});

	$("#lp_layout2 .id_m3110 .btn_search").click(function(e) {	// 검색 버튼 클릭시
		e.preventDefault();
		$("#lp_layout2 .id_m3110 .search_result").show();
		$("#lp_layout2 .id_m3110 .list_result >").remove();
		$.ajax({
			type:"POST",
			data:{"tag":$("#lp_layout2 .id_m3110 .inp_txt").val()},
			url:"./?c=comm&m=tagList&p=AJAX",
			dataType:"json",
			success:function(reparam){
				$("#lp_layout2 .id_m3110 .list_result >").remove();
				if (reparam.length < 1) {
					$("#lp_layout2 .id_m3110 .list_result").append('<li>검색 결과가 없습니다.</li>');
				} else {
					$.each(reparam, function(index, entry) {
						$("#lp_layout2 .id_m3110 .list_result").append('<li><a href="#none" onclick="fn_setTag(\''+entry.tag+'\')"><span class="txt_result">#'+entry.tag+'</span></a></li>')
					});
				}
			},
			error:function(reparam){
				//console.log(reparam);
				//console.log("error");
			}
		});
	});


	$(document).on("click", "#lp_layout2 .id_m3110 .result_tag .del_item", function(e) {	// 태그 삭제 클릭시
		$(this).unbind("click");
		$(this).parent().remove();
		if ($("#lp_layout2 .id_m3110 .result_tag button").length == 0) $("#lp_layout2 .id_m3110 .result_tag").hide();
	});

	$("#lp_layout2 .id_m3110 #btn_popup_ok").unbind("click");
	$("#lp_layout2 .id_m3110 #btn_popup_ok").click(function(e) {
		var tags = "";
		$.each($("#lp_layout2 .id_m3110 .result_tag button"), function(index, entry) {
			tags = tags+$(this).text().replaceAll(" ","").replaceAll("삭제","") + ",";
		});
		callbackFn($("#lp_layout2 .id_m3110 [name=filter_type]:checked").val(), tags.substring(0,tags.length-1));
	});
}
function fn_setTag(item) {	// 검색한 태그 선택시
	var tag = item.replaceAll(" ","").replaceAll("#","");
	$.each($("#lp_layout2 .id_m3110 .result_tag button"), function(index, entry) {
		// 중복 검사
		if (tag == $(entry).text().replaceAll(" ","").replaceAll("#","").replaceAll("삭제","")) {
			alert("이미 존재하는 태그입니다.");
			tag = "";
		}
	});
	if (tag != "") {
		if ($("#lp_layout2 .id_m3110 .result_tag").css('display') == 'none') $("#lp_layout2 .id_m3110 .result_tag").show();
		$("#lp_layout2 .id_m3110 .result_tag").append('<button type="button" class="fc_purple">'+tag+' <span class="ico_comm del_item">삭제</span></button>');
	}
	$("#lp_layout2 .id_m3110 .inp_txt").val("");
}

//필터2 - obj : json data {progress_step, bank_book, building_type, smoney, emoney}
function fn_comm_layer_filter2(obj, callbackFn) {
	openPop2("id_m331");

	var $layer = $('#lp_layout2 .id_m331');

	$layer.find("#btn_popup_ok").unbind("click");

	// 초기값 세팅
	if (obj) {
		$layer.find('input:checkbox[name="progress_step"]').each(function(index) {
			$(this).prop('checked', ($(this).val() & obj.progress_step));
		});
		$layer.find('input:radio[name="bank_book"][value="'+ obj.bank_book +'"]').prop("checked", true);
		$layer.find('input:radio[name="building_type"][value="'+ obj.building_type +'"]').prop("checked", true);
		if (obj.smoney > 0 || obj.emoney > 0) {
			$layer.find('input[name="smoney"]').val(obj.smoney);
			$layer.find('input[name="emoney"]').val(obj.emoney);
			$("#lp_layout2 .id_m331 #slider-range").slider({values: [obj.smoney, obj.emoney]});
		} else {
			$layer.find('input[name="smoney"]').val('');
			$layer.find('input[name="emoney"]').val('');
			$("#lp_layout2 .id_m331 #slider-range").slider({values: [0, 100000]});
		}
	}

	$layer.find("#btn_popup_ok").click(function(e) {
		var arr = new Array();
		var bank_book, building_type;

		$layer.find('input:checkbox[name="progress_step"]:checked').each(function(index) {
			arr[index] = $(this).val();
		});
		bank_book = ($layer.find('input:radio[name="bank_book"]:checked').size() == 0) ? '' : $layer.find('input:radio[name="bank_book"]:checked').val();
		building_type = ($layer.find('input:radio[name="building_type"]:checked').size() == 0) ? '' : $layer.find('input:radio[name="building_type"]:checked').val();
		var rtn = {
			progress_step: arr,
			bank_book: bank_book,
			building_type: building_type,
			smoney: $layer.find('input[name="smoney"]').val(),
			emoney: $layer.find('input[name="emoney"]').val()
		}
		callbackFn(rtn);
	});
}

//매물유형
function fn_comm_layer_sale_type(txtSearch, callbackFn) {
	openPop2("id_m433");

	var $layer = $('#lp_layout2 .id_m433');

	$layer.find("#btn_popup_ok").unbind("click");
	if (txtSearch) {
		$layer.find('input:radio[name="landType1"][value="'+ txtSearch +'"]').prop("checked", true);
	}

	$("#lp_layout2 .id_m433 #btn_popup_ok").unbind("click");
	$("#lp_layout2 .id_m433 #btn_popup_ok").click(function(e) {
		callbackFn(this);
	});
}

//지역
/* 사용법
<input type="text" id="txt_area" name="txt_area"
	onclick="fn_comm_layer_area('txtArea');">
<input type="hidden" id="txtArea" name="txtArea" value="" />

$("#txtArea").change(function(e) {
	var area = ($(this).val().replaceAll("전체","")).split(" ");
	$("#txt_area").val(area[0]+"/"+area[1]+"/"+area[2]);
});
 */
var txtInput;
var limitLevel;
function fn_comm_layer_area(txtParam, txtLimitLevel, txtPlaceHolder) {
	txtInput = txtParam;
	if (typeof txtLimitLevel != "undefined") {
		limitLevel = txtLimitLevel;	// '3'이면 시구동 전체 제외
	} else {
		limitLevel = "";
	}
	if (typeof txtPlaceHolder != "undefined" && txtPlaceHolder != "") {
		$(".id_m1020 .search_frm .inp_txt").attr("placeholder",txtPlaceHolder);
	}

	openPop4("id_m1020");
	$("#lp_layout4").css("z-index", "1000");
	$("div.list_area_wrap").css("height", "295px");

    show_areaRecentSearch();

	$(".id_m1020 .search_frm .inp_txt").keyup(function(e) {
		if($(this).val() == ""){
			$(this).parent().parent().find('.search_result').removeAttr("style");
		}else if(e.keyCode==13){	// 엔터시 자동완성목록 표시
			$(this).parent().parent().find('.search_result').css('display','block');
		}
	});

	// 초기화
	$(".id_m1020 .n1 #txt_popup_item").val($("#"+txtParam).val());
	$('.id_m1020 .n1 .search_result').removeAttr("style");	// 자동완성 창 숨기기
	if ($("#"+txtParam).val().replaceAll(" ","") == "") {
		$(".id_m1020 .n1 #txt_popup_item").val("");
	} else {
		$(".id_m1020 .n2 #item1").text($("#"+txtParam).val().split(" ")[0]);
		$(".id_m1020 .n2 #item2").text($("#"+txtParam).val().split(" ")[1]);
		$(".id_m1020 .n2 #item3").text($("#"+txtParam).val().split(" ")[2]);
	}

	// 직접입력

	$(".id_m1020 .n1 #txt_popup_item").keyup(function(e) {
		if (e.keyCode == 13) {	// 직접입력 엔터시
			if ($(".id_m1020 .n1 #txt_popup_item").val() == "") {
				alert("검색어를 입력하세요");
				$(".id_m1020 .n1 #txt_popup_item").focus();
				return false;
			}
			fn_searchAreas($(this).val());
		}
	});
	$(".id_m1020 .n1 #btn_popup_item").unbind();	// unbind()를 하지 않으면 click 이벤트가 두번 호출된다.
	$(".id_m1020 .n1 #btn_popup_item").click(function(e) {	// 직접입력 검색 버튼
		if ($(".id_m1020 .n1 #txt_popup_item").val() == "") {
			alert("검색어를 입력하세요");
			$(".id_m1020 .n1 #txt_popup_item").focus();
			return false;
		}
		$('.id_m1020 .n1 .search_result').css('display','block');
		fn_searchAreas($(".id_m1020 .n1 #txt_popup_item").val());
	});
	//$(".id_m1020 .n1 #txt_popup_item").blur(function (e) {
	//	$('.id_m1020 .n1 .search_result').removeAttr("style");	// 창 숨기기
	//});
	//$(".id_m1020 .n1 #btn_popup_item").blur(function (e) {
	//	$('.id_m1020 .n1 .search_result').removeAttr("style");	// 창 숨기기
	//});

	// 선택입력
	fn_searchAreaItems(1,"","");	// 도/시 목록 조회

	// 도시,시구군,읍면동 선택시 목록 조회
	$(".id_m1020 .n2 #btn_popup_item1").unbind();
	$(".id_m1020 .n2 #btn_popup_item1").click(function(e) {
		fn_searchAreaItems(1,$(".id_m1020 .n2 #item1").text(),$(".id_m1020 .n2 #item2").text());
	});
	$(".id_m1020 .n2 #btn_popup_item2").unbind();
	$(".id_m1020 .n2 #btn_popup_item2").click(function(e) {
		fn_searchAreaItems(2,$(".id_m1020 .n2 #item1").text(),$(".id_m1020 .n2 #item2").text());
	});
	$(".id_m1020 .n2 #btn_popup_item3").unbind();
	$(".id_m1020 .n2 #btn_popup_item3").click(function(e) {
		fn_searchAreaItems(3,$(".id_m1020 .n2 #item1").text(),$(".id_m1020 .n2 #item2").text());
	});
}
// 직접입력
function fn_searchAreas(item) {
	$.ajax({
		type:"POST",
		data:JSON.parse('{"level":"4","item":"'+item+'","limitLevel":"'+limitLevel+'"}'),
		url:"./?c=comm&m=areaList&p=AJAX",
		dataType:"json",
		success:function(reparam){
			$(".id_m1020 .n1 .list_result >").remove();
			$.each(reparam, function(index, entry) {
				var areaNm = entry.areaNm1+" "+entry.areaNm2+" "+entry.areaNm3;
				var areaHtml = areaNm.replaceAll(item,'<em class="fc_purple">'+item+'</em>');	// 입력값과 일치할 경우 강조
				$(".id_m1020 .n1 .list_result").append('<li><a href="#none" onclick="fn_selectArea(\''+areaNm+'\');"><span class="txt_result">'+areaHtml+'</span><span class="ico_comm ico_arrow"></span></a></li>');
			});
			//console.log('list_result_comple');
		},
		error:function(reparam){
			//console.log(reparam);
			//console.log("error");
		}
	});
}
function fn_selectArea(areaNm, chk) {
	areaNm = (areaNm.replaceAll('<em class="fc_purple">','')).replaceAll('</em>','');
	add_areaRecentSearch(jQuery.trim(areaNm));
	closePop4();
	$("#"+txtInput).val(areaNm).trigger('change'); // hidden을 change 해 줄 경우 trigger 필요
}
// 선택입력
function fn_searchAreaItems(level, areaNm1, areaNm2) {
	$.ajax({
		type:"POST",
		data:JSON.parse('{"level":"'+level+'","item1":"'+areaNm1+'","item2":"'+areaNm2+'"}'),
		url:"./?c=comm&m=areaList&p=AJAX",
		dataType:"json",
		success:function(reparam){
			$(".id_m1020 .n2 .list_area >").remove();
			if (limitLevel != "3") {
				$(".id_m1020 .n2 .list_area").append('<li><input type="radio" name="area1" id="area1" onclick="fn_selectAreaItem('+level+',\'전체\');"><label for="area1">전체</label></li>');
			}
			$.each(reparam, function(index, entry) {
				$(".id_m1020 .n2 .list_area").append('<li><input type="radio" name="area1" id="area1_'+index+'" onclick="fn_selectAreaItem('+level+',\''+entry.areaNm+'\');"><label for="area1_'+index+'">'+entry.areaNm+'</label></li>');
			});
		},
		error:function(reparam){
			//console.log(reparam);
			//console.log("error");
		}
	});
}
function fn_selectAreaItem(level, areaNm) {
	$(".id_m1020 .n2 #item"+level).text(areaNm);
	if (level == 3 || areaNm == "전체") {	// 전체를 선택했는데_
		if (((level == 2 || level == 3) && $(".id_m1020 .n2 #item1").text() == '도/시')	// _도시를 선택하지 않았을 때
			|| (level == 3 && $(".id_m1020 .n2 #item2").text() == '시/구/군')) {	// _시구군을 선택하지 않았을 때
			// 종료 안 함
		} else {	// 종료
			if ($(".id_m1020 .n2 #item1").text() == '전체') {	// _선택한 전체가 도시일경우
				$(".id_m1020 .n2 #item2").text("전체");
				$(".id_m1020 .n2 #item3").text("전체");
			} else if ($(".id_m1020 .n2 #item2").text() == '전체') {	// _선택한 전체가 시구군일경우
				$(".id_m1020 .n2 #item3").text("전체");
			}
			var recent_search_text = $(".id_m1020 .n2 #item1").text()+" "+$(".id_m1020 .n2 #item2").text()+" "+$(".id_m1020 .n2 #item3").text();
			recent_search_text = jQuery.trim(recent_search_text.replaceAll('전체', ''));
			if (recent_search_text != '') {
				add_areaRecentSearch(recent_search_text);
			}
			closePop4();
			$("#"+txtInput).val($(".id_m1020 .n2 #item1").text()+" "+$(".id_m1020 .n2 #item2").text()+" "+$(".id_m1020 .n2 #item3").text()).trigger('change'); // hidden을 change 해 줄 경우 trigger 필요
		}
	} else {
		if (level == 1) {
			// 도시미만 초기화
			$(".id_m1020 .n2 #item2").text('시/구/군');
			$(".id_m1020 .n2 #item3").text('읍/면/동');
		} else if (level == 2) {
			// 시구군미만 초기화
			$(".id_m1020 .n2 #item3").text('읍/면/동');
		}
		fn_searchAreaItems(level+1, $(".id_m1020 .n2 #item1").text(), $(".id_m1020 .n2 #item2").text());
	}
}

// 지역검색(리스트)
function fn_comm_layer_area2(strSearchFrm, gbn, strCallbackFn, level) {
	$("#body_layout .search_frm .inp_txt").keyup(function(e) {
		if($(this).val() == ""){
			$(this).parent().parent().find('.search_result').removeAttr("style");
		} else {
			// 0.7초 타임아웃 설정
			var self = this;
		    if (self.timer)
				clearTimeout(self.timer);

			if (gbn == "2" && $(this).val().length >= 2) {	// 2글자 이상시 자동완성목록 표시
				$(this).parent().parent().find('.search_result').css('display','block');

				self.timer = setTimeout(function ()
				{
					self.timer = null;

					fn_searchArea2(strSearchFrm,strCallbackFn, level)
				}, 700);
			}
		}
	});
}
function fn_searchArea2(strSearchFrm,strCallbackFn, level) {
	if (typeof level == "undefined") { level = "5"; }
	var item = $("#"+strSearchFrm+" .inp_wrap .inp_txt").val();
	$.ajax({
		type:"POST",
		data:JSON.parse('{"level":"'+level+'","item":"'+item+'"}'),
		url:"./?c=comm&m=areaList&p=AJAX",
		dataType:"json",
		success:function(reparam){
			$("#"+strSearchFrm+" .search_result .list_result >").remove();
			$.each(reparam, function(index, entry) {
				if (entry.complexCd != null && entry.complexCd != "") {
					var areaNm = entry.areaNm1+" "+entry.areaNm2+" "+entry.areaNm3+" "+entry.complexNm;
					var areaHtml = areaNm.replaceAll(item,'<em class="fc_purple">'+item+'</em>');	// 입력값과 일치할 경우 강조
					$("#"+strSearchFrm+" .search_result .list_result").append('<li><a href="#none" onclick="'+strCallbackFn+'(\''+entry.complexCd+'\',\''+areaNm+'\');"><span class="txt_result">'+areaHtml+'</span><span class="ico_comm ico_arrow"></span></a></li>');
				} else {
					var areaNm = entry.areaNm1+" "+entry.areaNm2+" "+entry.areaNm3;
					var areaHtml = areaNm.replaceAll(item,'<em class="fc_purple">'+item+'</em>');	// 입력값과 일치할 경우 강조
					$("#"+strSearchFrm+" .search_result .list_result").append('<li><a href="#none" onclick="'+strCallbackFn+'(\'\',\''+areaNm+'\');"><span class="txt_result">'+areaHtml+'</span><span class="ico_comm ico_arrow"></span></a></li>');
				}
			});
		},
		error:function(reparam){
			//console.log(reparam);
			//console.log("error");
		}
	});
}

//지역검색(도/시 목록)
function fn_comm_layer_only_area1(el, selectArea, fn_callback) {
	$.ajax({
		type:"POST",
		url:"./?c=comm&m=area1List&p=AJAX",
		dataType:"json",
		success:function(reparam){
			$(".id_m1022 .land_type >").remove();
			$(".id_m1022 .land_type").append('<li><input type="radio" name="landType2" id="landType2" value=",전체"><label for="landType2">전체</label></li>');
			$.each(reparam, function(index, entry) {
				var rdoCheck = "";
				if (entry.cd == selectArea) {
					rdoCheck = "checked";
				}
				$(".id_m1022 .land_type").append('<li><input type="radio" name="landType2" id="landType2_'+index+'" value="'+entry.cd+','+entry.nm+'" '+rdoCheck+'><label for="landType2_'+index+'">'+entry.nm+'</label></li>');
			});
		},
		error:function(reparam){
			//console.log(reparam);
			//console.log("error");
		}
	});
	//openPop2('id_m1022');
	var pop_id = 'id_m1022';
	$("#lp_layout2").css('display','inline-block');
	$("#lp_layout2 .lp_wrap."+pop_id).css('display','inline-block');
	//$("#lp_layout2 .lp_wrap."+pop_id).css('height',$("#lp_layout2 .lp_wrap."+pop_id).height());
	$("#lp_layout2 .lp_wrap."+pop_id).css('bottom',-$(window).height());
	$("#lp_layout2 .lp_wrap."+pop_id).animate({"bottom":0},500);
	//$("body").css('overflow','hidden');

	$(".id_m1022 #btn_popup_ok").unbind("click");
	$(".id_m1022 #btn_popup_ok").click(function(e) {
		var area1 = $(".id_m1022 [name=landType2]:checked").val();
		fn_callback(el,area1.split(",")[0],area1.split(",")[1]);
	});
}

// 현재 위치 조회
function fn_comm_get_here(txtAddrId, txtCortarInfoId) {
/* 1. 현재 좌표 조회 : navigator.geolocation.getCurrentPosition + google api 이용
	var apiGeolocationSuccess = function(position) {
		alert("API geolocation success!\n\nlat = " + position.coords.latitude + "\nlng = " + position.coords.longitude);
	};

	var tryAPIGeolocation = function() {
		jQuery.post( "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDCa1LUe1vOczX1hO_iGYgyo8p_jYuGOPU", function(success) {
			apiGeolocationSuccess({coords: {latitude: success.location.lat, longitude: success.location.lng}});
	  })
	  .fail(function(err) {
	    alert("API Geolocation error! \n\n"+err);
	  });
	};

	var browserGeolocationSuccess = function(position) {
		alert("Browser geolocation success!\n\nlat = " + position.coords.latitude + "\nlng = " + position.coords.longitude);
	};

	var browserGeolocationFail = function(error) {
	  switch (error.code) {
	    case error.TIMEOUT:
	      alert("Browser geolocation error !\n\nTimeout.");
	      break;
	    case error.PERMISSION_DENIED:
	      if(error.message.indexOf("Only secure origins are allowed") == 0) {
	        tryAPIGeolocation();
	      }
	      break;
	    case error.POSITION_UNAVAILABLE:
	      alert("Browser geolocation error !\n\nPosition unavailable.");
	      break;
	  }
	};

	var tryGeolocation = function() {
	  if (navigator.geolocation) {
	    navigator.geolocation.getCurrentPosition(
	    	browserGeolocationSuccess,
	      browserGeolocationFail,
	      {maximumAge: 50000, timeout: 20000, enableHighAccuracy: true});
	  }
	};

	tryGeolocation();
*/
/* 2. 좌표로 주소 조회 : daum api 이용
	var geocoder = new daum.maps.services.Geocoder();

	var coord = new daum.maps.LatLng(37.48191664189651,127.05744179834984);
	var callback = function(status, result) {console.log(result);
		if (status === daum.maps.services.Status.OK) {
			console.log('그런 너를 마주칠까 ' + result[0].fullName + '을 못가');
		}
	};
	var callback2 = function(status, result) {console.log(result);
		if (status === daum.maps.services.Status.OK) {
			if (status === daum.maps.services.Status.OK) {

				// 요청위치에 건물이 없는 경우 도로명 주소는 빈값입니다
				console.log('도로명 주소 : ' + result[0].roadAddress.name);
				console.log('지번 주소 : ' + result[0].jibunAddress.name);
			}
		}
	};

	geocoder.coord2addr(coord, callback);
	geocoder.coord2detailaddr(coord, callback2);
*/
	if (mobile) {	// 앱 호출
		RequestPosition(txtAddrId, txtCortarInfoId);
	} else {	// 브라우저 호출
		var browserGeolocationSuccess = function(position) {
			//alert("Browser geolocation success!\n\nlat = " + position.coords.latitude + "\nlng = " + position.coords.longitude);
			//alert(position.coords.latitude+"@#@#"+position.coords.longitude);
			GetPositionAddr(position.coords.latitude,position.coords.longitude, txtAddrId, txtCortarInfoId);
		};

		var browserGeolocationFail = function(error) {
		  switch (error.code) {
		    case error.TIMEOUT:
		      //alert("Browser geolocation error !\n\nTimeout.");
		    	//console.log("Browser geolocation error !\n\nTimeout.");
		      break;
		    case error.PERMISSION_DENIED:
		      if(error.message.indexOf("Only secure origins are allowed") == 0) {
		    	  //alert("Only secure origins are allowed");
		    	//console.log("Only secure origins are allowed");
		        //tryAPIGeolocation();
		      }
		      break;
		    case error.POSITION_UNAVAILABLE:
		      //alert("Browser geolocation error !\n\nPosition unavailable.");
		    	//console.log("Browser geolocation error !\n\nPosition unavailable.");
		      break;
		  }
		};

		var tryGeolocation = function() {
		  if (navigator.geolocation) {
		    navigator.geolocation.getCurrentPosition(
		    	browserGeolocationSuccess,
		      browserGeolocationFail,
		      {maximumAge: 50000, timeout: 20000, enableHighAccuracy: true});
		  }
		};

		tryGeolocation();
	}
	//RequestPosition(txtId);
	//GetPosition(37.48191664189651,127.05744179834984	);
	/*GetPosition(	35.23798999	,	128.6923532	);
	GetPosition(	35.16002534	,	126.8510439	);
	GetPosition(	35.87142476	,	128.6017982	);
	GetPosition(	36.35035552	,	127.3848464	);
	GetPosition(	37.45613953	,	126.7052896	);
	GetPosition(	34.81604541	,	126.462825	);
	GetPosition(	37.8853366	,	127.7298291	);
	GetPosition(	35.89248202	,	128.6007432	);
	GetPosition(	36.59290033	,	127.2923688	);
	GetPosition(	35.53843281	,	129.3114234	);
	GetPosition(	36.63538315	,	127.4914905	);
	GetPosition(	35.17984571	,	129.0750822	);
	GetPosition(	37.56641923	,	126.9778742	);
	GetPosition(	35.82048563	,	127.1086869	);
	GetPosition(	33.48904374	,	126.4983411	);
	GetPosition(	36.65884651	,	126.6728253	);*/
}


//전화걸기
function fn_comm_layer_call(tel1,tel2) {
	openPop("id_m107");
	$("#lp_layout .id_m107 .tel1 a").attr("href","tel:"+tel1);
	$("#lp_layout .id_m107 .tel1 a").text(tel1);
	$("#lp_layout .id_m107 .tel2 a").attr("href","tel:"+tel2);
	$("#lp_layout .id_m107 .tel2 a").text(tel2);
}

//내용더보기
function fn_comm_layer_more_contents(txtBody) {
	openPop("id_m108");
	$("#lp_layout .id_m108 .txt").html(txtBody);
}


//이미지 슬라이드
function fn_open_touchSlider(classnum, auto){
	var enableTrue = false;
	if (auto == "Y"){
		 enableTrue = true;
	}

	$(".touchSlider"+classnum+" > .sliderBox").touchSlider({
		autoplay : {
			enable : enableTrue,
			pauseHover : true,
			addHoverTarget : "", // 다른 오버영역 추가 ex) ".someBtn, .someContainer"
			interval : 3500
		},
		initComplete : function (e) {
			var _this = this;
			var $this = $(this);
			var paging = $this.next(".paging");

			paging.html("");
			$this.find(" > ul > li").each(function (i, el) {
				var num = (i+1) / _this._view;
				if((i+1) % _this._view == 0) {
					paging.append('<button type="button" class="btn_page">page' + num + '</button>');
				}
			});
			paging.find(".btn_page").bind("click", function (e) {
				_this.go_page($(this).index());
			});
		},
		counter : function (e) {
			$(this).parents(".touchSlider"+classnum+"").find(".paging .btn_page").removeClass("on").eq(e.current-1).addClass("on");
			$(this).parents(".touchSlider"+classnum+"").find(".pageCount").html(e.current + "/" + e.total);
		},
		btn_prev : $(this).find(".btn_prev"),
		btn_next : $(this).find(".btn_next")
	});
}

// "좋아요" 여부 조회 및 이벤트 설정(지역/단지만 설정되어 있음)
function fn_comm_like_set(intrestGbn, intrestGbn2, addr1, addr2, addr3, complexCd, complexNm) {
	var intrestNo = "0";

	if (typeof(complexCd) == "undefined") complexCd = "";
	if (typeof(complexNm) == "undefined") complexNm = "";
	// 매물찾기에서 넘어온 경우. 모두 쿠키에 있다
	var Memul_Style = decodeURIComponent(getCookie("Memul_MemulStyle"));
	if (Memul_Style == "1") { Memul_Style = "매매"; }
	else if (Memul_Style == "2") { Memul_Style = "전세"; }
	else if (Memul_Style == "3") { Memul_Style = "월세"; }

	$.ajax({
		type:"POST",
		data:{"intrestGbn":intrestGbn,"addr1":addr1,"addr2":addr2,"addr3":addr3,"aptCd":complexCd},
		url:"./?c=side&m=myIntrest.select&p=AJAX",
		success:function(reparam){
			// 좋아요 선택된 지역일 경우
			if (reparam!="") {
				intrestNo = reparam;
				$("#search_layout .good").addClass("on");
			}
			$("#search_layout .good").attr({id:"intrest_"+intrestNo})
		},
		error:function(reparam){
			//console.log(reparam);
			//console.log("error");
		}
	});

	// 좋아요 클릭시
	$("#search_layout .good").unbind("click");
	$("#search_layout .good").click(function(e) {
		var intrestVal = "2";
		intrestNo = $(this).attr("id").replaceAll("intrest_","");
		if($("#intrest_"+intrestNo).hasClass("on")) {
			$("#intrest_"+intrestNo).removeClass("on");
		} else {
			$("#intrest_"+intrestNo).addClass("on");
		}
		if (intrestGbn2 == "지역") {
			intrestVal = "1";
		}
		intrestVal += '|'+addr3+' 즐겨찾기|'+intrestGbn2+'|'+Memul_Style+'|||0|'+addr1+'|'+addr2+'|'+addr3+'|'+complexCd+'|'+complexNm+'|';
		fn_comm_like_my(intrestGbn,intrestNo,intrestVal);
	});
}

// "좋아요" 선택시
// 지역/단지:<button onclick="fn_comm_like_my('area','10882','2|장지동 즐겨찾기|단지|매매|||0|서울특별시|송파구|장지동|A01181382100004|송파파인타운3단지|')">
// <span class="ico_comm on" id="intrest_10882">좋아요</span></button>
// 매물:<button onclick="fn_comm_like_my('memul','62BF4C3D867479','62BF4C3D867479|봉천동 [연립빌라]');">
// <span class="ico_comm on" id="intrest_62BF4C3D867479">좋아요</span></button>
// 리서치:<button onclick="fn_comm_like_my('research','31-109154','31|109154')">
// <span class="ico_comm on" id="intrest_31-109154">좋아요</span></button>
function fn_comm_like_my(intrestGbn,intrestNo,intrestVal, callbackFn) {
	if($("#intrest_"+intrestNo).hasClass("on")) {	// 좋아요 제거
		$.ajax({
			type:"POST",
			data:{"intrestGbn":intrestGbn,"intrestNo":intrestNo},
			url:"./?c=side&m=myIntrest.delete&p=AJAX",
			dataType:"json",
			success:function(reparam){
				if (reparam.resultNo == "1") {
					$("#intrest_"+intrestNo).removeClass("on");

					if (jQuery.isFunction(callbackFn) || jQuery.isFunction(callbackFn) == true)
					{
						callbackFn("delete");
					}
				} else if (reparam.resultNo == "-9999") {
					var return_url = escape(escape(getServiceUrl()));
					if (confirm("로그인이 필요합니다.")) {
						$(location).attr('href', '/?_c=mypage&_m=login&return_url='+ return_url);
//					window.location.href = "/?c=user&m=login&return_url="& escape($(location).attr('href').replace('http://new.r114.com', ''));
//					return false;
					}
				}
			},
			error:function(reparam){
				//console.log(reparam);
				//console.log("error");

				if (jQuery.isFunction(callbackFn) || jQuery.isFunction(callbackFn) == true)
				{
					callbackFn("fail");
				}
			}
		});
	} else {	// 좋아요 추가
		var values = intrestVal.split("|");
		var intrestAreaGbn = "";
		var title = "";
		var mmType = "";
		var dealType = "";
		var nowX = "";
		var nowY = "";
		var mapHeight = "";
		var addr1 = "";
		var addr2 = "";
		var addr3 = "";
		var aptCd = "";
		var aptNm = "";
		var rebuildCd = "";
		var stuffCd = "";
		var bno = "";
		var num = "";
		if (intrestGbn == "area") {
			intrestAreaGbn = values[0];
			title = values[1];
			mmType = values[2];
			dealType = values[3];
			nowX = values[4];
			nowY = values[5];
			mapHeight = values[6];
			addr1 = values[7];
			addr2 = values[8];
			addr3 = values[9];
			aptCd = values[10];
			aptNm = values[11];
			rebuildCd = values[12];
		} else if (intrestGbn == "memul") {
			stuffCd = values[0];
			title = values[1];
		} else if (intrestGbn == "research") {
			bno = values[0];
			num = values[1];
		}
		$.ajax({
			type:"POST",
			data:{"intrestGbn":intrestGbn
				,"intrestAreaGbn":intrestAreaGbn
				,"title":title
				,"mmType":mmType
				,"dealType":dealType
				,"nowX":nowX
				,"nowY":nowY
				,"mapHeight":mapHeight
				,"addr1":addr1
				,"addr2":addr2
				,"addr3":addr3
				,"aptCd":aptCd
				,"aptNm":aptNm
				,"rebuildCd":rebuildCd
				,"stuffCd":stuffCd
				,"bno":bno
				,"num":num
			},
			url:"./?c=side&m=myIntrest.insert&p=AJAX",
			dataType:"json",
			success:function(reparam){
				if (reparam.resultNo >= "1") {
					$("#intrest_"+intrestNo).addClass("on");

					if (intrestGbn == "area") {
						$("#intrest_"+intrestNo).attr({id:"intrest_"+reparam.resultNo});
					}

					if (jQuery.isFunction(callbackFn) || jQuery.isFunction(callbackFn) == true)
					{
						callbackFn("insert");
					}
				} else if (reparam.resultNo == "-9999") {
					var return_url = escape(getServiceUrl());
					if (confirm("로그인이 필요합니다.")) {
						$(location).attr('href', '/?_c=mypage&_m=login&return_url='+ return_url);
					}
					return false;
				}
			},
			error:function(reparam){
				//console.log(reparam);
				//console.log("error");

				if (jQuery.isFunction(callbackFn) || jQuery.isFunction(callbackFn) == true)
				{
					callbackFn("fail");
				}
			}
		});
	}
}

//매물 목록
//fn_comm_getMemulList("",1,10,"price",111,"A01001","서울특별시","강남구","개포동","","list_my",callBackFn,"up","0|10000|0|0|0|0|0.00|0.00|0|0|0|0||",true);
//fn_comm_getMemulList("myIntrest",1,10,"거래완료",111,"","","","","","list_my",callBackFn);
function fn_comm_getMemulList(menuGbn,curpage,pagesize,searchGbn,rnum,mmCode,addr1,addr2,addr3,complexCd,ul_MemulList,callbackFn,searchSort,filterParam,isAsync) {
	if (typeof isAsync == "undefined" || isAsync != false) {
		isAsync = true;
	}
	var $target = $('#'+ ul_MemulList);
	$.ajax({
		type:"POST",
		data:{"menuGbn":menuGbn,"curpage":curpage,"pagesize":pagesize,"searchGbn":searchGbn,"searchSort":searchSort,"rnum":rnum,"mmCode":mmCode,"addr1":addr1,"addr2":addr2,"addr3":addr3,"complexCd":complexCd,"filterParam":filterParam},
		url:"./?c=memul&m=list.memul&p=AJAX",
		dataType:"json",
		async:isAsync,
		beforeSend: function() {
			$target.append(__loadingString);
		},
		complete: function() {
			$target.find('.loding_wrap.on').remove();
		},
		success:function(reparam){
			if (reparam.resultNo == "-9999") {
				if (confirm("로그인이 필요합니다.")) {
					window.location.href = "/?c=user&m=login";
				}
				return false;
			}
			var totalCnt = 0;
			var total_page = 0;
			if (reparam.length > 0) {
				$.each(reparam,function(index,entry) {
					totalCnt = entry.rcount;
					total_page = entry.maxpage;
					if (total_page > 0) {
						var listhtml = '';

						var area2 = insertComma(Math.floor(entry.전용면적*1)/1);
						if (area2 == "0") { area2 = "-"; }

						var showRoom = true;
						var showFloor = true;
						if (entry.매물상세구분 == "사무실" || entry.매물상세구분 == "상가" || entry.매물상세구분 == "빌딩" || entry.매물상세구분 == "상가건물" || entry.매물상세구분 == "공장" || entry.매물상세구분 == "창고" || entry.매물상세구분 == "아파트형공장"
							|| entry.매물상세구분 == "주택재건축"
							|| entry.매물상세구분 == "재개발") {
							showRoom = false;
						}
						if (entry.매물상세구분 == "토지") {
							showRoom = false;
							showFloor = false;
						}

						listhtml += '<li id="li_'+entry.물건코드+'" name="li_'+entry.물건코드+'">';
						//# 이광범 2017.05.29: 거래완료 매물에 대해 거래완료 버튼 노출 후 버튼 비활성화 및 링크 제거
						if (entry.거래완료일시 == "") {
							if (entry.mjGbn == "M") {
								//listhtml += '	<a href="#none" onclick="window.location.href=\'/?_c=memul&_m=detail&_a=memul&mmCode='+mmCode+'&mmgubun='+entry.기본정보코드+'&mulcode='+entry.물건코드+'\';"></a>';
								listhtml += '	<a href="/?_c=memul&_m=detail&_a=memul&mmCode='+mmCode+'&mmgubun='+entry.기본정보코드+'&mulcode='+entry.물건코드+'"></a>';
							} else if (entry.mjGbn == "J") {
								//listhtml += '	<a href="#none" onclick="window.location.href=\'/?_c=SALES&_m=detail&_a=memul&mulcode='+entry.물건코드+'\';"></a>';
								listhtml += '	<a href="/?_c=SALES&_m=detail&_a=memul&mulcode='+entry.물건코드+'"></a>';
							}
						}
						listhtml += '	<div class="inner">';
						listhtml += '		<div class="txt">';
						if (entry.아파트명 != null && entry.아파트명 != "") {
							listhtml += '			<p class="area">'+entry.아파트명;
							if (entry.해당동 != null && entry.해당동 != "") {
								listhtml += ' '+entry.해당동+'동';
							}
						} else {
							listhtml += '			<p class="area">'+entry.읍면동;
						}
						if (menuGbn == "myIntrest") {
							if (entry.거래완료일시 != "") {
								listhtml += '				<span class="tag_comm tag_type2">거래완료';
							} else {
								listhtml += '				<span class="tag_comm tag_type5">거래중';
							}
							listhtml += '				</span></p>';
							listhtml += '			<button type="button" class="btn_like_my on" onclick="fn_comm_like_my(\'memul\',\''+entry.물건코드+'\',\''+entry.물건코드+'|'+entry.제목+'\');"><span class="ico_comm on" id="intrest_'+entry.물건코드+'" name="intrest_'+entry.물건코드+'">좋아요</span></button>';
						} else {
							listhtml += '			</p>';
						}
						listhtml += '			<strong class="sale_price"><span class="tag_comm ';
						// <!-- 태그타입별 컬러적용 20170403 -->
						if (entry.거래구분 == "매매") {
							listhtml += 'tag_type7';
						} else if (entry.거래구분 == "전세") {
							listhtml += 'tag_type20';
						} else if (entry.거래구분 == "월세") {
							listhtml += 'tag_type10';
						}
						listhtml += '">'+entry.거래구분+'</span> ';
						if (entry.거래구분 == "월세") {
							listhtml += insertComma(entry.가격1)+'/'+insertComma(entry.가격2)+'만원';
						} else {
							listhtml += insertComma(entry.가격1)+'만원';
						}
						listhtml += '			</strong><div class="info_wrap item">';
						listhtml += '				<em>'+entry.매물상세구분+'</em>';
						if (showRoom) {
							if (fn_zero2Value(entry.방수,'-') != "-")
							{
								listhtml += '				방'+fn_zero2Value(entry.방수,'-');
								listhtml += '<span class="txt_bar">|</span>';
							}
						} else if (entry.매물상세구분 == "재개발" && entry.물건종류 != "") {
							listhtml += entry.물건종류+'<span class="txt_bar">|</span>';
						} else if (entry.매물상세구분 == "상가" && entry.건물종류 != "") {
							listhtml += entry.건물종류+'<span class="txt_bar">|</span>';
						} else if (entry.매물상세구분 == "토지" && entry.지목 != "") {
							listhtml += entry.지목+'<span class="txt_bar">|</span>';
						}
						if (parseInt(entry.면적) > parseInt(0))	 //면적 0이면 노출안함
						{
							if (entry.매물상세구분 == "토지") {
								listhtml += insertComma(Math.floor(entry.면적*1)/1)+entry.평형타입+'㎡';
								listhtml += '<span class="txt_bar">|</span>';
							} else {
								listhtml += insertComma(Math.floor(entry.면적*1)/1)+entry.평형타입+'/'+area2+'㎡';
								listhtml += '<span class="txt_bar">|</span>';
							}
						}
						if (showFloor) {
							var strFloor = '';
							if ((entry.거래구분 == "매매" && (entry.매물상세구분 == "단독주택" || entry.매물상세구분 == "다가구" || entry.매물상세구분 == "다중주택" || entry.매물상세구분 == "상가주택" || entry.매물상세구분 == "전원주택" || entry.매물상세구분 == "농가주택" || entry.매물상세구분 == "기타주택"))
									|| (entry.매물상세구분 == "주택재건축" && (entry.주용도 == "2" || entry.주용도 == "4"))	// 주택재건축(단독, 다가구)
									|| entry.매물상세구분 == "빌딩" || entry.매물상세구분 == "상가건물"
									|| entry.매물상세구분 == "공장" || entry.매물상세구분 == "창고"
									|| entry.매물상세구분 == "숙박콘도펜션") {
								strFloor += fn_zero2Value(entry.지상층총층,'-',entry.지상층총층+'층')+'/';
								if (fn_zero2Value(entry.지하층총층,'-') == "-") {
									strFloor += fn_zero2Value(entry.지하층총층,'-',entry.지하층총층+'층');
								} else {
									strFloor += '-'+Math.abs(entry.지하층총층)+'층';
								}
							} else {
								if ((entry.해당층 == null || entry.해당층.length == 0 || entry.층수노출여부 == "1") && (entry.층레벨 == null || entry.층레벨.length == 0)) {
									strFloor += '-';
								} else if (entry.층수노출여부 != "1" && entry.해당층.length != 0) {
									strFloor += entry.해당층+' 층';
								} else if (entry.층레벨.length != 0) {
									strFloor += entry.층레벨+'층';
								}
								strFloor += '/'+fn_zero2Value(entry.총층,'-','총 '+entry.총층+'층');
							}
							if (strFloor != "-/-") {
								listhtml += strFloor;
							}
						}
						listhtml += '			</div>';
						if (entry.매물제목 != null && entry.매물제목 != "") {
							listhtml += '			<p class="desc">'+entry.매물제목+'</p>';
						}
						listhtml += '			<p class="r_info">';
						if (entry.회원구분 == "3") {
							listhtml += '				<span class="ico_comm rname"></span>';
						} else if (entry.회원구분 == "2") {
							listhtml += '				<span class="ico_comm2 royal"></span>';
						} else if (entry.회원구분 == "1") {
							listhtml += '				<span class="ico_comm2 classic"></span>';
						}
						listhtml += entry.문의업소명;
						if (entry.연락처 != "") {
							listhtml += '				<a href="#none" class="fc_blue" onclick="fn_comm_layer_call(\''+entry.문의전화번호+'\',\''+entry.연락처+'\');"><span class="ico_comm tel"></span>전화하기</a>';
						} else {
							listhtml += '				<a href="tel:'+entry.문의전화번호+'" class="fc_blue"><span class="ico_comm tel"></span>전화하기</a>';
						}
						listhtml += '			</p>';
						//<!-- 20170427추가 -->
						listhtml += '			<p class="desc2">'+entry.도시+' '+entry.구시군+' '+entry.읍면동+'</p>';
						//<!-- //20170427추가 -->
						listhtml += '		</div>';
						listhtml += '		<span class="thumb">';
						if (entry.매물대표사진 != null && entry.매물대표사진 != "") {
							listhtml += '			<img src="'+entry.매물대표사진+'" alt="" style="width:104px;height:104px;" />';
						} else {
							//20170323 제거
							//listhtml += '			<img src="https://placeholdit.imgix.net/~text?txtsize=30&amp;txt=208%C3%97208&amp;w=208&amp;h=208" alt="">';
						}


						listhtml += '			<span class="tag_fs ';
						if (entry.매물관리등록일시 != "")
						{
							listhtml += 'gray">거래완료';
						}
						else
						{
							if (entry.mjGbn == "J") {
								listhtml += 'red">중개의뢰';
							} else if (entry.알짜매물여부 == "1" || entry.알짜매물여부 == "3" || entry.알짜매물여부 == "4") {
								listhtml += '">알짜매물';
							} else if (entry.추천매물 > "0") {
								listhtml += 'blue">추천매물';
							} else {
								listhtml += 'gray">일반매물';
							}
						}

						listhtml += '			<br>'+entry.최초등록일시.substring(2,4)+'.'+entry.최초등록일시.substring(4,6)+'.'+entry.최초등록일시.substring(6,8)+'</span>';
						listhtml += '		</span>';
						listhtml += '	</div>';
						listhtml += '</li>';
						$("#"+ul_MemulList).append(listhtml);
					}
				});
				//thumbCenter();
			} else {
				listhtml = '0';
                $('.MemulLayer').hide();
			}

			if (jQuery.isFunction(callbackFn) || jQuery.isFunction(callbackFn) == true)
			{
				callbackFn(totalCnt, total_page);
			}
		},
		error:function(reparam){
			if (jQuery.isFunction(callbackFn) || jQuery.isFunction(callbackFn) == true)
			{
				callbackFn('F');
			}
		}
	});

}

// 앱 push 등록(Google FCM API의 topic 가입)
// fn_comm_reg_google_fcm_push(디바이스_토큰)
function fn_comm_reg_google_fcm_push(toToken) {
	var _server_key	= "AAAAS1QWzng:APA91bHBoHtohfetawEQxJZTBTcSt9FnBuBmhEbGma4DUpr5HTIm4dG-pEmb79EKJ9vQkUQ-lOQqS0fJwZgZDEWg_HqQDLPYhtH0MwcjAGOXAiD1vRUrWp2ay3vmm-7mAN-kkRrKfzVV";
	var _topic		= "event";
	var _token		= toToken;

	$.ajax({
		type: 'post'
			,async:false
			,url: 'https://iid.googleapis.com/iid/v1/' + _token + '/rel/topics/' + _topic
			,beforeSend: function(xhr) {
				xhr.setRequestHeader("Content-Type", "application/json");
				//xhr.setRequestHeader("Content-Length", "0");
				xhr.setRequestHeader("Authorization","key=" + _server_key);
		}
			,complete: function() {
			}
			,success: function(response) {
				//alert(JSON.stringify(response));
		}
		,error:function(request,status,error){
			alert("Google FCM Error");
			alert('code:'+request.status+'\n'+'message:'+request.responseText+'\n'+'error:'+error);
		}
	});
}

//앱 push 탈퇴(Google FCM API의 topic 탈퇴)
//fn_comm_eli_google_fcm_push(디바이스_토큰)
function fn_comm_eli_google_fcm_push(toToken) {
	var _server_key	= "AAAAS1QWzng:APA91bHBoHtohfetawEQxJZTBTcSt9FnBuBmhEbGma4DUpr5HTIm4dG-pEmb79EKJ9vQkUQ-lOQqS0fJwZgZDEWg_HqQDLPYhtH0MwcjAGOXAiD1vRUrWp2ay3vmm-7mAN-kkRrKfzVV";
	var _topic		= "event";
	var _token		= toToken;

	var _contents = JSON.stringify(
		{
		   "to" : '/topics/' + _topic,
		   "registration_tokens" : [_token]
		}
	)

	$.ajax({
        type: 'post'
		,async:false
		,url: 'https://iid.googleapis.com/iid/v1:batchRemove'
		,data: _contents
		,beforeSend: function(xhr) {
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.setRequestHeader("Authorization","key=" + _server_key);
        }
		,complete: function() {
		}
		,success: function(response) {
			//alert(JSON.stringify(response));
        }
        ,error:function(request,status,error) {
			alert("Google FCM Error");
	    	alert('code:'+request.status+'\n'+'message:'+request.responseText+'\n'+'error:'+error);
	    }
    });
}

// value가 빈값이나 0일때 re_Zero_val 반환, 아닐때 re_NotZero_val 반환
function fn_zero2Value(value, re_Zero_val, re_NotZero_val) {
	if (value == null || value == "0" || value.length == 0) {
		return re_Zero_val;
	} else {
		if (typeof re_NotZero_val == "undefined") {
			return value;
		} else {
			return re_NotZero_val;
		}
	}
}


function fn_shortAddr(addr1) {
    var shortAddr = "";

    if (addr1 == "서울특별시") shortAddr = "서울";
    else if (addr1 == "경기도") shortAddr = "경기";
    else if (addr1 == "경상북도") shortAddr = "경북";
    else if (addr1 == "경상남도") shortAddr = "경남";
    else if (addr1 == "대구광역시") shortAddr = "대구";
    else if (addr1 == "전라남도") shortAddr = "전남";
    else if (addr1 == "광주광역시") shortAddr = "광주";
    else if (addr1 == "대전광역시") shortAddr = "대전";
    else if (addr1 == "강원도") shortAddr = "강원";
    else if (addr1 == "인천광역시") shortAddr = "인천";
    else if (addr1 == "세종특별자치시" || addr1 == "세종특별시" ) shortAddr = "세종";
    else if (addr1 == "울산광역시") shortAddr = "울산";
    else if (addr1 == "충청북도") shortAddr = "충북";
    else if (addr1 == "부산광역시") shortAddr = "부산";
    else if (addr1 == "전라북도") shortAddr = "전북";
    else if (addr1 == "충청남도") shortAddr = "충남";
    else if (addr1 == "제주특별자치도" || addr1 == "제주도") shortAddr = "제주";

    return shortAddr ;
}

function fn_comm_setMmCode(gbn, param) {
	// 일단 단지만
	var rtnValue = "";
	if (gbn == 1) {	// mmCode로 mmCodeNm 리턴
		if (param.substring(0,5) == "A0101") {
			rtnValue = "아파트"
		} else if (param.substring(0,5) == "A0102") {
			rtnValue = "주상복합"
		} else if (param.substring(0,5) == "A0103") {
			rtnValue = "도시형생활주택"
		} else if (param.substring(0,5) == "A0104") {
			rtnValue = "재건축"
		} else if (param.substring(0,5) == "A0105") {
			rtnValue = "아파트분양권"
		} else if (param.substring(0,5) == "A0106") {
			rtnValue = "주상복합분양권"
		} else if (param.substring(0,3) == "A01") {
			rtnValue = "아파트"
		} else if (param.substring(0,5) == "A0201") {
			rtnValue = "오피스텔"
		} else if (param.substring(0,5) == "A0202") {
			rtnValue = "오피스텔분양권"
		} else if (param.substring(0,3) == "A03") {
			rtnValue = "오피스텔"
		}
	} else if (gbn == 2) {	// paramNm로 mmCode 리턴
		if (param == "아파트") {
			rtnValue = "A0101"
		} else if (param == "주상복합") {
			rtnValue = "A0102"
		} else if (param == "도시형생활주택") {
			rtnValue = "A0103"
		} else if (param == "재건축") {
			rtnValue = "A0104"
		} else if (param == "아파트분양권") {
			rtnValue = "A0105"
		} else if (param == "주상복합분양권") {
			rtnValue = "A0106"
		} else if (param == "오피스텔") {
			rtnValue = "A0201"
		} else if (param == "오피스텔분양권") {
			rtnValue = "A0202"
		}
	}
	return rtnValue;
}

/* 매물찾기 검색 */
function open_landSearch(){
	$("#search_layout .msrch_wrap").addClass("open");
	$(".fa_wrap.filterLayer").removeClass('open');

	$("body").removeClass('filter_open');
	$("#search_layout .filter_wrap .filter .ft1").removeClass("on");
	$("#search_layout .filter_wrap .filter .ft2").removeClass("on");
	$("#search_layout .filter_wrap .filter .ft3").removeClass("on");
	$("#search_layout .filter_wrap .filter .ft1").attr("onclick","open_landMenu1()");
	$("#search_layout .filter_wrap .filter .ft2").attr("onclick","open_landMenu2()");
	if (typeof open_landMenu3_before == "function") {
		$("#search_layout .filter_wrap .filter .ft3").attr("onclick","open_landMenu3_before()");
	} else {
		$("#search_layout .filter_wrap .filter .ft3").attr("onclick","open_landMenu3()");
	}
}
function close_landSearch(){
	$("#search_layout .msrch_wrap").removeClass("open");
	$('body').trigger('close_landSearch');
}

/* 매물찾기 > 아파트/주상복합분양권 */
function open_landMenu1(){
	$("#search_layout .filter_wrap .list_filter ul:nth-child(1)").addClass("open");
	$("#search_layout .filter_wrap .list_filter ul:nth-child(2)").removeClass("open");
	$("#search_layout .filter_wrap .list_filter ul:nth-child(3)").removeClass("open");
	$("#search_layout .filter_wrap .filter .ft1").addClass("on");
	$("#search_layout .filter_wrap .filter .ft2").removeClass("on");
	$("#search_layout .filter_wrap .filter .ft3").removeClass("on");
	$("#search_layout .filter_wrap .filter .ft1").attr("onclick","close_landMenu()");
	$("body").addClass("filter_open");
}

/* 매물찾기 > 세부선택 */
function open_landMenu2(){
	$("#search_layout .filter_wrap .list_filter ul:nth-child(2)").addClass("open");
	$("#search_layout .filter_wrap .list_filter ul:nth-child(1)").removeClass("open");
	$("#search_layout .filter_wrap .list_filter ul:nth-child(3)").removeClass("open");
	$("#search_layout .filter_wrap .filter .ft2").addClass("on");
	$("#search_layout .filter_wrap .filter .ft1").removeClass("on");
	$("#search_layout .filter_wrap .filter .ft3").removeClass("on");
	$("#search_layout .filter_wrap .filter .ft2").attr("onclick","close_landMenu()");
	$("body").addClass("filter_open");
}

/* 매물찾기 > 매매 */
function open_landMenu3(){
	$("#search_layout .filter_wrap .list_filter ul:nth-child(3)").addClass("open");
	$("#search_layout .filter_wrap .list_filter ul:nth-child(1)").removeClass("open");
	$("#search_layout .filter_wrap .list_filter ul:nth-child(2)").removeClass("open");
	$("#search_layout .filter_wrap .filter .ft3").addClass("on");
	$("#search_layout .filter_wrap .filter .ft1").removeClass("on");
	$("#search_layout .filter_wrap .filter .ft2").removeClass("on");
	$("#search_layout .filter_wrap .filter .ft3").attr("onclick","close_landMenu()");
	$("body").addClass("filter_open");
}

/* 매물찾기 > 아파트/주상복합분양권, 세부선택, 매매 */
function close_landMenu(){
	$("body").removeClass("filter_open");
	$("#search_layout .filter_wrap .list_filter ul:nth-child(1)").removeClass("open");
	$("#search_layout .filter_wrap .list_filter ul:nth-child(2)").removeClass("open");
	$("#search_layout .filter_wrap .list_filter ul:nth-child(3)").removeClass("open");
	$("#search_layout .filter_wrap .filter .ft1").removeClass("on");
	$("#search_layout .filter_wrap .filter .ft2").removeClass("on");
	$("#search_layout .filter_wrap .filter .ft3").removeClass("on");
	$("#search_layout .filter_wrap .filter .ft1").attr("onclick","open_landMenu1()");
	$("#search_layout .filter_wrap .filter .ft2").attr("onclick","open_landMenu2()");
	if (typeof open_landMenu3_before == "function") {
		$("#search_layout .filter_wrap .filter .ft3").attr("onclick","open_landMenu3_before()");
	} else {
		$("#search_layout .filter_wrap .filter .ft3").attr("onclick","open_landMenu3()");
	}
}

/* 분당구 부동산정보 */
function open_landInfo(){
	$(".marker_info").addClass("open");
	$(".marker_info").css('position','absolute');
	$(".marker_info").css('bottom','0px');
	$(".marker_info").css('z-index','100');
	$(".marker_info").css('background-color','white');
	$(".marker_info").css('width','100%');
}

function close_landInfo(){
	$(".marker_info").removeClass("open");
	$(".marker_info").removeAttr("style");
}

/* 이미지 중앙정렬 */
/*
function thumbCenter(){
	$(".thumb img").each(function(){
		var thumbWidth = $(this).parent(".thumb").width();
		var thumbHeight = $(this).parent(".thumb").height();
		//alert("imgWidth:"+imgWidth+", imgHeight:"+imgHeight+", thumbWidth:"+thumbWidth+", thumbHeight:"+thumbHeight);
		if($(this).parent(".thumb").attr("class").indexOf("aType") != -1){
			//alert("a");
			$(this).css('width','100%');
			$(this).css('height','auto');
			var imgHeight = $(this).height();
			if(imgHeight < thumbHeight){
				$(this).css('width','auto');
				$(this).css('height','100%');
			}else if(imgHeight > thumbHeight){
				$(this).css('height','auto');
			}
			$(this).css('margin-left',-($(this).width()/2));
			$(this).css('margin-top',-($(this).height()/2));
			//console.log("aType "+$(this).attr("src")+" : width("+$(this).css('width')+"), height("+$(this).css('height')+")");
		}else if($(this).parent(".thumb").attr("class").indexOf("bType") != -1){
			//alert("b");
			$(this).css('width','100%');
			$(this).css('height','auto');
			var imgHeight = $(this).height();
			if(imgHeight < thumbHeight){
				$(this).css('height','auto');
			}else if(imgHeight > thumbHeight){
				$(this).css('width','auto');
				$(this).css('height','100%');
			}
			$(this).css('margin-left',-($(this).width()/2));
			$(this).css('margin-top',-($(this).height()/2));
			//console.log("bType "+$(this).attr("src")+" : width("+$(this).css('width')+"), height("+$(this).css('height')+")");
		}else if($(this).parent(".thumb").attr("class").indexOf("cType") != -1){
			//alert("c");
			$(this).css('width','100%');
			$(this).css('height','100%');
			$(this).css('margin-left',-($(this).width()/2));
			$(this).css('margin-top',-($(this).height()/2));
			//console.log("cType "+$(this).attr("src")+" : width("+$(this).css('width')+"), height("+$(this).css('height')+")");
		}else if($(this).parent(".thumb").attr("class").indexOf("dType") != -1){
			//alert("d");
			$(this).css('width','100%');
			$(this).css('height','auto');
			var imgHeight = $(this).height();
			if(imgHeight < thumbHeight){
				$(this).css('width','auto');
				$(this).css('height','100%');
			}else if(imgHeight > thumbHeight){
				$(this).css('height','auto');
			}
			$(this).css('left','0px');
			$(this).css('top','0px');
			//console.log("dType "+$(this).attr("src")+" : width("+$(this).css('width')+"), height("+$(this).css('height')+")");
		}else{
			$(this).css('width','100%');
			$(this).css('height','100%');
			$(this).css('margin-left',-($(this).width()/2));
			$(this).css('margin-top',-($(this).height()/2));
			//console.log("타입없음 "+$(this).attr("src")+" : width("+$(this).css('width')+"), height("+$(this).css('height')+")");
		}

		/* 리스트썸네일 스크립트로 분기 시작 */
		/*
		if($(this).parents(".inner").find("> .thumb + .txt").length > 0){
			var _thumbWidth = $(this).parent(".inner").find(".thumb").width();
			var _thumbHeight = $(this).parent(".inner").find(".thumb").height();
			var _thumbMargin = 12;
			//console.log("왼쪽 _thumbWidth : "+_thumbWidth+", _thumbHeight : "+_thumbHeight+", _thumbMargin : "+_thumbMargin);
			$(this).parent(".inner").find(".txt").css('padding-left',_thumbWidth + _thumbMargin);
			$(this).parent(".inner").find(".txt").css('margin-top',-(_thumbHeight));
		}
		if($(this).parents(".inner").find("> .txt + .thumb").length > 0){
			var _thumbWidth = $(this).parent(".inner").find(".thumb").width();
			var _thumbHeight = $(this).parent(".inner").find(".thumb").height();
			var _thumbMargin = 12;
			//console.log("오른쪽 _thumbWidth : "+_thumbWidth+", _thumbHeight : "+_thumbHeight+", _thumbMargin : "+_thumbMargin);
			$(this).parent(".inner").find(".txt").css('padding-right',_thumbWidth + _thumbMargin);
			$(this).parent(".inner").find(".thumb").css('margin-left',-(_thumbWidth));
			$(".list_type.type5.my_fs .btn_like_my").css('right',_thumbWidth + _thumbMargin);
		}
	});
	$(".sliderVisual_wrap3 > .sliderBox > ul > li").each(function(){
		$(this).parents(".sliderBox").css('height',$(this).height());
	});


	$(".inner > .thumb + .txt").each(function(){
		var _thumbWidth = $(this).parent(".inner").find(".thumb").width();
		var _thumbHeight = $(this).parent(".inner").find(".thumb").height();
		var _thumbMargin = 12;
		//console.log("왼쪽 _thumbWidth : "+_thumbWidth+", _thumbHeight : "+_thumbHeight+", _thumbMargin : "+_thumbMargin);

		$(this).parent(".inner").find(".txt").css('padding-left',_thumbWidth + _thumbMargin);
		$(this).parent(".inner").find(".txt").css('margin-top',-(_thumbHeight));

	});
	$(".inner > .txt + .thumb").each(function(){
		var _thumbWidth = $(this).parent(".inner").find(".thumb").width();
		var _thumbHeight = $(this).parent(".inner").find(".thumb").height();
		var _thumbMargin = 12;

		$(this).parent(".inner").find(".txt").css('padding-right',_thumbWidth + _thumbMargin);
		$(this).parent(".inner").find(".thumb").css('margin-left',-(_thumbWidth));

		//console.log("오른쪽 _thumbWidth : "+_thumbWidth+", _thumbHeight : "+_thumbHeight+", _thumbMargin : "+_thumbMargin);

		$(".list_type.type5.my_fs .btn_like_my").css('right',_thumbWidth + _thumbMargin);
	});
}*/

/* 쿼리스트링 값을 리턴한다
 * 사용 예) var value = getParameterByName("sellbuyType");
 */
function getParameterByName(name, url) {

    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));

}

function isEmpty(value) {

  return (typeof value == 'string' && jQuery.trim(value) == "") || typeof value == 'undefined' || value === null;

}

/* [2017-07-06 김현수] 면적 변환시 사용 - 모바일과 동일 */
function replaceChar(str, fChar,rChar) {

	var tar = '';
	var len= str.length;

	for (var i=0; i < len; i++){
		if (str.charAt(i) == fChar)
			tar += rChar;
		else
			tar += str.charAt(i);
	}

	return tar;
}

/* [2017-07-06 김현수] 면적 변환시 사용 - 모바일과 동일 */
function checkComma(number,check) {
	number = replaceChar(number,',','');
	number = '' + number;
	//alert(check);

	if (check =="1") {
		number_chk = number.substring(0,1);
		if (number_chk == "-"){
			var tmp=number.split("-");//입력 문자열을 공백으로 나누어 담음
			number_check = "-";
			number_temp = tmp[1];
			number_detail = "";
		}
		else{
			number_check = "";
			number_temp = number;
			number_detail = "";
		}
	}
	else if (check == "2") {
		if (number.indexOf(".") >= 0){
			var tmp=number.split(".");//입력 문자열을 공백으로 나누어 담음
			number_check = "";
			number_temp = tmp[0];
			number_detail = "."+tmp[1];
		}
		else{
			number_check = "";
			number_temp = number;
			number_detail = "";
		}
		//alert(number_temp);
	}
	else if (check == "3") {
		if (number.indexOf(".") >= 0){
			var tmp=number.split(".");//입력 문자열을 공백으로 나누어 담음
			number_check = "";
			number_temp = tmp[0];
			number_value = tmp[1].substring(0,4);
			number_detail = "."+number_value;
		}
		else{
			number_check = "";
			number_temp = number;
			number_detail = "";
		}
	}
	else{
		number_check = "";
		number_temp = number;
		number_detail = "";
	}


	if (number_temp.length > 3) {
		//alert(number_temp.length);
		//retrun;
		var mod = number_temp.length % 3;
		var output = (mod > 0 ? (number_temp.substring(0,mod)) : '');

		for (i=0 ; i < Math.floor(number_temp.length / 3); i++) {
			if ((mod == 0) && (i == 0))
				output += number_temp.substring(mod+ 3 * i, mod + 3 * i + 3);
			else
				output+= ',' + number_temp.substring(mod + 3 * i, mod + 3 * i + 3);
		}
		return (number_check+output+number_detail);
	}
	else
		return number_check+number_temp+number_detail;
}

/* [2017-07-06 김현수] 면적 변환 - 모바일과 동일 */
/*
 * 면적 변환
 * CheckValue : 입력값
 * ResultValue : 변환되는값
 * ViewFlag : CheckValue입력형태, 0->소수점없음, 2->소수점있음
 * CheckFlag : 1-> 평형에서 면적변환, 2->면적에서 평형변환
 */
function pyung_m2(CheckValue,ResultValue,ViewFlag, CheckFlag) {

	var srcValue;	
	if(CheckValue.value != "") {

		if (CheckValue.value == "0") {
			ResultValue.value = 0;
			ResultValue.focus();
			return;
		}
		
		srcValue = CheckValue.value.replace(/,/gi, '');
		
		//console.log(srcValue);

		if (document.getElementById("hdnStartFocus")) {
			if (CheckValue.name == "" || ResultValue.value == "")
				document.getElementById("hdnStartFocus").value = CheckValue.name;
			else if (document.getElementById("hdnStartFocus").value == "") {
				document.getElementById("hdnStartFocus").value = CheckValue.name;
				document.getElementById("hdnStartValue").value = srcValue;
			}

			if (document.getElementById("hdnStartFocus").value != CheckValue.name)
			{
				document.getElementById("hdnStartFocus").value = CheckValue.name;
				document.getElementById("hdnStartValue").value = srcValue;
				return;
			} else {
				if (document.getElementById("hdnStartValue").value ==srcValue) {
					return;
				} else {
					document.getElementById("hdnStartValue").value = srcValue;
				}
			}
		}

		var Temp_Source_Value;
		var Temp_Check_Const;
		var Temp_Check_Point;
		var Temp_Result;

		var arrPyg = null;
		var arrPyg2 = null;
		var intPyg = null;
		var flPyg = null;

		Temp_Source_Value = srcValue;

		if (CheckFlag =="1"){

			if (ViewFlag =="0"){

				if (Temp_Source_Value.indexOf(".") != "-1"){
					alert("숫자로만 입력해주세요.");
					CheckValue.value = "";
					ResultValue.value = "";
					return;
				}
			}

			Temp_Check_Point = ViewFlag;
			Temp_Check_Const = "3.3058";

		} else {

			Temp_Check_Point = "4";
			Temp_Check_Const = "0.3025";

		}
		var arrPyg = Temp_Source_Value.split(".");

		if (Temp_Source_Value.indexOf(".") != "-1"){

			intPyg = arrPyg[0];
			flPyg = arrPyg[1];

			flPyg = flPyg.substring(0,Temp_Check_Point)
			Temp_Source_Value = intPyg+"."+flPyg;
		}
		else
		{
			intPyg = arrPyg[0];
			flPyg = "";

			Temp_Source_Value = intPyg;
		}

		ResultValue.value = replaceChar(Temp_Source_Value,',','') * Temp_Check_Const;
		Temp_Result = ResultValue.value;

		if (CheckFlag =="1") {
			Temp_Check_Point = "4";
		}
		else
		{
			Temp_Check_Point = ViewFlag;
		}


		arrPyg2 = Temp_Result.split(".");


		if (Temp_Result.indexOf(".") != "-1"){

			intPyg = arrPyg2[0];
			flPyg = arrPyg2[1];

			if (CheckFlag == "2" && ViewFlag =="0") {
				Temp_Result = intPyg;
			}
			else {
				flPyg = flPyg.substring(0,Temp_Check_Point)
				Temp_Result = intPyg+"."+flPyg;
			}
		}
		else
		{
			intPyg = arrPyg2[0];
			flPyg = "";

			Temp_Result = intPyg;
		}

		ResultValue.value = checkComma(Temp_Result , 2);
		CheckValue.value = checkComma(Temp_Source_Value , 2);

	}
	else {
		ResultValue.value = "";
		CheckValue.value = "";
	}
}

// ****************************************************************************
// 김동현(2017-11-16) 
// 
// 평/㎡ input box에 숫자를 입력하면 자동으로 환산값을 리턴함.
// parameter가 참조하는 input box는 class에 "PY" 혹은 "M2"를 포함해야 함.
// "PY"인 경우: 평 -> ㎡
// "M2"인 경우: ㎡ -> 평
// 
// jQuery object를 받아 그 컨트롤이 가지고 있는 값에 계수를 곱해서 리턴함.
// 리턴되는 값은 소숫점 이하 최대 2째자리까지 표시함.
// 소숫점 이하 자릿수를 수정하고 싶으면, MAXIMUM_FRACTION_DIGITS 값을 바꾸시오.
//
// 위 함수 pyung_m2()를 대체.
//
// object : jQuery Object -> 이벤트가 발생한 컨트롤
// 
// ****************************************************************************
function convertPyM2(object) {
	
	var COEFFICIENT_PY_M2 = 3.3058;
	var COEFFICIENT_M2_PY = 0.3025;
	var MAXIMUM_FRACTION_DIGITS = 2;
	var result;
	var srcValue;
	
	if (object.hasClass("PY")) {
		srcValue = object.val().replace(/,/gi, '');
		result = srcValue * COEFFICIENT_PY_M2;
	}
	else {
		srcValue = object.val().replace(/,/gi, '');	
		result = srcValue * COEFFICIENT_M2_PY;
	}
	
	return result.toLocaleString(undefined, {maximumFractionDigits: MAXIMUM_FRACTION_DIGITS});
}

/* 숫자 패딩 처리
 * pad(31, 4) => 0031
 */
function pad(n, width, z) {

	  z = z || '0';
	  n = n + '';
	  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;

}

/* 숫자에 콤마 붙이기
 * numberWithCommas(19920) => 19,920
 */
function numberWithCommas(value) {

    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

}

/* 자바스크립트 URL 인코딩/디코딩 처리 */
function urlencode(str) {
    str = (str + '').toString();
    return encodeURIComponent(str)
        .replace(/!/g, '%21')
        .replace(/'/g, '%27')
        .replace(/\(/g, '%28')
        .replace(/\)/g, '%29')
        .replace(/\*/g, '%2A')
        .replace(/%20/g, '+');
}

function urldecode(str) {
    return decodeURIComponent((str + '')
        .replace(/%(?![\da-f]{2})/gi, function() {
            return '%25';
        })
        .replace(/\+/g, '%20'));
}

/* 동적 생성한 탭 클릭 이벤트 */
$(document).on('click', '.tab_ui>li', function(e) {
    var idx = $(this).index();
    $(this).parents('.tab_ui').find('>li').removeClass('on');
    $(this).addClass('on');
    var name = $(this).parents('.tab_ui').attr('name');
    if(name){
        $('.tab_cont[name='+name+']>*').removeClass('on');
        $('.tab_cont[name='+name+']>*:eq('+idx+')').addClass('on');
    }else{
        $(this).parents('.tab_ui').find('+.tab_cont>*').removeClass('on');
        $(this).parents('.tab_ui').find('+.tab_cont>*:eq('+idx+')').addClass('on');
    }
});

$(document).on('click', '.tab_ui>a', function(e) {
    var idx = $(this).index();
    $(this).parents('.tab_ui').find('a').removeClass('on');
    $(this).addClass('on');
    var name = $(this).parents('.tab_ui').attr('name');
    if(name){
        $('.tab_cont[name='+name+']>*').removeClass('on');
        $('.tab_cont[name='+name+']>*:eq('+idx+')').addClass('on');
    }else{
        $(this).parents('.tab_ui').find('+.tab_cont>*').removeClass('on');
        $(this).parents('.tab_ui').find('+.tab_cont>*:eq('+idx+')').addClass('on');
    }
});
/* 동적 생성한 탭 클릭 이벤트 */



/* 텍스트 입력 글자수 표시*/
$(document).on('keyup', 'textarea.lengthLimit', function(e) {

	var maxlen = parseInt($(this).attr("maxlength"));
	var content = $(this).val();

	if($(this).val().length > maxlen) {
        $(this).val($(this).val().substring(0, maxlen));
    }

	$(this).parent().find('span > em.lengthLimitCounter').html(content.length);
});

/* 파일 다운로드 */
function downloadFile2(filePath, fileName) {
	// window.location.href = "/?_c=comm&_m=fileDownload&_a=downloadFile&filePath=" + filePath + "&fileName=" + fileName;
	window.location.href = filePath + fileName;
}

/* 파일 다운로드 */
function downloadFile(fileUrl) {

	window.location.href = fileUrl;

}

/* URL에서 파라미터 제거 */
function removeURLParameter(param, url) {
    url = decodeURI(url).split("?");
    path = url.length == 1 ? "" : url[1];
    path = path.replace(new RegExp("&?"+param+"\\[\\d*\\]=[\\w]+", "g"), "");
    path = path.replace(new RegExp("&?"+param+"=[\\w]+", "g"), "");
    path = path.replace(/^&/, "");
    return url[0] + (path.length
        ? "?" + path
        : "");
}

/* URL에 파라미터 추가 */
function addURLParameter(param, val, url) {
    if(typeof val === "object") {
        // recursively add in array structure
        if(val.length) {
            return addURLParameter(
                param + "[]",
                val.splice(-1, 1)[0],
                addURLParameter(param, val, url)
            )
        } else {
            return url;
        }
    } else {
        url = decodeURI(url).split("?");
        path = url.length == 1 ? "" : url[1];
        path += path.length
            ? "&"
            : "";
        path += decodeURI(param + "=" + val);
        return url[0] + "?" + path;
    }
}

/*
 * palceholder 값을 컨트롤의 value로 리턴하지 않고, 실제 value를 리턴한다.
 */
$.fn.TextVal = function(){
    var $this = $(this),
    val = $this.eq(0).val();
    if(val == $this.attr('placeholder'))
        return '';
    else
        return val;
}
