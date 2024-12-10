dropdb giveback_db
createdb giveback_db
npx sequelize-cli db:migrate

SELECT tgname FROM pg_trigger WHERE NOT tgisinternal;
\di
\dt
\dT