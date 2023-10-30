import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    postgres: {
      url: process.env.DATABASE_URL,
    },
    jwtSecret: process.env.JWT_SECRET,
  };
});
