FROM node:22

# Chọn thư mục làm việc trong container
WORKDIR /app

# Copy package.json và package-lock.json trước để tận dụng cache
COPY backend/package*.json ./

# Cài dependencies
RUN npm install --production

# Copy toàn bộ mã nguồn backend
COPY backend ./

# Expose port (nếu server.js lắng nghe 3000)
EXPOSE 3000

# Lệnh chạy app
CMD ["node", "server.js"]
