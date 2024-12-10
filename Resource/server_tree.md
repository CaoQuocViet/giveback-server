giveback-server/                  # Root directory của project
├── src/                         # Source code chính
│   ├── config/                  # Cấu hình hệ thống
│   │   ├── config.js           # Cấu hình database, port, env vars
│   │   └── constants.js        # Định nghĩa constants: roles, status, messages
│   │
│   ├── controllers/            # Business logic cho từng module
│   │   ├── auth.controller.js  # Login, register, verify token
│   │   ├── admin.controller.js # Quản lý system, verify tổ chức
│   │   ├── user.controller.js  # CRUD user profile
│   │   ├── charity.controller.js # CRUD tổ chức từ thiện
│   │   ├── donor.controller.js # Xử lý quyên góp, lịch sử
│   │   ├── campaign.controller.js # CRUD chiến dịch, thống kê
│   │   ├── comment.controller.js  # CRUD comments, ratings
│   │   └── upload.controller.js   # Upload files lên cloud storage
│   │
│   ├── middlewares/              # Xử lý trước khi vào controller
│   │   ├── auth.middleware.js    # Verify JWT token
│   │   ├── role.middleware.js    # Check user permissions
│   │   ├── upload.middleware.js  # Process file uploads
│   │   ├── validate.middleware.js # Validate request data
│   │   └── error.middleware.js   # Global error handler
│   │
│   ├── models/                   # Database schemas
│   │   ├── index.js             # Khởi tạo Sequelize, sync models
│   │   ├── user.model.js        # Base user schema
│   │   ├── admin.model.js       # Admin user schema
│   │   ├── charity.model.js     # Charity org schema
│   │   ├── campaign.model.js    # Campaign schema
│   │   ├── donation.model.js    # Donation records schema
│   │   ├── distribution.model.js # Distribution records schema
│   │   ├── comment.model.js     # Comments & ratings schema
│   │   └── otp.model.js         # OTP codes schema
│   │
│   ├── routes/                   # API routes định nghĩa
│   │   ├── index.js             # Combine & export all routes
│   │   ├── auth.routes.js       # /api/auth routes
│   │   ├── admin.routes.js      # /api/admin routes
│   │   ├── user.routes.js       # /api/users routes
│   │   ├── charity.routes.js    # /api/charities routes
│   │   ├── donor.routes.js      # /api/donors routes
│   │   ├── campaign.routes.js   # /api/campaigns routes
│   │   └── upload.routes.js     # /api/upload routes
│   │
│   ├── services/                 # Third-party services
│   │   ├── auth.service.js      # JWT & password hashing
│   │   ├── mail.service.js      # Email service (NodeMailer)
│   │   ├── sms.service.js       # SMS service (Twilio)
│   │   ├── payment.service.js   # Payment gateway integration
│   │   └── upload.service.js    # Cloud storage service
│   │
│   ├── utils/                    # Helper functions
│   │   ├── jwt.js               # JWT utils
│   │   ├── hash.js              # Password hashing utils
│   │   ├── validate.js          # Input validation utils
│   │   └── response.js          # API response formatter
│   │
│   └── server.js                 # Express app entry point
│
├── tests/                        # Unit & integration tests
│   ├── auth.test.js             # Authentication tests
│   ├── admin.test.js            # Admin features tests
│   ├── charity.test.js          # Charity features tests
│   └── campaign.test.js         # Campaign features tests
│
├── Resource/                     # Documentation
│   ├── Functional flow/          # Business logic flows
│   │   ├── auth/                # Auth process flows
│   │   ├── admin/               # Admin process flows
│   │   ├── charity/             # Charity process flows
│   │   ├── donor/               # Donation process flows
│   │   └── common/              # Shared process flows
│   │
│   └── Routes/                   # API documentation
│       ├── auth.routes.md       # Auth API specs
│       ├── admin.routes.md      # Admin API specs
│       ├── charity.routes.md    # Charity API specs
│       ├── donor.routes.md      # Donor API specs
│       └── common.routes.md     # Common API specs
│
├── .env                          # Environment variables
├── .gitignore                    # Git ignore rules
├── package.json                  # Project dependencies & scripts
└── README.md                     # Project overview & setup guide