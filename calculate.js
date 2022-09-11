points_inputs_ids = ["fine_points_cnt", "cake_layers_cnt", "correct_cakes_cnt", "cakes_with_cherry", "cherries_in_basket_cnt"];
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

    return final_points_cnt;
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
    return 0;
}

//Events bindings
document.getElementById("fines_select_form").onchange = function(){
    document.getElementById("fine_points_cnt_preview").textContent = calculate_fines();
}
document.getElementById("fineSelectModal").addEventListener('hide.bs.modal', function () {
    apply_fines();
})
  