'use strict';

// Hàm lưu dữ liệu
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

// Hàm lấy dữ liệu từ Storage
function getFromStorage(key) {
  return localStorage.getItem(key);
}
