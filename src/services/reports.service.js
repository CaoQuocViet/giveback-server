const {
	Campaign,
	Charity,
	Donation,
	Distribution,
	User,
	sequelize,
} = require("../models");
const { Op } = require("sequelize");

exports.getCampaignReport = async () => {
	const campaigns = await Campaign.findAll({
		attributes: [
			"id",
			"title",
			"status",
			[
				sequelize.literal(`(
          SELECT COALESCE(SUM("Donations"."amount"), 0)
          FROM "Donations"
          WHERE "Donations"."campaign_id" = "Campaign"."id"
        )`),
				"totalReceived",
			],
			[
				sequelize.literal(`(
          SELECT COALESCE(SUM("Distributions"."budget"), 0)
          FROM "Distributions"
          WHERE "Distributions"."campaign_id" = "Campaign"."id"
        )`),
				"totalDistributed",
			],
			[
				sequelize.literal(`(
          SELECT COUNT(DISTINCT "Donations"."donor_id")
          FROM "Donations"
          WHERE "Donations"."campaign_id" = "Campaign"."id"
        )`),
				"donorCount",
			],
			[
				sequelize.literal(`(
          SELECT COUNT(*)
          FROM "Distributions"
          WHERE "Distributions"."campaign_id" = "Campaign"."id"
        )`),
				"distributionCount",
			],
		],
		order: [["created_at", "DESC"]],
	});

	return campaigns.map((c) => c.get({ plain: true }));
};

exports.getCharityReport = async () => {
	const charities = await Charity.findAll({
		attributes: [
			"id",
			"title",
			[
				sequelize.literal(`(
          SELECT COUNT(*)
          FROM "Campaigns"
          WHERE "Campaigns"."charity_id" = "Charity"."id"
        )`),
				"campaignCount",
			],
			[
				sequelize.literal(`(
          SELECT COALESCE(SUM("Donations"."amount"), 0)
          FROM "Donations"
          JOIN "Campaigns" ON "Donations"."campaign_id" = "Campaigns"."id"
          WHERE "Campaigns"."charity_id" = "Charity"."id"
        )`),
				"totalFundraised",
			],
			[
				sequelize.literal(`(
          SELECT COALESCE(SUM("Distributions"."budget"), 0)
          FROM "Distributions"
          JOIN "Campaigns" ON "Distributions"."campaign_id" = "Campaigns"."id"
          WHERE "Campaigns"."charity_id" = "Charity"."id"
        )`),
				"totalDistributed",
			],
			[
				sequelize.literal(`(
          SELECT COALESCE(AVG("Comments"."rating"), 0)
          FROM "Comments"
          JOIN "Campaigns" ON "Comments"."campaign_id" = "Campaigns"."id"
          WHERE "Campaigns"."charity_id" = "Charity"."id"
        )`),
				"averageRating",
			],
		],
		order: [["created_at", "DESC"]],
	});

	return charities.map((c) => c.get({ plain: true }));
};

exports.getDonationReport = async () => {
	const donors = await User.findAll({
		where: { role: "DONOR" },
		attributes: [
			"id",
			"full_name",
			[
				sequelize.literal(`(
          SELECT COUNT(*)
          FROM "Donations"
          WHERE "Donations"."donor_id" = "User"."id"
        )`),
				"campaignCount",
			],
			[
				sequelize.literal(`(
          SELECT COALESCE(SUM("Donations"."amount"), 0)
          FROM "Donations"
          WHERE "Donations"."donor_id" = "User"."id"
        )`),
				"totalDonated",
			],
			[
				sequelize.literal(`(
          SELECT MAX("Donations"."created_at")
          FROM "Donations"
          WHERE "Donations"."donor_id" = "User"."id"
        )`),
				"lastDonationDate",
			],
		],
		order: [["created_at", "DESC"]],
	});

	return donors.map((d) => d.get({ plain: true }));
};

exports.getDistributionReport = async () => {
	try {
		const campaigns = await Campaign.findAll({
			attributes: ["id", "title"],
			include: [
				{
					model: Distribution,
					as: "distributions",
					attributes: [
						"title",
						"budget",
						"beneficiary_count",
						"relief_date",
						[
							sequelize.literal(`(
                  SELECT "User"."full_name"
                  FROM "Users" AS "User"
                  WHERE "User"."id" = "distributions"."representative_name"
                )`),
							"representativeName",
						],
						[
							sequelize.literal(`(
                  "distributions"."address" || ', ' || "distributions"."ward" || ', ' || "distributions"."district" || ', ' || "distributions"."province"
                )`),
							"location",
						],
					],
				},
			],
			order: [["created_at", "DESC"]],
		});

		return campaigns.map((campaign) => ({
			campaignName: campaign.title,
			distributions: campaign.distributions.map((distribution) =>
				distribution.get({ plain: true }),
			),
		}));
	} catch (error) {
		console.error("Error in getDistributionReport:", error);
		throw error;
	}
};
