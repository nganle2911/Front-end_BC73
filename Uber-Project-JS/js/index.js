/**
 * TODO: Yêu cầu 1: 
 * * Nếu chưa nhập thông tin, click "tính tiền", alert được hiển thị 
 */

var distance = document.getElementById('distance');
var time = document.getElementById('time'); 
var btnPayment = document.getElementById('btnPayment');

btnPayment.onclick = function() {
    if (distance.value === "" || time.value === "") {
        alert('Vui lòng nhập thông tin'); 
    }
}