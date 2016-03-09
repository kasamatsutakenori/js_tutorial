$(function(){
    $('.js-calculator').each(function(){
		var total = 0;
		var $displayNum = $('.js-calculator_display_num');
		var $numTrigger = $('.js-calculator_num_btn').find('a');
		var numFlag=false;
		//イコールが押されたかのフラグ
		var equalFlag = false;
		$numTrigger.on('click',function(){
			// placeholderとしているものを削除
			$displayNum.find('.placeholder').hide();
			if(!opFlag){
				if(!equalFlag){
					// 押下した数字を保持
					var num = $(this).find('span').html();
					// 画面に選択した数値を入力
					$displayNum.html($displayNum.html()+num);
					if($(this).hasClass('dot')){
						$('.js-calculator_num_btn').find('a.dot').html('').css('pointer-events','none').css('opacity','0.4');
					}
				} else {
					$displayOp.html('');
					$displayNum.html(num);
					equalFlag=false;
				}
			} else {
				if(!numFlag){
					$displayNum.html(num);
					numFlag=true;
				}else{
					$displayNum.html($displayNum.html()+num);
				}
			}
		});
		var $displayOp = $('.js-calculator_display_op');
		var $opTrigger = $('.js-calculator_operation_btn').find('a');
		//＋-*/=
		var opTypeFlag;
		//＋-*/=が何回押されたか
		var opFlag = 0;
		$opTrigger.on('click',function(){
			var op = $(this).find('span').html();
			$displayOp.html(op);
			if($(this).hasClass('acClear')){
				total = 0;
				opFlag = 0;
				opTypeFlag='';
				//文字を全削除
				$displayNum.html('');
				$('.js-calculator_num_btn').find('a.dot').html('<span>.</span>').css('pointer-events','auto').css('opacity','1');
				//0.5秒後にオプションを削除
				setTimeout(function(){
					$displayOp.html('');
				}, 500);
				return false;
			} else if($(this).hasClass('clear')) {
				//中身の最後尾を取得
				var displayNumTxt = $displayNum.text().slice(0,-1);
				//$displayNumの最後尾の文字を削除
				var delNum = $displayNum.text(displayNumTxt);
				if(!$displayNum.html().match('.')){
					$('.js-calculator_num_btn').find('a.dot').html('<span>.</span>').css('pointer-events','auto').css('opacity','1');
				}
				//0.5秒後にオプションを削除
				setTimeout(function(){
					$displayOp.html('');
				}, 500);
			} else if($(this).hasClass('equal')) {
				if(opTypeFlag) {
					var num = $displayNum.html();
					if(opTypeFlag === 'plus') {
						total = Number(total) + Number(num);
					}
                    console.log(total);
					$displayNum.html(total);
					opFlag = 0;
					opTypeFlag='';
				}
				equalFlag=true;
			}
		});
	});
});
