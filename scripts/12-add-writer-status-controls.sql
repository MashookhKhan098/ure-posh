-- Add writer status control fields
-- This allows admins to pause writer access

ALTER TABLE writer 
ADD COLUMN IF NOT EXISTS is_active boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS status_updated_at timestamp with time zone DEFAULT now(),
ADD COLUMN IF NOT EXISTS status_updated_by uuid REFERENCES auth.users(id);

-- Add index for better performance on status queries
CREATE INDEX IF NOT EXISTS idx_writer_is_active ON writer(is_active);

-- Add comment for documentation
COMMENT ON COLUMN writer.is_active IS 'Controls whether writer can access the system. False = paused by admin';
COMMENT ON COLUMN writer.status_updated_at IS 'When the status was last changed';
COMMENT ON COLUMN writer.status_updated_by IS 'Admin who last updated the status';
