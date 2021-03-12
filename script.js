function scrapcalc_exec(){
    for(let expr of document.querySelectorAll('.deco-\\=')){
	let text = expr.innerText;
	// 全角カギカッコを配列などで使えるようにする苦しい工夫
	let decoded = decodeURI(text).replaceAll('［','[').replaceAll('］',']')
	if(text.match(/=/)){
            (0,eval)(decoded); // 何故かこれでstrictが有効でなくなる?
	}
	else {
            let span = document.createElement('span');
            span.classList.add("scrapcalc_result");
            span.innerText = (0,eval)(decoded);
            expr.parentNode.appendChild(span)
            expr.classList.add("scrapcalc_exp")
            expr.style.display = 'none';
	}
    }
}
function scrapcalc_reset(){
    for(let expr of document.querySelectorAll('.scrapcalc_result')){
        expr.remove();
    }
    for(let expr of document.querySelectorAll('.scrapcalc_exp')){
	expr.style.display = 'inline';
    }
}
document.addEventListener('keypress', e => {
    if (e.key == 'c' && e.ctrlKey){ // Ctrl-Cで実行
	if(document.querySelectorAll('.scrapcalc_result').length == 0){
            scrapcalc_exec();
	}
	else {
            scrapcalc_reset();
	}
    }
})
