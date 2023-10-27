'use strict';

//Khai báo các biến
const submit_BTN = document.getElementById('submit-btn'),
  healthy_BTN = document.getElementById('healthy-btn'),
  bmi_BTN = document.getElementById('bmi-btn'),
  input_ID = document.getElementById('input-id'),
  input_NAME = document.getElementById('input-name'),
  input_AGE = document.getElementById('input-age'),
  input_TYPE = document.getElementById('input-type'),
  input_Weight = document.getElementById('input-weight'),
  input_Length = document.getElementById('input-length'),
  input_Color = document.getElementById('input-color-1'),
  input_BREED = document.getElementById('input-breed'),
  input_VACCINATED = document.getElementById('input-vaccinated'),
  input_DEWORMED = document.getElementById('input-dewormed'),
  input_STERILIZED = document.getElementById('input-sterilized'),
  date = new Date();

//Khai báo mảng và khai báo một bảng để hiển thị dữ liệu
const petArr = JSON.parse(getFromStorage('petArr')) ?? [];

const tableBodyEl = document.getElementById('tbody');

//Bắt sự kiện vào nút submit
submit_BTN.addEventListener('click', function () {
  //Tạo một đối tượng chứa các thông tin nhập vào
  const data = {
    id: input_ID.value,
    name: input_NAME.value,
    age: parseInt(input_AGE.value),
    type: input_TYPE.value,
    weight: parseInt(input_Weight.value),
    length: parseInt(input_Length.value),
    color: input_Color.value,
    breed: input_BREED.value,
    vaccinated: input_VACCINATED.checked,
    dewormed: input_DEWORMED.checked,
    sterilized: input_STERILIZED.checked,
    bmi: '?',
    date: `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`,
  };

  //Xét điều kiện nhập dữ liệu
  const validate = validateData(petArr, data);
  if (validate) {
    petArr.push(data); //nếu điều kiện đúng, thêm dữ liệu vào mảng
    clearInput(); // Xóa dữ liệu trên các ô input

    saveToStorage('petArr', JSON.stringify(petArr));

    renderTableData(petArr); // Hiển thị dữ liệu
  }
});

//Hàm xóa các dữ liệu trên ô input
const clearInput = () => {
  input_ID.value = '';
  input_AGE.value = '';
  input_Weight.value = '';
  input_Length.value = '';
  input_NAME.value = '';
  input_TYPE.value = 'Select Type';
  input_Color.value = '#000000';
  input_BREED.value = 'Select Breed';
  input_VACCINATED.checked = false;
  input_DEWORMED.checked = false;
  input_STERILIZED.checked = false;
};

//Hàm xét điều kiện các dữ liệu nhập vào
function validateData(Arr, data) {
  //Xét điều kiện của các id sao cho không trùng nhau
  for (let i = 0; i < Arr.length; i++) {
    if (data.id === Arr[i].id) {
      alert('ID must be unique!');
      return false;
    }
  }
  if (data.id == '') {
    alert('Please fill on Id !');
    return false;
  } else if (data.name == '') {
    alert('Please fill on Name !');
    return false;
  } else if (data.age < 1 || data.age > 15) {
    //Xét điều kiện tuổi
    alert('Age must be between 1 and 15!');
    return false;
  } else if (data.weight < 1 || data.weight > 15) {
    //Xét điều kiện cân nặng
    alert('Weight must be between 1 and 15!');
    return false;
  } else if (data.length < 1 || data.length > 100) {
    //Xét điều kiện chiều cao
    alert('Length must be between 1 and 100!');
    return false;
  } else if (data.type == 'Select Type') {
    //Xét điều kiện kiểu
    alert('Please select Type!');
    return false;
  } else if (data.breed == 'Select Breed') {
    //Xét điều kiện giống loài
    alert('Please select Breed!');
    return false;
  } else {
    return true;
  }
}

//Hàm hiển thị dữ liệu
function renderTableData(petArr) {
  //Xóa hết dữ liệu
  tableBodyEl.innerHTML = '';
  //Dùng hàm for để in lại toàn bộ dựa theo dữ liệu trong mảng
  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement('tr');
    row.innerHTML = `<th scope = 'row'>${petArr[i].id}</th>
    <td>${petArr[i].name}</td>
    <td>${petArr[i].age}</td>
    <td>${petArr[i].type}</td>
    <td>${petArr[i].weight}</td>
    <td>${petArr[i].length}</td>
    <td>${petArr[i].breed}</td>
    <td>
      <i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
    </td>
    <td>
      <i class="${
        petArr[i].vaccinated ? 'bi bi-check-circle-fill' : 'bi bi-x-circle-fill'
      }"></i>
    </td>
    <td>
      <i class="${
        petArr[i].dewormed ? 'bi bi-check-circle-fill' : 'bi bi-x-circle-fill'
      }"></i>
    </td>
    <td>
      <i class="${
        petArr[i].sterilized ? 'bi bi-check-circle-fill' : 'bi bi-x-circle-fill'
      }"></i>
    </td>
    <td>${petArr[i].date}</td>
    <td>
      <button class="btn btn-danger" onclick="deletePet('${
        petArr[i].id
      }')" >Delete</button>
    </td>`;
    tableBodyEl.appendChild(row); //Thêm hàng mới vào bảng
  }
}

//Hàm xóa một thú cưng
function deletePet(petId) {
  if (confirm('Are you sure ?')) {
    for (let i = 0; i < petArr.length; i++) {
      // Xét từng thú cưng để tìm thú cưng có id giống với id của thú cưng muốn xóa
      if (petId === petArr[i].id) {
        //Xóa 1 thú cưng ở vị trí có id trùng trong mảng
        petArr.splice(i, 1);
      }
    }

    saveToStorage('petArr', JSON.stringify(petArr));

    //In lại bảng
    renderTableData(petArr);
  }
}

//Tạo biến check
let healthyCheck = false;

//Bắt sự kiện nút Show Healthy Pet
healthy_BTN.addEventListener('click', function () {
  if (healthyCheck) {
    //Nếu như biến check là True thì tạo một mảng con bên trong, mảng này sẽ có nhiệm vụ chứa dữ liệu những thú cưng đã đạt chỉ tiêu của mảng petArr
    let healthyPetArr = [];

    // Dùng hàm for để xét từng thú cưng
    for (let i = 0; i < petArr.length; i++) {
      //Xét 3 điều kiện tìm thú cưng thỏa mãn
      if (petArr[i].vaccinated && petArr[i].dewormed && petArr[i].sterilized) {
        //Thêm thú cưng đạt chỉ tiêu vào mảng mới
        healthyPetArr.push(petArr[i]);
      }
    }
    //In ra bảng với tham số là mảng mới
    renderTableData(healthyPetArr);

    //CHỉnh nội dung nủt button thành 'Show All Pet'
    healthy_BTN.innerHTML = 'Show All Pet';
    //Chuyển biến check thành false để chuyển đổi qua lại giữa 2 nội dung
    healthyCheck = false;
  } else {
    //Nếu biến check là false thì hiển thị toàn bộ các thú cưng
    renderTableData(petArr);
    //Thay đổi thành true để lần nhấn tiếp theo sẽ hiển thị bảng con
    healthyCheck = true;
    // Đổi nội dung nút button thành 'Show Healthy Pet'
    healthy_BTN.innerHTML = 'Show Healthy Pet';
  }
});

/*
//Tạo 2 biến BMI để thay đổi dữ liệu
let bmi_Dog, bmi_CAT;
//Bắt sự kiện nút Calculate BMI để tiến hành tính toán
bmi_BTN.addEventListener('click', function () {
  //Dùng hàm for để tính toán cho từng thú cưng trong mảng
  for (let i = 0; i < petArr.length; i++) {
    //Xét điều kiện nếu như thú cưng là Dog và ngược lại
    if (petArr[i].type === 'Dog') {
      //Công thức tính BMI cho DOG
      let num = (petArr[i].weight * 703) / petArr[i].length ** 2;
      //Làm tròn đến số thập phân thứ 2
      bmi_Dog = num.toFixed(2);
      //Thay đổi nội dung cột BMI trong mảng
      petArr[i].bmi = bmi_Dog;
      //In ra bảng mới chứa thông số BMI đã được tính toán
      renderTableData(petArr);
    } else {
      //Công thức tính BMI cho CAT
      let num = (petArr[i].weight * 886) / petArr[i].length ** 2;
      //Làm tròn đến số thập phân thứ 2
      bmi_CAT = num.toFixed(2);
      //Thay đổi nội dung cột BMI trong mảng
      petArr[i].bmi = bmi_CAT;
      //In ra bảng mới chứa thông số BMI đã được tính toán
      renderTableData(petArr);
    }
  }
});
*/

///////////////////////////////////////////////////////////
const breed_ARR = JSON.parse(getFromStorage('breedArr')) ?? [];

//Bổ sung slideBar bằng thuộc tính toggle
const nav_Bar = document.getElementById('sidebar');
nav_Bar.addEventListener('click', function () {
  nav_Bar.classList.toggle('active');
});

// Tạo hàm hiển thị breed
const renderBreed = arr => {
  // Xóa hết breed hiện tại
  input_BREED.querySelectorAll('option').forEach(o => o.remove());
  // Thêm dòng breed đầu tiên
  input_BREED.innerHTML = '<option>Select Breed</option>';
  // Thêm các mục breed theo số phần tử trong mảng Breed
  for (let i = 0; i < arr.length; i++) {
    const option = document.createElement('option');
    option.innerHTML = `${arr[i].breed}`;
    input_BREED.appendChild(option);
  }
};

// Dùng hàm Change để khi thay đổi option trong Type thì các option trong breed cũng thay đổi
input_TYPE.addEventListener('change', function () {
  if (input_TYPE.value == 'Dog') {
    renderBreed(breed_ARR.filter(el => el.type == 'Dog'));
  } else if (input_TYPE.value == 'Cat') {
    renderBreed(breed_ARR.filter(el => el.type == 'Cat'));
  }
});
