# Để tạm thư mục trong backend, cần chạy thì mang file docker-compose.yml và file .env ra thư mục chính của dự án để chạy

# Build và start với logs
docker-compose up --build

# Hoặc chạy ở background
docker-compose up -d --build

# Xem logs
docker-compose logs -f

# Dừng services
docker-compose down