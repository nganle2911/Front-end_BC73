// Khai báo các mảng giá và giá chờ cho các loại xe 
const ARRAY_GIA_UBER_X = [8000, 12000, 10000];
const GIA_CHO_UBER_X = 2000;

const ARRAY_GIA_UBER_SUV = [9000, 14000, 12000];
const GIA_CHO_UBER_SUV = 3000;

const ARRAY_GIA_UBER_BLACK = [10000, 16000, 14000];
const GIA_CHO_UBER_BLACK = 4000;

// Kiểm tra loại xe người dùng chọn
function kiemTraLoaiXe() {
    var uberX = document.getElementById("uberX");
    var uberSUV = document.getElementById("uberSUV");
    var uberBlack = document.getElementById("uberBlack");

    if (uberX.checked) {
        return "uberX";
    } else if (uberSUV.checked) {
        return "uberSUV";
    } else if (uberBlack.checked) {
        return "uberBlack";
    } 
}

// Tính tiền chờ - mỗi phút tính tiền chờ 1 lần 
function tinhTienCho(thoiGianCho, giaCho) {
    var tienCho = 0;
    if (thoiGianCho >= 1) {
        tienCho = Math.round(thoiGianCho / 1.0) * giaCho;
    }
    return tienCho; 
}

// Tính tiền theo km
function tinhTien(soKm, thoiGianCho, arrayPrice, giaCho) {
    var tienCho = tinhTienCho(thoiGianCho, giaCho);
    if (soKm <= 1) {
        return arrayPrice[0] + tienCho;
    } else if (soKm > 1 && soKm <= 20) {
        return arrayPrice[0] + (soKm - 1) * arrayPrice[1] + tienCho;
    } else if (soKm > 20) {
        return arrayPrice[0] + 19 * arrayPrice[1] + (soKm - 20) * arrayPrice[2] + tienCho;
    }
}

// Tính tổng tiền (tiền chờ + tiền theo km)
function tinhTongTien() {
    var soKM = document.getElementById("distance").value;
    var thoiGianCho = document.getElementById("waitingTime").value;

    // Muốn lấy số thực 
    soKM = parseFloat(soKM);
    thoiGianCho = parseFloat(thoiGianCho);

    var tongTien = 0;
    var loaiXe = kiemTraLoaiXe();
    
    switch (loaiXe) {
        case "uberX":
            tongTien = tinhTien(soKM, thoiGianCho, ARRAY_GIA_UBER_X, GIA_CHO_UBER_X);
            break;
        case "uberSUV":
            tongTien = tinhTien(soKM, thoiGianCho, ARRAY_GIA_UBER_SUV, GIA_CHO_UBER_SUV);
            break;
        case "uberBlack":
            tongTien = tinhTien(soKM, thoiGianCho, ARRAY_GIA_UBER_BLACK, GIA_CHO_UBER_BLACK);
            break;
        default:
            alert("Vui lòng chọn loại xe Uber !");
    }
    return tongTien; 
}

// Gắn sự kiện cho nút "Tính tiền"
document.getElementById("btnPayment").onclick = function() {
    var tongTien = tinhTongTien();
    document.getElementById("divThanhTien").style.display = "block";
    document.getElementById("xuatTien").innerHTML = tongTien;
}

// =======================================================
// In hoá đơn
