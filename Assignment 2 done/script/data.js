'use strict';

const import_BTN = document.getElementById('import-btn');
const export_BTN = document.getElementById('export-btn');
const input_File = document.getElementById('input-file');

const petArr = JSON.parse(getFromStorage('petArr')) ?? [];
const tableBodyEl = document.getElementById('tbody');

// Bắt sự kiện nút EXport
export_BTN.addEventListener('click', function () {
  if (confirm('Are you sure ?')) {
    // Tạo biến, chuyển mảng thành Json
    const myJson = new Blob([JSON.stringify(petArr)], {
      type: 'text/plain',
    });
    // Lưu biến được tạo vào file có đuôi Json
    saveAs(myJson, 'FileSaver.json');
  }
});

// Bắt sự kiện Import
import_BTN.addEventListener('click', function () {
  // Tạo biến để sự dụng file được chọn trong Input
  const file = input_File.files[0];
  // Biến reader để đọc file
  const reader = new FileReader();
  // Dùng hàm Onload để trang wed tải sau khi thêm file trong Input
  reader.onload = function (e) {
    // Sử dụng thuộc tính Target để trả về nội dung của FIle trong Input
    let content = e.target.result;
    // Chuyển đổi nội dung file từ Json thành Object
    let intern = JSON.parse(content); // parse json
    // Thay đổi mảng petArr và lưu lại trong Storage dưới dạng String
    saveToStorage('petArr', JSON.stringify(intern));
  };
  reader.readAsText(file);
});
