import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

export async function up(queryInterface) {
  // Tạo admin mẫu
  const adminId = uuidv4();
  await queryInterface.bulkInsert('Users', [{
    id: adminId,
    full_name: 'Admin User',
    email: 'admin@giveback.local',
    phone: '0123456789',
    password: await bcrypt.hash('admin123', 10),
    role: 'ADMIN',
    otp_verified: true,
    created_at: new Date(),
    updated_at: new Date()
  }]);

  await queryInterface.bulkInsert('Admins', [{
    id: adminId,
    is_system_admin: true
  }]);

  // Tạo donor mẫu
  await queryInterface.bulkInsert('Users', [{
    id: uuidv4(),
    full_name: 'Donor User',
    email: 'donor@giveback.local', 
    phone: '0987654321',
    password: await bcrypt.hash('donor123', 10),
    role: 'DONOR',
    otp_verified: true,
    created_at: new Date(),
    updated_at: new Date()
  }]);
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('Admins', null, {});
  await queryInterface.bulkDelete('Users', null, {});
} 