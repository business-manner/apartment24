
/* 로그인 체크 */
function chkLogin() {
    return (getUserId() != "") ? true : false;
}

function getUserId() {
	return getCookie("id");	// cookie 사용시
}

function getUserNm() {
	return getCookie("nm");	// cookie 사용시
}

function getUserEmail() {
	return decodeURIComponent(getCookie("email"));	// cookie 사용시
}

function getUserInfoServer(callback) {
	$.ajax({
		type:"POST",
		data:"",
		dataType: "json",
		url:"/?_c=comm&_m=GetLoginInfo&_p=ajax",
		success:function(reparam){
			var infoData = reparam.loginInfo;

			if(infoData == "false"){
				callback(false, null);
			}
			else{
				/*
				$.each(infoData, function (index, entry) {
					console.log(entry.id);
				});
				*/
				callback(true, infoData);
			}
		},
		error:function(reparam){
			//console.log(reparam);
			//console.log("error");
		}
	});
}

/******************************************************************************
김동현(2017-11-21)
로그인 체크
로그인 되어 있으면 true를 리턴
fn_isLogin()을 대체하면 좋겠음.
fn_isLogin()은 속도가 빠르긴 하나 client 소스에 아이디가 노출되므로, 보안상 좋지 않음.
사용례:
	if(!isLoggedIn()) {
		alert(ALERT_REQUEST_LOGIN);
		fn_loginDiv();
	}
******************************************************************************/
var isLoggedIn = function () {
	$.ajax({
		type:"POST",
		data:"",
		dataType: "json",
		url:"/?_c=comm&_m=GetLoginInfo&_p=ajax",
		success:function(reparam){
			var infoData = reparam.loginInfo;

			if(infoData == "false"){
				return false;
			}
			else{
				return true;
			}
		},
		error:function(reparam){
			//console.log("error");
		}
	});
}
/* 로그인 체크 */

/* 로그인 체크 후 페이지 이동*/
function fnLoginCheckPage(goUrl)
{
	var url = goUrl;
	getUserInfoServer(function(result, data){
		if (result == false){
			if (confirm("로그인이 필요합니다.")){
				fn_loginDiv(url);
				return;
			}
			else{
				return false;
			}
		}
		else {
			window.location.href = url;
		}
	});
}

/* 빈값 체크 */
function fnIsEmpty(value) {
	if (value == "" || value == null || value == undefined || (value != null && typeof value == "object" && !Object.keys(value).length)) {
		return true;
	} else {
		return false;
	}
};
/* 빈값 체크 */

/* 새창 체크 */
function fnWinUrl(url, wintype, winname, winwidth, winheight, winscrollbars) {
	if (wintype == "_blank") {
		var _newWin = window.open(url, '_blank');
	}
	else {
		var _newWin = window.open(url, winname, "width="+winwidth+",height="+winheight+",scrollbars="+ winscrollbars +"");
	}

	if (_newWin == null) {
		alert('팝업이 차단되어 있습니다. 팝업차단 해제를 하여 주세요.');
	}
}
/* 새창 체크 */

/* 새창 후, 부모페이지 Reload  */
function fnWinUrlReload(url, wintype, winname, winwidth, winheight, winscrollbars) {
	if (wintype == "_blank") {
		var _newWin = window.open(url, '_blank');
	}
	else {
		var _newWin = window.open(url, winname, "width="+winwidth+",height="+winheight+",scrollbars="+ winscrollbars +"");
	}

	if (_newWin == null) {
		alert('팝업이 차단되어 있습니다. 팝업차단 해제를 하여 주세요.');
	}
	else {
		location.reload();
	}
}
/* 새창 체크 */


//	지역,학교,지하철,단지명 검색레이어 오픈여부 체크 후 최근검색어 리스팅
function check_msrch() {

	show_msrchRecentSearch();
	
	//if ($("#top_layout .msrch_wrap").hasClass('open')) {	
	//	show_msrchRecentSearch();
	//}
}

$(document).on('click','#msrch_wrap_address_list > li > a', function(e) {	// 동적으로 생성된 목록에 jquery에서 이벤트를 주려면 $(document).on을 써줘야 함
//	$(".search_frm input:not(.each_def).inp_txt").val($(this).text().trim());
//	$(this).parent().parent().parent().parent().find('.search_result').removeAttr("style");

	e.preventDefault();

	var text = jQuery.trim($(this).text());
	var actn = $(this).attr('onclick');

	add_msrchRecentSearch(text+'||'+actn);
});

//	지역,학교,지하철,단지명 최근검색어 목록 가져오기
function get_msrchRecentSearch() {
	//console.log(decodeURIComponent(getCookie('msrchRecentSearchText')));
	var arr = decodeURIComponent(getCookie('msrchRecentSearchText')).split('~~span~~');
	return arr;
}

//	지역,학교,지하철,단지명 최근검색어 저장하기
function add_msrchRecentSearch(search_text) {
	var max_record_count = 5;	// 최근검색어 저장할 갯수

	var arr = get_msrchRecentSearch();
	var isDuplicate = false;
	var duplicateIdx = -1;

	var str = '';

	if (arr != undefined && arr.length > 0) {
		for (var i=0; i<arr.length; i++) {
			if (jQuery.trim(arr[i]) == jQuery.trim(search_text)) {
				isDuplicate = true;
				duplicateIdx = i;
			}
		}

		for (var i=0; i<arr.length; i++) {
			if (((duplicateIdx != i) && (arr.length < max_record_count)) || (isDuplicate && (arr.length > (max_record_count-1)) && (duplicateIdx != i)) || (!isDuplicate && (arr.length > (max_record_count-1)) && (i != 0))) {
				str += (str == '') ? arr[i] : '~~span~~' + arr[i];
			}
		}
		str += (str == '') ? search_text : '~~span~~'+ search_text;
	}
	else {
		str = search_text;
	}

	setCookie('msrchRecentSearchText', str, 1);
}

//	지역,학교,지하철,단지명 최근검색어 목록보여주기
function show_msrchRecentSearch() {

	var hasSearched = false;
	var $target1 = $("#search_layout .msrch_wrap .boxTab_wrap .tabBox.n3 .tabCon .srch_t3");
	var $target2 = $("#search_layout .msrch_wrap .boxTab_wrap .tabBox.n3 .tabCon .srch_t3 ul");
	var arr = get_msrchRecentSearch();
	
	$target1.find('span').remove();

	if (arr != undefined) {
		$target2.find('li').remove();
		for (var i=arr.length-1; i>=0; i--) {
			if (arr[i] != '') {
				var arr2 = arr[i].split('||');
				$target2.append("<li><a href=\"#none\" onclick=\""+ arr2[1] +"\"><span class=\"txt_result\">"+ arr2[0] +"</span><span class=\"ico_comm ico_arrow\"></span></a></li>");
				hasSearched = true;
			}
		}
	}
	
	if (hasSearched == false) {
		$target1.append("<span><span class='ico_comm clock'></span>최근검색어가 없습니다.</span>");
	}
	
	/*
	var $target = $("#search_layout .msrch_wrap .boxTab_wrap .tabBox.n3 .tabCon .srch_t3 ul");
	var arr = get_msrchRecentSearch();
	
	if (arr != undefined) {
		$target.find('li').remove();
		for (var i=arr.length-1; i>=0; i--) {
			if (arr[i] != '') {
				var arr2 = arr[i].split('||');
				$target.append("<li><a href=\"#none\" onclick=\""+ arr2[1] +"\"><span class=\"txt_result\">"+ arr2[0] +"</span><span class=\"ico_comm ico_arrow\"></span></a></li>");
				hasSearched = true;
			}
		}
	}
	*/
}

function getUrlVars() {
	var vars = [], hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	for(var i = 0; i < hashes.length; i++)
	{
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}
	return vars;
}

function AddComma(g) {
	str = String(g);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

function isNumeric(num, opt, len, mLen){
	// 좌우 trim(공백제거)을 해준다.
	num = String(num).replace(/^\s+|\s+$/g, "");

	if(len || len > 0){
		if(num.length < len){
			return false;
		}
	}

	if(mLen || mLen > 0){
		if(num.length > mLen){
			return false;
		}
	}

	if(typeof opt == "undefined" || opt == "1"){
		// 모든 10진수 (부호 선택, 자릿수구분기호 선택, 소수점 선택)
		var regex = /^[+\-]?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+){1}(\.[0-9]+)?$/g;
	}
	else if(opt == "2"){
		// 부호 미사용, 자릿수구분기호 선택, 소수점 선택
		var regex = /^(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+){1}(\.[0-9]+)?$/g;
	}
	else if(opt == "3"){
		// 부호 미사용, 자릿수구분기호 미사용, 소수점 선택
		var regex = /^[0-9]+(\.[0-9]+)?$/g;
	}
	else{
		// only 숫자만(부호 미사용, 자릿수구분기호 미사용, 소수점 미사용)
		var regex = /^[0-9]+$/g;
	}

	if( regex.test(num) ){
		num = num.replace(/,/g, "");
		return isNaN(num) ? false : true;
	}
	else{
		return false;
	}
}

$(document).ready(function(){
	$(".onlynum").keyup(function(){$(this).val( $(this).val().replace(/[^0-9]/g,"") );} );
	$(".onlynumsosu").keyup(function(){$(this).val( $(this).val().replace(/[^\.0-9]/g,"") );} );
	$(".onlyeng").keyup(function(){$(this).val( $(this).val().replace(/[^\!-z]/g,"") );} );
});


String.prototype.replaceAll = function(org, dest) {
    return this.split(org).join(dest);
}


// 숫자변환 함수 ##################################################
// Ex) str = "a테스트bcd테스트efg".replaceAll("테스트", ""); => str = "abcdefg";
String.prototype.toNumeric = function() {
	var s = this;
	s = (typeof s == 'undefined' ? '0' : s.toString().replace(/,/g, ''));
	if (isNaN(s) || s.replace(/ /g, '') == '') return 0;
	else	return parseFloat(s);
}

jQuery.fn.serializeObject = function() {
  var obj = null;
  try {
    if ( this[0].tagName && this[0].tagName.toUpperCase() == "FORM" ) {
      var arr = this.serializeArray();
      if ( arr ) {
        obj = {};
        jQuery.each(arr, function() {
          obj[this.name] = this.value;
        });
      }//if ( arr ) {
 		}
  }
  catch(e) {alert(e.message);}
  finally  {}

  return obj;
};


function fnOpenDetailLayer(id) {

    $(id).css("display","inline-block");
    openLp();
    $("body").trigger("openEducationInfoDetail");

}

/* 나의 관심 설정 및 조회&삭제 */
function fnMyConcern(concernGbn, concernTab, addr1, addr2, addr3, complexCd, complexNm, mulCode, boardNo, postNo)
{
	
	var title = "";

	$("span.ico_comm_l.like").removeClass("on");
	$("span.ico_comm_l.like").attr({"data-no" : ""});

	if( fn_isLogin() != ""){
		var formData = {concernGbn : concernGbn, concernTab : concernTab, addr1 : addr1, addr2 : addr2, addr3 : addr3, complexCd : complexCd, mulCode : mulCode, boardNo :  boardNo, postNo : postNo };

		$.ajax({
			type:"POST",
			data:formData,
			url:"/?_c=MyPage&m=MyConcern&a=MyConcernInfo.ajax",
			success:function(reparam){

				/* 좋아요 선택되어 있을 경우*/
				if (reparam != "") {
					$("span.ico_comm_l.like").addClass("on");

					$("span.ico_comm_l.like").attr({"data-no" : reparam})
				}
			},
			error:function(reparam){
				//console.log(reparam);
				//console.log("error");
			}
		});
	}
	

	// 좋아요 클릭시
	$("span.ico_comm_l.like").unbind("click");
	$("span.ico_comm_l.like").parent().click(function(e) {
		getUserInfoServer(function(result, data){
			if (result == false){
				if (confirm("로그인이 필요합니다.")){
					fn_loginDiv();
					return;
				}
				else{
					return ;
				}
			}
			else
			{
				var mmCode = getCookie('Memul_MemulType1') + getCookie('Memul_MemulType2') + getCookie('Memul_MemulStyle') ;
				var chkNum = $("span.ico_comm_l.like").attr("data-no");

				if($("span.ico_comm_l.like").hasClass("on")) {	// 좋아요 제거
					var formData = {chkNum : chkNum, concernGbn : concernGbn};

					$.ajax({
						url : "/?_c=MyPage&m=MyConcern&a=MyDistrictDel.ajax",
						type: "POST",
						data : formData,
						success: function(data, textStatus, jqXHR){
							$("span.ico_comm_l.like").removeClass("on");
							$("span.ico_comm_l.like").attr({"data-no" : ""});
						},
						error: function (jqXHR, textStatus, errorThrown){
							//console.log("code:"+jqXHR.status+"\n"+"message:"+jqXHR.responseText+"\n"+"error:"+errorThrown);
						}
					});
				}
				else
				{
					var formData = {concernGbn : concernGbn, concernTab : concernTab, addr1:addr1,addr2:addr2,addr3:addr3, complexCd : complexCd, complexNm:complexNm, mulCode : mulCode, boardNo: boardNo, postNo: postNo, title : title, mmCode : mmCode };

					$.ajax({
						type:"get",
						data:formData,
						url:"/?_c=MyPage&m=MyConcern&a=MyConcernIns.ajax",
						success:function(reparam){
					
							if (reparam != "") {
								$("span.ico_comm_l.like").addClass("on");

								$("span.ico_comm_l.like").attr({"data-no" : reparam})
							}
						},
						error:function(reparam){
							//console.log(reparam);
							//console.log("error");
						}
					});
				}
			}
		});
	});
}

function fnMemulGbnName(fCode)
{
	var fCodeName = "";
	var strfCodeSplit = fCode.split("%7C");

	if (strfCodeSplit.length > 1)
	{
		fCode = strfCodeSplit[0].substring(0,1)	;
	}

	if (fCode.length == 1)
	{
		if (fCode == "A") fCodeName = "아파트";
		else if (fCode == "B") fCodeName = "주상복합";
		else if (fCode == "C") fCodeName = "재건축";
		else if (fCode == "D") fCodeName = "오피스텔";
		else if (fCode == "E") fCodeName = "분양권";
		else if (fCode == "F") fCodeName = "빌라";
		else if (fCode == "G") fCodeName = "원룸";
		else if (fCode == "H") fCodeName = "주택";
		else if (fCode == "I") fCodeName = "재개발";
		else if (fCode == "J") fCodeName = "상가";
		else if (fCode == "K") fCodeName = "사무실";
		else if (fCode == "L") fCodeName = "건물";
		else if (fCode == "M") fCodeName = "공장";
		else if (fCode == "N") fCodeName = "창고";
		else if (fCode == "O") fCodeName = "토지";
		else if (fCode == "P") fCodeName = "펜션";
		else if (fCode == "Q") fCodeName = "경매";
		else if (fCode == "R") fCodeName = "기타";
	}
	else
	{
		if (fCode == "AA") fCodeName = "아파트";
		else if (fCode == "AB") fCodeName = "도시형생활주택";
		else if (fCode == "BA") fCodeName = "주상복합";
		else if (fCode == "CA") fCodeName = "재건축";
		else if (fCode == "CB") fCodeName = "주택재건축";
		else if (fCode == "DA") fCodeName = "오피스텔";
		else if (fCode == "EA") fCodeName = "아파트분양권";
		else if (fCode == "EB") fCodeName = "주상복합분양권";
		else if (fCode == "EC") fCodeName = "오피스텔분양권";
		else if (fCode == "FA") fCodeName = "연립빌라";
		else if (fCode == "FB") fCodeName = "고급빌라";
		else if (fCode == "FC") fCodeName = "다세대";
		else if (fCode == "GA") fCodeName = "원룸";
		else if (fCode == "HA") fCodeName = "단독";
		else if (fCode == "HB") fCodeName = "다가구";
		else if (fCode == "HC") fCodeName = "다중";
		else if (fCode == "HD") fCodeName = "상가주택";
		else if (fCode == "HE") fCodeName = "전원";
		else if (fCode == "HF") fCodeName = "농가";
		else if (fCode == "HG") fCodeName = "기타";
		else if (fCode == "IA") fCodeName = "재개발";
		else if (fCode == "JA") fCodeName = "상가";
		else if (fCode == "KA") fCodeName = "사무실";
		else if (fCode == "LA") fCodeName = "빌딩";
		else if (fCode == "LB") fCodeName = "상가건물";
		else if (fCode == "MA") fCodeName = "공장";
		else if (fCode == "MB") fCodeName = "아파트형공장";
		else if (fCode == "NA") fCodeName = "창고";
		else if (fCode == "OA") fCodeName = "토지";
		else if (fCode == "PA") fCodeName = "펜션";
		else if (fCode == "QA") fCodeName = "경매";
		else if (fCode == "RA") fCodeName = "교환물건";
		else if (fCode == "RB") fCodeName = "회원권";
		else if (fCode == "RC") fCodeName = "기타";

	}

	return fCodeName;
}

function fnDealGbnName(dealCode)
{
	var dealCodeName = "";

	if (dealCode == "1") dealCodeName = "매매";
	else if (dealCode == "2") dealCodeName = "전세";
	else if (dealCode == "3") dealCodeName = "월세";

	return dealCodeName;
}

//숫자(콤마포함)만 입력 단순형
function IsNumberChkSimple(field){
	if ( field.value != ""){
	    patten = /^[0-9,]+$/;
		if(!patten.test(field.value)){
			field.value="";
			alert("숫자만 입력하세요.");
			return false;
		}
		return true;
	}
}

function createHisFrm(formData, act){
	/* 폼이 존재한다면 지우고 다시 만든다. */
	if ($('#hisFrm').length) {
		var preFormData = $("#hisFrm").serializeArray();
		//createHisPreFrm(preFormData)
		$("#hisFrm").remove();
	}
	/* 폼이 존재한다면 지우고 다시 만든다. */

	var form = $(document.createElement('form'));
	$(form).attr("id", "hisFrm");
	$(form).attr("method", "POST");
	$(form).css("display", "none");

	$.each(formData, function (index, entry) {
		$(form).append($("<input>").attr("type", "hidden").attr("name", index).val(entry));
	});

	form.appendTo( document.body )

	if(act && act != ""){
		$(form).attr("action", act);
		$(form).submit();
	}
}

/*
function createHisPreFrm(formData){
	if ($('#hisPreFrm').length) {
		$("#hisPreFrm").remove();
	}

	var form = $(document.createElement('form'));
	$(form).attr("id", "hisPreFrm");
	$(form).attr("method", "POST");
	$(form).css("display", "none");

	$.each(formData, function (index, entry) {
		$(form).append($("<input>").attr("type", "hidden").attr("name", entry.name).val(entry.value));
	});

	form.appendTo( document.body )
}
*/

/* 중개사무소 홈페이지 가기 */
function fnGoJunHome(junCode, homePage)
{
	var url;
	
	if (homePage) {
		url = homePage;
	}
	else {
		url = "http://www.r114.co.kr/z/catridge/public/redirect_junhome.asp?juncode="+junCode;		
	}
	
	fnWinUrl(url, "_blank", "", "","","");
}

/* 중개사무소 매물보기 */
function fnGoJunHomeMemul(junCode)
{
	fnWinUrl("http://www.r114.net/redirectjun.asp?jno="+junCode+"&mflag=1", "_blank", "", "","","");	
}

/* GNB 영역 */
function fnHoverMemulMenu()
{
	var jsonLog =  r114Logger.getAccessLogPage(1, 3, "매물");

	var html  = ""
	if (jsonLog.length > 0) {
		$.each(jsonLog, function(i){

			var logTimestamp = jsonLog[i].logTimestamp;
			var logCd = jsonLog[i].logCd;
			var logType = jsonLog[i].logType;
			var logKey = jsonLog[i].logkey;
			var logValueArr = jsonLog[i].logValue.split("^");

			if (logType == "매물")
			{
				var dealCode = "";

				if (logValueArr[2] == "매매") dealCode = "1";
				else if (logValueArr[2] == "전세") dealCode = "2";
				else if (logValueArr[2] == "월세") dealCode = "3";
				else dealCode = "3";

				var strArea =  "["+logValueArr[1]+" | "+logValueArr[2]+"] "+logValueArr[6]+" "+logValueArr[7] ;

				html = html + "	<li><a href=\"/?_c=memul&_m=p10&addr1="+logValueArr[5]+"&addr2="+logValueArr[6]+"&addr3="+logValueArr[7]+"&cortarNo="+logValueArr[8]+"&fCode="+fnMemulGbnCode(logValueArr[1])+"&memulStyle="+dealCode+"&complexCd="+logValueArr[10]+"&tabGbn=0\">";

				if (!isEmpty(logValueArr[10]))
				{
					strArea = strArea +				" "+ logValueArr[9];
				}

				/* 글자수 체크하여 말줄임 표시 */
				if(strArea.length > 50)
				{
					html = html + strArea.substring(0,50) + "...";
				}
				else
				{
					html = html + strArea;
				}
				/* 글자수 체크하여 말줄임 표시 */
				
				html = html +"</a></li>";				
			}	

		});
	}
	else
	{
		$("#spnMemulTabMenuTitle").remove();	
	}

	$("#ulMemulTabMenu").html(html);
}


function fnMemulGbnCode(fCodeName)
{
	var fCode = "";
	
	if (fCodeName == "아파트") fCode = "AA";
	else if (fCodeName == "아파트렌트") fCode = "AA";
	else if (fCodeName == "도시형생활주택") fCode = "AB";
	else if (fCodeName == "주상복합") fCode = "BA";
	else if (fCodeName == "재건축") fCode = "CA";
	else if (fCodeName == "주택재건축") fCode = "CB";
	else if (fCodeName == "오피스텔") fCode = "D";
	else if (fCodeName == "아파트분양권") fCode = "EA";
	else if (fCodeName == "주상복합분양권") fCode = "EB";
	else if (fCodeName == "오피스텔분양권") fCode = "EC";
	else if (fCodeName == "신축빌라") fCode = "FA";
	else if (fCodeName == "연립빌라") fCode = "FA";
	else if (fCodeName == "고급빌라") fCode = "FB";
	else if (fCodeName == "다세대") fCode = "FC";
	else if (fCodeName == "원룸") fCode = "GA";
	else if (fCodeName == "단독주택") fCode = "HA";
	else if (fCodeName == "다가구") fCode = "HB";
	else if (fCodeName == "다중주택") fCode = "HC";
	else if (fCodeName == "상가주택") fCode = "HD";
	else if (fCodeName == "전원주택") fCode = "HE";
	else if (fCodeName == "농가주택") fCode = "HF";
	else if (fCodeName == "기타주택") fCode = "HG";
	else if (fCodeName == "재개발") fCode = "IA";
	else if (fCodeName == "상가") fCode = "JA";
	else if (fCodeName == "사무실") fCode = "KA";
	else if (fCodeName == "빌딩") fCode = "LA";
	else if (fCodeName == "상가건물") fCode = "LB";
	else if (fCodeName == "공장") fCode = "MA";
	else if (fCodeName == "아파트형공장") fCode = "MB";
	else if (fCodeName == "창고") fCode = "NA";
	else if (fCodeName == "토지") fCode = "OA";
	else if (fCodeName == "숙박콘도펜션") fCode = "PA";
	else if (fCodeName == "경매") fCode = "QA";
	else if (fCodeName == "교환물건") fCode = "RA";
	else if (fCodeName == "회원권") fCode = "RB";
	else if (fCodeName == "기타") fCode = "RC";

	return fCode;
}

function getAddrFromCortarNo() {

	// 파라미터 설명
	// 0. CortarNo (지역코드)
	// 1. Callback Function


	// Return 설명
	// 도시|구시군|읍면동|CortarNo|기본레벨

	var arg_length = arguments.length;

	if (arg_length < 1) {
		return false;	
	}

	var CortarNo = arguments[0];
	var CallbackFunction = arguments[1];

	$.ajax({
		type: "POST",
		data: { "cortarNo": CortarNo },
		url: "/?_c=comm&_m=getCortarNoInfo&_p=AJAX",
		dataType: "json",
		success: function(reparam) {
			if (Object.keys(reparam).length > 0) {
				CallbackFunction(reparam.도시 + "|" + reparam.구시군 + "|" + reparam.읍면동 + "|" + reparam.법정동코드 + "|" + reparam.지도좌표X + "|" + reparam.지도좌표Y + "|" + reparam.지도레벨);
			}
		},
		error: function(reparam) {
			//console.log(reparam);
		}
	});
}

function getAddrFromGeo() {

	// 파라미터 설명
	// 0. Latitude (위도)
	// 1. Longitude (경도)
	// 2. Callback Function

	// Return 설명
	// 도시|구시군|읍면동|CortarNo|기본레벨

	var arg_length = arguments.length;

	if (arg_length < 1) {
		return false;	
	}

	var Latitude = arguments[0];
	var Longitude = arguments[1];
	var CallbackFunction = arguments[2];

	getAddrFromGeoVworld(Latitude, Longitude, CallbackFunction)
	//getAddrFromGeoKakao(Latitude, Longitude, CallbackFunction)
}


function getAddrFromGeoVworld(Latitude, Longitude, CallbackFunction) {
	$.ajax({
		type: 'POST',
		data: {
			'key': GlobalVworldKey,
			'point': Longitude + ', ' + Latitude,
		},
		url: "/z/depot/public/vworldGeoCoder.asp",
		dataType: "json",
		success: function(result) {
			if (result.response.status == 'OK') {
				var _result_vworld_obj = result.response.result[0].structure;
				var _result_vworld_addr1 = _result_vworld_obj.level1;
				var _result_vworld_addr2 = _result_vworld_obj.level2.split(' ')[0];
				var _result_vworld_addr3 = _result_vworld_obj.level4L;

				if (_result_vworld_addr1 == '세종특별자치시') {
					_result_vworld_addr1 = '세종특별시';
					_result_vworld_addr2 = '세종시';
				}
				else if (_result_vworld_addr1 == '제주특별자치도') {
					_result_vworld_addr1 = '제주도';
				}

				 getAddrFromGeoEnd('Vworld', Longitude, Latitude, _result_vworld_addr1, _result_vworld_addr2, _result_vworld_addr3, CallbackFunction);

			}
			else {
				SetGeocoderLog('Vworld', Latitude, Longitude, '', '', '', 'F');
			}
		},
		error: function(result) {
			SetGeocoderLog('Vworld', Latitude, Longitude, '', '', '', 'F');
		}
	});
}


function getAddrFromGeoKakao(Latitude, Longitude, CallbackFunction) {
	var geocoder = new daum.maps.services.Geocoder();
	var coord = new daum.maps.LatLng(Latitude, Longitude);

	var callback = function(result, status) {
		if (status === daum.maps.services.Status.OK) {

			if (result[0].region_type == 'B') {
				var _region_1depth_name = result[0].region_1depth_name;
				var _region_2depth_name = result[0].region_2depth_name;
				var _region_3depth_name = result[0].region_3depth_name;
			}
			else if (result[1].region_type == 'B') {
				var _region_1depth_name = result[1].region_1depth_name;
				var _region_2depth_name = result[1].region_2depth_name;
				var _region_3depth_name = result[1].region_3depth_name;
			}

			var strAddr = setDaumAddrToR114Addr(_region_1depth_name + ' ' + _region_2depth_name + ' ' + _region_3depth_name).split(" ");

			 getAddrFromGeoEnd('Kakao', Longitude, Latitude, strAddr[0], strAddr[1], strAddr[2], CallbackFunction);

		}
		else {
			SetGeocoderLog('Kakao', Latitude, Longitude, '', '', '', 'F');
		}
	};

	geocoder.coord2RegionCode(coord.getLng(), coord.getLat(), callback);
}


function getAddrFromGeoEnd(_mapPlatform, _longitude, _latitude, _addr1, _addr2, _addr3, _callback) {
	$.ajax({
		type: "POST",
		data: { "addr1": _addr1, "addr2": _addr2, "addr3": _addr3 },
		url: "/?_c=comm&_m=getCortarNoInfo&_p=AJAX",
		dataType: "json",
		success: function(reparam) {
			if (Object.keys(reparam).length > 0) {
				_callback(reparam.도시 + "|" + reparam.구시군 + "|" + reparam.읍면동 + "|" + reparam.법정동코드 + "|" + reparam.지도좌표X + "|" + reparam.지도좌표Y + "|" + reparam.지도레벨);
				SetGeocoderLog(_mapPlatform, _latitude, _longitude, reparam.도시, reparam.구시군, reparam.읍면동, 'S');
			}
			else {
				SetGeocoderLog(_mapPlatform, _latitude, _longitude, _addr1, _addr2, _addr3, 'M');
			}
		},
		error: function(reparam) {
			SetGeocoderLog(_mapPlatform, _latitude, _longitude, _addr1, _addr2, _addr3, 'F');
		}
	});
}


function setDaumAddrToR114Addr(strAddr) {
	var addr = strAddr.split(" ");

	if (addr[0] == "서울") addr[0] = "서울특별시";
	else if (addr[0] == "경기") addr[0] = "경기도";
	else if (addr[0] == "경북") addr[0] = "경상북도";
	else if (addr[0] == "경남") addr[0] = "경상남도";
	else if (addr[0] == "대구") addr[0] = "대구광역시";
	else if (addr[0] == "전남") addr[0] = "전라남도";
	else if (addr[0] == "광주") addr[0] = "광주광역시";
	else if (addr[0] == "대전") addr[0] = "대전광역시";
	else if (addr[0] == "강원") addr[0] = "강원도";
	else if (addr[0] == "인천") addr[0] = "인천광역시";
	else if (addr[0] == "세종특별자치시") {
		addr[0] = "세종특별시";
		addr[3] = addr[2];
		addr[2] = addr[1];
		addr[1] = "세종시"
	}
	else if (addr[0] == "울산") addr[0] = "울산광역시";
	else if (addr[0] == "충북") addr[0] = "충청북도";
	else if (addr[0] == "부산") addr[0] = "부산광역시";
	else if (addr[0] == "부산") addr[0] = "부산광역시";
	else if (addr[0] == "전북") addr[0] = "전라북도";
	else if (addr[0] == "충남") addr[0] = "충청남도";
	else if (addr[0] == "제주특별자치도") addr[0] = "제주도";

	if (addr[2] == "도두1동") addr[2] = "도두일동";
	else if (addr[2] == "도두2동") addr[2] = "도두이동";
	else if (addr[2] == "도련1동") addr[2] = "도련일동";
	else if (addr[2] == "도련2동") addr[2] = "도련이동";
	else if (addr[2] == "삼도1동") addr[2] = "삼도일동";
	else if (addr[2] == "삼도2동") addr[2] = "삼도이동";
	else if (addr[2] == "삼양1동") addr[2] = "삼양일동";
	else if (addr[2] == "삼양2동") addr[2] = "삼양이동";
	else if (addr[2] == "삼양3동") addr[2] = "삼양삼동";
	else if (addr[2] == "아라1동") addr[2] = "아라일동";
	else if (addr[2] == "아라2동") addr[2] = "아라이동";
	else if (addr[2] == "오라1동") addr[2] = "오라일동";
	else if (addr[2] == "오라2동") addr[2] = "오라이동";
	else if (addr[2] == "오라3동") addr[2] = "오라삼동";
	else if (addr[2] == "외도1동") addr[2] = "외도일동";
	else if (addr[2] == "외도2동") addr[2] = "외도이동";
	else if (addr[2] == "용담1동") addr[2] = "용담일동";
	else if (addr[2] == "용담2동") addr[2] = "용담이동";
	else if (addr[2] == "용담3동") addr[2] = "용담삼동";
	else if (addr[2] == "이도1동") addr[2] = "이도일동";
	else if (addr[2] == "이도2동") addr[2] = "이도이동";
	else if (addr[2] == "이호1동") addr[2] = "이호일동";
	else if (addr[2] == "이호2동") addr[2] = "이호이동";
	else if (addr[2] == "일도1동") addr[2] = "일도일동";
	else if (addr[2] == "일도2동") addr[2] = "일도이동";
	else if (addr[2] == "화북1동") addr[2] = "화북일동";
	else if (addr[2] == "화북2동") addr[2] = "화북이동";

	if (addr.length > 3 && addr[3] != undefined && addr[3].substring(addr[3].length - 1, addr[3].length) != "리") {
		addr[2] = addr[3];
	}

	return addr[0] + " " + addr[1] + " " + addr[2];
}

function SetGeocoderLog(_mapType, _latitude, _longitude, _addr1, _addr2, _addr3, _result) {
	$.ajax({
		type: "POST",
		data: { "mapType": _mapType, "latitude": _latitude, "longitude": _longitude, "addr1":_addr1, "addr2":_addr2, "addr3":_addr3, "result": _result },
		url: "/?_c=comm&_m=MapLogging&_p=AJAX",
		dataType: "json",
		success: function(reparam) {
		},
		error: function(reparam) {
		}
	});
}