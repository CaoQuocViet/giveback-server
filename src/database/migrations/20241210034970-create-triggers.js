'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      -- Campaign rating trigger
      CREATE OR REPLACE FUNCTION update_campaign_rating()
      RETURNS TRIGGER AS $$
      BEGIN
        IF TG_OP = 'DELETE' THEN
          UPDATE "Campaigns" 
          SET rating = COALESCE((
            SELECT AVG(rating)::decimal(3,2)
            FROM "Comments"
            WHERE campaign_id = OLD.campaign_id
          ), 0)
          WHERE id = OLD.campaign_id;
          RETURN OLD;
        ELSE
          UPDATE "Campaigns" 
          SET rating = (
            SELECT AVG(rating)::decimal(3,2)
            FROM "Comments"
            WHERE campaign_id = NEW.campaign_id
          )
          WHERE id = NEW.campaign_id;
          RETURN NEW;
        END IF;
      END;
      $$ LANGUAGE plpgsql;

      CREATE TRIGGER trg_update_campaign_rating
      AFTER INSERT OR UPDATE OR DELETE ON "Comments"
      FOR EACH ROW
      EXECUTE FUNCTION update_campaign_rating();

      -- Charity rating trigger
      CREATE OR REPLACE FUNCTION update_charity_rating() 
      RETURNS TRIGGER AS $$
      BEGIN
        UPDATE "Charities"
        SET rating = COALESCE((
          SELECT AVG(rating)::decimal(3,2)
          FROM "Campaigns" 
          WHERE charity_id = (SELECT charity_id FROM "Campaigns" WHERE id = NEW.id)
        ), 0)
        WHERE id = (SELECT charity_id FROM "Campaigns" WHERE id = NEW.id);
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      CREATE TRIGGER trg_update_charity_rating
      AFTER UPDATE OF rating ON "Campaigns"
      FOR EACH ROW 
      EXECUTE FUNCTION update_charity_rating();

      -- Campaign amount trigger
      CREATE OR REPLACE FUNCTION update_campaign_amount()
      RETURNS TRIGGER AS $$
      BEGIN
        IF TG_OP = 'INSERT' THEN
          IF NEW.status = 'SUCCESS' THEN
            UPDATE "Campaigns"
            SET current_amount = current_amount + NEW.amount
            WHERE id = NEW.campaign_id;
          END IF;
        ELSIF TG_OP = 'UPDATE' THEN
          IF OLD.status = 'SUCCESS' AND NEW.status != 'SUCCESS' THEN
            UPDATE "Campaigns"
            SET current_amount = current_amount - OLD.amount
            WHERE id = NEW.campaign_id;
          ELSIF NEW.status = 'SUCCESS' AND OLD.status != 'SUCCESS' THEN
            UPDATE "Campaigns"
            SET current_amount = current_amount + NEW.amount
            WHERE id = NEW.campaign_id;
          END IF;
        END IF;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      CREATE TRIGGER trg_update_campaign_amount
      AFTER INSERT OR UPDATE OF status ON "Donations"
      FOR EACH ROW
      EXECUTE FUNCTION update_campaign_amount();

      -- Charity stats trigger
      CREATE OR REPLACE FUNCTION update_charity_stats()
      RETURNS TRIGGER AS $$
      BEGIN
        UPDATE "Charities"
        SET 
          campaign_count = (
            SELECT COUNT(*) FROM "Campaigns" WHERE charity_id = NEW.charity_id
          ),
          total_raised = COALESCE((
            SELECT SUM(d.amount)
            FROM "Donations" d
            JOIN "Campaigns" c ON d.campaign_id = c.id 
            WHERE c.charity_id = NEW.charity_id
            AND d.status = 'SUCCESS'
          ), 0)
        WHERE id = NEW.charity_id;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      CREATE TRIGGER trg_update_charity_stats
      AFTER INSERT OR UPDATE ON "Campaigns"
      FOR EACH ROW
      EXECUTE FUNCTION update_charity_stats();

      -- Updated at trigger
      CREATE OR REPLACE FUNCTION update_updated_at()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      CREATE TRIGGER trg_users_updated_at
      BEFORE UPDATE ON "Users"
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at();

      CREATE TRIGGER trg_charities_updated_at
      BEFORE UPDATE ON "Charities"
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at();

      CREATE TRIGGER trg_campaigns_updated_at
      BEFORE UPDATE ON "Campaigns"
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at();

      CREATE TRIGGER trg_donations_updated_at
      BEFORE UPDATE ON "Donations"
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at();

      CREATE TRIGGER trg_distributions_updated_at
      BEFORE UPDATE ON "Distributions"
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at();
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DROP TRIGGER IF EXISTS trg_update_campaign_rating ON "Comments";
      DROP FUNCTION IF EXISTS update_campaign_rating();

      DROP TRIGGER IF EXISTS trg_update_charity_rating ON "Campaigns";
      DROP FUNCTION IF EXISTS update_charity_rating();

      DROP TRIGGER IF EXISTS trg_update_campaign_amount ON "Donations";
      DROP FUNCTION IF EXISTS update_campaign_amount();

      DROP TRIGGER IF EXISTS trg_update_charity_stats ON "Campaigns";
      DROP FUNCTION IF EXISTS update_charity_stats();

      DROP TRIGGER IF EXISTS trg_users_updated_at ON "Users";
      DROP TRIGGER IF EXISTS trg_charities_updated_at ON "Charities";
      DROP TRIGGER IF EXISTS trg_campaigns_updated_at ON "Campaigns";
      DROP TRIGGER IF EXISTS trg_donations_updated_at ON "Donations";
      DROP TRIGGER IF EXISTS trg_distributions_updated_at ON "Distributions";
      DROP FUNCTION IF EXISTS update_updated_at();
    `);
  }
}; 