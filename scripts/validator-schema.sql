-- Validator Submissions Table
CREATE TABLE IF NOT EXISTS validator_submissions (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL REFERENCES users(id),
    submission_type TEXT NOT NULL CHECK (submission_type IN ('COURSE_COMPLETION', 'PEER_REVIEW', 'PROJECT_SUBMISSION', 'COMMUNITY_ACTION')),
    course_id TEXT REFERENCES courses(id),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    evidence_url TEXT,
    evidence_type TEXT CHECK (evidence_type IN ('VIDEO', 'IMAGE', 'DOCUMENT', 'LINK')),
    requested_flb DECIMAL NOT NULL CHECK (requested_flb > 0),
    approved_flb DECIMAL,
    status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED', 'UNDER_REVIEW')),
    priority TEXT NOT NULL DEFAULT 'MEDIUM' CHECK (priority IN ('LOW', 'MEDIUM', 'HIGH')),
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reviewed_at TIMESTAMP,
    reviewed_by TEXT,
    reviewer_notes TEXT,
    review_time_hours DECIMAL GENERATED ALWAYS AS (
        CASE 
            WHEN reviewed_at IS NOT NULL AND submitted_at IS NOT NULL 
            THEN EXTRACT(EPOCH FROM (reviewed_at - submitted_at)) / 3600.0
            ELSE NULL 
        END
    ) STORED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Validators Table
CREATE TABLE IF NOT EXISTS validators (
    wallet TEXT PRIMARY KEY,
    name TEXT,
    role TEXT NOT NULL CHECK (role IN ('VALIDATOR', 'SENIOR_VALIDATOR', 'ADMIN')),
    specializations TEXT[] NOT NULL DEFAULT '{}',
    is_active BOOLEAN NOT NULL DEFAULT true,
    reputation INTEGER NOT NULL DEFAULT 100 CHECK (reputation >= 0 AND reputation <= 1000),
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_validator_submissions_status ON validator_submissions(status);
CREATE INDEX IF NOT EXISTS idx_validator_submissions_priority ON validator_submissions(priority);
CREATE INDEX IF NOT EXISTS idx_validator_submissions_user_id ON validator_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_validator_submissions_reviewed_by ON validator_submissions(reviewed_by);
CREATE INDEX IF NOT EXISTS idx_validator_submissions_submitted_at ON validator_submissions(submitted_at);
CREATE INDEX IF NOT EXISTS idx_validators_role ON validators(role);
CREATE INDEX IF NOT EXISTS idx_validators_active ON validators(is_active);

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_validator_submissions_updated_at 
    BEFORE UPDATE ON validator_submissions 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_validators_updated_at 
    BEFORE UPDATE ON validators 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample validators
INSERT INTO validators (wallet, name, role, specializations) VALUES
('0x1234567890123456789012345678901234567890', 'Alice Validator', 'SENIOR_VALIDATOR', ARRAY['COURSE_COMPLETION', 'PROJECT_SUBMISSION']),
('0x2345678901234567890123456789012345678901', 'Bob Reviewer', 'VALIDATOR', ARRAY['PEER_REVIEW', 'COMMUNITY_ACTION']),
('0x3456789012345678901234567890123456789012', 'Carol Admin', 'ADMIN', ARRAY['COURSE_COMPLETION', 'PROJECT_SUBMISSION', 'PEER_REVIEW', 'COMMUNITY_ACTION'])
ON CONFLICT (wallet) DO NOTHING;
