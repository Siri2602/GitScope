const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'gitscope',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const initDB = async () => {
  const conn = await pool.getConnection();
  await conn.execute(`
    CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME || 'gitscope'}\`
  `);
  await conn.execute(`USE \`${process.env.DB_NAME || 'gitscope'}\``);
  await conn.execute(`
    CREATE TABLE IF NOT EXISTS profiles (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(100) UNIQUE NOT NULL,
      name VARCHAR(200),
      avatar VARCHAR(500),
      bio TEXT,
      location VARCHAR(200),
      followers INT DEFAULT 0,
      following INT DEFAULT 0,
      public_repos INT DEFAULT 0,
      total_stars INT DEFAULT 0,
      total_forks INT DEFAULT 0,
      most_used_language VARCHAR(100),
      developer_score DECIMAL(5,2) DEFAULT 0,
      developer_level VARCHAR(50),
      activity_status VARCHAR(50),
      portfolio_strength VARCHAR(50),
      community_influence VARCHAR(50),
      languages_data JSON,
      top_repos JSON,
      badges JSON,
      insights TEXT,
      github_created_at VARCHAR(50),
      analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_score (developer_score DESC),
      INDEX idx_language (most_used_language)
    )
  `);
  conn.release();
};

module.exports = { pool, initDB };
