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
		console.log(result);
		for(var i = 0; i < result.length; ++i) {
			if(precedence[result[i]] == undefined) {
				stack.push(result[i]);
			} else {
				var operand1 = stack.pop();
				var operand2 = stack.pop();
				if(typeof(operand1) == "string" && operand1.indexOf('.') != -1) {
					operand1 = parseFloat(operand1);
				} else if(typeof(operand1) == "string") {
					operand1 = parseInt(operand1);
				}
				if(typeof(operand2) == "string" && operand2.indexOf('.') != -1) {
					operand2 = parseFloat(operand2);
				} else if(typeof(operand2) == "string") {
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
		// Not working for case 5+8/4+5*2-8/3+2 try solving it @Ekta!!
		$('#ans').text(stack.pop());
	})
}).call(this);