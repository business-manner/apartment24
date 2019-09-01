/* 지도 map 노출 */
var _agentCode
function fnMapLayerPop(that, screenGbn, mapX, mapY, agentCode)
{
	var _mapX = mapX;
	var _mapY = mapY;

	if (_mapY != "" && parseInt(_mapY) > 120)
	{
		mapX = _mapY;
		mapY = _mapX;
	}

	//_GIS_show_map('lp_map', mapX,  mapY);

	if (screenGbn == "layer")
	{
		if ( (!isEmpty(mapX) && parseInt(mapX) > 0) && (!isEmpty(mapY)  && parseInt(mapY) > 0) )
		{
			if ($(that).parent().parent().parent().parent().find('div.cont'))
			{
				if ($(that).parent().parent().parent().parent().find('div.sub_map_wrap').length > 0)
				{
					$(that).parent().parent().parent().parent().find('.sub_map_wrap').remove();
				}
				else
				{
					$(that).parent().parent().parent().parent().append("<div class=\"sub_map_wrap forSaleAgentMapWrap\" > <div class=\"map\" id=\"lp_map"+agentCode+"\" style=\"height:300px\"></div><a href=\"javascript:;\" class=\"btn_close r cmdCloseMap\" style=\"z-index:9\">맵 닫기</a></div>");

					_agentCode = agentCode;

					setTimeout(function () {
						_GIS_show_map('lp_map'+agentCode+'', mapX,  mapY);
					}, 100);

					$(that).parent().parent().parent().parent().find(".cmdCloseMap").click(function()
					{
						$(that).parent().parent().parent().parent().find('.sub_map_wrap').remove();
					});
				}

			}

		}
	}
	else
	{
		var url = "/?_c=Common&_m=Map&agentCode="+agentCode+"&googleX="+mapX+"&googleY="+mapY;
		fnWinUrl(url, "open", "mapPop", "660","497","no");

	}
}


function fnMapOpen(agentCode, googleX, googleY)
{
	var url = "/?_c=Common&_m=Map&agentCode="+agentCode+"&googleX="+googleX+"&googleY="+googleY;

	fnWinUrl(url, "open", "mapPop", "660","497","no");
}

function fnMapOpenMemul(googleX, googleY)
{
	var url = "/?_c=Common&_m=Map&_a=MapDetailDaum&googleX="+googleX+"&googleY="+googleY;

	fnWinUrl(url, "open", "mapPop", "660","497","no");
}


function fnMapOpenComplex(addr1, addr2, addr3, googleX, googleY)
{
	var url = "/?_c=Common&_m=Map&addr1="+addr1+"&addr2="+addr2+"&addr3="+addr3+"&googleX="+googleX+"&googleY="+googleY;

	fnWinUrl(url, "open", "mapPop", "660","497","no");
	/* 김종균 선임의 강압에 못 이겨 김동현 수정(2018-01-04) */
	//fnWinUrl(url, "open", "mapPop", "728","550","no");
}
