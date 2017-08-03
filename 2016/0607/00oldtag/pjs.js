var adpds_usval, adpds_freq, adpds_post;
var adpds_value_limit=1700;
function adpds_js(_adpds_domain, _adpds_arg) {

        var _adpds_src = _adpds_domain + "/p/js?" + _adpds_arg;
        try{_adpds_src += "&adpds_ref=" + escape(top.document.referrer);}catch(e){}
        if(adpds_post != undefined) _adpds_src += "&adpds_post=" + _adpds_value_limit(escape(adpds_post), escape("|"));
        if(adpds_usval != undefined) _adpds_src += "&adpds_usval=" + _adpds_value_limit(escape(adpds_usval), escape("&"));
        if(adpds_freq != undefined) _adpds_src += "&adpds_freq=" + _adpds_value_limit(escape(adpds_freq), escape("|"));
		_adpds_src += "&adpds_flash=" + _adpdsGetFlashVersion();
        _adpds_src += "&adpds_nocache=" + (new Date).getTime() + Math.floor(Math.random()*100000000);

        _adpds_src = "<scr" + "ipt language='javascript' src='" + _adpds_src + "'></scr" + "ipt>";

        document.write(_adpds_src);
}
function _adpds_value_limit(val, sep) {
        if (val.length > adpds_value_limit) {
                var new_val = '';
                var val_arr = val.split(sep);
                for (var i=0; i<val_arr.length; i++) {
                        if (i > 0) val_arr[i] = sep + val_arr[i];
                        if (new_val.length + val_arr[i].length > adpds_value_limit) break;
                        new_val += val_arr[i];
                }
                val = new_val;
        }
        adpds_value_limit -= val.length;
        return val;
}
var _adpdsGetFlashVersion = function() {
	var _mac=(navigator.userAgent.indexOf("Mac")!=-1);
	if (document.all) {
		if(_mac) {
			if(window["sample"]) return ((window["sample"].FlashVersion() & 0xffff0000) >> 16);
		} else {
			try {
				var _axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
				return Math.floor(_axo.FlashVersion() / 0x10000);
			} catch(e) {
			}
		}
	} else {
		if(navigator.plugins && navigator.plugins["Shockwave Flash"]) {
			var info = navigator.plugins["Shockwave Flash"].description.split(" ");
			var _v = parseInt(info[2]);
			if(!isNaN(_v)) return _v;
		}
	}
	return 0;
}