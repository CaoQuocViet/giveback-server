"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	class Distribution extends Model {
		static associate(models) {
			// Quan hệ với Campaign (n-1)
			Distribution.belongsTo(models.Campaign, {
				foreignKey: "campaign_id",
				as: "campaign",
			});
		}
	}

	Distribution.init(
		{
			id: {
				type: DataTypes.STRING,
				primaryKey: true,
				defaultValue: DataTypes.UUIDV4,
			},
			campaignId: {
				type: DataTypes.STRING,
				allowNull: false,
				field: "campaign_id",
				references: {
					model: "Campaigns",
					key: "id",
				},
			},
			title: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			budget: {
				type: DataTypes.DECIMAL,
				allowNull: false,
				field: "budget",
			},
			distributionDate: {
				type: DataTypes.DATE,
				allowNull: false,
				field: "distribution_date",
			},
			province: DataTypes.STRING,
			district: DataTypes.STRING,
			ward: DataTypes.STRING,
			address: DataTypes.STRING,
			beneficiaryCount: {
				type: DataTypes.INTEGER,
				allowNull: false,
				field: "beneficiary_count",
			},
			description: DataTypes.TEXT,
			proofImages: {
				type: DataTypes.STRING,
				field: "proof_images",
			},
			representativeName: {
				type: DataTypes.STRING,
				field: "representative_name",
				references: {
					model: "Users",
					key: "id",
				},
			},
			reliefDate: {
				type: DataTypes.DATE,
				field: "relief_date",
			},
		},
		{
			sequelize,
			modelName: "Distribution",
			tableName: "Distributions",
			timestamps: true,
			createdAt: "created_at",
			updatedAt: "updated_at",
			underscored: true,
		},
	);

	return Distribution;
};
