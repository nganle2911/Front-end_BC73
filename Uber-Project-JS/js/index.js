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

// Gắn sự kiện 
document.getElementById("btnPayment").onclick = function() {
    var tongTien = tinhTongTien();
    document.getElementById("divThanhTien").style.display = "block";
    document.getElementById("xuatTien").innerHTML = tongTien;
}

// =======================================================
// In hoá đơn
function renderRowChiTietKm(loaiXe, arrayKm, arrayPrice, tblBody) {
    for (var i = 0; i < arrayKm.length; i++) {
        var tr = document.createElement("tr");

        var tdLoaiXe = document.createElement("td");
        var tdSuDung = document.createElement("td");
        var tdDonGia = document.createElement("td");
        var tdThanhTien = document.createElement("td");

        tdLoaiXe.innerHTML = loaiXe;
        tdSuDung.innerHTML = arrayKm[i] + " km";
        tdDonGia.innerHTML = arrayPrice[i];
        tdThanhTien.innerHTML = arrayPrice[i] * arrayKm[i]; 

        tr.appendChild(tdLoaiXe);
        tr.appendChild(tdSuDung);
        tr.appendChild(tdDonGia);
        tr.appendChild(tdThanhTien);

        tblBody.appendChild(tr);
    }
}

function renderRowThoiGianCho(thoiGianCho, giaCho, tblBody) {
    var tienCho = tinhTienCho(thoiGianCho, giaCho);
    var trThoiGianCho = document.createElement("tr");

    var tdPhutTitle = document.createElement("td");
    var tdPhut = document.createElement("td");
    var tdDonGia = document.createElement("td");
    var tdThanhTien = document.createElement("td");

    tdPhutTitle.innerHTML = " Thời gian chờ";
    tdPhutTitle.innerHTML = thoiGianCho + " minute(s)";
    tdDonGia.innerHTML = giaCho;
    tdThanhTien.innerHTML = tienCho;

    trThoiGianCho.appendChild(tdPhutTitle);
    trThoiGianCho.appendChild(tdPhut);
    trThoiGianCho.appendChild(tdDonGia);
    trThoiGianCho.appendChild(tdThanhTien); 

    tblBody.appendChild(trThoiGianCho);
}

function renderRowTongCong(tongTien, tblBody) {
    var trTotal = document.createElement("tr");
    trTotal.className = "alert alert-success";

    var tdTotalTitle = document.createElement("td");
    tdTotalTitle.setAttribute("colspan", 3);
    var tdTotal = document.createElement("td");

    tdTotalTitle.innerHTML = " Total";
    tdTotal.innerHTML = tongTien; 
    
    trTotal.appendChild(tdTotalTitle);
    trTotal.appendChild(tdTotal);
    
    tblBody.appendChild(trTotal);
}

function inHoaDon(loaiXe, soKm, thoiGianCho, giaCho, arrayPrice, tongTien) {
    var tblBody = document.getElementById("tblBody");
    tblBody.innerHTML = ""; //Reset lai tblBody 

    if (soKm <= 1) {
        renderRowChiTietKm(loaiXe, [1], arrayPrice, tblBody);
    } 
    else if (soKm > 1 && soKm <= 20) {
        renderRowChiTietKm(loaiXe, [1, soKm-1], arrayPrice, tblBody);
    } 
    else if (soKm > 20) {
        renderRowChiTietKm(loaiXe, [1, 19, soKm-20], arrayPrice, tblBody);
    }

    /* Print Waiting Time */
    if (thoiGianCho > 2) {
        renderRowThoiGianCho(thoiGianCho, giaCho, tblBody);
    }

    /* Print ToTal Amount */
    renderRowTongCong(tongTien, tblBody);
}

document.getElementById("btnInvoice").onclick = function() {
    /* var soKm = document.getElementById("numKM").value;
    var thoiGianCho = document.getElementById("waitTime").value; */

    var result = getData();
    var tongTien = tinhTongTien();
    var loaiXe = kiemTraLoaiXe();
    switch (loaiXe) {
        case "uberX":
            inHoaDon(loaiXe, result[0], result[1], GIA_CHO_UBER_X, ARRAY_GIA_UBER_X, tongTien); 
            break;
        case "uberSUV":
            inHoaDon(loaiXe, result[0], result[1], GIA_CHO_UBER_SUV, ARRAY_GIA_UBER_SUV, tongTien);
            break;
        case "uberBlack":
            inHoaDon(loaiXe, result[0], result[1], GIA_CHO_UBER_BLACK, ARRAY_GIA_UBER_BLACK, tongTien);
            break;
        default:
            alert("Vui lòng chọn loại xe Uber !");
    }

}

function getData() {
    var kqua = [];
    var soKm = document.getElementById("distance").value;
    soKm = parseFloat(soKm);
    kqua.push(soKm);

    var thoiGianCho = document.getElementById("waitingTime").value; 
    thoiGianCho = parseFloat(thoiGianCho);
    kqua.push(thoiGianCho);

    return kqua;
}