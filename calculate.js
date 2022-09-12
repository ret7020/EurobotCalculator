points_inputs_ids = ["cake_layers_cnt", "correct_cakes_cnt", "cakes_with_cherry", "cherries_in_basket_cnt"];
checkboxes_ids = ["basketPlaced", "backetCounterWorks", "robotsReturn", "finalActionDone"];

function calculate_points(){
    let final_points_cnt = 0;
    // Number inputs
    points_inputs_ids.forEach(element => {
        let inp = document.getElementById(element);
        final_points_cnt += inp.value * inp.dataset.pointsCoeff;
    });
    // Checkboxes
    checkboxes_ids.forEach(element => {
        let inp = document.getElementById(element);
        final_points_cnt += inp.checked * inp.dataset.points;
    });
    let without_bonus = final_points_cnt;
    
    // Bonus
    let bonus = 0;
    if (document.getElementById("predicted_points").value != 0){
        bonus = 20 - Math.abs(final_points_cnt - document.getElementById("predicted_points").value);
        if (bonus < 0){
            bonus = 0;
        }
    }
    //console.log(bonus);
    final_points_cnt += bonus + 1;
    final_points_cnt -= parseInt(document.getElementById("fine_points_cnt").value);
    if (final_points_cnt < 0){
        final_points_cnt = 0;
    }
    without_bonus -= parseInt(document.getElementById("fine_points_cnt").value);
    if (without_bonus < 0){
        without_bonus = 0;
    }
    
   

    // Fines
    //console.log(parseInt(document.getElementById("fine_points_cnt").value));
    

    return [final_points_cnt, without_bonus, bonus];
}

function calculate_fines(){
    let final_fine_cnt = 0;
    for (let i = 0; i <= 5; i++) {
        let checkbox = document.getElementById(`fine_${i}`);
        final_fine_cnt += checkbox.checked * checkbox.dataset.fineSize;
      }
    return final_fine_cnt;
}

function apply_fines(){
    document.getElementById("fine_points_cnt").value = document.getElementById("fine_points_cnt_preview").textContent;
}

function visualize_points(){
    const [final_points_cnt, without_bonus, bonus] = calculate_points();
    var myModal = new bootstrap.Modal(document.getElementById('pointsCalculated'), {});
    document.getElementById("points_without_bonus").innerText = without_bonus;
    document.getElementById("points_with_bonus").innerText = bonus;
    document.getElementById("points_final").innerText = final_points_cnt;
    myModal.show();

}

//Events bindings
document.getElementById("fines_select_form").onchange = function(){
    document.getElementById("fine_points_cnt_preview").textContent = calculate_fines();
}
document.getElementById("fineSelectModal").addEventListener('hide.bs.modal', function () {
    apply_fines();
})

