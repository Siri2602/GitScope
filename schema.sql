CREATE DATABASE IF NOT EXISTS gitscope;
USE gitscope;

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
  developer_level ENUM('Beginner','Intermediate','Advanced','Expert') NOT NULL DEFAULT 'Beginner',
  activity_status ENUM('Inactive','Moderately Active','Active','Highly Active') NOT NULL DEFAULT 'Inactive',
  portfolio_strength ENUM('Weak','Average','Strong','Excellent') NOT NULL DEFAULT 'Weak',
  community_influence ENUM('Low','Medium','High','Very High') NOT NULL DEFAULT 'Low',
  languages_data JSON,
  top_repos JSON,
  badges JSON,
  insights TEXT,
  github_created_at VARCHAR(50),
  analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_score (developer_score DESC),
  INDEX idx_language (most_used_language),
  INDEX idx_analyzed (analyzed_at DESC)
);
