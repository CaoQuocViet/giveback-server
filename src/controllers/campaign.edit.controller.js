const { Campaign } = require('../models');
const { validateEditCampaign } = require('../validators/campaignValidator');
const { handleError } = require('../utils/errorHandler');
const { uploadFile, deleteOldFile } = require('../utils/fileUpload');

// Get campaign details for editing
const getCampaignForEdit = async (req, res) => {
  try {
    const { id } = req.params;
    const campaign = await Campaign.findByPk(id);
    
    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found'
      });
    }

    // Check if user has permission (charity owner)
    if (campaign.charityId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to edit this campaign'
      });
    }

    // Format data theo interface
    const formattedData = {
      id: campaign.id,
      title: campaign.title,
      status: campaign.status,
      startDate: campaign.startDate,
      endDate: campaign.endDate,
      targetAmount: campaign.targetAmount,
      description: campaign.description,
      detailGoal: campaign.detailGoal,
      images: campaign.images || [],
      location: {
        address: campaign.address,
        ward: campaign.ward,
        district: campaign.district,
        province: campaign.province
      }
    };

    return res.json({
      success: true,
      data: formattedData
    });

  } catch (error) {
    return handleError(res, error);
  }
};

// Update campaign
const updateCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    const campaign = await Campaign.findByPk(id);
    
    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found'
      });
    }

    // Check if user has permission (charity owner)
    if (campaign.charityId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to edit this campaign'
      });
    }

    let imagePath = campaign.images;
    // Xử lý upload file nếu có
    if (req.file) {
      imagePath = await uploadFile(req.file, 'campaigns', campaign.images);
    }

    const updatedData = {
      status: req.body.status,
      endDate: req.body.endDate,
      targetAmount: Number(req.body.targetAmount),
      description: req.body.description,
      detailGoal: req.body.detailGoal,
      images: imagePath
    };

    // Validate input
    const { error, value } = validateEditCampaign(updatedData);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    // Save old data to edit history
    const oldData = {
      status: campaign.status,
      endDate: campaign.endDate,
      targetAmount: campaign.targetAmount,
      description: campaign.description,
      detailGoal: campaign.detailGoal,
      images: campaign.images,
      updatedAt: campaign.updatedAt,
      updatedBy: req.user.id
    };

    let editHistory = campaign.editHistory || [];
    editHistory.push(oldData);

    // Update campaign
    const updatedCampaign = await campaign.update({
      ...value,
      editHistory
    });

    return res.json({
      success: true,
      message: 'Campaign updated successfully',
      data: updatedCampaign
    });

  } catch (error) {
    return handleError(res, error);
  }
};

module.exports = {
  getCampaignForEdit,
  updateCampaign
}; 