# Init seeds:
npx sequelize-cli seed:generate --name init-users
npx sequelize-cli seed:generate --name init-admins
npx sequelize-cli seed:generate --name init-charities
npx sequelize-cli seed:generate --name init-campaigns
npx sequelize-cli seed:generate --name init-payment-methods
npx sequelize-cli seed:generate --name init-donations
npx sequelize-cli seed:generate --name init-distributions
npx sequelize-cli seed:generate --name init-comments
npx sequelize-cli seed:generate --name init-otp-codes
npx sequelize-cli seed:generate --name init-password-resets

# Run seeds:
npx sequelize-cli db:seed:all

# Undo seeds:
npx sequelize-cli db:seed:undo:all
