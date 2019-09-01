
$(document).ready(function(){

	$("#IpResearchMenu").each(function()
	{
		var reporttitle = $("#IpReportTitle").text();

		switch (reporttitle) {
			case "상담리포트":
				$(this).children().eq(1).addClass("on");
				break;
			case "우리지역리포트":
				$(this).children().eq(1).addClass("on");
				break;
			case "부동산다반사":
				$(this).children().eq(2).addClass("on");
				break;
			case "Weekly Tips":
				$(this).children().eq(2).addClass("on");
				break;
			case "칼럼":
				$(this).children().eq(3).addClass("on");
				break;
			case "리포트&뉴스":
				$(this).children().eq(0).addClass("on");
				break;
			case "동영상":
				$(this).children().eq(0).addClass("on");
				break;
			case "뜨는이슈":
				$(this).children().eq(0).addClass("on");
				break;
			case "언론사뉴스":
				$(this).children().eq(0).addClass("on");
				break;
			default:
				break;
		}
	});

	$("#searchStr").each(function()
	{
		if (!fnIsEmpty(searchStr))
		{
			$("#searchStr").val(searchStr);
			if (searchType!="") {
				$("#searchType").val(searchType).selectmenu("refresh").trigger('selectmenuchange');
			}
		}
	});

	/* 인쇄 */
	$("#aPrint").click(function(e) {
//		fnWinUrl("/?_c=Research&_m=Detail&_a=DetailPrint", "open", "printPop", "733","700","yes");
		$('.printArea1').printThis({
			importCSS: true,
			loadCSS: ""
		});
	});

	/* 목록으로 */
	$("#cmdList").click(function(e) {
		var param = "";
		if (!fnIsEmpty(pageNo))
		{
			param = param +  "&pageNo=" + pageNo;
		}
		window.location.href = listPage + goLink('pageNm') + param;

	});


	$("#btnAddrClear").click(function()
	{
		var tagInfoStr = "";
		$.each($("#divSearchTag .tag_set > .tag_comm"), function(index, entry) {
			tagInfoStr = tagInfoStr + $(entry).text().replaceAll(" ","").replaceAll("#","").replaceAll("삭제","") + ",";
		});

		window.location.href = ""+ pageUrl +"&tagInfoStr=" + tagInfoStr.substring(0,tagInfoStr.length-1) ;
	});


	/* 우측배너*/
	$("#divResearchRight").each(function()
	{
		$.ajax
		({
			url : "/?_c=research&_a=ResearchRight&pageNm="+pageNm,
			type: "POST",
			success: function(data, textStatus, jqXHR){
				$("#divResearchRight").prepend(data);
			},
			error: function (jqXHR, textStatus, errorThrown){
				return "";
			}
		});

	});

	/* 하단 리포트&뉴스 하단 공통 영역 */
	$("#cmdResearchFooter").children("a").click(function()
	{
		var index = $(this).index();

		if (index == "0")
		{
			window.location.href = "/?_c=Research&_m=Guide&_a=ResearchIntro";
		}
		else if (index == "1")
		{
			$.ajax
			({
				url : "/?_c=Research&_a=ResearchEditRule",
				type: "POST",
				success: function(data, textStatus, jqXHR){
					$("body").append("<div id=\"lp_layout2\"></div>");
					$("#lp_layout2").html(data);
					fnOpenDetailLayer("#lp_layout2");
				},
				error: function (jqXHR, textStatus, errorThrown){
					return "";
				}
			});
		}
		else if (index == "2")
		{
			window.location.href = "/?_c=solution&_m=solutiondefault&_a=reps";
		}
		else if (index == "3")
		{
			window.location.href = "/?_c=solution&_m=solutiondefault&_a=katlas";
		}

	});

	/* 태그 관련 */
	$("#divRecommTag > .tag_set > .tag_comm").click(function()
	{
		window.location.href = ""+ pageUrl +"&tagInfoStr=" + $(this).text() + "&addr1=" + addr1 + "&addr2=" + addr2 + "&addr3=" + addr3;
	});
	/* 태그 관련 */
	$("#divSearchTag > .tag_set > .tag_comm > .btn_del").click(function()
	{
		$(this).parent().remove();

		var tagInfoStr = "";
		$.each($("#divSearchTag .tag_set > .tag_comm"), function(index, entry) {
			tagInfoStr = tagInfoStr + $(entry).text().replaceAll(" ","").replaceAll("#","").replaceAll("삭제","") + ",";
		});

		window.location.href = ""+ pageUrl +"&tagInfoStr=" + tagInfoStr.substring(0,tagInfoStr.length-1) + "&addr1=" + addr1 + "&addr2=" + addr2 + "&addr3=" + addr3;

	});

	$("#btnAddrSearch").click(function()
	{
		var tagInfoStr = "";
		$.each($("#divRecommTag .tag_set > .tag_comm"), function(index, entry) {
			tagInfoStr = tagInfoStr + $(entry).text().replaceAll(" ","").replaceAll("#","").replaceAll("삭제","") + ",";
		});

		var area = $("#txtAddr").val().replaceAll("전체","").split(" ");

		window.location.href = ""+ pageUrl +"&tagInfoStr=" + tagInfoStr.substring(0,tagInfoStr.length-1) + "&addr1=" + area[0] + "&addr2=" + area[1] + "&addr3=" + area[2];
	});

	$("#btnTagReset").click(function()
	{
		window.location.href = ""+ pageUrl +"&addr1="+ addr1 + "&addr2=" + addr2 + "&addr3=" + addr3;
	});

	$("#btnTagSearch").click(function()
	{
		if($("#spnTag").css("display") == "none")
		{
			$("#spnTag").show();

			/* 검색한 태그 노출 */
			$("#spnTag .result_combo > ul.tag_set2").html("");
			$.each($("#divSearchTag .tag_set > .tag_comm"), function(index, entry) {
				if ($("#spnTag .result_combo > ul.tag_set2").css('display') == 'none') $("#spnTag .result_combo> ul.tag_set2").show();
				$("#spnTag .result_combo > ul.tag_set2").append('<li>'+$(entry).contents().first().text()+'<a href="javascript:;" class="btn_del round_s2">삭제</a></li>');
			});

			$("#spnTag .result_combo > ul.tag_set2 > li > a.btn_del.round_s2").click(function() {	// 선택한 태그 삭제시
				$(this).parent().remove();
			});

			/* 검색한 태그 노출 */

			$("#spnTag div.result_combo  div.btn_wrap a.btn_type7").click(function() {	// 딛기 버튼
				//console.log('close');
				$("#spnTag .result_combo > ul.tag_set2").html('');
				$("#spnTag").hide();
			});

			$("#spnTag div.result_combo  div.btn_wrap a.btn_type6").click(function() {	// 적용 버튼
				if ( $("#spnTag .result_combo > ul.tag_set2 > li").length == 0 )
				{
					alert("태그를 검색해주세요.");
					return;
				}
				else
				{
					var tagInfoStr = "";
					$.each($("#spnTag .result_combo > ul.tag_set2 > li"), function(index, entry) {
						tagInfoStr = tagInfoStr + $(entry).text().replaceAll(" ","").replaceAll("#","").replaceAll("삭제","") + ",";
					});

					window.location.href = ""+ pageUrl +"&tagInfoStr=" + encodeURIComponent(tagInfoStr.substring(0,tagInfoStr.length-1)) + "&addr1="+addr1 + "&addr2=" + addr2 + "&addr3=" + addr3;
				}
			});

			$("#cmdInputDel").click(function() {	// 인풋박스 초기화
				$("#spnTag .inp_txt").val("");
			});

			$("#spnTag .inp_txt").keyup(function() {	// 태그 검색시
				if($(this).val() == ""){
					//$(this).parent().parent().find('.search_result').removeAttr("style");
				} else if ($(this).val().length >= 2) {	// 2글자 이상시 자동완성목록 표시
					//$(this).parent().parent().find('.search_result').show();
					//$("#lp_layout2 .id_m3110 .list_result > ul > ").remove();
					$.ajax({
						type:"POST",
						data:{"tagStr":$(this).val()},
						url:"./?_c=Research&_a=ResearchTagSearch.ajax",
						dataType:"json",
						success:function(reparam){

							$("#spnTag .result_combo > ul.search_result_list > ").remove();
							if (reparam.length < 1) {
								$("#spnTag .result_combo > ul.search_result_list ").append('<li class="notag">검색 결과가 없습니다.</li>');
							} else {
								$.each(reparam, function(index, entry) {
									$("#spnTag .result_combo> ul.search_result_list ").append('<li><a href="javascript:;" class=\"cmdTag\">#'+entry.TAG+'</a></li>')
								});
								//$('body').trigger('list_result_comple');
							}

							$("#spnTag .result_combo > ul.search_result_list > li a.cmdTag").click(function() {	// 태그 선택시
								var item = $(this).text();

								var tag = item.replaceAll(" ","").replaceAll("#","");

								if ( $("#spnTag .result_combo > ul.tag_set2 > li").length >=6 )
								{
									alert("태그 검색은 6개까지 가능합니다.");
									return;
								}

								$.each($("#spnTag .result_combo > ul.tag_set2 > li"), function(index, entry) {
									// 중복 검사
									if (tag == $(entry).text().replaceAll(" ","").replaceAll("#","").replaceAll("삭제","")) {
										alert("이미 존재하는 태그입니다.");
										tag = "";
									}
								});

								if (tag != "") {
									if ($("#spnTag .result_combo > ul.tag_set2").css('display') == 'none') $("#spnTag .result_combo> ul.tag_set2").show();
									$("#spnTag .result_combo > ul.tag_set2").append('<li>'+tag+'<a href="javascript:;" class="btn_del round_s2">삭제</a></li>');
								}
								//$("#spnTag .inp_txt").val("");
								//$("#spnTag .result_combo > ul.search_result_list > ").remove();
								$("#spnTag .result_combo > ul.tag_set2 > li > a.btn_del.round_s2").click(function() {	// 선택한 태그 삭제시
									$(this).parent().remove();
								});
							});

							$("#spnTag a.btn_del.round_s").click(function() {	// 입력창 삭제시
								$("#spnTag .inp_txt").val("");
								$("#spnTag .result_combo > ul.search_result_list > ").remove();
								//console.log('del');
							});

						},
						error:function(reparam){

						}
					});
				}
			});
		}
		else
		{
			$("#spnTag").hide();
		}

	});
	/* 태그 관련 */

	/* 리스트 내 태그 클릭 */
	$("#idList").on('click', '.tag_comm', function(e) {

		var item = $(this).text();

		$.tagSearch(item);

	});

	$(".clstag").on('click', '.tag_comm', function(e) {

		var item = $(this).text();

		$.tagSearch(item);

	});

	$.tagSearch = function(item) {
		var tagInfoStr = "";
		var tagMove = true;

		var tagCount = 0;
		$.each($("#divSearchTag .tag_set > .tag_comm"), function(index, entry) {
			// 중복 검사
			if ( item == $(entry).contents().first().text() ) {
				alert("이미 존재하는 태그입니다.");
				tagMove = false;
				return false;
			}
			else
			{
				tagInfoStr = tagInfoStr + $(entry).contents().first().text() + ",";
				tagCount = tagCount + 1;
			}
		});

		if ( tagCount >=6 )
		{
			alert("태그 검색은 6개까지 가능합니다.");
			return;
		}

		tagInfoStr = tagInfoStr + item;
		if (tagMove == true)
		{
			window.location.href = ""+ pageUrl +"&tagInfoStr=" + tagInfoStr + "&addr1=" + addr1 + "&addr2=" + addr2 + "&addr3=" + addr3;
		}

	}

	/* 리스트 내 태그 클릭 */


	/* 정렬 CSS */
	$("#cmdSort").children("a").each(function()
	{
		if ( jQuery.trim($(this).text().replace(" ", "")) == jQuery.trim(sortType) )
		{
			$(this).addClass("selected");

			if (jQuery.trim(sortType) != "최신순")
			{
				if (jQuery.trim(sortOrderby) == "DESC")
				{
					$(this).addClass("down");
				}
				else
				{
					$(this).addClass("up");
				}
			}

		}
		else
		{
			$(this).removeClass("selected");
		}
	});
	/* 정렬 CSS */

	/* 정렬 선택 */
	$("#cmdSort").children("a").click(function()
	{
		util.curPage = 1;
		util.setNum = 1;

		searchType = ($("#searchStr").val() == "") ? "" : $("#searchType").val();
		searchStr = $("#searchStr").val();

		var sortText = $(this).text();
		var sortClass = $(this).attr("class").replace("selected", "").replace(" ", "");

		if (sortClass == "")
		{
			sortClass = "down";
		}

		if ( $(this).hasClass("selected") )
		{
			sortClass = (sortText == "최신순") ? "up" : sortClass;
			if (sortClass == "down")
			{
				sortOrderby = "ASC";
				$(this).removeClass("down");
				(sortText == "최신순") ? "" : $(this).addClass("up");
			}
			else
			{
				sortOrderby = "DESC";
				$(this).removeClass("up");
				(sortText == "최신순") ? "" : $(this).addClass("down");
			}
		}
		else
		{
			sortClass = (sortText == "최신순") ? "down" : sortClass;

			if (sortClass == "down")
			{
				sortOrderby = "DESC";
				$(this).removeClass("up");
				(sortText == "최신순") ? "" : $(this).addClass("down");
			}
			else
			{
				sortOrderby = "ASC";
				$(this).removeClass("down");
				(sortText == "최신순") ? "" : $(this).addClass("up");
			}
		}

		$(this).parent().children("a").removeClass("selected");
		$(this).addClass("selected");

		$(this).parent().children("a").each(function()
		{
			if ($(this).text() != sortText)
			{
				$(this).removeClass("down");
				$(this).removeClass("up");
			}
		});

		sortType = sortText;
		if (sortText == "최신순")
		{
			var currentUrl = window.location.href;
			var parsedUrl = $.url(currentUrl);
			var params = parsedUrl.param();
			params["pageNo"] = 1;
			params["sortType"] = "";
			params["sortOrderby"] = "";

			var newUrl = "?"+$.param(params);

			window.location.href = newUrl;
		}
		else
		{
			var currentUrl = window.location.href;
			var parsedUrl = $.url(currentUrl);
			var params = parsedUrl.param();
			params["pageNo"] = 1;
			params["sortType"] = sortText;
			params["sortOrderby"] = sortOrderby;

			var newUrl = "?"+$.param(params);

			window.location.href = newUrl;
		}
	});
	/* 정렬 선택 */

	/* 검색 */
	$("#cmdSearch").click(function()
	{
		util.curPage = 1;
		util.setNum = 1;

		if (fnIsEmpty(jQuery.trim($("#searchStr").val()))) {
			alert("검색어를 입력해주세요.");
			$("#searchStr").focus();
			return;
		}
		else
		{
			if (pageNm == "reportnews" ||  pageNm == "medianews" || pageNm == "column" )
			{
				alert("최근 1년 내 콘텐츠만 검색됩니다.");	
			}

			searchType = $("#searchType").val();
			searchStr = jQuery.trim($("#searchStr").val());

			var currentUrl = window.location.href;
            var parsedUrl = $.url(currentUrl);
			var params = parsedUrl.param();
			params["searchType"] = searchType;
			params["searchStr"] = searchStr;
			params["pageNo"] = "1";

			var newUrl = "?"+$.param(params);
			window.location.href = newUrl;
		}
	});

	 $("#searchStr").keypress(function(e) {
		if(e.which == 10 || e.which == 13) {
			util.curPage = 1;
			util.setNum = 1;

			if (fnIsEmpty(jQuery.trim($("#searchStr").val()))) {
				alert("검색어를 입력해주세요.");
				$("#searchStr").focus();
				return;
			}
			else
			{
				if (pageNm == "reportnews" ||  pageNm == "medianews" || pageNm == "column" )
				{
					alert("최근 1년 내 콘텐츠만 검색됩니다.");	
				}
				
				searchType = $("#searchType").val();
				searchStr = jQuery.trim($("#searchStr").val());

				var currentUrl = window.location.href;
				var parsedUrl = $.url(currentUrl);
				var params = parsedUrl.param();
				params["searchType"] = searchType;
				params["searchStr"] = searchStr;
				params["pageNo"] = "1";

				var newUrl = "?"+$.param(params);
				window.location.href = newUrl;
			}
		}
	});

	/* 검색 */

});


/* 지역검색 */
function fnAreaSearch(coartNo, addrLevel, addrAll, addrMapX, addrMapY, addr1, addr2, addr3, addrCode, mapX, mapY){
	window.location.href = ""+ pageUrl +"&tagInfoStr=" + tagInfoStr + "&addr1=" + addr1 + "&addr2=" + addr2 + "&addr3=" + addr3;
}


function search_selectSearchValue(addr1, addr2, addr3, coordx, coordy, gubuncode, gubuncode1, gubuncode2, identifycode, searchkeyword){
	window.location.href = ""+ pageUrl +"&tagInfoStr=" + tagInfoStr + "&addr1=" + addr1 + "&addr2=" + addr2 + "&addr3=" + addr3;
}

/* 지역검색 */


/* 상세보기 */
if(typeof pageNm == "undefined"){
	var pageNm = "";
}
if(typeof pageNo == "undefined"){
	var pageNo = "1";
}
function fnResearchDetail(bno, gno, num, pgnm, target)
{
	var link = "";
	if (!fnIsEmpty(pgnm))
	{
		link = "/?_c=Research&_m=Detail&bno="+bno+"&gno="+gno+"&num="+num+"&pageNm="+pgnm;
		
		window.location.href = link ;
	}
	else
	{
		if (bno=="0")
		{
			if (gno=="AREA")
			{
				link = "/?_c=Research&_m=Detail&_a=Area&bno="+bno+"&num="+num ;	//우리지역리포트;
			}
			else
			{
				link = "/?_c=Research&_m=Detail&_a=Counsel&bno="+bno+"&num="+num ;	//상담리포트;
			}
		}
		else
		{
			link = "/?_c=Research&_m=Detail&bno="+bno+"&gno="+gno+"&num="+num;
		}

		if (!fnIsEmpty(pageNo))
		{
			link = link +  "&pageNo=" + pageNo;
		}
		if (!fnIsEmpty(pageNm))
		{
			link = link +  "&pageNm=" + pageNm;
		}
		
		if (target == "blank")
		{
			window.open(link + goLink(), '','');
		}
		else
		{
			window.location.href = link + goLink() ;
		}
	}


}
/* 상세보기 */


/* 분석보고서 다시보기 */
function fnReportView(gbn, goodsCode, goodsNum)
{
	if (gbn == "optel")
	{
		goReportOptelApt(goodsCode, goodsNum, "VIEW");
			//fnWinUrl(""+_downURL+"/z/solution/otel/otel_result_print.asp?only=0&m_=37&g_=&solkind=3&print=1&goodskind="+goodsNum+"&PaidGoodsCode="+goodsCode, "open", "popup_StructureDocument", "783","960","yes");	}
	}
	else
	{
		fnWinUrl(""+_downURL+"/z/apt/asyse/show_pass_print.asp?only=0&m_=37&g_=&showpass=1&print=1&goodskind="+goodsNum+"&PaidGoodsCode="+goodsCode, "open", "popup_StructureDocument", "783","960","yes");
	}
}


/* 분석보고서 다운*/
function fnReportDown(gbn, goodsCode, goodsNum)
{
	if (gbn == "optel")
	{
		var conf = confirm('오피스텔 모의투자 보고서를 PDF 파일로 다운 받으시겠습니까?');
		if (!conf) { return ; }
		goReportOptelApt( goodsCode, goodsNum, "DOWN");
	}
	else
	{
		var conf = confirm('아파트 심층 분석 보고서를 PDF 파일로 다운 받으시겠습니까?');
		if (!conf) { return ; }
		goReportOptelApt( goodsCode, goodsNum, "DOWN");
	}
}


function goReportOptelApt(goodsCode, goodsNum, modeGbn) {
	var $target = $("body");


	var sUrl = "/?_c=Research&_m=LocalAnalysis&_a=ReportDown.Ajax";
	var dataSend = {
		goodsCode: goodsCode,
		goodsNum: goodsNum,
		modeGbn : modeGbn
	};

	$.ajax({
		url: sUrl,
		dataType: "json",
		async:false,
		data: dataSend,
		method: "post",
		beforeSend: function() {
			if (modeGbn != "VIEW")
			{
				__loadingString = "<div class=\"layer_back\" id=\"layer_back\" ></div><div class=\"layer_popup_bg\" id=\"pdf_down_loading\"><div class=\"layer_popup\"></div></div>";
				$target.prepend(__loadingString);
			}
		},
		complete: function() {
			if (modeGbn != "VIEW")
			{
				setTimeout(function() {
					$target.find('#layer_back').remove();
					$target.find('#pdf_down_loading').remove();
				}, 30000);
			}
		},
		success: function(data) {
			if (data.result=='OK') {
				returnResult="OK";

				if (modeGbn != "VIEW")
				{
					$('<iframe />');  // Create an iframe element
					$('<iframe />', {
						name: 'frame1',
						id: 'frame1',
						width:"0", height:"0",
						src: data.gourl
					}).appendTo('body');
				}
				else
				{
					fnWinUrl(""+_downURL+"/z/solution/otel/otel_result_print.asp?only=0&m_=37&g_=&solkind=3&print=1&"+data.gourl, "open", "popup_StructureDocument", "783","960","yes");
				}

				//window.open(data.gourl, 'pdfwindows', '');

			} else if (data.result=='END') {
				if (confirm(data.errmsg)) {
					//GetRequestUrl(data.gourl);
					//$(location).attr('href', data.gourl);
				}
			} else {
				alert(data.errmsg);
			}
		}
	});
}
/* 분석보고서 다운*/

function goLink(removeParam)
{
	var golink = "";

	var currentUrl = window.location.href;
	var parsedUrl = $.url(currentUrl);
	var params = parsedUrl.param();

	if ( !isEmpty(params["tagInfoStr"]) )
	{
		golink = golink + "&tagInfoStr=" + params["tagInfoStr"] ;
	}
	if ( !isEmpty(params["addr1"]) )
	{
		golink = golink + "&addr1=" + params["addr1"] ;
	}
	if ( !isEmpty(params["addr2"]) )
	{
		golink = golink + "&addr2=" + params["addr2"] ;
	}
	if ( !isEmpty(params["addr3"]) )
	{
		golink = golink + "&addr3=" + params["addr3"] ;
	}
	if ( !isEmpty(params["searchType"]) )
	{
		golink = golink + "&searchType=" + params["searchType"] ;
	}
	if ( !isEmpty(params["searchStr"]) )
	{
		golink = golink + "&searchStr=" + params["searchStr"] ;
	}
	if ( !isEmpty(params["sortType"]) )
	{
		golink = golink + "&sortType=" + params["sortType"] ;
	}
	else
	{
		if(typeof sortType == "undefined"){
			var sortType = "";
		}

		if ( !isEmpty(sortType) )
		{
			golink = golink + "&sortType=" +sortType ;
		}
	}
	if ( !isEmpty(params["sortOrderby"]) )
	{
		golink = golink + "&sortOrderby=" + params["sortOrderby"] ;
	}
	else
	{
		if(typeof sortOrderby == "undefined"){
			var sortOrderby = "";
		}

		if ( !isEmpty(sortOrderby) )
		{
			golink = golink + "&sortOrderby=" +sortOrderby ;
		}
	}
	if ( !isEmpty(params["writer"]) )
	{
		golink = golink + "&writer=" + params["writer"] ;
	}
	if ( !isEmpty(params["movieGbn"]) )
	{
		golink = golink + "&movieGbn=" + params["movieGbn"] ;
	}
	if ( !isEmpty(params["deal"]) )
	{
		golink = golink + "&deal=" + params["deal"] ;
	}
	if ( !isEmpty(params["dealNum"]) )
	{
		golink = golink + "&dealNum=" + params["dealNum"] ;
	}
	if (removeParam != "pageNm")
	{
		if ( !isEmpty(params["pageNm"]) )
		{
			golink = golink + "&pageNm=" + params["pageNm"] ;
		}
	}
	return golink;
}



function fnResearchBanner(banner) {
		
	var html = "";

	if($.browser.msie && parseInt($.browser.version) <= parseInt(8)){
		html = "";
		$("#divGoogleBanner").html (
				html				
		);
	}
	else {		
				
		html = "<iframe src='/?_c=Common&_m=Ad&banner="+banner+"' scrolling='no' marginheight='0' marginwidth='0' frameborder='0' width='100%' height='218px'  style='margin:0;border:0;padding-top:5px'></iframe>" ;		
		
		if (html != "") {
			$("#divGoogleBanner").html (
					html				
			);
		}
	}
}