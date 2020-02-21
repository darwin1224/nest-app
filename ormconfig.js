module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'rahasia',
  database: 'nest_test',
  entities: ['dist/**/*{.ts,.js}'],
  synchronize: true,
  logging: true,
};
