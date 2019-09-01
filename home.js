	$(document).ready(function() {
		
		upgradeBrowser();
		
		// 필명(아이디) 조회
		getUserNick(function(nick) {
			
				if (nick != "") {
					$(".privateArea").css("display", "");
					$(".publicArea").css("display", "none");
					$("#userNick").html("<em>" + nick + "</em>님의<br />의뢰내역 입니다.");		
					// 중개의뢰 건수 조회
					getMyAskCount();	
				}
				else {
					$(".privateArea").css("display", "none");
					$(".publicArea").css("display", "");
					// 중개의뢰 건수 조회
					getAskCount();		
				}
			}				
		); 

		$(document).on("click", ".tab_ui>li", function(e) {
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
	        //$('body').trigger('tab_change');
	    });
		
		$(document).on("click", ".tab_ui>a", function(e) {
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
	        //$('body').trigger('tab_change');
	    });
		
		// 지역별매물찾기 : 사용 안 함
		$('#cmdSearchLocal').on('click', function() {
			var method = "post";
			var path = "/?_c=memul&_m=p10"
		    var form = document.createElement("form");
		    
			form.setAttribute("method", method);
		    form.setAttribute("action", path);
		    
	        var hiddenField1 = document.createElement("input");
	        hiddenField1.setAttribute("type", "hidden");
	        hiddenField1.setAttribute("name", "searchGbn");
	        hiddenField1.setAttribute("value", "A");	        
	        form.appendChild(hiddenField1);
	        
	        var hiddenField2 = document.createElement("input");
	        hiddenField2.setAttribute("type", "hidden");
	        hiddenField2.setAttribute("name", "searchId");
	        hiddenField2.setAttribute("value", "");     
	        form.appendChild(hiddenField2);
	        
		    document.body.appendChild(form);
		    form.submit();
			
		});
		
		// 지도에서매물찾기 : 사용 안 함
		$('#cmdSearchMap').on('click', function() {
			window.location.href = "/?_c=memul&_m=p10";		
		});	
		
		// 통계지도보기 : 사용 안 함
		$('#cmdSearchStatistics').on('click', function() {
			var method = "post";
			var path = "/?_c=memul&_m=p10"
		    var form = document.createElement("form");
		    
			form.setAttribute("method", method);
		    form.setAttribute("action", path);
		    
	        var hiddenField1 = document.createElement("input");
	        hiddenField1.setAttribute("type", "hidden");
	        hiddenField1.setAttribute("name", "searchGbn");
	        hiddenField1.setAttribute("value", "D");	        
	        form.appendChild(hiddenField1);
	        
	        var hiddenField2 = document.createElement("input");
	        hiddenField2.setAttribute("type", "hidden");
	        hiddenField2.setAttribute("name", "searchId");
	        hiddenField2.setAttribute("value", "20");     
	        form.appendChild(hiddenField2);
	        
		    document.body.appendChild(form);
		    form.submit();
		});	
		
		// 매물/시세 페이지로 이동 (신축빌라)
		$('#cmdSearch01').on('click', function() {
/*
			var method = "post";
			var path = "/?_c=memul&_m=p10"
		    var form = document.createElement("form");
		    
			form.setAttribute("method", method);
		    form.setAttribute("action", path);
	        var hiddenField2 = document.createElement("input");
	        hiddenField2.setAttribute("type", "hidden");
	        hiddenField2.setAttribute("name", "direct");
	        hiddenField2.setAttribute("value", "F");	        
	        form.appendChild(hiddenField2);
			
	        document.body.appendChild(form);
		    form.submit();
		    
		    ///
*/		    
			var form = document.createElement("form");	
		    $(form).attr("action", "/?_c=memul&_m=p10");
			$(form).attr("method", "POST");
	
			var input = $("<input>").attr("type", "hidden").attr("name", "fCode").val('F');
			$(form).append($(input));
			var input2 = $("<input>").attr("type", "hidden").attr("name", "memulStyle").val('1');
			$(form).append($(input2));
			var input3 = $("<input>").attr("type", "hidden").attr("name", "newVilla").val('1');
			$(form).append($(input3));
	
			document.body.appendChild(form);
			$(form).submit();
	
		});
		
		// 분양정보리스트 페이지로 이동
		$('#cmdSearch02').on('click', function() {
			window.location.href = "/?_c=lots&_s=info&_m=infolist";
		});

		// 내놓기메인페이지로 이동
		$('#cmdSearch03').on('click', function() {
			window.location.href = "/?_c=ask";
		});

		//VR분양관
		$('#cmdSearchVR').on('click', function() {
			window.location.href = "/?_c=lots&_m=VrCenterlist&_s=VrCenterlist";
		});

		$('#cmdSearchM01, #cmdNSearchW01, #cmdNSearchW02, #cmdNSearchW03 , #cmdNSearchM04').on('click', function() {
	    
			var form = document.createElement("form");	
		    $(form).attr("action", "/?_c=memul&_m=p10");
			$(form).attr("method", "POST");
			
			var _fcode;
			var _memulStyle;
			var tmp_id = $(this).attr('id');
			if (tmp_id == 'cmdSearchM01' )
			{
				_fcode = "A";
				_memulStyle = "1";
			} else if (tmp_id == 'cmdNSearchW01' ){				
				_fcode = "G";
				_memulStyle = "3";
			} else if (tmp_id == 'cmdNSearchW02' ){
				_fcode = "K";
				_memulStyle = "3";
			} else if (tmp_id == 'cmdNSearchW03' ){
				_fcode = "J";
				_memulStyle = "3";
			} else if (tmp_id == 'cmdNSearchM04' ){
				_fcode = "D";
				_memulStyle = "1";
			}
			var input = $("<input>").attr("type", "hidden").attr("name", "fCode").val(_fcode);
			$(form).append($(input));
			var input2 = $("<input>").attr("type", "hidden").attr("name", "memulStyle").val(_memulStyle);
			$(form).append($(input2));
	
			document.body.appendChild(form);
			$(form).submit();
	
		});

		
		// 우리동네단지이야기 더보기
		$('#cmdListCommunity').on('click', function() {

			if ($('#tab_community_2').attr('class') == 'on') {
				window.location.href = "/?_c=service&_s=community&pageNo=1&tabGubun=2&sortTag=0";	
			} else {
				window.location.href = "/?_c=service&_s=community";		
			}
			
		});	
		
		// 부동산상담 더보기
		$('#cmdListCounsel').on('click', function() {
			window.location.href = "/?_c=service&_m=counsel";		
		});
		
		// 중개의뢰 내놓기등록
		$('#cmdAskSell').on('click', function() {
			goMyAskSellPage();	
		});	
		
		// 중개의뢰 찾아주세요등록
		$('#cmdAskBuy').on('click', function() {
			goMyAskBuyPage();	
		});
		
		// 중개의뢰 고객후기 더보기
		$('#cmdListCustomerReview').on('click', function() {
			window.location.href = "/?_c=ask&_m=customerreview";		
		});	
		
		// 직거래매물 더보기
		$('#cmdListDirectDeal').on('click', function() {
			$("#directDeal_tab").find("li").each(function(index) {
				if ($(this).hasClass("on")) {
					if (index == 0) {
						window.location.href = "/?_c=service&_s=directdeal&_m=directdeallistPersonal";
					}
					else if (index == 1) {						
						window.location.href = "/?_c=service&_s=directdeal&_m=directdeallistEnterprise";
					}
					else {
						window.location.href = "/?_c=service&_s=directdeal&_m=directdeallistState";
					}
				}
			});		
		});
		
		// 공지사항 더보기
		$('#cmdListNoticeInfo').on('click', function() {
			window.location.href = "/?_c=information&_m=noticeInfo";		
		});	
		
		// 의뢰중/선택대기 더보기
		$('#cmdMyAsking1').on('click', function() {
			window.location.href = "/?_c=mypage&_s=myasking&_m=myasking&sellbuyType=2&statusGubun=1";		
		});	
		
		// 진행중 더보기
		$('#cmdMyAsking2').on('click', function() {
			window.location.href = "/?_c=mypage&_s=myasking&_m=myasking&sellbuyType=2&statusGubun=2";		
		});	
		
		// 거래완료/거래중단 더보기
		$('#cmdMyAsking3').on('click', function() {
			window.location.href = "/?_c=mypage&_s=myasking&_m=myasking&sellbuyType=2&statusGubun=3";		
		});	
		
		// 메인광고뉴스기사 더보기
		$('#cmdMoreNewsList').on('click', function() {
			
			$("#mainNewsTab").find("li").each(function(index) {
				if ($(this).hasClass("on")) {
					if (index == 0) {
						window.location.href = "/?_c=research";
					}
					else if (index == 1) {
						window.location.href = "/?_c=lots&_m=lotsnews";
					}
					else if (index == 2) {
						window.location.href = "/?_c=Research&_m=ReportNews";
					}
					else if (index == 3) {
						window.location.href = "/?_c=Research&_m=KnowHow";
					}
				}
			});
				
		});	
		
		// 중개의뢰 고객후기 더보기
		$('#goMyAskingList').on('click', function() {
			window.location.href = "/?_c=mypage&_m=MyAsking";
		});			
		
		// 투데이포커스영역 조회
		getTodayFocusList();
		
		// 분양정보영역 조회
		getLotsNewsList();
		
		// 맞춤리포트영역 조회
		getCustomReportList();
		
		// 부동산가이드영역 조회
		getRealGuideList();	
		
		// 우리동네단지이야기영역 조회
		getCommunityList();

		getBoardList(); //작업중
		
		// 부동산상담영역 조회
		getCounselList();	
		
		// 중개의뢰 고객후기 조회
		getCustomerReviewList();	
		
		// 직거래매물영역 조회 (개인/기업/국유재산)
		getDirectDealList('personal');
		getDirectDealList('enterprise');
		getDirectDealList('state');
		
		// 공지사항 조회
		getNoticeInfoList();

		/* 팝업 : S */
	
		$('#lp_layout_180820pop').hide();

//		if (getCookie("doNotOpenPop0515") != 'Y') {					
//			openLayerPopup('#lp_layout_180820pop'); 
//		}	
//
//		$('#chk_doNotOpenLayerPopup').on('click', function() {
//			setCookie("doNotOpenPop0515","Y",1);
//			closeLayerPopup('#lp_layout_180820pop');
//		});	
	});

	
	function closeLayerPopup(target) {

		$(target).hide();
	
	}
	/* 팝업 : E */


	/* 맞춤리포트 상세페이지로 이동 */
	function goResearchDetailPage(bno, gno, num) {
		
		if (bno=="0")
		{
			if (gno=="AREA")
			{
				window.location.href = "/?_c=Research&_m=Detail&_a=Area&bno="+bno+"&num="+num;	//우리지역리포트;
			}
			else
			{
				window.location.href = "/?_c=Research&_m=Detail&_a=Counsel&bno="+bno+"&num="+num;	//상담리포트;
			}
		}
		else
		{
			window.location.href = "/?_c=Research&_m=Detail&bno="+bno+"&gno="+gno+"&num="+num;
		}
	
	}
	
	/* 투데이포커스 조회 */
	function getTodayFocusList() {
		
//		var formData = {bizType: bizType };
		
		$.ajax({
			url : "/?_c=home&_a=todayFocusList.ajax",
			type: "POST",
//			data : formData,
			success: function(data, textStatus, jqXHR){
				if (data.length > 0) { // 자료가 있을때.
					$("#listTodayFocus").html(data);
				}
				else { // 자료가 없을때.
					$("#listTodayFocus").html("");
				}
			},
			error: function (jqXHR, textStatus, errorThrown){
			}
		});	
		
	}
	
	/*  맞춤리포트 조회 */
	function getCustomReportList() {
		
//		var formData = {bizType: bizType };
		
		$.ajax({
			url : "/?_c=home&_a=customerReportList.ajax",
			type: "POST",
//			data : formData,
			success: function(data, textStatus, jqXHR){
				if (data.length > 0) { // 자료가 있을때.
					$("#listCustomReport").html(data);
				}
				else { // 자료가 없을때.
					$("#listCustomReport").html("");
				}
			},
			error: function (jqXHR, textStatus, errorThrown){
			}
		});	
		
	}
	
	/* 부동산가이드 조회 */
	function getRealGuideList() {
		
//		var formData = {bizType: bizType };
		
		$.ajax({
			url : "/?_c=home&_a=realGuideList.ajax",
			type: "POST",
//			data : formData,
			success: function(data, textStatus, jqXHR){
				if (data.length > 0) { // 자료가 있을때.
					$("#listRealGuide").html(data);
				}
				else { // 자료가 없을때.
					$("#listRealGuide").html("");
				}
			},
			error: function (jqXHR, textStatus, errorThrown){
			}
		});	
		
	}
	
	/* 분양정보 조회 */
	function getLotsNewsList() {
		
//		var formData = {bizType: bizType };
		
		$.ajax({
			url : "/?_c=home&_a=lotsNewsList.ajax",
			type: "POST",
//			data : formData,
			success: function(data, textStatus, jqXHR){
				if (data.length > 0) { // 자료가 있을때.
					$("#listLotsNews").html(data);
				}
				else { // 자료가 없을때.
					$("#listLotsNews").html("");
				}
			},
			error: function (jqXHR, textStatus, errorThrown){
			}
		});	
		
	}
	
	/* 우리동네단지이야기 조회 */
	function getCommunityList() {
		
		
//		var formData = {bizType: bizType };
		
		$.ajax({
			url : "/?_c=home&_a=communityList.ajax",
			type: "POST",
//			data : formData,
			success: function(data, textStatus, jqXHR){
				if (data.length > 0) { // 자료가 있을때.
					$("#communityList").html(data);
				}
				else { // 자료가 없을때.
					$("#communityList").html("");
				}
			},
			error: function (jqXHR, textStatus, errorThrown){
			}
		});	
		
	}


	/* 우리동네단지이야기 상세페이지로 이동  */
	function goCommunityDetailPage(g){
	
		var formData = {"page": "1", "Metro": "", "County": "", "Town": "", "complexCd": "", "sortTag": "1", "sortTag2": "up", "tabGubun": "1", "searchGubun": "1", "searchText": "", "viewId": g};

		createHisFrm(formData, "/?_c=service&_s=community&_m=communityview&_a=townview");

	}
	
	/* 공인중개사 현장이야기 조회 */
	function getBoardList() {

		$.ajax({
			url : "/?_c=home&_a=boardList.ajax",
			type: "POST",
//			data : formData,
			success: function(data, textStatus, jqXHR){
				if (data.length > 0) { // 자료가 있을때.
					$("#boardList").html(data);
				}
				else { // 자료가 없을때.
					$("#boardList").html("");
				}
			},
			error: function (jqXHR, textStatus, errorThrown){
			}
		});	
	
		
	}



	/* 공인중개사현장이야기  상세페이지로 이동  */
	function goBoardDetailPage(g){
	
	
		var formData = {"page": "1", "Metro": "", "County": "", "Town": "", "complexCd": "", "sortTag": "1", "sortTag2": "up", "tabGubun": "1", "searchGubun": "1", "searchText": "", "viewId": g};

		createHisFrm(formData, "/?_c=service&_s=community&_m=communityview&_a=boardview");


	}


	/* 부동산상담 조회 */	
	function getCounselList() {
		
//		var formData = {bizType: bizType };
		
		$.ajax({
			url : "/?_c=home&_a=counselList.ajax",
			type: "POST",
//			data : formData,
			success: function(data, textStatus, jqXHR){
				if (data.length > 0) { // 자료가 있을때.
					$("#counselList").html(data);
				}
				else { // 자료가 없을때.
					$("#counselList").html("");
				}
			},
			error: function (jqXHR, textStatus, errorThrown){
			}
		});	
		
	}
	
	/* 부동산상담 상세페이지로 이동  */
	function goCounselDetailPage(consultGubun, g, id, kind){

		
		if (kind == '1') {	//공개
			window.location.href = "/?_c=service&_m=counselview&idx=" + g + "&consultgubun=" + consultGubun;		
		} else {
			if ( fn_isLogin() == id) {
				window.location.href = "/?_c=service&_m=counselview&idx=" + g + "&consultgubun=" + consultGubun;		
			} else {
				alert('비공개 상담은 열람이 불가합니다.');
			}
		}

		
	}	

	function goCounselDetailPage_backup(consultGubun, g){

		window.location.href = "/?_c=service&_m=counselview&idx=" + g + "&consultgubun=" + consultGubun;		

	}	
	
	
	/* 나의 중개의뢰 건수 조회 */	
	function getMyAskCount() {
		
		$.ajax({
			url : "/?_c=home&_a=MyAskSellBuyCount.ajax",
			type: "POST",
			dataType:"json",
			success: function(data, textStatus, jqXHR){
				var list = eval(data);
				if (jQuery.trim(list.result) == "OK") {
					$.each (list.rows, function(index, entry) {
						$("#cmdMyAsking1").html(numberWithCommas(entry["의뢰중"]));
						$("#cmdMyAsking2").html(numberWithCommas(entry["거래중"]));
						$("#cmdMyAsking3").html(numberWithCommas(entry["거래완료"]));
					});
				}	
				else { // 자료가 없을때.
					
				}
			},
			error: function (jqXHR, textStatus, errorThrown){
			}
		});	
		
	}
	
	/* 중개의뢰 고객후기 조회 */	
	function getCustomerReviewList() {
		
		$.ajax({
			url : "/?_c=home&_a=customerReviewList.ajax",
			type: "POST",
			success: function(data, textStatus, jqXHR){
				if (data.length > 0) { // 자료가 있을때.
					$("#listCustomerReview").html(data);
				}
				else { // 자료가 없을때.
					$("#listCustomerReview").html("");
				}
			},
			error: function (jqXHR, textStatus, errorThrown){
			}
		});	
		
	}
	
	/* 중개의뢰 건수 조회 */	
	function getAskCount() {
		
		$.ajax({
			url : "/?_c=home&_a=askSellBuyCount.ajax",
			type: "POST",
			dataType:"json",
			success: function(data, textStatus, jqXHR){
				var list = eval(data);
				if (jQuery.trim(list.result) == "OK") {
					$.each (list.rows, function(index, entry) {
						$("#askSellCount1").html(numberWithCommas(entry["매도의뢰중건수"]));
						$("#askSellCount2").html(numberWithCommas(entry["매도접수건수"]));
						$("#askBuyCount1").html(numberWithCommas(entry["매수의뢰중건수"]));
						$("#askBuyCount2").html(numberWithCommas(entry["매수접수건수"]));
						$("#askTotalCount").html(numberWithCommas(
//							parseInt(entry["매도의뢰중건수"]) +
//							parseInt(entry["매도접수건수"]) +
//							parseInt(entry["매수의뢰중건수"]) +
//							parseInt(entry["매수접수건수"])));

							parseInt(entry["매도의뢰중건수"]) +
							parseInt(entry["매수의뢰중건수"])));

						
					});
				}	
				else { // 자료가 없을때.
					//$("#lotsScheduleList").html("<li class='result_nodata'>분양일정이 없습니다.</li>");
				}
			},
			error: function (jqXHR, textStatus, errorThrown){
			}
		});	
		
	}
	
	/* 중개의뢰 내놓기등록 페이지 이동 */
	function goMyAskSellPage() {
		
		var url = "/?_c=ask&_m=asksell";
		if (fn_isLogin() == "") {
			alert(ALERT_REQUEST_LOGIN);
			fn_loginDiv(url);
		} else {
			//window.location.href = url;
			checkAskCertification(url);
		}
		
	}	
	
	/* 중개의뢰 찾아주세요등록 페이지 이동 */
	function goMyAskBuyPage() {
		
		var url = "/?_c=ask&_m=askbuy";
		if (fn_isLogin() == "") {
			alert(ALERT_REQUEST_LOGIN);
			fn_loginDiv(url);
		}
		else {
			//window.location.href = url;
			checkAskCertification(url);
		}
		
	}	
	
	/* 직거래매물 조회 */
	function getDirectDealList(bizType) {
		
		var formData = {bizType: bizType };
		
		$.ajax({
			url : "/?_c=home&_a=directDealList.ajax",
			type: "POST",
			data : formData,
			success: function(data, textStatus, jqXHR){
				if (data.length > 0) { // 자료가 있을때.
					if (bizType == "personal") {
							$("#directDealListPersonal").html(data);
					}
					else if (bizType == "enterprise") {
						$("#directDealListEnterprise").html(data);;
					}
					else {
						$("#directDealListState").html(data);
					}
				}
				else { // 자료가 없을때.
					if (bizType == "personal") {
						$("#directDealListPersonal").html("");
					}
					else if (bizType == "enterprise") {
						$("#directDealListEnterprise").html("");
					}
					else {
						$("#directDealListState").html("");
					}
				}
			},
			error: function (jqXHR, textStatus, errorThrown){
			}
		});	
		
	}
	
	/* 직거래매물 상세페이지로 이동 */
	function goDirectDealDetailPage(bizType, seq) {
	
		if (bizType == "personal") {
			window.location.href = "/?_c=service&_s=directdeal&_m=directdealdetailPersonal&seq=" + seq;
		}
		else if (bizType == "enterprise") {
			window.location.href = "/?_c=service&_s=directdeal&_m=directdealdetailEnterprise&seq=" + seq;
		}
		else {
			window.location.href = "/?_c=service&_s=directdeal&_m=directdealdetailState&seq=" + seq;
		}

	}
	
	/* 공지사항영역 조회 */
	function getNoticeInfoList() {
		
		var formData  = { page: 1, pageSize:3, searchType:"", searchStr: "" };	
		
		$.ajax({
			url : "/?_c=information&_m=noticeInfo&_a=mainNoticeInfoList.ajax",
			type: "POST",
			data : formData,
			success: function(data, textStatus, jqXHR){
				if (data.length > 0) { // 자료가 있을때.
					$("#listNoticeInfo").html(data);
					var slider_notice = $('.main_notice_wrap .slide').bxSlider({
			            auto: false,
			            touchEnabled: false,
			            pager:false,
			            mode:'vertical',
			            prevSelector: $('.main_notice_wrap .ui'),
			            nextSelector: $('.main_notice_wrap .ui')
			        });
					//slider_sale_media.reloadSlider();
				}
				else { // 자료가 없을때.
					$("#listCustomerReview").html("");
				}
			},
			error: function (jqXHR, textStatus, errorThrown){
			}
		});	
		
	}
	
	/* 공지사항 상세페이지로 이동  */
	function goNoticeInfoDetailPage(bno, gno, num) {
		
		window.location.href = "/?_c=information&_m=noticeInfo&_a=noticeInfoDetail&bno=" + bno + "&gno=" + gno + "&num=" + num;
		
	}
	
	// 부동산GO 앱 페이지로 이동
	function goRealGoPage() {
			
		window.location.href = "/?_c=service&_m=realGo";
	}
	
	/* 통합검색 페이지로 이동 */
/*	
	function goSearchEnginePage(searchWord) {
	
		var method = "post";
		var path = "/search/search.asp"
	    var form = document.createElement("form");
	    form.setAttribute("method", method);
	    form.setAttribute("action", path);
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", "dqSearchTerm");
        hiddenField.setAttribute("value", searchWord);
        form.appendChild(hiddenField);
	    document.body.appendChild(form);
	    form.submit();		
	}
*/	
	
	
		
	/* 사용자 필명(아이디) 조회 */
	function getUserNick(callBack) {
		var count = 0;
		$.ajax({
			url : "/?_c=home&_m=homeDefault&_a=UserNick.ajax",
			type: "POST",
			dataType:"json",
			success: function(data, textStatus, jqXHR){
				var list = eval(data);
				if (jQuery.trim(list.result) == "OK") {
					$.each (list.rows, function(index, entry) {
						callBack(entry["결과"]);
						count++;
					});
					if (count == 0) {
						callBack("");
					}
				}
				else { 
					callBack("");
				}
			},
			error: function (jqXHR, textStatus, errorThrown){
				callBack("");
			}
		});	
		
	}	
	
	/* 브라우저업그레이드 안내  */
	function upgradeBrowser() {		
		if($.browser.msie && parseInt($.browser.version) <= parseInt(8)){
			var up = getCookie("Info_Upbrowser");
			if (!up) { 
				openLp("type1");
			}
		}
		
	}
	
	/* 브라우저업그레이드 안내 오늘 안 보기  */
	function closeInfoToday() {		
		if ($("input[name=notToday]").prop("checked")) {
			setCookieAt00("Info_Upbrowser", "done" , 1); 
		}
		else {
			delCookie("Info_Upbrowser");
		}

	}
	
	