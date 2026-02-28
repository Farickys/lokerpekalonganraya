-- Fase 2: Job Seeker Features
-- Add JOBSEEKER to User role (MySQL ENUMs need ALTER)
ALTER TABLE User MODIFY COLUMN role ENUM('ADMIN', 'COMPANY', 'JOBSEEKER') NOT NULL DEFAULT 'COMPANY';

-- Job Seeker Profile
CREATE TABLE IF NOT EXISTS JobSeekerProfile (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  userId      INT NOT NULL UNIQUE,
  phone       VARCHAR(20),
  location    VARCHAR(100),
  bio         TEXT,
  skills      TEXT,
  experience  VARCHAR(50),
  education   VARCHAR(50),
  cvUrl       VARCHAR(500),
  cvName      VARCHAR(200),
  createdAt   DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt   DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_userId (userId)
);

-- Job Applications
CREATE TABLE IF NOT EXISTS Application (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  userId      INT NOT NULL,
  jobId       INT NOT NULL,
  coverLetter TEXT,
  status      ENUM('SUBMITTED', 'REVIEWED', 'ACCEPTED', 'REJECTED') NOT NULL DEFAULT 'SUBMITTED',
  notes       TEXT,
  createdAt   DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt   DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_user_job (userId, jobId),
  INDEX idx_userId (userId),
  INDEX idx_jobId (jobId),
  INDEX idx_status (status)
);

-- Job Alerts
CREATE TABLE IF NOT EXISTS JobAlert (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  userId      INT NOT NULL,
  keyword     VARCHAR(200),
  area        VARCHAR(50),
  category    VARCHAR(100),
  jobType     VARCHAR(50),
  frequency   ENUM('DAILY', 'WEEKLY') NOT NULL DEFAULT 'DAILY',
  active      TINYINT(1) NOT NULL DEFAULT 1,
  lastSentAt  DATETIME,
  createdAt   DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_userId (userId),
  INDEX idx_active (active)
);
