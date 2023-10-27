'use strict';

const input_ID = document.getElementById('input-id'),
  input_NAME = document.getElementById('input-name'),
  input_TYPE = document.getElementById('input-type'),
  input_BREED = document.getElementById('input-breed'),
  input_VACCINATED = document.getElementById('input-vaccinated'),
  input_DEWORMED = document.getElementById('input-dewormed'),
  input_STERILIZED = document.getElementById('input-sterilized'),
  find_BTN = document.getElementById('find-btn');

const tableBodyEl = document.getElementById('tbody');
const petArr = JSON.parse(getFromStorage('petArr')) ?? [];
const breed_ARR = JSON.parse(getFromStorage('breedArr')) ?? [];

renderTableData(petArr);

// Bắt sự kiện nút Find
find_BTN.addEventListener('click', function () {
  // Tạo mảng trống để thêm các phần tử tìm thấy vào mảng này
  let newArr = [];

  // Tìm theo Id
  if (input_ID.value) {
    // Lọc ra các phàn tử có những kí tự trong Id
    newArr = petArr.filter(arr => arr.id.match(`${input_ID.value}`));
  }

  if (input_NAME.value) {
    // Lọc ra các phàn tử có những kí tự trong Name
    newArr = petArr.filter(arr => arr.name.match(`${input_NAME.value}`));
  }

  if (input_TYPE.value !== 'Select Type') {
    // Lọc ra các phàn tử có Type phù hợp
    newArr = petArr.filter(pet => pet.type === input_TYPE.value);
  }

  if (input_BREED.value !== 'Select Breed') {
    // Lọc ra các phàn tử có Breed phù hợp
    newArr = petArr.filter(pet => pet.breed === input_BREED.value);
  }
  if (input_VACCINATED.checked) {
    // Lọc ra các phàn tử có check
    newArr = petArr.filter(arr => arr.vaccinated === input_VACCINATED.checked);
  }
  if (input_DEWORMED.checked) {
    // Lọc ra các phàn tử có check
    newArr = petArr.filter(arr => arr.dewormed === input_DEWORMED.checked);
  }
  if (input_STERILIZED.checked) {
    // Lọc ra các phàn tử có check
    newArr = petArr.filter(arr => arr.sterilized === input_STERILIZED.checked);
  }

  // In lại mảng đã được lọc
  renderTableData(newArr);
});

// Hàm hiển thị
function renderTableData(arr) {
  tableBodyEl.innerHTML = '';
  for (let i = 0; i < arr.length; i++) {
    const row = document.createElement('tr');
    row.innerHTML = `<th scope = 'row'>${arr[i].id}</th>
    <td>${arr[i].name}</td>
    <td>${arr[i].age}</td>
    <td>${arr[i].type}</td>
    <td>${arr[i].weight}</td>
    <td>${arr[i].length}</td>
    <td>${arr[i].breed}</td>
    <td>
      <i class="bi bi-square-fill" style="color: ${arr[i].color}"></i>
    </td>
    <td>
      <i class="${
        arr[i].vaccinated ? 'bi bi-check-circle-fill' : 'bi bi-x-circle-fill'
      }"></i>
    </td>
    <td>
      <i class="${
        arr[i].dewormed ? 'bi bi-check-circle-fill' : 'bi bi-x-circle-fill'
      }"></i>
    </td>
    <td>
      <i class="${
        arr[i].sterilized ? 'bi bi-check-circle-fill' : 'bi bi-x-circle-fill'
      }"></i>
    </td>
    <td>${arr[i].date}</td>`;
    tableBodyEl.appendChild(row); //Thêm hàng mới vào bảng
  }
}

// Hàm hiển thị toàn bộ các Breed để tìm kiếm
const renderBreed = arr => {
  for (let i = 0; i < arr.length; i++) {
    const newOption = document.createElement('option');
    newOption.innerHTML = `${arr[i].breed}`;
    input_BREED.appendChild(newOption);
  }
};
renderBreed(breed_ARR);
