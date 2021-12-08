module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '4cd37781c90beeb5deb0bf90e1700221'),
  },
});
