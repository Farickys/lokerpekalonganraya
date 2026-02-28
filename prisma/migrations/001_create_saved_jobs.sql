-- Create SavedJob table for bookmark/save job feature
CREATE TABLE IF NOT EXISTS SavedJob (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  userId    INT NOT NULL,
  jobId     INT NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_user_job (userId, jobId),
  INDEX idx_userId (userId),
  INDEX idx_jobId (jobId)
);
