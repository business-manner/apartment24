	


	$(document).ready(function(){
	
		setFormData();
		setOptionChk();
		setSubOptionChk();
		
		
		 $('input:checkbox[name="optionChk"]').change(function() {
			 

			 if(this.value == "all"){				 				 
				 if(this.checked) {
					 $('input:checkbox[name="optionChk"]').attr("checked", true);
					 $('input:checkbox[name="optionChk"]').prop("checked", true);
				 } else {
					 $('input:checkbox[name="optionChk"]').attr("checked", false);
					 $('input:checkbox[name="optionChk"]').prop("checked", false);
				 }
			 } else {
				 var chkCnt = 0;
				 var chkListCnt = 0;
				 
				 chkListCnt = ($('input:checkbox[name="optionChk"]').length) - 1;

				 $('input:checkbox[name="optionChk"]').each(function() {

					 if(this.value != "all" && this.checked){
						 chkCnt ++;
					 }
				 });

				 if(chkListCnt == chkCnt) {
					 $('input:checkbox[id="chk1"]').attr("checked", true);
					 $('input:checkbox[id="chk1"]').prop("checked", true);
				 } else {
					 $('input:checkbox[id="chk1"]').attr("checked", false);
					 $('input:checkbox[id="chk1"]').prop("checked", false);
				 }
				 
				 
			 }

		 });
		 
		 
		 $('input:checkbox[name="subChk"]').change(function() {
			 

			 if(this.value == "all"){				 				 
				 if(this.checked) {
					 $('input:checkbox[name="subChk"]').attr("checked", true);
					 $('input:checkbox[name="subChk"]').prop("checked", true);
				 } else {
					 $('input:checkbox[name="subChk"]').attr("checked", false);
					 $('input:checkbox[name="subChk"]').prop("checked", false);
				 }
			 } else {
				 var chkCnt = 0;
				 var chkListCnt = 0;
				 
				 chkListCnt = ($('input:checkbox[name="subChk"]').length) - 1;

				 $('input:checkbox[name="subChk"]').each(function() {

					 if(this.value != "all" && this.checked){
						 chkCnt ++;
					 }
				 });

				 if(chkListCnt == chkCnt) {
					 $('input:checkbox[id="subChk1"]').attr("checked", true);
					 $('input:checkbox[id="subChk1"]').prop("checked", true);
				 } else {
					 $('input:checkbox[id="subChk1"]').attr("checked", false);
					 $('input:checkbox[id="subChk1"]').prop("checked", false);
				 }
				 
				 
			 }

		 });		 
		
	});


	function dq_search() {
		if($('#dqSearchTerm').val() == '') {
			alert("검색어를 입력하세요.");
			return ;
		} else {
			
			//20171129 웹 검색어 정보만 추가. 추후 입력방식, 메뉴구분 추가해야 함
			var _Searchcd = $("#hdSearchcd").val();
			var _Searchgb = $("#hdSearchgb").val(); 
			var _Searchfrom = $("#hdSearchfrom").val(); 
			var _Searchmethod = $("#hdSearchmethod").val(); 

			$.ajax({
				type:"post",
				url:"/z/depot/search/search.keyword.info.ajax.asp",		
				data: {
					'Searchcd': _Searchcd,
					'Searchgb': _Searchgb,
					'Searchfrom': _Searchfrom,
					'Searchmethod': _Searchmethod,
					'searchText': $("#dqSearchTerm").val()
				},
				cache: false,
				success:function(response){
					//alert(response);
				},
				error:function(request,status,error){
					//alert('code:'+request.status+'\n'+'message:'+request.responseText+'\n'+'error:'+error);
					//console.log('code:'+request.status+'\n'+'message:'+request.responseText+'\n'+'error:'+error);
				}
			});
			//20171129 웹 검색어 정보만 추가. 추후 입력방식, 메뉴구분 추가해야 함
			
			addRecentSearchTerm($('#dqSearchTerm').val());
			$("#dqSearchTermOld").val($('#dqSearchTerm').val());
			$('#dqSearchForm').attr({action:'/search/search.asp', method:'post'}).submit();
			
		}
	}
	
    //상세검색 
	function goDetailSearch(pageCode, dqOption, dqSearchSubType, dqPage)
	{
		var searchText = $("#dqSearchTerm").val();
		var searchTextOld = $("#dqSearchTermOld").val();
		
		
		searchText = jQuery.trim(searchTextOld);
		
		// 상세페이지에서 맨위에 보여줄 전체 개수(여러탭 합쳐진 값)		
		//pageCode 단지 시세 매물 등 메뉴 구분
		//dqOption 하위메뉴 구분 ex)단지-아파트
		//dqSearchSubType 매매 전세 월세 구분
		
		if(dqPage == '' || dqPage == undefined) {
			dqPage = 1;
		}
		
		if(pageCode != '') {
			//단지
					
			$('#dqSearchTerm').val(searchText);
			$('#dqSearchType').val(pageCode);
			$('#dqSearchSubType').val(dqSearchSubType);
			
			// 탭 이동시 기존 체크이력 삭제하기 위하여
			//if(dqSearchSubType == '' || dqSearchSubType == undefined) {
			//	$('#dqOption').val("");
			//} else {
				$('#dqOption').val(dqOption);
			//}
			

			$('#dqPage').val(dqPage);
			$('#dqSearchForm').attr({action:'./detailSearch.asp', method:'post'}).submit();
		} else {		
			alert("잘못된 접근입니다.");
			return false;
		}
	}
	
	//매물 단지 체크 검색
	function goOptionSearch(pageCode,dqOption,dqSearchSubType) {
		var searchText = $("#dqSearchTerm").val();
		var searchTextOld = $("#dqSearchTermOld").val();
		
		
		searchText = jQuery.trim(searchTextOld);
		
		// 상세페이지에서 맨위에 보여줄 전체 개수(여러탭 합쳐진 값)		
		//pageCode 단지 시세 매물 등 메뉴 구분
		//dqOption 하위메뉴 구분 ex)단지-아파트
		//dqSearchSubType 매매 전세 월세 구분

		
		if(pageCode != '') {
			//단지
			dqOption = "";
			 $('input:checkbox[name="optionChk"]').each(function() {

				 if(this.value != "all" && this.checked){
					 if(dqOption != "") {
						 dqOption = dqOption + ",";
					 }
					 dqOption = dqOption + this.value;
				 }
			 });			
					
			$('#dqSearchTerm').val(searchText);
			$('#dqSearchType').val(pageCode);
			$('#dqSearchSubType').val(dqSearchSubType);
			$('#dqOption').val(dqOption);
			$('#dqPage').val(1);
			$('#dqSearchForm').attr({action:'./detailSearch.asp', method:'post'}).submit();
		} else {		
			alert("잘못된 접근입니다.");
			return false;
		}		
		
	}
	
	//빌딩, 토지 체크 검색
	function goOptionSubSearch(pageCode,dqOption,dqSearchSubType) {
		var searchText = $("#dqSearchTerm").val();
		var searchTextOld = $("#dqSearchTermOld").val();
		
		
		searchText = jQuery.trim(searchTextOld);

		
		if(pageCode != '') {
			//단지
			dqOption = "";
			 $('input:checkbox[name="optionChk"]').each(function() {

				 if(this.value != "all" && this.checked){
					 if(dqOption != "") {
						 dqOption = dqOption + ",";
					 }
					 dqOption = dqOption + this.value;
				 }
			 });
			 
			 dqSearchSubType = "";
			 $('input:checkbox[name="subChk"]').each(function() {

				 if(this.value != "all" && this.checked){
					 if(dqSearchSubType != "") {
						 dqSearchSubType = dqSearchSubType + ",";
					 }
					 dqSearchSubType = dqSearchSubType + this.value;
				 }
			 });			 
					
			$('#dqSearchTerm').val(searchText);
			$('#dqSearchType').val(pageCode);
			$('#dqSearchSubType').val(dqSearchSubType);
			$('#dqOption').val(dqOption);
			$('#dqPage').val(1);
			$('#dqSearchForm').attr({action:'./detailSearch.asp', method:'post'}).submit();
		} else {		
			alert("잘못된 접근입니다.");
			return false;
		}		
		
	}	
	
	//매물 단지 체크박스 셋 
	function setOptionChk() {


			var optionStr = "";
			var optionArr = "";

			
			 $('input:checkbox[id="chk1"]').each(function() {
				optionArr = this.value.split(",");				
				this.value = "all";
			 });
			 
			 
			 
			 if(optionArr.length > 0) {
				 
				 var chkCnt = 0;
				 var chkAll = false;
				 chkListCnt = ($('input:checkbox[name="optionChk"]').length) - 1;
				 
				 $('input:checkbox[name="optionChk"]').each(function() {
	
					 for(var i = 0; i < optionArr.length; i++) {
						 if(this.value == optionArr[i]) {
							 if(optionArr[i] == "all") {
								 $('input:checkbox[name="optionChk"]').attr("checked", true);
								 $('input:checkbox[name="optionChk"]').prop("checked", true);
								 chkAll = true;
							 } else {
								 $(this).attr("checked", true);
								 $(this).prop("checked", true);
								 chkCnt++;
							 }
							 
							 
						 }
					 }
					 						 
				 });
				 
				 if(chkListCnt == chkCnt || chkAll) {
					 $('input:checkbox[id="chk1"]').attr("checked", true);
					 $('input:checkbox[id="chk1"]').prop("checked", true);
				 } else {
					 $('input:checkbox[id="chk1"]').attr("checked", false);
					 $('input:checkbox[id="chk1"]').prop("checked", false);
				 }				 
			 }
		
		
	}
	
	//빌딩 단지 - 시도 체크박스 셋 
	function setSubOptionChk() {


			var optionStr = "";
			var optionArr = "";

			
			 $('input:checkbox[id="subChk1"]').each(function() {

				optionArr = this.value.split(",");				
				this.value = "all";
			 });
			 
			 
			 
			 if(optionArr.length > 0) {
				 
				 var chkCnt = 0;
				 var chkAll = false;
				 chkListCnt = ($('input:checkbox[name="subChk"]').length) - 1;
				 
				 $('input:checkbox[name="subChk"]').each(function() {
	
					 for(var i = 0; i < optionArr.length; i++) {
						 if(this.value == optionArr[i]) {
							 if(optionArr[i] == "all") {
								 $('input:checkbox[name="subChk"]').attr("checked", true);
								 $('input:checkbox[name="subChk"]').prop("checked", true);
								 chkAll = true;
							 } else {
								 $(this).attr("checked", true);
								 $(this).prop("checked", true);
								 chkCnt++;
							 }
							 
							 
						 }
					 }
					 						 
				 });
				 
				 if(chkListCnt == chkCnt || chkAll) {
					 $('input:checkbox[id="subChk1"]').attr("checked", true);
					 $('input:checkbox[id="subChk1"]').prop("checked", true);
				 } else {
					 $('input:checkbox[id="subChk1"]').attr("checked", false);
					 $('input:checkbox[id="subChk1"]').prop("checked", false);
				 }				 
			 }
		
		
	}	
	
	
	function setFormData() {

			$("#dqSearchTerm").val($("#dqTempSearchTermOld").val());
			$("#dqSearchTermOld").val($("#dqTempSearchTermOld").val());
			$("#dqOption").val($("#dqTempOption").val());
			$("#dqSearchSubType").val($("#dqTempSearchSubType").val());

	}
	
	
	
	
    // 상세페이지 이동
    function goDetailPage(type, param1, param2, param3, param4, param5, param6, param7) { 
    	
    	// 상세페이지 이동시 현재 불러온 페이지와 스크롤 위치 를 저장한다.

    	
    	
    	
		if(type == 'danji') {
			var fcode = "";
			
			//전체 아파트 주상복합 오피스텔 도시형생활주택 재건축 분양권
			if(param6 == '아파트') {
				//아파트
				fcode = "AA";
			} else if(param6 == '도시형생활주택') {
				//아파트
				fcode = "AB";
			} else if(param6 == '주상복합') {
				//주상복합
				fcode = "BA";
			} else if(param6 == '재건축') {
				//재건축
				fcode = "CA";
			} else if(param6 == '주택재건축') {
				//재건축
				fcode = "CB";
			} else if(param6 == '오피스텔') {
				//오피스텔
				fcode = "D";
			} else if(param6 == '아파트분양권') {
				//분양권
				fcode = "EA";
			} else if(param6 == '주상복합분양권') {
				//분양권
				fcode = "EB";
			} else if(param6 == '오피스텔분양권') {
				//분양권
				fcode = "EC";
			} else if(param6 == '연립빌라') {
				//빌라
				fcode = "FA";
			} else if(param6 == '고급빌라') {
				//빌라
				fcode = "FB";
			} else if(param6 == '다세대') {
				//빌라
				fcode = "FC";
			} else if(param6 == '원룸') {
				//원룸
				fcode = "G";
			} else if(param6 == '단독') {
				//주택
				fcode = "HA";
			} else if(param6 == '다가구') {
				//주택
				fcode = "HB";
			} else if(param6 == '다중') {
				//주택
				fcode = "HC";
			} else if(param6 == '상가주택') {
				//주택
				fcode = "HD";
			} else if(param6 == '전원') {
				//주택
				fcode = "HE";
			} else if(param6 == '농가') {
				//주택
				fcode = "HF";
			} else if(param6 == '기타') {
				//주택
				fcode = "HG";
			} else if(param6 == '재개발') {
				//재개발
				fcode = "I";
			} else if(param6 == '상가') {
				//상가
				fcode = "J";
			} else if(param6 == '사무실') {
				//사무실
				fcode = "K";
			} else if(param6 == '빌딩') {
				//건물
				fcode = "LA";
			} else if(param6 == '상가건물') {
				//건물
				fcode = "LB";
			} else if(param6 == '공장') {
				//공장
				fcode = "MA";
			} else if(param6 == '아파트형공장') {
				//공장
				fcode = "MB";
			} else if(param6 == '창고') {
				//창고
				fcode = "N";
			} else if(param6 == '토지') {
				//토지
				fcode = "O";
			} else if(param6 == '펜션') {
				//펜션
				fcode = "P";
			} else if(param6 == '경매') {
				//경매
				fcode = "Q";
			} else if(param6 == '교환물건') {
				//기타
				fcode = "RA";
			} else if(param6 == '회원권') {
				//기타
				fcode = "RB";
			} else if(param6 == '기타') {
				//기타
				fcode = "RC";
			} else {
				alert("fCode가 없습니다.");
				return false;
			}				
			
			
			
			
			
			
			//단지
			if(param1 == 'memul') {
				// 단지 -> 매물 버튼 클릭시
				

				/*
				if(param6 == '아파트') {
					//아파트
					fcode = "A";
				} else if(param6 == '주상복합아파트' || param6 == '주상복합' || param6 == '도시형생활주택' || param6 == '도시생활주택') {
					//주상복합
					fcode = "B";
				} else if(param6 == '재건축') {
					//재건축
					fcode = "C";
				} else if(param6 == '오피스텔') {
					//오피스텔
					fcode = "D";
				} else if(param6 == '아파트분양권' || param6 == '주상복합분양권' || param6 == '오피스텔분양권') {
					//분양권
					fcode = "E";
				} else {
					alert("fCode가 없습니다.");
					return false;
				}
				*/
			
				
				//location.href="https://"+location.host+"/?_c=memul&_m=p10&addr1=" + param2 + "&addr2=" + param3 + "&addr3=" + param4 + "&cortarNo=" + param5 + "&fCode=" + fcode + "&memulStyle=1&complexCd=" + param7 + "&tabGbn=0";
				location.href="/?_c=memul&_m=p10&addr1=" + param2 + "&addr2=" + param3 + "&addr3=" + param4 + "&cortarNo=" + param5 + "&fCode=" + fcode + "&memulStyle=1&complexCd=" + param7 + "&tabGbn=0";
				
				/**
				 	/?_c=memul&_m=p10&addr1=[시도]&addr2=[구시군]&addr3=[읍면동]&cortarNo=[법정동코드]&fCode=[매물유형코드]&memulStyle=1&complexCd=[단지코드]&tabGbn=1
				 */
			} else {

				
				/*
				
				if(param6 == '아파트') {
					//아파트
					fcode = "A";
				} else if(param6 == '주상복합아파트' || param6 == '주상복합' || param6 == '도시형생활주택' || param6 == '도시생활주택') {
					//주상복합
					fcode = "B";
				} else if(param6 == '재건축') {
					//재건축
					fcode = "C";
				} else if(param6 == '오피스텔') {
					//오피스텔
					fcode = "D";
				} else if(param6 == '아파트분양권' || param6 == '주상복합분양권' || param6 == '오피스텔분양권') {
					//분양권
					fcode = "E";
				} else {
					alert("fCode가 없습니다.");
					return false;
				}	
				*/
				//location.href="https://"+location.host+"/?_c=memul&_m=p10&addr1=" + param2 + "&addr2=" + param3 + "&addr3=" + param4 + "&cortarNo=" + param5 + "&fCode=" + fcode + "&memulStyle=1&complexCd=" + param7 + "&tabGbn=3";
				location.href="/?_c=memul&_m=p10&addr1=" + param2 + "&addr2=" + param3 + "&addr3=" + param4 + "&cortarNo=" + param5 + "&fCode=" + fcode + "&memulStyle=1&complexCd=" + param7 + "&tabGbn=3";
				/**
			 		/?_c=memul&_m=p10&addr1=[시도]&addr2=[구시군]&addr3=[읍면동]&cortarNo=[법정동코드]&fCode=[매물유형코드]&memulStyle=1&complexCd=[단지코드]&tabGbn=3
				*/
			}

		} else if(type == 'syse') {
			//시세

		} else if(type == 'memul') {
		
			//매물
			//location.href="https://"+location.host+"/?_c=memul&_m=HouseDetail&mulcode="+param1;
			location.href="/?_c=memul&_m=HouseDetail&mulcode=" + param1;
			/** 
				/?_c=memul&_m=HouseDetail&mulcode=[물건코드] 
			*/
		
		} else if(type == 'research') {
			//리서치
			

			if(param1 == '99999') {
				//상담리포트?			
				location.href="/?_c=Research&_m=Detail&_a=Counsel&bno=0&num=" + param2;	
			} else {
				//location.href="https://"+location.host+"/?_c=Research&m=Detail&bno=" + param1 + "&gno=" + param3 + "&num=" + param2;			
				location.href="/?_c=Research&m=Detail&bno=" + param1 + "&gno=" + param3 + "&num=" + param2;	
			}

			/**
		 		/?_c=Research&m=Detail&bno=[글게시판번호]&gno=1&num=[글번호]
			 */					
			

		} else if(type == 'bun') {
			//분양정보
			//매물유형 - 아파트:B, 오피스텔:C, 도시형생활주택:D, 상가:E, 아파트형공장:F			
			
			if(param2 == '아파트') {
				param2 = 'B';
			} else if(param2 == '오피스텔') {			
				param2 = 'C';
			} else if(param2 == '도시형생활주택') {
				param2 = 'D';
			} else if(param2 == '상가') {
				param2 = 'E';
			} else if(param2 == '아파트형공장') {
				param2 = 'F';
			}			
			
			//location.href="https://"+location.host+"/?_c=lots&_s=info&_m=lotsinfodetail&type_g=" + param2 + "&aptcode=" + param1
			location.href="/?_c=lots&_s=info&_m=lotsinfodetail&type_g=" + param2 + "&aptcode=" + param1
			
								
			//?_c=lots&_s=info&_m=lotsinfodetail&type_g=[분양단지구분]&aptcode=[분양단지코드] 
		} else if(type == 'bunNews') {
			//분양정보(뉴스)
			//location.href="https://"+location.host+"/?_c=lots&_m=lotsnews&_a=newsdetail&bno=" + param1 + "&kind=" + param2 + "&search_keyword=&search_writer=&search_addr1=&search_addr2=&search_addr3=&sort=1&page=1&num=" + param3;			
			location.href="/?_c=lots&_m=lotsnews&_a=newsdetail&bno=" + param1 + "&kind=" + param2 + "&search_keyword=&search_writer=&search_addr1=&search_addr2=&search_addr3=&sort=1&page=1&num=" + param3;
			/**
		 		/?_c=lots&_m=lotsnews&_a=newsdetail&bno=[글게시판번호]&kind=[종류]&search_keyword=&search_writer=&search_addr1=&search_addr2=&search_addr3=&sort=1&page=1&num=[글번호]
			 */				
			
			
			
		} else if(type == 'photo') {
			//부동산go (photo)

		} else if(type == 'junhome') {
			//중개사무소	
			var junhomeUrl = "http://www.r114.co.kr/z/catridge/public/redirect_junhome.asp?juncode=" + param1;
			
			window.open(junhomeUrl);
			
			//location.href="http://www.r114.co.kr/z/catridge/public/redirect_junhome.asp?juncode=" + param1;
			//http://www.r114.co.kr/z/catridge/public/redirect_junhome.asp?juncode=중개업소코드
		} else if(type == 'housingsite') {
			//중개사무소	
			var housingsiteUrl = "/?_c=lots&_s=Jigu&_m=jigudetail&idx=" + param1;
			
			window.open(housingsiteUrl);
			
			//location.href="http://www.r114.co.kr/z/catridge/public/redirect_junhome.asp?juncode=" + param1;
			//http://www.r114.co.kr/z/catridge/public/redirect_junhome.asp?juncode=중개업소코드
		} else if(type == 'junhomeMemul') {
			//중개사무소 매물보기	

			var junhomeMemulUrl = "http://www.r114.net/redirectjun.asp?jno=" + param1 + "&mflag=1";
			window.open(junhomeMemulUrl);
			//location.href="http://www.r114.net/redirectjun.asp?jno=" + param1 + "&mflag=1";
			/**
		 		http://www.r114.net/redirectjun.asp?jno=[중개업소코드]&mflag=1
			 */	
		} else if(type == 'direct') {
			//직거래
			//param1 = 개인매물,기업매물 // param2 = no 
			
			//location.href="https://"+location.host+"/?_c=memul&_m=p10&subway=" + param1;
			if(param1 == '개인매물') {
				location.href="/?_c=service&_s=directdeal&_m=directdealdetailPersonal&seq=" + param2;	
			} else if (param1 == '기업매물') {
				location.href="/?_c=service&_s=directdeal&_m=directdealdetailEnterprise&seq=" + param2;
			} else if (param1 == '국유재산') {
				location.href="/?_c=service&_s=directdeal&_m=directdealdetailState&seq=" + param2;
			} else {
				alert("주소가 잘못되었습니다. 관리자에게 문의해 주세요.");
			}
						
			/** 
				/?_c=service&_s=directdeal&_m=directdealdetailPersonal&seq=[물건코드] // 개인매물
				/?_c=service&_s=directdeal&_m=directdealdetailEnterprise&seq=[물건코드] // 기업매물
				/?_c=service&_s=directdeal&_m=directdealdetailState&seq=[물건코드] // 국유재산
			*/
			 
		} else if(type == 'community') {
			//커뮤니티


				//location.href="https://"+location.host+"/?_c=service&_s=community&_m=communityview&_a=townview&viewId="+param2;
				location.href="/?_c=service&_s=community&_m=communityview&_a=townview&viewId="+param1;
				/**
			 		/?_c=service&_s=community&_m=communityview&_a=townview&viewId:[글번호]
				 */	
			
		} else if(type == 'consult') {
			//부동산상담
			//param1 = 1 전문가, 2일반인 // param2 = no
			if(param1 == "1") {
				//전문가
				//location.href="https://"+location.host+"/?_c=service&_m=counselview&consultgubun=expert&idx="+param2;
				location.href="/?_c=service&_m=counselview&consultgubun=expert&idx="+param2;
				/**
			 		/?_c=service&_m=counselview&consultgubun=expert&idx=[글번호] / 전문가
				 */
			
			} else if (param1 == "2") {
				//일반인
				//location.href="https://"+location.host+"/?_c=service&_m=counselview&consultgubun=person&idx="+param2;
				location.href="/?_c=service&_m=counselview&consultgubun=person&idx="+param2;
				
				/**
				 	/?_c=service&_m=counselview&consultgubun=person&idx=[글번호] / 일반인
				 */
				
			}
		} else if(type == 'substation') {
			//지하철역
			
			//지도보기
			//location.href="https://"+location.host+"/?_c=memul&_m=p10&subway=" + param1;
			location.href="/?_c=memul&_m=p10&subway=" + param1;
			/** 
				/?_c=memul&_m=p10&subway=[지하철역명] 
			*/


		} else if(type == 'area') {
			//지역정보
			//param1 = area, map // param2 식별코드(법정동코드)
			if(param1 == "area") {
				//지역정보
				//location.href="https://"+location.host+"/?_c=memul&_m=p10&addr1=" + param2 + "&addr2=" + param3 + "&addr3=" + param4 + "&cortarNo=" + param5 + "&fCode=AA&memulStyle=1&tabGbn=3"
				location.href="/?_c=memul&_m=p10&addr1=" + param2 + "&addr2=" + param3 + "&addr3=" + param4 + "&cortarNo=" + param5 + "&fCode=AA&memulStyle=1&tabGbn=3";
				//
				/**
					/?_c=memul&_m=p10&addr1=[시도]&addr2=[구시군]&addr3=[읍면동]&cortarNo=[법정동코드]&fCode=AA&memulStyle=1&tabGbn=3
				 */
			} else if (param1 == "map") {
				//지도보기
				//location.href="https://"+location.host+"/?_c=memul&_m=p10&addr1=" + param2 + "&addr2=" + param3 + "&addr3=" + param4 + "&cortarNo=" + param5 + "&fCode=AA&memulStyle=1&tabGbn=3"
				location.href="/?_c=memul&_m=p10&addr1=" + param2 + "&addr2=" + param3 + "&addr3=" + param4 + "&cortarNo=" + param5 + "&fCode=AA&memulStyle=1&tabGbn=3";
				//
				/**
					/?_c=memul&_m=p10&addr1=[시도]&addr2=[구시군]&addr3=[읍면동]&cortarNo=[법정동코드]&fCode=AA&memulStyle=1&tabGbn=3
				 */
			}
		} else if(type == 'school') {
			//학교
			//param1 = map // param2 = 학교구분(초등학교,중학교,고등학교) param3 = 학교코드
			if (param1 == "map") {
				// 지도보기, param2 = 학교명
			
				//location.href="https://"+location.host+"/?_c=memul&_m=p10&searchGbn=B&searchId=" + param3 + "&eduType=" + param2;
				location.href="/?_c=memul&_m=p10&searchGbn=B&eduType=" + param2 + "&searchId=" + param3;
				
				
				/**
				  	eduType:[학교구분]"* 학교구분 : 1:어린이집, 2:유치원, 3:초등학교, 4:중학교, 5:고등학교. 
					/?_c=memul&_m=p10&searchGbn=B&searchId=[학교코드]&eduType=[학교구분] 
				*/				
				
				
			}
			
		} else if(type == 'building') {
			//건물
			//param1 = buildCode (건축물대장코드)
		
			//location.href="https://"+location.host+"/?_c=memul&_m=BuildDetail&a=Print&buildCode=" + param2
			
			var popOption = "width=750, height=660, resizable=yes, scrollbars=yes, status=no;";
			
			window.open("/?_c=memul&_m=BuildDetail&a=Print&buildCode=" + param1,"건물",popOption);			
			
			/**
			 	/?_c=memul&_m=BuildDetail&a=Print&buildCode=41135-100229420 
			*/
			
			
		} else if(type == 'land') {
			//토지
			//param1 = pnu (pnu)
		
			//location.href="https://"+location.host+"/?_c=memul&_m=LandDetail&a=Print&pnu=" + param2

			var popOption = "width=750, height=660, resizable=yes, scrollbars=yes, status=no;";

			window.open("/?_c=memul&_m=LandDetail&a=Print&pnu=" + param1, "토지", popOption);
						
			/**
			 	/?_c=memul&_m=LandDetail&a=Print&pnu=1111010100100010000 
			*/
			
		} else {
		
			alert("잘못된 접근입니다.");
			return false;
		}    	
    
    }; 	

	//더보기 버튼
	function goMoreMenus() {
		$('#moreMenus').toggle();
	}
	
	
	
