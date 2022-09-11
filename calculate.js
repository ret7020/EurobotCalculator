function calc(){
        //Clear res every function call 
        let res = 0;
        let final_str = "";
        
        res += parseInt(document.getElementById("artifact_in").value) * 5;
        final_str += "5 * " + document.getElementById("artifact_in").value + " ";
        if (document.getElementById("statue_0").checked){
            res += 2;
            final_str += "+ 2 ";
        }

        if (document.getElementById("statue_1").checked){
            res += 5;
            final_str += "+ 5 ";
        }

        if (document.getElementById("statue_2").checked){
            res += 10;
            final_str += "+ 10 ";
        }

        if (document.getElementById("statue_3").checked){
            res += 15;
            final_str += "+ 15 ";
        }

        if (document.getElementById("vitrin_0").checked){
            res += 2;
            final_str += "+ 2 ";
        }

        if (document.getElementById("vitrin_1").checked){
            res += 5;
            final_str += "+ 5 ";
        }

        if (document.getElementById("finish").checked){
            res += 20;
            final_str += "+ 20 ";
        }

        if (document.getElementById("artifact_cross").checked)
        {
            if (document.getElementById("artifact_opened").value != ""){
                res += parseInt(document.getElementById("artifact_opened").value) * 5;
                final_str += "+ 5 * " + document.getElementById("artifact_opened").value + " "
            }
        }

        if (document.getElementById("obraz_raspr").value != ""){
            res += parseInt(document.getElementById("obraz_raspr").value);
            final_str += "+ " + document.getElementById("obraz_raspr").value + " "
        }

        if (document.getElementById("obraz_in_lag").value != ""){
            res += parseInt(document.getElementById("obraz_in_lag").value);
            final_str += "+ " + document.getElementById("obraz_in_lag").value + " "
        }

        if (document.getElementById("obraz_in_lag_sorted").value != ""){
            res += parseInt(document.getElementById("obraz_in_lag_sorted").value);
            final_str += "+ " + document.getElementById("obraz_in_lag_sorted").value + " "
        }

        if (document.getElementById("obraz_in_gal").value != ""){
            res += parseInt(document.getElementById("obraz_in_gal").value) * 3;
            final_str += "+ 3 * " + document.getElementById("obraz_in_gal").value + " "
        }

        if (document.getElementById("obraz_in_gal_sorted").value != ""){
            res += parseInt(document.getElementById("obraz_in_gal_sorted").value) * 3;
            final_str += "+ 3 * " + document.getElementById("obraz_in_gal_sorted").value + " "
        }



        

        
        
        
        console.log(res);
        let bonus = 0;
        if (document.getElementById("predicted").value != ""){
            let delta = Math.abs(parseInt(document.getElementById("predicted").value)  - res);
            console.log(delta);
            bonus = Math.round(0.3 * res - delta);
            if (bonus < 0){
                bonus = 0;
            }
            res += bonus
            res += 1;
            console.log(res);
            final_str += "+ " + bonus + " + 1";
        }else{
            res += 1;
            final_str += "+ " + bonus + " + 1";
        }

        if (parseInt(document.getElementById("fine").value) != 0 && document.getElementById("fine").value != ""){
            //Do fine calc after bonus calculating
            res -= parseInt(document.getElementById("fine").value);
            final_str += " - " + document.getElementById("fine").value;
        }

        
        
        


        document.getElementsByTagName("result")[0].style.display = "block";
        document.getElementsByTagName("result")[0].innerHTML = "Результат: <b style='color: #00dd8a'>" + res + " </b>баллов<br>Без бонуса(и 1 балла): <b style='color: #c1dd00'>" + (res - bonus - 1) + "</b> баллов<br>Бонус: <b style='color: #00bedd'>" + bonus + "</b> балла<br>" + final_str;
    }