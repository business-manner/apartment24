var userAgent_os = navigator.userAgent;

$(function(){
	
	// 마우스 드래그와 오른쪽 마우스 동작 제어
	$(document).bind("contextmenu", function(e) { return false; });
	$(document).bind('selectstart',function() { return false; });
	$(document).bind('dragstart',function() { return false; });

	//os 체크
    if(userAgent_os.match(/Mac|PPC/)){
        //console.log('맥입니다.');
        $('html').addClass('mac');//운영체제가 맥이면 html에 mac 클래스 부여
    }else{
        //console.log('맥이 아닙니다.');
    }

    try{
		/*if($.browser.msie && parseInt($.browser.version) <= parseInt(9)){
		}
		else{*/
	        $('input, textarea').placeholder();// placeholder 적용
		//}
    }catch(e){

    };
    
    $('.msrch_wrap.search_frm').on('click','a',function(){
        $('.srch_t1 .region_pick + div').scrollTop(0);
        $('.srch_t2 .region_pick + div').scrollTop(0);
    });

    var nav_mm = $('.top_layout .menu>li.on');
    
    /*
	 * $('.top_layout .menu>li>a').hover(function() { $('.top_layout
	 * .menu>li').removeClass('on'); $(this).parent().addClass('on'); },
	 * function() { }); $('.menu_wrap').hover(function() { }, function() {
	 * $('.top_layout .menu>li').removeClass('on'); nav_mm.addClass('on'); });
	 */
	 
   $('#searchAddr,#addr1search').on('focus',function(){
	  $(this).blur();
   });
   
   if($('.menu_wrap .menu li.on ul li').length <= 0){//탑 메뉴에 서브없으면 no_2depth를 부여해서 2뎁스메뉴 영역 제거
       $('#top_layout').addClass('no_2depth');
   }

   $('.fullmenuonoff').click(function() {
       $('.menu_wrap').toggleClass('hover');
	   fnHoverMemulMenu();
   });

   $('.menu_wrap').hover(function() {

   }, function() {
       $('.menu_wrap').removeClass('hover');
   });
   
   /*
   $('.tooltip_wrap').hover(function(index) {
     var tooltip = $(this).find('.tooltip');
     var btn = $(this).find('.btn');
     tooltip.css('left','50%');
     tooltip.css('margin-left',-(tooltip.innerWidth()/2+btn.innerWidth()/2)+6);
   });
   */

	$(document).on('mouseover','.tooltip_wrap', function(index) {
		var tooltip = $(this).find('.tooltip');
		var btn = $(this).find('.btn');
		tooltip.css('left','50%');
		tooltip.css('margin-left',-(tooltip.innerWidth()/2+btn.innerWidth()/2)+6);
	});

   $(document).on('mouseover','.smr_expert', function(event) {// 부동산상담쪽 툴팁
       var h = $(this).find('.tooltip.type_rightblue').innerHeight();
       //익스플로러 버그로 height 값을 못가져오는것에대한 대응.. position relative 상태로 바꿔서 세로값을 가져오고 absolute로 교체
       $(this).find('.tooltip.type_rightblue').css('position','relative');
       $(this).find('.tooltip.type_rightblue').css('height',$(this).find('.tooltip.type_rightblue').height());
       $(this).find('.tooltip.type_rightblue').css('position','absolute');
       $(this).find('.tooltip.type_rightblue').css('margin-top',-(h/2)+'px');
       // console.log(h);
   });

    $("a").click(function(e){
        var href = $(this).attr("href");
        if(href == "#none" || href == "#" || href == "" || href == "javascript:;" || href == "javascript:"){
            e.preventDefault();
        }
    });

    if($('.filter_wrap').length > 0){// 필터영역 플로팅
    	
        var filter_top = $('.filter_wrap').offset().top;
        // console.log(obj_top);
        $(window).scroll(function() {
            // console.log($(window).scrollTop());
            if($(window).scrollTop() > filter_top){
                $('.filter_wrap').addClass('floating');
            }else{
                $('.filter_wrap').removeClass('floating');
            }
        });
        
    }
    
    //var floating_topmenu_actioncnt = 0;
    
    if($('.floating_topmenu').length > 0){
    	
        var floating_topmenu_live = true;
        var active_scroll_conts = ['divScrollTab1','divScrollTab2','divScrollTab3', 'divScrollTab4'];
        var t_act;
        var act = 0;
        var floatingStartHeight = $('#ulMemulDetailTab').offset().top + $('#ulMemulDetailTab').height();
        
        //alert(floatingStartHeight)
        
        $(window).scroll(function() {
        	
        	// console.log($(document).scrollTop());
        	
            if(floating_topmenu_live) {
            	
                if($(document).scrollTop() < floatingStartHeight) {
                	$('.floating_topmenu').removeClass('view');                   
                } else {               
                     $('.floating_topmenu').addClass('view');
                }
                //floating_topmenu_actioncnt++;

                for (var i = 0; i < active_scroll_conts.length; i++) {/*스크롤시 해당화면의 메뉴 활성화*/
                	
                    if ($('#' + active_scroll_conts[i]).css('display') != 'none') {
                    
	                    var scrolltop = $(document).scrollTop();
	                    var floatingHeight = $('.floating_topmenu').height();
	                    var obj_start = $('#' + active_scroll_conts[i]).offset().top;
	                    var obj_end = $('#' + active_scroll_conts[i]).offset().top + $('#' + active_scroll_conts[i]).height();
	                    
	                    if(obj_start < scrolltop + floatingHeight && obj_end > scrolltop) {
	                    	
	                        act = $('.floating_topmenu .' + active_scroll_conts[i]).index();	                        
	                        
	                        if(act != t_act) {
	                            $('.floating_topmenu li').removeClass('on');
	                            $('.floating_topmenu li:eq(' + act + ')').addClass('on');
	                            //console.log(act);
	                            t_act = act;
	                        }
	                        
	                    }            
	                    
	                }        
                    
                }
                
            }
            
        });
        
        $('.floating_topmenu li a, #ulMemulDetailTab li a').on('click',function() {/*메뉴클릭하면 스크롤 이동하는동안은 메뉴 활성화 안되게*/
        	
            floating_topmenu_live = false;
            
            setTimeout(function () {
                floating_topmenu_live = true;
            }, 500);
            
        });
        
    }
    /*
	 * $('.btn_compare_active').click(function() {
	 * $('.list_article').addClass('sel_box_active'); });
	 */

    $('input[type="checkbox"]').each(function(index) {// 리로드시 체크박스 prop과 attr 싱크맞춤
        if($(this).prop('checked')){
          $(this).attr('checked');
        }else{
            $(this).removeAttr('checked','');
        }
    });
    
    $(document).on('change','input[type="checkbox"]', function(event) {// 이미지 체크박스 로직
        if($(this).is(':checked')){
            $(this).prop('checked',true);
            $(this).attr('checked','');
        }else{
            $(this).prop('checked',false);
            $(this).removeAttr('checked','');
        }
    });

    $('input[type="radio"]').each(function(index) {// 리로드시 라디오버튼 prop과 attr 싱크맞춤
        if($(this).prop('checked')){
            $(this).attr('checked');
        }else{
            $(this).removeAttr('checked','');
        }
    });
    
    $(document).on('change','input[type="radio"]', function(event) {// 이미지 라디오버튼 로직
        var name = $(this).attr('name');
        $('input:radio[name="'+name+'"]').prop('checked',false);
        $('input:radio[name="'+name+'"]').removeAttr('checked');
        $(this).prop('checked',true);
        $(this).attr('checked','');
    });

    $(".marquee").each(function(){// 글자흐르게 하는거
        var marq = $(this).text().length;
        if(marq>18){
            $(this).marquee({
                duration: 5000,
                gap: 50,
                delayBeforeStart: 0,
                direction: 'left',
                duplicated: true
            });
        }
    });

    // 오른쪽 비교하기영역 스크롤해도 보이게 플로팅
    if($('.compare_wrap').length > 0){
        var obj_top = $('.compare_wrap').offset().top-75;
        $(window).scroll(function() {
            if($(window).scrollTop() > obj_top){
                $('.compare_wrap').addClass('floating');
            }else{
                $('.compare_wrap').removeClass('floating');
            }
        });
    }

    // srch_deal_wrap에 상세옵션 열고닫기
    $(".btn_detail_option").on("click", function(){
        $(this).parent().toggleClass("on");
        $(this).toggleClass("on");
    });

    // 분양정보 상세옵션
    $(".option_detail_wrap .btn_option").on("click", function(){
		if ($(this).next(".option_wrap").hasClass("on")) {
			$(this).next(".option_wrap").removeClass("on");
		}
		else{
	        $(this).next(".option_wrap").addClass("on");
		}
    });
    
    $(".option_detail_wrap .btn_cl").on("click", function(){
        $(this).parent().parent(".option_wrap").removeClass("on");
    });

    // 맵 검색조건
    $('.search_sort_wrap .sort .title').click(function(e) {
        // console.log($(this).parents('.sort').hasClass('on'));
        if($(this).parents('.sort').hasClass('on')){
            $(this).parents('.sort').removeClass('on');
            //body_scroll_active();
        }else{
            e.stopPropagation();
            $('.search_sort_wrap .sort').removeClass('on');
            $('.search_wrap').removeClass('active');
            $(this).parents('.sort').addClass('on');
            //body_scroll_disable();
        }
    });
    
    if($('.search_sort_wrap').length >0){// search_sort_wrap 가 존재하면
      /*  $('.search_sort_wrap .search_wrap').focusin(function() {
            $('.search_sort_wrap .search_wrap').addClass('active');
        });
        $('.search_sort_wrap .search_wrap').click(function() {
            $('.search_sort_wrap .search_wrap').addClass('active');
        });
    */

    	 /* 검색 팝업을 열면 초기화 처리를 한다. 2017.11.02 */
        $(".search_wrap .search_btn").click(function() {
    		if (!$('.search_sort_wrap .search_wrap').hasClass('active')) {
     	        // 검색창을 보이기 전에 이전에 노출한 데이터를 제거한다.
     			$('#msrch_wrap_address_input').val("") ;
     			$('.search_sort_wrap .search_wrap').addClass('active');
     			$("#msrch_wrap_address_list").find("li").remove();
     			$(".search_result").css("display", "none");
     			$(".n1").addClass("on");
     			$(".n2").removeClass("on");
     			$(".n3").removeClass("on");
         	 }
    	});

    	/*  addressTitle 클릭이벤트는 하위의 a 태그이벤트에서 처리하는 것으로 변경 (default.js: fnc_AddrList_sel())
        $(".search_wrap #addressTitle").click(function() {
    		if (!$('.search_sort_wrap .search_wrap').hasClass('active')) {
     	        // 검색창을 보이기 전에 이전에 노출한 데이터를 제거한다.
     	//		$('#msrch_wrap_address_input').val("") ;
     			$('.search_sort_wrap .search_wrap').addClass('active');
     	//		$("#msrch_wrap_address_list").find("li").remove();
     	    	$(".search_result").css("display", "none");
     	    	$(".n1").addClass("on");
     	    	$(".n2").removeClass("on");
     			$(".n3").removeClass("on");
         	 }
          	 
    	});
		*/
        
    	 /* 검색 팝업을 열면 초기화 처리를 한다. */

    }
    
    $('body').on('click', function(e) {
    	
        if($(e.target).hasClass('ui-menu-item-wrapper')){
            // console.log('select 클릭시 사라지는 버그 처리');
            return;
        }
        
        if(!$(e.target).hasClass('title')){
            if(!$('.search_sort_wrap .cont').has(e.target).length){
                $('.search_sort_wrap .sort').removeClass('on');// 박스이외의 영역 클릭시 사라지게
                body_scroll_active();
            }
        }
        
		if(!$('.f_site').has(e.target).length){
            if($('.f_site').hasClass('on')){
                $('.f_site').removeClass('on');// 패밀리사이트 이외의 영역 클릭시 사라지게
                $('html').removeClass('foot_combo_open');//풋 콤보가 열릴때만 foot_layout 을 top_layout으로 올리는거 삭제
            }
        }
        
		if(!$('.sitemap').has(e.target).length){
            if($('.sitemap').hasClass('on')){
                $('.sitemap').removeClass('on');// 사이트맵 이외의 영역 클릭시 사라지게
                $('html').removeClass('foot_combo_open');//풋 콤보가 열릴때만 foot_layout 을 top_layout으로 올리는거 삭제
            }
        }
        
        if(!$('.search_wrap').has(e.target).length){
            $('.srch_t1 .region_pick + div').scrollTop(0);
            $('.srch_t2 .region_pick + div').scrollTop(0);
            $('.search_wrap').removeClass('active');// 박스이외의 영역 클릭시 사라지게
            if (typeof fn_restoreSelectArea == 'function') {
            	fn_restoreSelectArea();
            }
        }
        
        if($(e.target).hasClass('btn_cancel')){
            $('.search_wrap').removeClass('active');// 취소버튼 클릭시 사라지게
            if (typeof fn_restoreSelectArea == 'function') {
            	fn_restoreSelectArea();
            }
            body_scroll_active();
        }
        
    });
    
    $('.tab_ui>li').click(function(e) {
    	
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
        $('body').trigger('tab_change');
        
    });
    
    $('.tab_ui>a').click(function(e) {
    	
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
        $('body').trigger('tab_change');
        
    });

	//패밀리사이트 컨트롤
	$('.f_site,.sitemap').on('click',function(){
		
		if ($(this).hasClass('on')) {
	        $(this).removeClass('on');// 패밀리사이트 이외의 영역 클릭시 사라지게
            $('html').removeClass('foot_combo_open');//풋 콤보가 열릴때만 foot_layout 을 top_layout으로 올리는거 삭제
		}else{
			$(this).addClass('on');
            $('html').addClass('foot_combo_open');//풋 콤보가 열릴때만 foot_layout 을 top_layout으로 올리는거
		}
		
	});

    // 토글
    $(".toggle1 li > a").on('click',function(){
    	
        if($(this).parent().attr("class") == "on"){
            $(this).parent().removeClass("on");
        }else{
            $(this).parents(".toggle1").find("li").removeClass("on");
            $(this).parent().addClass("on");
        }
        
    });

    // select
    if($("select")){
        $("select").selectmenu();
    }

    // 검색자동완성
    $("div:not(.each_def).srch_keyword .inp_txt").keyup(function() {    // 엔터나 다른 제약 조건이 필요한 경우 each_def를 주어 개별 설정. 나머지는 기본으로 아래를 따름.
        if($(this).val() == ""){
            $(this).parent().parent().find('.list_keyword').removeAttr("style");
        } else {
            $(this).parent().parent().find('.list_keyword').css('display','block');
        }
    });

    /* 박스탭 시작 */
    $(".boxTab_wrap .tabBox .tabBtn").each(function(){
    	
        var tabBtnSize = $(this).parents(".boxTab_wrap").find(".tabBtn").size();
        var tabBtnWidth = (100/tabBtnSize)+"%";
        $(this).css('width',tabBtnWidth);
        for( var a=0; a<=tabBtnSize; a++ ){
            var b = a+2;
            var c = a+1;
            var tabBtnLeft = ((100/tabBtnSize)*c)+"%";
            $(this).parents(".boxTab_wrap").find(".tabBox.n"+b+" .tabBtn").css('left',tabBtnLeft);
        }
        
    });

    $(".boxTab_wrap .tabBtn a").click(function(){
    	
        $(this).parents(".boxTab_wrap").find(".tabBox.on").removeClass('on');
        $(this).parents(".tabBox").addClass('on');
        // sliderBox_height();
        $('.srch_t1 .region_pick + div').scrollTop(0);
        $('.srch_t2 .region_pick + div').scrollTop(0);
        
    });
    /* 박스탭 끝 */


    /* 검색자동완성 */
    $("div:not(.each_def).search_wrap .inp_txt").keyup(function() { // 엔터나 다른 제약 조건이 필요한 경우 each_def를 주어 개별 설정. 나머지는 기본으로 아래를 따름.
        if($(this).val() == ""){
            $(this).parent().parent().find('.search_result').removeAttr("style");
        } else {
            $(this).parent().parent().find('.search_result').css('display','block');
            $('body').trigger('open_landSearch');
        }
        $('.search_wrap.inp_wrap').addClass('active');
    });
    
    $(".search_frm .search_result button").on('click',function(){
        $(this).parent().removeAttr("style");
        $('body').trigger('close_landSearch');
    });
    
    $(".search_frm .btn_search").on('click',function(){
        $(this).parent().parent().parent().find('.search_result').removeAttr("style");
    });

    $(document).on('click','.search_frm .search_result .list_result a', function() {    // 동적으로 생성된 목록에 jquery에서 이벤트를 주려면 $(document).on을 써줘야 함
        $(".search_frm input:not(.each_def).inp_txt").val( jQuery.trim($(this).text()) );
        $(this).parent().parent().parent().parent().find('.search_result').removeAttr("style");
    });

    $(".autoComplete .inp_txt").keyup(function() {
        if($(this).val().indexOf("@") <= -1){   // "@" 입력시에 자동완성목록 표시
            $(this).parents(".autoComplete").find('.autoComplete_list').removeAttr("style");
        }else{
            $(this).parents(".autoComplete").find('.autoComplete_list').css('display','block');
        }
    });
    
    $(".autoComplete .autoComplete_list .btn a").on('click',function(){
        $(this).parents(".autoComplete").find('.autoComplete_list').removeAttr("style");
    });
    
    try{
        if($('.result_in_search .chk_wrap')[0].scrollHeight<=60){
            $('.result_in_search').addClass('open');
        };
        $('.btn_expend').click(function() {
            $('.result_in_search').addClass('open');
        });
    }catch(e){}


    // 테이블에 보이는 caption 이 있다면 caption_view 클래스 부여
    $('table').each(function(index) {
        if($(this).find('caption').hasClass('view')){
           $(this).addClass('caption_view');
        }
    });
    
});

function body_scroll_active(){
    $('html').removeClass('scroll_disable');
}

function body_scroll_disable(){
    $('html').addClass('scroll_disable');
}

/* 버스 지하철 리스트 아이콘 정렬 */
function list_public_align(){
    $('.list_public .cont.bus li').each(function(index) {
        var icon_w = $(this).find('i').innerWidth()+5;
        $(this).css('margin-left',icon_w);
        $(this).css('text-indent',-icon_w);
    });
}

// 지역선택
function areaChoice() {
    document.getElementById("areaDropdown").classList.toggle("show");
}

/* 레이어팝업1 호출 */
function openLp(id){
    $("input[type='text']").blur();//팝업열때 모든 포커스 제거
    if(id == "type1"){
        var lp_layout = "#lp_layout1";
    }else if(id == "type2"){
        var lp_layout = "#lp_layout2";
    }else if(id == "type3"){
        var lp_layout = "#lp_layout3";
    }else {
        var lp_layout = id;
    }
    $(lp_layout).css('display','inline-block');
    $('html').addClass('layer_pop_open');
    $('body').trigger('slide_reload');
}

/* 레이어팝업1 닫기 */
function closeLp(id){
    if(id == "type1"){
        var lp_layout = "#lp_layout1";
    }else if(id == "type2"){
        var lp_layout = "#lp_layout2";
    }else if(id == "type3"){
        var lp_layout = "#lp_layout3";
    }else {
        var lp_layout = id;
    }
    $(lp_layout).removeAttr("style");

	if ( lp_layout == "#lp_layout_AddrSearch")
	{
		$(lp_layout).remove();
	}

    //레이어창이 여러개 떳을때 맨 마지막으로 창이 닫힐때만 layer_pop_open 클래스 제거
    var multi_pop_check = false;
    $("[id^='lp_layout']").each(function(){
        var sty = String($(this).attr('style'));
        if(sty.match('inline-block') == 'inline-block'){
            multi_pop_check = true;
        }
    });
    if(!multi_pop_check){
        $('html').removeClass('layer_pop_open');
        $('html').removeClass('mac');
    }
}

function openLayerPopup(id) {

	 var lp_layout = id;

	  $(lp_layout).css('display','inline-block');
}

function closeLayerPopup(id) {

	 var lp_layout = id;

	 $(lp_layout).css('display','none');

}

/* aria tab */
$(function(){
    $('[role="tab"]').keyup(function(e){
        var keyCode = e.keyCode || e.which;// 키보드 코드값
        if(keyCode == 39 || keyCode ==  40){// 오른쪽방향키 이거나 아래 방향키
             // 브라우저의 기본 동작을 취소한다.
            e.preventDefault();
            // 다음 tab 요소에 aria-selected=true로 지정하고
            // 형제요소중에 자신 tab 이외의 나머지 tab 요소들을 aria-selected=false로 지정한다.
            $(this).next().attr('aria-selected', true).siblings().attr('aria-selected', false);

            var selectedId = "#"+$(this).next().attr('aria-controls');
            // 자신은 보이게하고 다른 tabpanel은 보이지 않게 지정한다.
            $(selectedId).removeClass('none').siblings().addClass('none');
            // 다음요소로 포커스를 이동한다.
            $(this).next().focus();

            // 마지막요소에서 오른쪽 방향키나 아래 방향키를 눌렀을 경우
            if($(this).next().prevObject.attr('aria-controls')=='section3'){
                // tab, tabpanel,focus 모두 처음으로 이동
                $('#tab1').attr('aria-selected', true).siblings().attr('aria-selected', false);
                $('#section1').removeClass('none').siblings().addClass('none');
                $('#tab1').focus();
            }
        }
        if(keyCode == 37 || keyCode ==38){// 왼쪽방향키 이거나 위쪽 방향키
            e.preventDefault();
            // 이전 tab 요소에 aria-selected=true로 지정하고
            // 형제요소중에 자신 tab 이외의 나머지 tab 요소들을 aria-selected=false로 지정한다.
            $(this).prev().attr('aria-selected', true).siblings().attr('aria-selected', false);

            var selectedId = "#"+$(this).prev().attr('aria-controls');
            // 자신은 보이게하고 다른 tabpanel은 보이지 않게 지정한다.
            $(selectedId).removeClass('none').siblings().addClass('none');
            // 이전요소로 포커스를 이동한다.
            $(this).prev().focus();
            // 처음요소에서 왼쪽 방향키나 위쪽 방향키를 눌렀을 경우
            if($(this).prev().prevObject.attr('aria-controls')=='section1'){
                // tab, tabpanel,focus 모두 마지막으로 이동
                $('#tab3').attr('aria-selected', true).siblings().attr('aria-selected', false);
                $('#section3').removeClass('none').siblings().addClass('none');
                $('#tab3').focus();
            }
        }
        if(keyCode == 35){// end 키를 눌렀을 때
            e.preventDefault();
            // tab, tabpanel,focus 모두 마지막으로 이동
            $('#tab3').attr('aria-selected', true).siblings().attr('aria-selected', false);
            $('#section3').removeClass('none').siblings().addClass('none');
            $('#tab3').focus();
        }
        if(keyCode == 36){// home키를 눌렀을 때
            e.preventDefault();
            // tab, tabpanel,focus 모두 처음으로 이동
            $('#tab1').attr('aria-selected', true).siblings().attr('aria-selected', false);
            $('#section1').removeClass('none').siblings().addClass('none');
            $('#tab1').focus();
        }

    });
    // $('[role="tab"]').keydown(function(e){
    //
    // var keyCode = e.keyCode || e.which;//키보드 코드값
    // if(keyCode == 9){//탭키를 눌렀을 때
    // e.preventDefault();
    // var selectedId = "#"+$(this).attr('aria-controls');
    // console.log(selectedId);
    // $(selectedId).children('a').focus();
    // }
    //
    // });

    $('div a').keydown(function(e){
        var keyCode = e.keyCode || e.which;// 키보드 코드값
        if (keyCode == 9 && e.shiftKey) {// shift+tab 키
            $('.tab_list li').each(function( index ) {
                if($( this ).attr('aria-selected') == 'true'){
                    $( this ).next().focus();
                    return false;
                }

            });
        }
    });
    
    // tab 요소에 클릭 이벤트를 추가한다.
    $('[role="tab"]').on('click', function(e) {
        e.preventDefault();
        // 클릭한 tab 요소에 aria-selected=true로 지정하고
        // 형제요소중에 자신 tab 이외의 나머지 tab 요소들을 aria-selected=false로 지정한다.
        $(this).attr('aria-selected', true).siblings().attr('aria-selected', false);

        var selectedId = "#"+$(this).attr('aria-controls');
        // 자신은 보이게하고 다른 tabpanel은 보이지 않게 지정한다.
        $(selectedId).removeClass('none').siblings().addClass('none');
    });

    // 카드뉴스
    if($('#swipe-wrap').length>0){
       var bx_cardnews_init = false;
       var bx_temp_h;
       var bx_temp_w;
       var bx_temp_trans;
       var cardnews_slider_init = false;
       var cardnews_slider = $('#swipe-wrap').bxSlider({prevSelector:$('.ui'),nextSelector:$('.ui'),infiniteLoop:false,onSliderLoad: function(){
           if(!cardnews_slider_init){// 한번만 실행
               cards_v();
               cardnews_slider_init = true;
           }
       }});
       $('.btn_aligntype.v').click(function() {
           $('.btn_aligntype.h').removeClass('on');
           $(this).addClass('on');
           cards_v();
       });
       $('.btn_aligntype.h').click(function() {
           $('.btn_aligntype.v').removeClass('on');
           $(this).addClass('on');
           cards_h();
       });


       function cards_v(){// 카드뉴스 세로모드로

           $('.bx-viewport').css('height','initial');
           $('.swipe-wrap').css('width','initial');
           $('.swipe-wrap').css('transform','initial');
           $('.swipe-wrap>div:not(:first-child)').css('margin-top','25px');
           $('#mySwipe .bx-pager').css('visibility','hidden');
           $('#mySwipe .ui').css('visibility','hidden');
       }
       function cards_h(){// 카드뉴스 가로모드로

           $('.bx-viewport').css('height',bx_temp_h);
           $('.swipe-wrap').css('width',bx_temp_w);
           $('.swipe-wrap').css('transform',bx_temp_trans);
           $('.swipe-wrap>div').css('margin-top','0');
           $('#mySwipe .bx-pager').css('visibility','visible');
           $('#mySwipe .ui').css('visibility','visible');
           cardnews_slider.reloadSlider();
       }

       setTimeout(function(){
           $('.slider_cont>li').css('visibility','visible');
       },1000);/*1초안에 슬라이더 내에서 로딩처리해서 li를 보이게하지 않으면 슬라이더들의 li를 강제로 모두 보이게 처리*/
    };
    
    slide_type2_load();
    slide_type3_load();
    slide_type4_load();
    slide_type5_load();
    slide_type6_load();
    slide_type7_load();
    slide_type8_load();
    slide_type9_load();

    slider1_load();
    slide_rs_load();
    list_best_load();
    list_thumb_type6_slide_load();
    list_bunyang_slide_load();
    maincont_banner_load()
    notice_slide_load();
    slide_tab_pmd_load();
    sale_media_slide_load();
    slide_research_submain_load();
    slide_appdown_load()
    slide_type2_bun_load();
    
});

function slide_appdown_load(){
    $('.slide_appdown').each(function(){
        var pager = $(this).find('.bx-pager')
        var slide_appdown = $(this).find('>ul').bxSlider({
            touchEnabled:false,
            slideMargin:20,
            pagerCustom:pager,
            infiniteLoop:true
        });
        $('body').on('tab_change',function(e){//탭이 바뀌면 리로드
            slide_appdown.reloadSlider();
        });
    })

}

function slide_recommendOffice_load(){
    if($('.slide_recommendOffice > ul').length>0){
        $('#slidercounter_recommendOffice').prepend(' <strong class="current-index"></strong>/  ');
        var btn_next = $("#pager_recommendOffice");
        var btn_prev = $("#pager_recommendOffice");
        var slider = $('.slide_recommendOffice > ul').bxSlider({
            auto: true,
            minSlides: 1,
            pager: false,
            controls: true,
            touchEnabled: false,
            slideMargin:20,
            infiniteLoop:true,
            prevSelector: $('.slide_recomm_ui>div'),
            nextSelector: $('.slide_recomm_ui>div'),
            //              	mode:'fade'
            onSliderLoad: function (currentIndex){
                $('#slidercounter_recommendOffice .current-index').text(currentIndex + 1);
            },
            onSlideBefore: function ($slideElement, oldIndex, newIndex){
                $('#slidercounter_recommendOffice .current-index').text(newIndex + 1);
            }
        });

        $('#slidercounter_recommendOffice').append(slider.getSlideCount());
    };
}

function member_office_info_slide_load(){
    if($('.member_office_info').length>0){
        $('.member_office_info>.inner>.slider_cont').bxSlider({
          touchEnabled:false,
          adaptiveHeight:true,
          slideMargin:20,
          auto:true,
          pagerCustom:'.member_office_info .slider_pager'
        });
    };
}

function slider1_load(){
    if($('.slider1').length>0){
        var slider = $('.slider1').bxSlider({
            slideWidth: 116,
            minSlides: 3,
            maxSlides: 3,
            slideMargin: 50,
            infiniteLoop:false,
            pager: false,
            touchEnabled:false
        });
        $('.slider1 .slide a').on('click', function(){
            $(this).toggleClass('on');
        });
        $('body').on('openLp',function(){
            slider.reloadSlider();//레이어팝업 뜨고나서 박스슬라이더 초기화
        });
    };
}

function slide_rs_load(){
    $('.slide_rs').each(function(index) {
        var slider = $(this).find('.slider_cont');
        var btn_next = $(this).find('.ui');
        var btn_prev = $(this).find('.ui');
        slider.bxSlider({
            pager: false,
            touchEnabled:false,
            mode:'fade',
            prevSelector: btn_prev,
            nextSelector: btn_next,
            // slideWidth: 650
        });
    });
}

function list_best_load(){
    if($('.list_best').length>0 && $('.list_best li').length>3){
        /* best list */
        var bestSlider = $('.list_best').bxSlider({
            slideWidth: 203,
            minSlides: 3,
            maxSlides: 3,
            slideMargin: 16,
            infiniteLoop: false,
            hideControlOnEnd:true,
            pager: false,
            touchEnabled: false,
        });
    };
}

function list_thumb_type6_slide_load(){
    if($('.list_thumb_type6.slide > ul').length>0){
        $('.list_thumb_type6.slide > ul').bxSlider({
            pager: false,
            touchEnabled:false,
            slideWidth: 180,
            minSlides: 2,
            maxSlides: 2,
            slideMargin: 10,
            pager: false,
            touchEnabled: false
        });
    };
}

function list_bunyang_slide_load(){
    if($('.list_bunyang > ul').length>0){
        $('.list_bunyang > ul').bxSlider({
            pager: false,
            touchEnabled:false,
            slideWidth: 169,
            minSlides: 4,
            maxSlides: 4,
            slideMargin: 20,
            infiniteLoop:false,
            hideControlOnEnd:true,
            touchEnabled: false,
            onSliderLoad:function(e){
                $('.list_bunyang .bx-wrapper').css('margin','0 0');
            }
        });
    };
}

function sale_media_slide_load(){
    if($('.sale_media_wrap>ul').length>0){
        var slider_sale_media = $('.sale_media_wrap>ul').bxSlider({
            auto: false,
            speed:500,
            touchEnabled: false,
            pager:false,
            mode:'fade'
        });
    };
}

function maincont_banner_load(){
    if($('.main_cont.banner ul').length>0){
        var slider_sale_media = $('.main_cont.banner ul').bxSlider({
            auto: false,
            touchEnabled: false,
            pager:false
        });
    };
}

function notice_slide_load(){
    if($('.notice_wrap .slide').length>0){
        var slider_notice = $('.notice_wrap .slide').bxSlider({
            auto: false,
            touchEnabled: false,
            pager:false,
            mode:'vertical',
            prevSelector: $('.notice_wrap .ui'),
            nextSelector: $('.notice_wrap .ui')
        });
    };
}

function slide_research_submain_load(){
    if($('.slide_research_submain').length>0){
        $('.slide_research_submain').each(function(index) {
            var slide = $(this).find('.slider_cont');
            var uiEl = $(this).find('.ui');
            var btn_next = $(this).find('.ui');
            var btn_prev = $(this).find('.ui');
            var slide_slide_research_submain = slide.bxSlider({
                touchEnabled: false,
                speed:500,
                pager:true,
                mode:'fade'
            });
        });
    };
}

function slide_type2_load(image_index){
    if($('.slide_type2').length>0){
        /* best list */
        $('.slide_type2').each(function(index) {
            var slide = $(this).find('.slider_cont');
			var uiEl = $(this).find('.ui');
            var btn_next = $(this).find('.ui');
            var btn_prev = $(this).find('.ui');
            var thumb_view_Num = 5;

            var page_slider;
            var slider_type2 = slide.bxSlider({
                pager: true,
                pagerCustom: $(this).find('.pager'),
                prevSelector: btn_prev,
                nextSelector: btn_next,
                onSlideBefore: function($slideElement, oldIndex, newIndex){
                    $(uiEl).find('.slide_page_index > em.current').html((newIndex + 1));
                    active_sync('slide');
                },
                touchEnabled: false
            });
            $('.slide_type2').on('gotoSlide', function(event) {
            	try {
            		slider_type2.goToSlide(event.num);
            	}
            	catch (e) {}
            });
            if($(this).find('.pager_wrap .pager').length>0){

                if($(this).hasClass('typeC')){
                   page_slider = $(this).find('.pager_wrap .pager').bxSlider({
                      minSlides: thumb_view_Num,
                      maxSlides: thumb_view_Num,
                      slideWidth: 138,
                      slideHeight: 78,
                      slideMargin: 15,
                      infiniteLoop:false,
                      hideControlOnEnd:true,
                      prevSelector: $(this).find('.pager_ui'),
                      nextSelector: $(this).find('.pager_ui'),
                      onSlideBefore: function($slideElement, oldIndex, newIndex){
                          active_sync('thumb');
                      }
                   });
                }else if($(this).hasClass('typeD')){
                      thumb_view_Num = 8;
                      page_slider = $(this).find('.pager_wrap .pager').bxSlider({
                      minSlides: thumb_view_Num,
                      maxSlides: thumb_view_Num,
                      slideWidth: 90,
                      slideMargin: 5,
                      infiniteLoop:false,
                      hideControlOnEnd:true,
                      prevSelector: $(this).find('.pager_ui'),
                      nextSelector: $(this).find('.pager_ui'),
                      onSlideBefore: function($slideElement, oldIndex, newIndex){
                          active_sync('thumb');
                      }
                   });
                }else{
                    page_slider = $(this).find('.pager_wrap .pager').bxSlider({
                      minSlides: 11,
                      maxSlides: 11,
                      slideWidth: 58,
                      slideMargin: 5,
                      infiniteLoop:false,
                      hideControlOnEnd:true,
                      prevSelector: $(this).find('.pager_ui'),
                      nextSelector: $(this).find('.pager_ui'),
                      onSlideBefore: function($slideElement, oldIndex, newIndex){
                          active_sync('thumb');
                      }
                    });
                }
            }
            $('body').on('slide_reload', function(event) {
            	try {
            		slider_type2.reloadSlider();
            		page_slider.reloadSlider(); //레이어 팝업이 뜰때 리사이즈로 위치 잡아줌
            	}
                catch (e) {
                }
            });
            $('body').on('tab_change', function(event) {//매물상세 탭 단지에서 시세,중개사무소로 갔다가 다시오면 안보이게되는거 리로드로 처리
                setTimeout(function() {
                    slider_type2.reloadSlider();
                }, 100);
            });
            //액티브 변화를 감지해서 썸네일 활성화의 싱크를 맞춤 파라메터 v: 'slide'- 슬라이드에 현재위치에 맞춰서 썸네일을 조정,'thumb'- 썸네일의 현재위치에 맞춰서 슬라이드를 조정
            function active_sync(v){
                try {//해당사항 없으면 try catch로 무시
                    var total = slider_type2.getSlideCount();
                    var current = slider_type2.getCurrentSlide();
                    var pager_current = page_slider.getCurrentSlide();
                    var slideview_start = pager_current * thumb_view_Num;
                    var slideview_end = (pager_current+1) * thumb_view_Num;

                    if(slideview_end > total){
                        slideview_end = total;
                        slideview_start = slideview_end - thumb_view_Num;
                    }
                    if(current < slideview_start || current >= slideview_end){
                        var num = Math.floor(current / thumb_view_Num);
                        if(v == 'slide'){
                        	try {
                        		page_slider.goToSlide(num);
                        	} catch (e) {
                            }
                        }else if(v == 'thumb'){
                            try {
                            	slider_type2.goToSlide(slideview_start);
                            } catch (e) {
                            }
                        }
                    }
                    var getCls = slider_type2.getCurrentSlideElement().find('.slide>*').attr('class');
                } catch (e) {
                }
            }
            try {
                $('.slide_page_index > em.totalCnt').html(slider_type2.getSlideCount());
                if (image_index) {
                	slider_type2.gotoSlide(image_index);
               }
            } catch (e) {}
        });
    };
}

function slide_type2_memul_load(){
    /* 이미지 슬라이드 */
    $('.slide_type2_memul').each(function(index) {
        var slide = $(this).find('.slider_cont');
        var uiEl = $(this).find('.ui');
        var btn_next = $(this).find('.ui');
        var btn_prev = $(this).find('.ui');
        var thumb_view_Num = 11;//화면상에 보여지는 썸네일의 갯수
        var page_slider;
        var slider_type2 = slide.bxSlider({
            pager: true,
            touchEnabled: false,
            pagerCustom: $(this).find('.pager'),
            prevSelector: btn_prev,
            nextSelector: btn_next,
            onSlideBefore: function($slideElement, oldIndex, newIndex){
                $(uiEl).find('.slide_page_index > em.current').html((newIndex + 1));
                active_sync('slide');
            }
        });
        try {
            $('.slide_page_index > em.totalCnt').html(slider_type2.getSlideCount());
        } catch (e) {}

        $('.slide_type2_memul').on('gotoSlide', function(event) {
            slider_type2.goToSlide(event.num);
        });	

        if($(this).find('.pager_wrap .pager').length>0){
            var _menu = $(this).find('.menu');
            var _pager = $(this).find('.pager');
            var move_w = $('.pager_wrap').width();
            var pager = $(this).find('.pager_wrap .pager');
            var p_idx = 0;
            var pager_w = $(this).find('.pager a').length * ($(this).find('.pager a').width());
            var pageNum = Math.floor(pager_w / move_w);
            page_slider = $('.pager_wrap .pager').bxSlider({
                minSlides: thumb_view_Num,
                maxSlides: thumb_view_Num,
                slideWidth: 57,
                slideMargin: 5,
                infiniteLoop:false,
                hideControlOnEnd:true,
                touchEnabled: false,
                prevSelector: $('.pager_ui'),
                nextSelector: $('.pager_ui'),
                onSlideBefore: function($slideElement, oldIndex, newIndex){
                    active_sync('thumb');
                }

            });
            _menu.find('a').click(function()
            {
                var getCls = $(this).attr("class").replace(" on", "");
                var pagerlength = $(".pager > a").length;

                for (i = 0; i < pagerlength ; i++ )
                {
                    var getimgCls = $(".pager > a:eq("+i+")").children().attr("class");

                    if ( jQuery.trim(getCls) == jQuery.trim(getimgCls) )
                    {
                        var dataIndex = $(".pager > a:eq("+i+")").index() ;
                        slider_type2.goToSlide(dataIndex);
                        active_sync('slide');
                        return;
                    }
                }
            });


            //액티브 변화를 감지해서 썸네일 활성화의 싱크를 맞춤 파라메터 v: 'slide'- 슬라이드에 현재위치에 맞춰서 썸네일을 조정,'thumb'- 썸네일의 현재위치에 맞춰서 슬라이드를 조정
            function active_sync(v){
                try {//해당사항 없으면 try catch로 무시
                    //fnAddCls(getCls);
                    var total = slider_type2.getSlideCount();
                    var current = slider_type2.getCurrentSlide();
                    var pager_current = page_slider.getCurrentSlide();
                    var slideview_start = pager_current * thumb_view_Num;
                    var slideview_end = (pager_current+1) * thumb_view_Num;



                    if(slideview_end > total){
                        slideview_end = total;
                        slideview_start = slideview_end - thumb_view_Num;
                    }
                    if(current < slideview_start || current >= slideview_end){
                        var num = Math.floor(current / thumb_view_Num);

                        //console.log(page_slider.getCurrentSlide());
                        if(v == 'slide'){
                            page_slider.goToSlide(num);

                        }else if(v == 'thumb'){
                            slider_type2.goToSlide(slideview_start);
                        }
                    }
                    var getCls = slider_type2.getCurrentSlideElement().find('.slide>*').attr('class');
                    _menu.find('a').removeClass('on');
                    _menu.find('.'+getCls).addClass('on');
                } catch (e) {

                }
            }
        }
        $('body').on('openLp',function(){
            slider_type2.reloadSlider();//레이어팝업 뜨고나서 박스슬라이더 초기화
        });
    });
}

function slide_type3_load(){
    if($('.slide_type3 .list_profile').length>0){
        $('.slide_type3 .list_profile').bxSlider({
            minSlides: 3,
            maxSlides: 4,
            slideWidth: 310,
            slideMargin: 5
        });
    };
}

function slide_type4_load() {
    if($('.slide_type4 > ul').length>0){
        $('.slide_type4 > ul').bxSlider({
          pager: false,
          touchEnabled:false,
          adaptiveHeight:true,
          slideMargin:10
          //slideWidth: 650
        });
    }
}

function slide_type5_load(){
    if($('.slide_type5 > ul').length>0){
        /* best list */
        var slide_type5 = $('.slide_type5 > ul').bxSlider({
            auto: true,
            slideWidth: 220,
            minSlides: 1,
            maxSlides: 3,
            slideMargin: 14,
            pager: false,
            touchEnabled: false
        });
    };
}

function slide_type6_load(){
    if($('.slide_type6 > ul').length>0){
        var slider6 = $('.slide_type6 > ul').bxSlider({
            auto: true,
            minSlides: 1,
            pager: true,
            controls: false,
            touchEnabled: false
        });
    };
}

function slide_type7_load(){
    if($('.slide_type7 > ul').length>0 && $('.slide_type7 > ul li').length>5){
        var slider7 = $('.slide_type7 > ul').bxSlider({
            auto: false,
            minSlides: 5,
            maxSlides: 5,
            slideWidth: 124,
            slideMargin: 16,
            pager: false,
            controls: true,
            infiniteLoop:false,
            hideControlOnEnd:true,
            touchEnabled: false
        });
    };
}

function slide_type8_load(){
    if($('.slide_type8 > ul').length>0 && $('.slide_type8 > ul li').length>7){
        var slider8 = $('.slide_type8 > ul').bxSlider({
            auto: false,
            minSlides: 7,
            maxSlides: 7,
            slideWidth: 90,
            slideMargin: 6,
            pager: false,
            controls: true,
            infiniteLoop:false,
            hideControlOnEnd:true,
            touchEnabled: false
        });
    };
}

function slide_type9_load(){
    if($('.slide_type9 > ul').length>0){
        var slider9 = $('.slide_type9 > ul').bxSlider({
            auto: true,
            pause: 7000,
            pager: true,
            controls: false,
            touchEnabled: false
        });
    };
}

function slide_tab_pmd_load(){
    if($('.slide_tab_pmd').length>0){// 평면도 스크립트
        $('.slide_tab_pmd').each(function(index) {
            var slgroup_arr = new Array();
            var tab = $(this).find('.tab_ui');
            $(this).find('.slider_cont li').each(function(index) {
                slgroup_arr.push($(this).data('slgroup'));
            });

            var slide = $(this).find('.slider_cont');

            var btn_next = $(this).find('.ui');
            var btn_prev = $(this).find('.ui');
			
            var slide_tab_pmd = slide.bxSlider({
                pager:false,
                prevSelector: btn_prev,
                nextSelector: btn_next,
                slideWidth: 728,
					
                onSlideAfter: function($slideElement, oldIndex, newIndex){
                    var tab_active_num = slgroup_arr[newIndex]-1;					
                    tab.find('li').removeClass('on');
                    tab.find('li:eq('+tab_active_num+')').addClass('on');
                }
            });
            $(this).find('.bx-viewport').css('height','600px');
            $(this).find('.bx-viewport li').css('height','600px');
            $(this).find('.slider_cont li').css('width','728px');

            var viewportheight = $(this).find('.bx-viewport').height();

            tab.find('li').on('click', function(event) {
                var tab_act = $.inArray($(this).index()+1, slgroup_arr);
                slide_tab_pmd.goToSlide(tab_act);
            });
        });
    }
    $('.slide_tab_pmd .slider_cont img').each(function() {
        var maxWidth = 600;
        var maxHeight = 600;
        var ratio = 0;
        var width = $(this).width();
        var height = $(this).height();
        if(width > maxWidth){ ratio = maxWidth / width;
            $(this).css("width", maxWidth);
            $(this).css("height", height * ratio);
            height = height * ratio;
        }
        var width = $(this).width();
        var height = $(this).height();
        if(height > maxHeight){ ratio = maxHeight / height;
            $(this).css("height", maxHeight);
            $(this).css("width", width * ratio);
            width = width * ratio;
        }
    });
}

function slide_type2_bun_load(){
    if($('.slide_type2_bun').length>0){
        $('.slide_type2_bun').each(function(index) {
            var slide = $(this).find('.slider_cont');
			var uiEl = $(this).find('.ui');
            var btn_next = $(this).find('.ui');
            var btn_prev = $(this).find('.ui');
            var thumb_view_Num = 5;

            var page_slider;
            var slider_type2 = slide.bxSlider({
                pager: true,
                pagerCustom: $(this).find('.pager'),
                prevSelector: btn_prev,
                nextSelector: btn_next,
                onSlideBefore: function($slideElement, oldIndex, newIndex){
                    $(uiEl).find('.slide_page_index > em.current').html((newIndex + 1));
                    active_sync('slide');
                },
                touchEnabled: false
            });
            $('.slide_type2_bun').on('gotoSlide', function(event) {
                slider_type2.goToSlide(event.num);
            });
            if($(this).find('.pager_wrap .pager').length>0){

                if($(this).hasClass('typeC')){
                   page_slider = $(this).find('.pager_wrap .pager').bxSlider({
                      minSlides: thumb_view_Num,
                      maxSlides: thumb_view_Num,
                      slideWidth: 138,
                      slideHeight: 78,
                      slideMargin: 15,
                      infiniteLoop:false,
                      hideControlOnEnd:true,
                      prevSelector: $(this).find('.pager_ui'),
                      nextSelector: $(this).find('.pager_ui'),
                      onSlideBefore: function($slideElement, oldIndex, newIndex){
                          active_sync('thumb');
                      }
                   });
                }else if($(this).hasClass('typeD')){
                      thumb_view_Num = 8;
                      page_slider = $(this).find('.pager_wrap .pager').bxSlider({
                      minSlides: thumb_view_Num,
                      maxSlides: thumb_view_Num,
                      slideWidth: 90,
                      slideMargin: 5,
                      infiniteLoop:false,
                      hideControlOnEnd:true,
                      prevSelector: $(this).find('.pager_ui'),
                      nextSelector: $(this).find('.pager_ui'),
                      onSlideBefore: function($slideElement, oldIndex, newIndex){
                          active_sync('thumb');
                      }
                   });
                }else{
                    page_slider = $(this).find('.pager_wrap .pager').bxSlider({
                      minSlides: 11,
                      maxSlides: 11,
                      slideWidth: 58,
                      slideMargin: 5,
                      infiniteLoop:false,
                      hideControlOnEnd:true,
                      prevSelector: $(this).find('.pager_ui'),
                      nextSelector: $(this).find('.pager_ui'),
                      onSlideBefore: function($slideElement, oldIndex, newIndex){
                          active_sync('thumb');
                      }
                    });
                }
            }
            $('body').on('slide_reload', function(event) {
                $(window).trigger(slider_type2.reloadSlider(), page_slider.reloadSlider());//레이어 팝업이 뜰때 리사이즈로 위치 잡아줌
            });
            //액티브 변화를 감지해서 썸네일 활성화의 싱크를 맞춤 파라메터 v: 'slide'- 슬라이드에 현재위치에 맞춰서 썸네일을 조정,'thumb'- 썸네일의 현재위치에 맞춰서 슬라이드를 조정
            function active_sync(v){
                try {//해당사항 없으면 try catch로 무시
                    //fnAddCls(getCls);

                    var total = slider_type2.getSlideCount();
                    var current = slider_type2.getCurrentSlide();
                    var pager_current = page_slider.getCurrentSlide();
                    var slideview_start = pager_current * thumb_view_Num;
                    var slideview_end = (pager_current+1) * thumb_view_Num;



                    //console.log(slideview_end,total);
                    //console.log(current);
                    //console.log(slideview_start);
                    //console.log(slideview_end);
                    if(slideview_end > total){
                        slideview_end = total;
                        slideview_start = slideview_end - thumb_view_Num;
                    }
                    if(current < slideview_start || current >= slideview_end){
                        var num = Math.floor(current / thumb_view_Num);

                        //console.log(page_slider.getCurrentSlide());
                        if(v == 'slide'){
                            page_slider.goToSlide(num);
                        }else if(v == 'thumb'){
                            slider_type2.goToSlide(slideview_start);
                        }
                    }
                    var getCls = slider_type2.getCurrentSlideElement().find('.slide>*').attr('class');
                } catch (e) {

                }
            }
            try {
                $('.slide_page_index > em.totalCnt').html(slider_type2.getSlideCount());
            } catch (e) {}
        });
    };
}

function select_load(){
    $('.ajax_select').selectmenu();
}
	

// String 객체에 startsWidth 메서드가 없는 경우에 대한 polyfill
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith#Polyfill
if (!String.prototype.startsWith) {
    String.prototype.startsWith = function (searchString, position) {
        return this.substr(position || 0, searchString.length) === searchString;
    };
}

/******************************************************************************
URL 관련

김동현(2017-11-25)

Usage
-------------------------------------------------------------------------------
// /?_c=myPage&_m=MarketPrice

// 개별 파라미터 값 구하기
$.QueryString._c
//-or-
$.QueryString['_c']
// -> 'myPage'

// 전체 파라미터를 오브젝트로 리턴
$.QueryString
// -> { _c: 'myPage', _m: 'MarketPrice' }

// 파라미터 값 변경
$.QueryString._c = "Research"

// QueryString 변환
$.param($.QueryString)
// -> '_c=myPage&_m=MarketPrice'
// 활용 -> location.href('/?' + $.param($.QueryString));

// 브라우져 히스토리 조작
history.replaceState({}, '', "?" + $.param($.QueryString));
//-or-
history.pushState({}, '', "?" + $.param($.QueryString));
******************************************************************************/
(function($) {
    $.QueryString = (function(paramsArray) {
        var params = {};

        for (var i = 0; i < paramsArray.length; ++i)
        {
            var param = paramsArray[i]
                .split('=', 2);

            if (param.length !== 2)
                continue;

            params[param[0]] = decodeURIComponent(param[1].replace(/\+/g, " "));
        }

        return params;
    })(window.location.search.substr(1).split('&'));

	$.QueryStringGet = (function (key, defaultValue) {
		if ($.QueryString[key] == null) {
			if (defaultValue == null) {
				return undefined;
			}
			else {
				return defaultValue;
			}
		}
		else {
			return $.QueryString[key];
		}
	});

	$.QueryStringSerialize = (function () {

		$.each($.QueryString, function (key, value) {
			if(value == null) {
				delete $.QueryString[key];
			}
        });

		return '?' + $.param($.QueryString);
	});
})(jQuery);

/******************************************************************************
HASH 관련
김동현(2017-11-25)
******************************************************************************/
(function($) {
	$.HashTriggerCount = 0;

    $.Hash = (function(paramsArray) {
        var params = {};

        for (var i = 0; i < paramsArray.length; ++i) {
            var param = paramsArray[i]
                .split('=', 2);

            if (param.length !== 2)
                continue;

                params[param[0]] = decodeURIComponent(param[1].replace(/\+/g, " "));
            }

        return params;
    })(window.location.hash.substr(1).split('&'));

	$.HashUpdate = (function() {
		var hashes = window.location.hash.substr(1).split('&');
		var params = {};

		for (var i = 0; i < hashes.length; ++i) {
			var param = hashes[i].split('=', 2);

			if (param.length != 2) continue;

			$.Hash[param[0]] = decodeURIComponent(param[1].replace(/\+/g, " "));
		}
	});

	$.HashGet = (function(key, defaultValue) {
		if ($.Hash[key] == null) {
			if (defaultValue == null) {
				return undefined;
			}
			else {
				return defaultValue;
			}
		}
		else {
			return $.Hash[key];
		}
	});

	$.HashSerialize = (function() {

		$.each($.Hash, function (key, value) {
			if(value == null) {
				delete $.Hash[key];
			}
        });

		return '#' + $.param($.Hash);
	});
})(jQuery);
