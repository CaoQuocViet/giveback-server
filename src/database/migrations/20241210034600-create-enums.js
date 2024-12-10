'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DO $$ BEGIN
        CREATE TYPE "Role" AS ENUM ('ADMIN', 'DONOR', 'CHARITY', 'BENEFICIARY');
        CREATE TYPE "CampaignStatus" AS ENUM ('STARTING', 'ONGOING', 'CLOSED', 'COMPLETED');
        CREATE TYPE "VerificationStatus" AS ENUM ('PENDING', 'VERIFIED', 'REJECTED');
        CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED');
      EXCEPTION 
        WHEN duplicate_object THEN null;
      END $$;
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DROP TYPE IF EXISTS "Role";
      DROP TYPE IF EXISTS "CampaignStatus";
      DROP TYPE IF EXISTS "VerificationStatus"; 
      DROP TYPE IF EXISTS "PaymentStatus";
    `);
  }
}; 