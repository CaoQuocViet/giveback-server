dropdb -U vietcq giveback_db
createdb -U vietcq giveback_db
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

SELECT tgname FROM pg_trigger WHERE NOT tgisinternal;
\di
\dt
\dT