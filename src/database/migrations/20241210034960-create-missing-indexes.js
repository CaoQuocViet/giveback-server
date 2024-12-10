'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Users indexes
    await queryInterface.addIndex('Users', ['email'], { name: 'idx_users_email' });
    await queryInterface.addIndex('Users', ['phone'], { name: 'idx_users_phone' });
    await queryInterface.addIndex('Users', ['role'], { name: 'idx_users_role' });
    await queryInterface.addIndex('Users', ['province', 'district'], { name: 'idx_users_location' });

    // Campaigns indexes
    await queryInterface.addIndex('Campaigns', ['status'], { name: 'idx_campaigns_status' });
    await queryInterface.addIndex('Campaigns', ['start_date', 'end_date'], { name: 'idx_campaigns_dates' });
    await queryInterface.addIndex('Campaigns', ['target_amount', 'current_amount'], { name: 'idx_campaigns_amount' });
    await queryInterface.addIndex('Campaigns', ['province', 'district'], { name: 'idx_campaigns_location' });
    await queryInterface.addIndex('Campaigns', ['rating'], { name: 'idx_campaigns_rating', order: 'DESC' });

    // Charities indexes
    await queryInterface.addIndex('Charities', ['verification_status'], { name: 'idx_charities_verification' });
    await queryInterface.addIndex('Charities', ['rating', 'total_raised'], { 
      name: 'idx_charities_stats',
      order: [['rating', 'DESC'], ['total_raised', 'DESC']]
    });

    // Donations indexes
    await queryInterface.addIndex('Donations', ['status'], { name: 'idx_donations_status' });
    await queryInterface.addIndex('Donations', ['created_at'], { name: 'idx_donations_created', order: 'DESC' });
    await queryInterface.addIndex('Donations', ['amount', 'created_at'], { 
      name: 'idx_donations_amount_date',
      order: [['amount', 'DESC'], ['created_at', 'DESC']]
    });

    // Comments indexes
    await queryInterface.addIndex('Comments', ['rating'], { name: 'idx_comments_rating', order: 'DESC' });
    await queryInterface.addIndex('Comments', ['created_at'], { name: 'idx_comments_created', order: 'DESC' });
  },

  async down(queryInterface, Sequelize) {
    // Remove all indexes
    await queryInterface.removeIndex('Users', 'idx_users_email');
    await queryInterface.removeIndex('Users', 'idx_users_phone');
    await queryInterface.removeIndex('Users', 'idx_users_role');
    await queryInterface.removeIndex('Users', 'idx_users_location');

    await queryInterface.removeIndex('Campaigns', 'idx_campaigns_status');
    await queryInterface.removeIndex('Campaigns', 'idx_campaigns_dates');
    await queryInterface.removeIndex('Campaigns', 'idx_campaigns_amount');
    await queryInterface.removeIndex('Campaigns', 'idx_campaigns_location');
    await queryInterface.removeIndex('Campaigns', 'idx_campaigns_rating');

    await queryInterface.removeIndex('Charities', 'idx_charities_verification');
    await queryInterface.removeIndex('Charities', 'idx_charities_stats');

    await queryInterface.removeIndex('Donations', 'idx_donations_status');
    await queryInterface.removeIndex('Donations', 'idx_donations_created');
    await queryInterface.removeIndex('Donations', 'idx_donations_amount_date');

    await queryInterface.removeIndex('Comments', 'idx_comments_rating');
    await queryInterface.removeIndex('Comments', 'idx_comments_created');
  }
}; 