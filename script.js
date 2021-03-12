function scrapcalc_commands(){
    const commands = [];
    let count = 0;
    for(let expr of document.querySelectorAll('.scrapcalc_result')){
	expr.remove();
    }
    for(let expr of document.querySelectorAll('.deco-\\=')){
	let text = expr.innerText;
	// 全角カギカッコを配列などで使えるようにする
	let decoded = decodeURI(text).replaceAll('［','[').replaceAll('］',']')
	if(text.match(/=/)){
            commands.push(decoded + ';');
	}
	else {
            let id = `scrapcalc_element_id_${count}`;
            var span = document.createElement('span');
            span.id = id;
            span.classList.add("scrapcalc_result");
            expr.parentNode.appendChild(span)
            expr.classList.add("scrapcalc_exp")
            expr.style.display = 'none';
            commands.push(`document.getElementById("${id}").innerText = ${decoded};`);
            count += 1;
	}
    }
    return commands.join("\n");
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
    if (e.key == 'c' && e.ctrlKey){
	if(document.querySelectorAll('.scrapcalc_result').length == 0){
            const scrapcalc_func = Function(`(() => {${scrapcalc_commands()}})();`);
            scrapcalc_func();
	}
	else {
            scrapcalc_reset();
	}
    }
})
// 何かクリックしたら元に戻す場合
// document.addEventListener('click', e => {
//   scrapcalc_reset();
//})
