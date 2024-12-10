const Role = {
  ADMIN: 'ADMIN',
  DONOR: 'DONOR',
  CHARITY: 'CHARITY',
  BENEFICIARY: 'BENEFICIARY'
};

const CampaignStatus = {
  STARTING: 'STARTING',
  ONGOING: 'ONGOING',
  CLOSED: 'CLOSED',
  COMPLETED: 'COMPLETED'
};

const VerificationStatus = {
  PENDING: 'PENDING',
  VERIFIED: 'VERIFIED',
  REJECTED: 'REJECTED'
};

const PaymentStatus = {
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED'
};

module.exports = {
  Role,
  CampaignStatus,
  VerificationStatus,
  PaymentStatus
};