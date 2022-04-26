let td = document.getElementsByTagName("td");
let calc_display = document.getElementById("calc_display");
let value = "";

function clear() {
    calc_display.value = null;
}

let result_delete_function;
function delete_rest_symbols(expression) {
    result_delete_function = expression.slice(0, -1);

    if (isNaN(expression.slice(-1))) {
        delete_rest_symbols(expression);
    }

    return result_delete_function;
}



for (let i = 0; i< td.length; i++) {
    td[i].addEventListener("click", function(e) {

        if (!isNaN(e.target.textContent) || e.target.textContent == ".") {
            value += e.target.textContent;
            calc_display.value = value;
        }
        else if (e.target.textContent == "=") {
            if (value == "" || value == undefined ) calc_display.value = 0;
            //  лишние знаки в конце выражения будут удалены
            else if (isNaN(value.slice(-1))) value = eval(delete_rest_symbols(value));
            else value = eval(value);
            calc_display.value = value;
            value = "";
        }
        else if (e.target.textContent == "÷") {
            // выражение не должно начинаться с знака деления
            if (calc_display.value == "") {
                calc_display.value = e.target.textContent;
                return;
            }
            else if (isNaN(value.slice(-1))) value = eval(delete_rest_symbols(value)) + "/";
            else value = calc_display.value + "/";
            calc_display.value = value;
        }
        else if (e.target.textContent == "×") {
            if (calc_display.value == "") {
                calc_display.value = e.target.textContent;
                return;
            }
            else if (isNaN(value.slice(-1))) value = eval(delete_rest_symbols(value)) + "*";
            else value = calc_display.value + "*";
            calc_display.value = value;
        }
        else if (e.target.textContent == "−") {
            // учтено, что выражение может начинаться с минуса
            if (isNaN(value.slice(-1))) value = eval(delete_rest_symbols(value)) + "-";
            else value = calc_display.value + "-";
            calc_display.value = value;
        }
        else if (e.target.textContent == "+") {
            if (calc_display.value == "") {
                calc_display.value = e.target.textContent;
                return;
            }
            else if (isNaN(value.slice(-1))) value = eval(delete_rest_symbols(value)) + "+";
            else value = calc_display.value + "+";
            calc_display.value = value;
        }
        else if (e.target.textContent == "Del") {
            value = value.slice(0, -1);
            calc_display.value = value;
        }
        else if (e.target.textContent == "Clear") {
            value = null;
            clear();
        }


    })
}
