
	/*  이메일무단수집거부 */
	function opeRejectCrolling() {

		openLp("#lp_layout_rejectCrolling");

	}

	/* 컨텐츠편집원칙 */
	function openEditPolicy() {

		openLp("#lp_layout_editPolicy");

	}
	
	/* 고객센터문의 */
	function  openInquiry() {
		
		var url = "/?_c=mypage&_s=myinquiry&_m=myinquirycenter";
		
		if (fn_isLogin() == "") {
			alert(ALERT_REQUEST_LOGIN);
			fn_loginDiv(url);
		}
		else {
			window.location.href = url;
		}
		
	}
