function scrapcalc_exec(){
    for(let e of document.querySelectorAll('.deco-\\=')){
	let text = e.innerText;
	// 全角カギカッコを配列などで使えるようにする苦しい工夫
	let expr = decodeURI(text).replaceAll('［','[').replaceAll('］',']')
	if(text.match(/=/)){
            (0,eval)(expr); // 何故かこれでstrictが有効でなくなる?
	}
	else {
            let span = document.createElement('span');
            span.classList.add("scrapcalc_result");
            span.innerText = (0,eval)(expr);
            e.parentNode.appendChild(span)
            e.classList.add("scrapcalc_exp")
            e.style.display = 'none';
	}
    }
}
function scrapcalc_reset(){
    for(let e of document.querySelectorAll('.scrapcalc_result')){
        e.remove();
    }
    for(let e of document.querySelectorAll('.scrapcalc_exp')){
	e.style.display = 'inline';
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
