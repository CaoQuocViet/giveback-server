giveback-server/
├── src/
│   ├── config/
│   │   ├── config.js           # Database config
│   │   └── constants.js        # App constants
│   │
│   ├── controllers/
│   │   ├── auth.controller.js  # Xử lý auth
│   │   ├── admin.controller.js # Xử lý admin actions
│   │   ├── user.controller.js  # Xử lý user actions
│   │   ├── charity.controller.js # Xử lý charity actions
│   │   ├── donor.controller.js # Xử lý donor actions
│   │   ├── campaign.controller.js # Xử lý campaign
│   │   ├── comment.controller.js  # Xử lý comments
│   │   └── upload.controller.js   # Xử lý file uploads
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js    # JWT auth
│   │   ├── role.middleware.js    # Role check
│   │   ├── upload.middleware.js  # File upload
│   │   ├── validate.middleware.js # Input validation
│   │   └── error.middleware.js   # Error handling
│   │
│   ├── models/
│   │   ├── index.js
│   │   ├── user.model.js
│   │   ├── admin.model.js  
│   │   ├── charity.model.js
│   │   ├── campaign.model.js
│   │   ├── donation.model.js
│   │   ├── distribution.model.js
│   │   ├── comment.model.js
│   │   └── otp.model.js
│   │
│   ├── routes/
│   │   ├── index.js
│   │   ├── auth.routes.js
│   │   ├── admin.routes.js
│   │   ├── user.routes.js
│   │   ├── charity.routes.js
│   │   ├── donor.routes.js
│   │   ├── campaign.routes.js
│   │   └── upload.routes.js
│   │
│   ├── services/
│   │   ├── auth.service.js
│   │   ├── mail.service.js
│   │   ├── sms.service.js
│   │   ├── payment.service.js
│   │   └── upload.service.js
│   │
│   ├── utils/
│   │   ├── jwt.js
│   │   ├── hash.js
│   │   ├── validate.js
│   │   └── response.js
│   │
│   └── server.js
│
├── tests/
│   ├── auth.test.js
│   ├── admin.test.js
│   ├── charity.test.js
│   └── campaign.test.js
│
├── Resource/
│   ├── Functional flow/
│   │   ├── auth/
│   │   ├── admin/ 
│   │   ├── charity/
│   │   ├── donor/
│   │   └── common/
│   │
│   └── Routes/
│       ├── auth.routes.md
│       ├── admin.routes.md
│       ├── charity.routes.md
│       ├── donor.routes.md
│       └── common.routes.md
│
├── .env
├── .gitignore
├── package.json
└── README.md