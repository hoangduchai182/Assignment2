'use strict';
const input_Breed = document.getElementById('input-breed');
const input_TYPE = document.getElementById('input-type');
const submit_BTN = document.getElementById('submit-btn');

// Bổ sung slideBar
const nav_Bar = document.getElementById('sidebar');
nav_Bar.addEventListener('click', function () {
  nav_Bar.classList.toggle('active');
});

// Lấy dữ liệu mảng Breed trên storage
const breed_ARR = JSON.parse(getFromStorage('breedArr')) ?? [];
const tableBodyEl = document.getElementById('tbody');

// Hàm hiển thị dữ liệu
const renderBreedTable = arr => {
  tableBodyEl.innerHTML = '';
  // Hiển thị dữ liệu
  for (let i = 0; i < arr.length; i++) {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${i}</td>
    <td>${arr[i].breed}</td>
    <td>${arr[i].type}</td>
    <td><button class="btn btn-danger" onclick="deleteBreed('${i}')" >Delete</button></td>`;
    tableBodyEl.appendChild(row);
  }
};

// Bắt sự kiện nút submid
submit_BTN.addEventListener('click', function () {
  // Tạo đối tượng cho từng phần tử
  const data = {
    breed: input_Breed.value,
    type: input_TYPE.value,
  };

  // Check điểu kiện
  if (validateData(data)) {
    breed_ARR.push(data);
    clearInput();

    saveToStorage('breedArr', JSON.stringify(breed_ARR));

    renderBreedTable(breed_ARR);
  }
});

// Clear Input
const clearInput = () => {
  input_Breed.value = '';
  input_TYPE.value = 'Select Type';
};

// Hàm điều kiện gồm 2 điều kiện như yêu cầu
const validateData = data => {
  if (data.breed == '') {
    alert('Please Fill in Breed !');
    return false;
  } else if (data.type == 'Select Type') {
    alert('Please select Type !');
    return false;
  } else {
    return true;
  }
};

// Hàm xóa 1 breed, tương tự như xóa 1 thú cưng
function deleteBreed(id) {
  if (confirm('Are you sure ?')) {
    for (let i = 0; i < breed_ARR.length; i++) {
      // Xét từng thú cưng để tìm thú cưng có id giống với id của thú cưng muốn xóa
      if (id == i) {
        //Xóa 1 thú cưng ở vị trí có id trùng trong mảng
        breed_ARR.splice(i, 1);
      }
    }

    saveToStorage('breedArr', JSON.stringify(breed_ARR));

    //In lại bảng
    renderBreedTable(breed_ARR);
  }
}
