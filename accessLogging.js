/*********************************************************************************************
부동산 114 로그 기록용

[사용법]

1) 로그기록시
	r114Logger.addAccessLog(logCd, logType, logkey, logValue);
2) 기록한 로그 페이징처리 조회
	var jsonObj = r114Logger.getAccessLogPage(pageNo, pageSize, searchGbn);
3) 기록한 로그 갯수 조회
	string a = r114Logger.getAccessLogCount(searchGbn);
4) 로그인시 동기화를 위한 json 문자열 조회
	string a = r114Logger.getAllLogString();
5) client 로그 전체 삭제. db 동기화 후 삭제처리용
	string a = r114Logger.clearLog();


***********************************************************************************************/
function R114Logger(){
	this._configLogMaxCount = 300; // 기록할 최대 로그 건수
	this._configLogValidDay = 90; // 로그 유효일수
	this._configLogName = "r114MoveLog"; // 로그 이름
}

var r114Logger = new R114Logger();

/*
cd(로그분류) : 매물/시세, 리서치, 분양
type(로그유형) :매물/시세(지역, 단지, 매물), 리서치(게시판번호), 분양(분양매물구분:B~F, 분양뉴스:게시판번호)
logkey(로그키) : 로그 중복체크 후 삭제시 필요
					매물상세 : 물건코드
					지역/단지 : _SEL_MEMULTAB+"|"+ getCookie("Memul_CortarNo") +"|"+ _SEL_COMPLEXCD+"|"+mmCode
value (로그값) :  ^ 로 구분
					매물상세 : strMulCode+ "^"+strMemulType +"^"+strDealType+"^"+strPrice+"^"+strPrice2+ "^"+strAddr1+ "^"+strAddr2+ "^"+strAddr3+ "^" + strAddrCode + "^"+strBuildName + "^"+strComplexCode
					지역/단지 : _SEL_MEMULTAB+"^"+ getCookie('fCode') +"^"+getCookie('Memul_MemulStyle')+"^"+mmCode+"^"+ _SEL_ADDR1+"^"+ _SEL_ADDR2+"^"+_SEL_ADDR3+"^"+getCookie("Memul_CortarNo") +"^"+  _SEL_COMPLEXNM +"^"+ _SEL_COMPLEXCD

function addAccessLog(로그분류, 로그유형, 로그키, 로그값)
*/

R114Logger.prototype.addAccessLog = function(logCd, logType, logkey, logValue, logName){

	if ( fnIsEmpty(logName) )
	{
		logName = this._configLogName;
	}


	//태그 <> &lt; &gt변환
	logValue = logValue.replace(/</g, "&lt;").replace(/>/g, "&gt;");

	// 입력길이 초과시 일단  alert 처리
	if(this.getBytes(logValue)>255){alert('로깅 value 길이초과 max 255byte'+ '==>현재 '+this.getBytes(logValue)+'byte');return;}

	var addObj = {logCd : logCd, logType : logType, logkey : logkey, logValue : logValue, logConType:'W', logTimestamp : new Date().getTime().toString(), logDateTime : new Date()}; //conType : 모바일일 경우 M, PC일경우 W

	var jsonLog = [];

	var validArrLog = JSON.parse(localStorage.getItem(logName));
	if(validArrLog == null)
	{
		validArrLog = [];
		validArrLog.push(addObj);

		localStorage.setItem(logName, JSON.stringify(validArrLog));
	}
	else
	{
		var logCount = validArrLog.length;
		//console.log(logCount);

		$.each(validArrLog, function(i){
			if(validArrLog[i].logkey == logkey) {
				validArrLog.splice(i,1);
				return false;
			}
		});

		//최대갯수 넘어가는 부분 삭제처리
		var logCount = validArrLog.length;
		if(logCount>this._configLogMaxCount){
			for (i = 0; i < logCount-this._configLogMaxCount; i++) {
		    	validArrLog.pop();
			}
		}

		validArrLog.unshift(addObj);
		localStorage.setItem(logName, JSON.stringify(validArrLog));
	}

//	console.log('쌓인로그='+JSON.stringify(validArrLog));

	if( fn_isLogin() != ""){ // 로그인 상태인 경우 DB 저장

		$.ajax({
			type:"post",
			dataType:"json",
			url:"/?_c=MyPage&m=MyTrace&a=MyHistoryIns.ajax",
			data:addObj,
			success:function(reparam){
				/*$.each(reparam,function(item,entry) {
					r114Logger.setCookie(entry.logCd, entry.logValue);
				});*/
			},
			error:function(reparam){
				//console.log(reparam);
				//console.log("error");
				return false;
			}
		});
	}
}

// 브라우저 로그 페이징 처리 조회
R114Logger.prototype.getAccessLogPage = function(pageNo, pageSize, searchGbn, logName){
	pageSize = pageNo * pageSize;
	pageNo = pageNo - 1;
	if (pageNo == 0)
	{
		pageNo = pageNo
	}
	else
	{
		pageNo = parseInt(pageNo + "0");
	}

	if ( fnIsEmpty(logName) )
	{
		logName = this._configLogName;
	}

	var jsonLog = JSON.parse(localStorage.getItem(logName));

	//기간이 지난 로그 삭제 후 전달
	if (jsonLog != null) {
		logCount = jsonLog.length;

		var validArrLog = [];
		var curTimestamp = new Date().getTime(); //현재시간
		var validTimestamp = curTimestamp - (this._configLogValidDay*24*60*60*1000);
		for (i = 0; i < logCount; i++) {
			var accessLogTimestamp = Number(jsonLog[i].logTimestamp);

			if (searchGbn == "전체")
			{
				if(accessLogTimestamp>validTimestamp){ // 유효한 로그
		   			validArrLog.push(jsonLog[i]);
		   		}
			}
			else
			{
				if (searchGbn == "리서치" || searchGbn == "분양")
				{
					if (jsonLog[i].logCd == searchGbn )
					{
						if(accessLogTimestamp>validTimestamp){ // 유효한 로그
							validArrLog.push(jsonLog[i]);
						}
					}
				}
				else
				{
					if (jsonLog[i].logType == searchGbn )
					{
						if(accessLogTimestamp>validTimestamp){ // 유효한 로그
							validArrLog.push(jsonLog[i]);
						}
					}
				}
			}
		}

		var count = validArrLog.length;

		if (count < pageSize)
		{
			pageSize = count;
		}

		var validArrLog1 = [];
		for (i = pageNo; i < pageSize; i++) {
		   	validArrLog1.push(validArrLog[i]);
		}

	    return validArrLog1;
	} else {
		return "";
	}
}

// 브라우저 로그 갯수 조회
R114Logger.prototype.getAccessLogCount = function(searchGbn, logName){
	if ( fnIsEmpty(logName) )
	{
		logName = this._configLogName;
	}

	var jsonLog = JSON.parse(localStorage.getItem(logName));
	var totalCount = 0;

	//기간이 지난 로그 삭제 후 전달
	if (jsonLog != null) {
		logCount = jsonLog.length;

		var validArrLog = [];
		var curTimestamp = new Date().getTime(); //현재시간
		var validTimestamp = curTimestamp - (this._configLogValidDay*24*60*60*1000);

		for (i = 0; i < logCount; i++) {
			var accessLogTimestamp = Number(jsonLog[i].logTimestamp);

			if (searchGbn == "전체")
			{
				if(accessLogTimestamp>validTimestamp){ // 유효한 로그
		   			validArrLog.push(jsonLog[i]);
		   		}
			}
			else
			{
				if (searchGbn == "리서치" || searchGbn == "분양")
				{
					if (jsonLog[i].logCd == searchGbn )
					{
						if(accessLogTimestamp>validTimestamp){ // 유효한 로그
							validArrLog.push(jsonLog[i]);
						}
					}
				}
				else
				{
					if (jsonLog[i].logType == searchGbn )
					{
						if(accessLogTimestamp>validTimestamp){ // 유효한 로그
							validArrLog.push(jsonLog[i]);
						}
					}
				}
			}
		}

		//기간이 지난 로그 삭제 후 전달
		if ( isEmpty(validArrLog)) {
			totalCount = 0;
		} else {
			totalCount = validArrLog.length;
		}
	}

	return totalCount;
}

/* 로그 삭제 */
R114Logger.prototype.delAccessLog = function(logTimestamp, logName){
	if ( fnIsEmpty(logName) )
	{
		logName = this._configLogName;
	}

	var jsonLog = [];

	var validArrLog = JSON.parse(localStorage.getItem(logName));
	if(validArrLog != null)
	{
		var logCount = validArrLog.length;

		$.each(validArrLog, function(i){
			if(validArrLog[i].logTimestamp == logTimestamp) {
				validArrLog.splice(i,1);
				return false;
			}
		});

		localStorage.setItem(logName, JSON.stringify(validArrLog));
	}
}


// 브라우저 로그 전체 조회(로그인시 sync 용도)
R114Logger.prototype.getAccessLogAll = function(logName){
	if ( fnIsEmpty(logName) )
	{
		logName = this._configLogName;
	}

	var jsonLog = JSON.parse(localStorage.getItem(logName));
	//기간이 지난 로그 삭제 후 전달
	if (jsonLog != null) {

		logCount = jsonLog.length;

		var validArrLog = [];
		var curTimestamp = new Date().getTime(); //현재시간
		var validTimestamp = curTimestamp - (this._configLogValidDay*24*60*60*1000);

		for (i = 0; i < logCount; i++) {
			var accessLogTimestamp = Number(jsonLog[i].logTimestamp);

		   	if(accessLogTimestamp>validTimestamp){ // 유효한 로그
		   		validArrLog.push(jsonLog[i]);
		   	}
		}

	    return validArrLog;
	} else {
		return "";
	}
}

// 마이페이지 메인 노출
R114Logger.prototype.getAccessLogMyPage = function(pageCount, pageID, logName){
	if ( fnIsEmpty(logName) )
	{
		logName = this._configLogName;
	}

	var html = "";

	//비로그인상태
	if( fn_isLogin() == "")
	{
		var jsonLog = this.getAccessLogAll(logName);
		logCount = jsonLog.length;

		logCount = (logCount > pageCount) ? pageCount : logCount;

		if (logCount == 0)
		{
			html = html + "<tr>";
            html = html + "	<td colspan='2' class=\"result_nodata\">나의활동 내역이 없습니다.</td>";
            html = html + "</tr>";
		}

		for (i = 0; i < logCount; i++)
		{
			html = html + "<tr>";

			var logCd = jsonLog[i].logCd;
			var logType = jsonLog[i].logType;
			var logKey = jsonLog[i].logkey;
			var logValueArr = jsonLog[i].logValue.split("^");

			//console.log(logCd);

			if (logType == "매물")
			{
				html = html + "	<th scope=\"row\"><span class=\"fc_gray3\">"+ logCd +"</span><span>매물상세</span></th>";
				html = html + "	<td>";
				html = html + "		<a href=\"/?_c=memul&_m=HouseDetail&mulcode="+logKey+"\" >";
				html = html + "			<span class=\"info_wrap2\"><span class=\"fc_gray3\">";

				if (isEmpty(logValueArr[9]))
				{
					html = html +				logValueArr[7];
				}
				else
				{
					html = html +				logValueArr[9];
				}

				var dealType = (logValueArr[2] == "최저입찰가") ? "매매" : logValueArr[2];

				html = html + "				</span><span>"+logValueArr[1]+"</span><span>"+ dealType +"</span><span>";
				if ( logValueArr[2] == "매매" ||  logValueArr[2] == "전세")
				{
					html = html +				logValueArr[2]+"가: <em class=\"fc_blue\">"+AddComma(logValueArr[3])+"</em> 만원";
				}
				else if ( logValueArr[2] == "최저입찰가")
				{
					html = html +				"최저입찰가: <em class=\"fc_blue\">"+AddComma(logValueArr[3])+"</em> 만원";
				}
				else
				{
					html = html +				"보증금: <em class=\"fc_blue\">"+AddComma(logValueArr[3])+" 만원</em> 월세: <em class=\"fc_blue\">"+AddComma(logValueArr[4])+"</em> 만원";
				}

				html = html + "				</span>";
				html = html + "			</span>";
				html = html + "			<p><span class=\"ico_comm_s location4\">위치</span>"+logValueArr[5]+" "+logValueArr[6]+" "+logValueArr[7]+"</p>";
				html = html + "		</a>";
				html = html + "	</td>";
			}
			if (logType == "지역" || logType == "단지")
			{
				var logTypeName = "";
				if (logValueArr[0]==1)
				{
					logTypeName =  "시세";
				}
				else if (logValueArr[0]==2)
				{
					logTypeName = "통계";
				}
				else
				{
					logTypeName = (logType == "지역") ? "지역소식" : "단지소식";
				}

				html = html + "	<th scope=\"row\"><span class=\"fc_gray3\">"+ logCd +"</span><span>" + logTypeName + "</span></th>";
				html = html + "	<td>";
				html = html + "		<a href=\"/?_c=memul&_m=p10&addr1="+logValueArr[4]+"&addr2="+logValueArr[5]+"&addr3="+logValueArr[6]+"&cortarNo="+logValueArr[7]+"&fCode="+logValueArr[1]+"&memulStyle="+logValueArr[2]+"&complexCd="+logValueArr[9]+"&tabGbn="+logValueArr[0]+"\">";
				html = html + "			<span class=\"info_wrap2\">";

				if ( !isEmpty(logValueArr[8]))
				{
					html = html +				"<span class=\"fc_gray3\">" + logValueArr[8] + "</span>";
				}

				html = html + "					<span>"+fnMemulGbnName(logValueArr[1])+"</span><span>"+fnDealGbnName(logValueArr[2])+"</span>";
				html = html + "				</span>";
				html = html + "			</span>";
				html = html + "			<p><span class=\"ico_comm_s location4\">위치</span>"+logValueArr[4]+" "+logValueArr[5]+" "+logValueArr[6]+"</p>";
				html = html + "		</a>";
				html = html + "	</td>";
			}
			if (logCd == "리서치")
			{
				html = html + "	<th scope=\"row\"><span class=\"fc_gray3\">"+ logCd +"</span><span>" + logValueArr[0] + "</span></th>";
				html = html + "	<td>";
				html = html + "		<a href=\"javascript:fnResearchDetail("+logType+", '', "+logKey+")\" >";
				html = html + "			<span class=\"info_wrap2\">";
				html = html +				logValueArr[1];
				html = html +"			</span>";
				html = html + "		</a>";
				html = html + "	</td>";
			}
			if (logCd == "분양")
			{
				if ($.isNumeric(logType))
				{
					if (logType == 60)
					{
						html = html + "	<th scope=\"row\"><span class=\"fc_gray3\">"+ logCd +"</span><span>" + logValueArr[0] + "</span></th>";
						html = html + "	<td>";
						html = html + "		<a href=\"/?_c=lots&_s=offerStrategy&_m=lotsOfferInfo&_a=detail&bno="+logType+"&gno=7&num="+logKey+"\" >";
						html = html + "			<span class=\"info_wrap2\">";
						html = html +				logValueArr[1];
						html = html +"			</span>";
						html = html + "		</a>";
						html = html + "	</td>";
					}
					else
					{
						html = html + "	<th scope=\"row\"><span class=\"fc_gray3\">"+ logCd +"</span><span>" + logValueArr[0] + "</span></th>";
						html = html + "	<td>";
						html = html + "		<a href=\"/?_c=lots&_m=lotsnews&_a=newsdetail&bno="+logType+"&num="+logKey+"\" >";
						html = html + "			<span class=\"info_wrap2\">";
						html = html +				logValueArr[1];
						html = html +"			</span>";
						html = html + "		</a>";
						html = html + "	</td>";
					}
				}
				else
				{
					html = html + "	<th scope=\"row\"><span class=\"fc_gray3\">"+ logCd +"</span><span>분양정보</span></th>";
					html = html + "	<td>";
					html = html + "		<a href=\"/?_c=lots&_m=lotsinfodetail&type_g="+logType+"&aptcode="+logKey+"\" >";
					html = html + "			<span class=\"info_wrap2\">";
					html = html +				logValueArr[0];
					html = html +"			</span>";
					html = html + "		</a>";
					html = html + "	</td>";
				}
			}

			html = html + "</tr>";
		}

		$("#"+pageID).html(html);
	}

	else
	{
		var formData = {pageCount: pageCount};

		$.ajax({
			url : "/?_c=MyPage&m=MyTrace&a=MyHistoryMain.ajax",
			type: "POST",
			data : formData,
			success: function(data){
				if (data.length==0)
				{
					html = "<tr><td colspan=\"2\" class=\"tbl_nodata\">나의활동 내역이 없습니다.</td></tr>";
					$("#"+pageID).html(html);
				}
				else
				{
					$("#"+pageID).html(data);

				}
			}

		});

	}
}

//쿠키세팅.
R114Logger.prototype.setCookie = function(cname, cvalue){
    var d = new Date();
    d.setTime(d.getTime() + (this._configLogValidDay*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


//구분자 escape 용 컬럼구분: *, 라인구분:#
R114Logger.prototype.getEscapeString = function(str){
	return str.replace(/\\/g, "\\\\").replace(/\*/g, "\\\\*").replace(/\#/g, "\\#")
}


//로그인시 DB sync 처리
//전달 후 로컬 로그 삭제 처리 필요.
R114Logger.prototype.syncAllLogDB = function(logName){
	if ( fnIsEmpty(logName) )
	{
		logName = this._configLogName;
	}

	$.ajax({
		type:"post",
		dataType:"json",
		url:"/?_c=MyPage&m=MyTrace&a=MyHistorySyncIns.ajax",
		data:{"logString":r114Logger.getAllLogString(logName).replaceAll("'", "\"")},
		success:function(reparam){

		},
		error:function(reparam){
			//console.log(reparam);
			//console.log("error");
			return false;
		}
	});
}
R114Logger.prototype.getAllLogString = function(logName){
	if ( fnIsEmpty(logName) )
	{
		logName = this._configLogName;
	}

	var jsonLog = this.getAccessLogAll(logName);

	var txt =""; // 컬럼 구분값 ='<c>'   row 구분값='<r>'   --
	var logCd, logType, logkey, logConType, logValue, logAddrCode, logNumber;
	logCount = jsonLog.length;

	for (i = 0; i < logCount; i++) {
		logCd = jsonLog[i].logCd;
		logType = jsonLog[i].logType;
		logConType = jsonLog[i].logConType;
		logValue = jsonLog[i].logValue;
		logTimestamp  = jsonLog[i].logTimestamp;
		logKey = jsonLog[i].logkey;

		var logValueArr = logValue.split("^");

		if (logType == "지역" ||  logType == "단지")
		{
			logValue = fnMemulGbnName(logValueArr[1]) +"^"+ fnDealGbnName(logValueArr[2]) +"^^^"+ logValueArr[3] ;

			if ( logType == "단지")
			{
				logValue = fnMemulGbnName(logValueArr[1]) +"^"+ fnDealGbnName(logValueArr[2]) +"^"+  logValueArr[8] +"^"+ logValueArr[9] +"^"+ logValueArr[3];
			}

			logNumber = logValueArr[0];
			logAddrCode =  logValueArr[7];
		}
		else if ( logType == "매물")
		{
			logValue = logValueArr[1] +"^"+ logValueArr[2] +"^"+  logValueArr[9] +"^"+ logValueArr[10] +"^"+ logValueArr[3] +"^"+ logValueArr[4];

			logNumber = logValueArr[0];
			logAddrCode =  logValueArr[8];
		}
		else if ( logCd == "리서치" || logCd == "분양")
		{
			logValue = logValue;

			logNumber = logKey;
			logAddrCode =  "";
		}

		if(i!=0)txt+="<r>"; // 라인 구분값
		txt += logCd+"<c>"+logType+"<c>"+logConType+"<c>"+logValue+"<c>"+logTimestamp+"<c>"+logAddrCode+"<c>"+logNumber;
	}

	return txt;
}

//로컬 로그 전체 삭제
R114Logger.prototype.clearLog = function(logName){
	if ( fnIsEmpty(logName) )
	{
		logName = this._configLogName;
	}

	localStorage.removeItem(logName);
}

// 바이트수 구하기 한글은 2바이트
R114Logger.prototype.getBytes = function(contents) {
    var str_character;
    var int_char_count;
    var int_contents_length;
 	//console.log("contents="+contents);
    int_char_count = 0;
    int_contents_length = contents.length;

    for (k = 0; k < int_contents_length; k++) {
        str_character = contents.charAt(k);
        if (escape(str_character).length > 4)
            int_char_count += 2;
        else
            int_char_count++;
    }
    //console.log("int_char_count="+int_char_count);
    return int_char_count;
}
