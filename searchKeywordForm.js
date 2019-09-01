	$(document).ready(function() {
		/*
		 *  검색 버튼 클릭
		 */ 
		$(document).on("click", "#cmdSearchHome", function() {
		//$("#cmdSearchHome").on("click", function() {		
			searchKeywordPage();
		});		
/*		
		$("#dqSearchTerm").on("keyup", function(e) {
			if (e.keyCode == 13) {
				if ($("#dqSearchTerm").val().trim() == "") {
					alert("검색어를 입력해 주세요.");	
				} 
				// 통합검색
				else {
					goSearchEnginePage($("#dqSearchTerm").val().trim());
				}			
			}
		});		
*/		
		/*
		 * 검색 입력 포커스 
		 */
		$(document).on("focus", "#dqSearchTerm", function() {
			$("#dqSearchTerm").prop("placeholder", "");
		});
		
		/*
		 * 검색 입력 포커스 아웃
		 */
		$(document).on("focusout", "#dqSearchTerm", function() {
			$("#dqSearchTerm").prop("placeholder", $("#adSearchKeyword").val());
		});
		
		/*
		 * 통합검색 영역을 다운로드한다.
		 */
		$("#dqSearchKeywordForm").each(function() {
			$.ajax
				({
					url : "/?_c=home&_m=homeDefault&_a=SearchKeywordForm", 
					type: "POST",
					success: function(data, textStatus, jqXHR){
						$("#dqSearchKeywordForm").html(data);
						$("#dqSearchTerm").val($("input[type=hidden][name=dqTempSearchTerm]").val());
						$("#dqSearchTermOld").val($("input[type=hidden][name=dqTempSearchTerm]").val());
					},
					error: function (jqXHR, textStatus, errorThrown){
						return "";
					}
				});	
		});
		
	});		
	
	/* 
	 * 검색 실행 
	 */
	function searchKeywordPage() {
	
		// 키워드 광고	
		if ($("#dqSearchTerm").val().trim() == "") {
			goAdKeywordPage($("#dqSearchTerm").prop("placeholder"));
		} 
		// 통합검색
		else {
			dq_search();
		}			
		
	}
	
	/* 
	 * 키워드광고 페이지로 이동 
	 */
	function goAdKeywordPage(keyWord) {
	
		var url = $("#adSearchKeywordUrl").val();
		window.open(url, target="_blank");
		
	}