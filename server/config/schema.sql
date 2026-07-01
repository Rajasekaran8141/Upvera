-- Upvera Technology Database Schema
CREATE DATABASE IF NOT EXISTS upvaretech;
USE upvaretech;

CREATE TABLE IF NOT EXISTS candidates (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  full_name     VARCHAR(255)                      NOT NULL,
  email         VARCHAR(255)                      NOT NULL,
  college       VARCHAR(255),
  department    VARCHAR(255),
  course_name   VARCHAR(255)                      NOT NULL,
  program_type  ENUM('Course','Internship')        NOT NULL,
  start_date    DATE                              NOT NULL,
  end_date      DATE                              NOT NULL,
  issue_date    DATE                              NOT NULL,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS certificates (
  id                   INT AUTO_INCREMENT PRIMARY KEY,
  candidate_id         INT          NOT NULL,
  certificate_number   VARCHAR(50)  UNIQUE NOT NULL,
  verification_token   VARCHAR(255) UNIQUE NOT NULL,
  verification_url     VARCHAR(500),
  qr_code_path         VARCHAR(500),
  pdf_path             VARCHAR(500),
  status               ENUM('Active','Revoked') DEFAULT 'Active',
  created_by           VARCHAR(100) DEFAULT 'admin',
  created_at           TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at           TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
);
