"use strict";
const input_ID = document.getElementById("input-id"),
  input_NAME = document.getElementById("input-name"),
  input_AGE = document.getElementById("input-age"),
  input_TYPE = document.getElementById("input-type"),
  input_Weight = document.getElementById("input-weight"),
  input_Length = document.getElementById("input-length"),
  input_Color = document.getElementById("input-color-1"),
  input_BREED = document.getElementById("input-breed"),
  input_VACCINATED = document.getElementById("input-vaccinated"),
  input_DEWORMED = document.getElementById("input-dewormed"),
  input_STERILIZED = document.getElementById("input-sterilized");

const submit_BTN = document.getElementById("submit-btn");

// Thêm slidebar
const nav_Bar = document.getElementById("sidebar");
nav_Bar.addEventListener("click", function () {
  nav_Bar.classList.toggle("active");
});

// Lấy dữ liệu 2 mảng
const petArr = JSON.parse(getFromStorage("petArr")) ?? [];
const breed_ARR = JSON.parse(getFromStorage("breedArr")) ?? [];
const tableBodyEl = document.getElementById("tbody");

// Hàm hiển thị dữ liệu petArr, đồng thời thay đổi button thành Edit
function renderTableData(petArr) {
  //Xóa hết dữ liệu
  tableBodyEl.innerHTML = "";
  //Dùng hàm for để in lại toàn bộ dựa theo dữ liệu trong mảng
  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement("tr");
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
        petArr[i].vaccinated ? "bi bi-check-circle-fill" : "bi bi-x-circle-fill"
      }"></i>
    </td>
    <td>
      <i class="${
        petArr[i].dewormed ? "bi bi-check-circle-fill" : "bi bi-x-circle-fill"
      }"></i>
    </td>
    <td>
      <i class="${
        petArr[i].sterilized ? "bi bi-check-circle-fill" : "bi bi-x-circle-fill"
      }"></i>
    </td>
    <td>${petArr[i].date}</td>
    <td>
      <button class="btn btn-warning" onclick="startEditPet('${
        petArr[i].id
      }')" >Edit</button>
    </td>`;
    tableBodyEl.appendChild(row); //Thêm hàng mới vào bảng
  }
}
renderTableData(petArr);

// Hàm hiển thị thông tin thú cưng lên các mục Input
function startEditPet(petId) {
  // Hiển thị mục Input
  document.getElementById("container-form").classList.remove("hide");

  // Đối chiếu Id và ghi các thông tin lên Input
  for (let i = 0; i < petArr.length; i++) {
    if (petId === petArr[i].id) {
      input_ID.value = petArr[i].id;
      input_NAME.value = petArr[i].name;
      input_AGE.value = petArr[i].age;
      input_TYPE.value = petArr[i].type;
      input_Weight.value = petArr[i].weight;
      input_Length.value = petArr[i].length;
      input_Color.value = petArr[i].color;
      input_VACCINATED.checked = petArr[i].vaccinated;
      input_DEWORMED.checked = petArr[i].dewormed;
      input_STERILIZED.checked = petArr[i].sterilized;

      // thêm hàm renderBreed để thay đổi các option của breed
      renderBreed();
      input_BREED.value = `${petArr[i].breed}`;
    }
  }
}

// Hàm renderBreed để thay đổi các option phụ thuộc vào Type
const renderBreed = () => {
  input_BREED.innerHTML = "<option>Select Breed</option>";
  // Tạo 2 mảng Dog và Cat lọc từ mảng Breed ban đầu
  const breedDog = breed_ARR.filter((breedType) => breedType.type === "Dog");
  const breedcat = breed_ARR.filter((breedType) => breedType.type === "Cat");

  // Xét điều kiện nếu Type là Dog thì hiển thị các breed Dog và ngược lại là Cat
  if (input_TYPE.value === "Dog") {
    breedDog.forEach((breedItem) => {
      const newOption = document.createElement("option");
      newOption.innerHTML = `${breedItem.breed}`;
      input_BREED.appendChild(newOption);
    });
  } else if (input_TYPE.value === "Cat") {
    breedcat.forEach((breedItem) => {
      const newOption = document.createElement("option");
      newOption.innerHTML = `${breedItem.breed}`;
      input_BREED.appendChild(newOption);
    });
  }
};

// Bắt sự kiện nút Submit để lưu lại các thay đổi trên Input vào mảng PetArr
submit_BTN.addEventListener("click", function () {
  // Cập nhật lại phần tử
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
  };

  // ĐỐi chiếu Id và thay đổi trong mảng petArr
  for (let i = 0; i < petArr.length; i++) {
    if (data.id == petArr[i].id && validateData(data)) {
      petArr[i] = data;
    }
  }

  // Luu lại mảng mới vào Storage và in ra
  saveToStorage("petArr", JSON.stringify(petArr));
  renderTableData(petArr);
});

// Thay đổi các Option Breed khi Type thay đổi
input_TYPE.addEventListener("click", renderBreed);

// Hàm điều kiện được sử dụng khi sửa đổi các Input
function validateData(data) {
  if (data.name == "") {
    alert("Please fill on Name !");
    return false;
  } else if (data.age < 1 || data.age > 15) {
    //Xét điều kiện tuổi
    alert("Age must be between 1 and 15!");
    return false;
  } else if (data.weight < 1 || data.weight > 15) {
    //Xét điều kiện cân nặng
    alert("Weight must be between 1 and 15!");
    return false;
  } else if (data.length < 1 || data.length > 100) {
    //Xét điều kiện chiều cao
    alert("Length must be between 1 and 100!");
    return false;
  } else if (data.type == "Select Type") {
    //Xét điều kiện kiểu
    alert("Please select Type!");
    return false;
  } else if (data.breed == "Select Breed") {
    //Xét điều kiện giống loài
    alert("Please select Breed!");
    return false;
  } else {
    return true;
  }
}
