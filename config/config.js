const env = process.env.NODE_ENV || 'dev';

const config = () => {
  switch(env) {
    case 'dev': 
      return {
        db_string: 'mongodb://localhost:27017/tickets',
        jwt_pass: 'sample-dev',
        jwt_expires_in: '1d'
      }
    case 'hom': 
      return {
        db_string: 'mongodb://localhost:27017/tickets',
        jwt_pass: 'sample-hom',
        jwt_expires_in: '1d'
      }
    case 'prod': 
      return {
        db_string: 'mongodb://localhost:27017/tickets',
        jwt_pass: 'sample-prod',
        jwt_expires_in: '7d'
      }
  }

}

console.log('Environment: ', `${env.toUpperCase()}`);
module.exports = config();