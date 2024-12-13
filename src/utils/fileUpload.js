const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const STORAGE_PATH = path.join(__dirname, '../storage');

// Đảm bảo thư mục storage tồn tại
if (!fs.existsSync(STORAGE_PATH)) {
  fs.mkdirSync(STORAGE_PATH, { recursive: true });
}

const deleteOldFile = (oldPath) => {
  if (!oldPath) return;
  
  const fullPath = path.join(STORAGE_PATH, oldPath);
  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
  }
};

const uploadFile = async (file, subFolder = '', oldFilePath = null) => {
  try {
    const folderPath = path.join(STORAGE_PATH, subFolder);
    
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    // Xóa file cũ nếu có
    if (oldFilePath) {
      deleteOldFile(oldFilePath);
    }

    const fileExt = path.extname(file.originalname);
    const fileName = `${uuidv4()}${fileExt}`;
    const filePath = path.join(folderPath, fileName);

    fs.writeFileSync(filePath, file.buffer);

    // Trả về đường dẫn tương đối
    const relativePath = path.join(subFolder, fileName).replace(/\\/g, '/');
    return relativePath;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  uploadFile,
  STORAGE_PATH,
  deleteOldFile
}; 