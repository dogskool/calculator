/*
 * Copyright            : (C) 2015 Garvit Khatri (garvitdelhi@gmail.com)
 */
(function() {
	// body...
	$('#input').keyup(function(e) {
		e.preventDefault();
		var key = e.keycode || e.which;
		if(key != 13) return;
		var input = $('#input').val();
		var result = [];
		var temp = "";
		var stack =[];
		var precedence = {
			'/':4, 
			'*':3, 
			'+':2, 
			'-':1
		};
		for(var i = 0; i < input.length; ++i) {
			if(precedence[input[i]] == undefined) {
				temp = temp + input[i];
			} else {
				result.push(temp);
				temp = "";
				while(stack.length != 0 && precedence[stack[stack.length-1]] > precedence[input[i]]) {
					result.push(stack.pop());
				}
				stack.push(input[i]);
			}
		}
		if(temp != "") result.push(temp);
		while(stack.length > 0) {
			result.push(stack.pop());
		}
		for(var i = 0; i < result.length; ++i) {
			if(precedence[result[i]] == undefined) {
				stack.push(result[i]);
			} else {
				var operand1 = stack.pop();
				var operand2 = stack.pop();
				if(isNaN(operand1) && operand1.indexof('.') != -1) {
					operand1 = parseFloat(operand1);
				} else if(isNaN(operand1)) {
					operand1 = parseInt(operand1);
				}
				if(isNaN(operand2) && operand2.indexof('.') != -1) {
					operand2 = parseFloat(operand2);
				} else if(isNaN(operand1)) {
					operand2 = parseInt(operand2);
				}
				if(result[i] == '/') {
					stack.push(operand2/operand1);
				} else if(result[i] == '*') {
					stack.push(operand2*operand1);
				} else if(result[i] == '+') {
					stack.push(operand2+operand1);
				} else if(result[i] == '-') {
					stack.push(operand2-operand1);
				}
			}
		}
		$('#ans').text(stack.pop());
	})
}).call(this);