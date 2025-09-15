-- Create enums for various categorical data
CREATE TYPE public.institution_type AS ENUM ('community_school', 'quilombola', 'indigenous');
CREATE TYPE public.institution_status AS ENUM ('eligible', 'ineligible');
CREATE TYPE public.app_role AS ENUM ('foundation_manager', 'school_manager');
CREATE TYPE public.distribution_status AS ENUM ('pending', 'processing', 'completed', 'failed');
CREATE TYPE public.validation_status AS ENUM ('pending', 'approved', 'rejected');

-- Create institutions table (main table)
CREATE TABLE public.institutions (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    postal_code TEXT NOT NULL,
    full_address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    country TEXT DEFAULT 'Brazil',
    type institution_type NOT NULL,
    status institution_status NOT NULL DEFAULT 'eligible',
    student_count INTEGER NOT NULL CHECK (student_count >= 0),
    school_days INTEGER NOT NULL CHECK (school_days >= 0),
    unit_value DECIMAL(10,2) NOT NULL CHECK (unit_value >= 0),
    total_value DECIMAL(15,2) GENERATED ALWAYS AS (student_count * school_days * unit_value) STORED,
    installment_value DECIMAL(15,2) GENERATED ALWAYS AS ((student_count * school_days * unit_value) / 8) STORED,
    stellar_wallet TEXT UNIQUE,
    manager_id UUID,
    infrastructure_score INTEGER DEFAULT 0 CHECK (infrastructure_score >= 0 AND infrastructure_score <= 100),
    has_internet BOOLEAN DEFAULT false,
    has_computers BOOLEAN DEFAULT false,
    has_library BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create users/profiles table
CREATE TABLE public.profiles (
    id UUID NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    role app_role NOT NULL,
    institution_id UUID REFERENCES public.institutions(id),
    stellar_wallet TEXT,
    permissions TEXT[] DEFAULT '{}',
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create teachers table
CREATE TABLE public.teachers (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    institution_id UUID NOT NULL REFERENCES public.institutions(id) ON DELETE CASCADE,
    subject_areas TEXT[] DEFAULT '{}',
    years_experience INTEGER DEFAULT 0,
    training_hours INTEGER DEFAULT 0,
    certification_level TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create monthly_metrics table
CREATE TABLE public.monthly_metrics (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    institution_id UUID NOT NULL REFERENCES public.institutions(id) ON DELETE CASCADE,
    month INTEGER NOT NULL CHECK (month >= 1 AND month <= 12),
    year INTEGER NOT NULL CHECK (year >= 2020),
    attendance_rate DECIMAL(5,2) CHECK (attendance_rate >= 0 AND attendance_rate <= 100),
    nutrition_program_participation DECIMAL(5,2) CHECK (nutrition_program_participation >= 0 AND nutrition_program_participation <= 100),
    community_engagement_score INTEGER CHECK (community_engagement_score >= 0 AND community_engagement_score <= 100),
    teacher_training_hours INTEGER DEFAULT 0,
    eligibility_score DECIMAL(5,2) DEFAULT 0,
    validation_status validation_status DEFAULT 'pending',
    validated_by UUID REFERENCES public.profiles(id),
    validated_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(institution_id, month, year)
);

-- Create distributions table
CREATE TABLE public.distributions (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    institution_id UUID NOT NULL REFERENCES public.institutions(id) ON DELETE CASCADE,
    amount DECIMAL(15,2) NOT NULL CHECK (amount > 0),
    installment_number INTEGER NOT NULL CHECK (installment_number >= 1 AND installment_number <= 8),
    distribution_date DATE NOT NULL,
    status distribution_status DEFAULT 'pending',
    transaction_hash TEXT,
    stellar_operation_id TEXT,
    approved_by UUID REFERENCES public.profiles(id),
    approved_at TIMESTAMP WITH TIME ZONE,
    processed_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create foundation_settings table
CREATE TABLE public.foundation_settings (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    setting_key TEXT NOT NULL UNIQUE,
    setting_value TEXT NOT NULL,
    description TEXT,
    category TEXT DEFAULT 'general',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.institutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.monthly_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.distributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.foundation_settings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Institutions policies
CREATE POLICY "Foundation managers can view all institutions" ON public.institutions FOR SELECT 
USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'foundation_manager'));

CREATE POLICY "School managers can view their own institution" ON public.institutions FOR SELECT 
USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'school_manager' AND institution_id = institutions.id));

-- Teachers policies
CREATE POLICY "Users can view teachers from accessible institutions" ON public.teachers FOR SELECT 
USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'foundation_manager')
    OR 
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'school_manager' AND institution_id = teachers.institution_id)
);

-- Monthly metrics policies
CREATE POLICY "Users can view metrics from accessible institutions" ON public.monthly_metrics FOR SELECT 
USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'foundation_manager')
    OR 
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'school_manager' AND institution_id = monthly_metrics.institution_id)
);

-- Distributions policies
CREATE POLICY "Users can view distributions from accessible institutions" ON public.distributions FOR SELECT 
USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'foundation_manager')
    OR 
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'school_manager' AND institution_id = distributions.institution_id)
);

-- Foundation settings policies
CREATE POLICY "Foundation managers can view settings" ON public.foundation_settings FOR SELECT 
USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'foundation_manager'));

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_institutions_updated_at BEFORE UPDATE ON public.institutions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_teachers_updated_at BEFORE UPDATE ON public.teachers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_monthly_metrics_updated_at BEFORE UPDATE ON public.monthly_metrics FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_distributions_updated_at BEFORE UPDATE ON public.distributions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_foundation_settings_updated_at BEFORE UPDATE ON public.foundation_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Add foreign key constraint for institution manager
ALTER TABLE public.institutions ADD CONSTRAINT fk_institutions_manager FOREIGN KEY (manager_id) REFERENCES public.profiles(id);

-- Insert foundation settings
INSERT INTO public.foundation_settings (setting_key, setting_value, description, category) VALUES
('unit_value_community_school', '15.50', 'Unit value per student per day for community schools', 'payment'),
('unit_value_quilombola', '18.00', 'Unit value per student per day for quilombola schools', 'payment'),
('unit_value_indigenous', '20.00', 'Unit value per student per day for indigenous schools', 'payment'),
('max_installments', '8', 'Maximum number of installments per distribution cycle', 'payment'),
('minimum_attendance_rate', '75.00', 'Minimum attendance rate required for eligibility', 'eligibility'),
('stellar_network', 'testnet', 'Stellar network configuration (testnet/mainnet)', 'blockchain'),
('foundation_stellar_wallet', 'GDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 'Foundation main Stellar wallet address', 'blockchain');

-- Insert mock institutions
INSERT INTO public.institutions (name, postal_code, full_address, city, state, type, status, student_count, school_days, unit_value, stellar_wallet, infrastructure_score, has_internet, has_computers, has_library) VALUES
('Escola Comunitária São João', '01234-567', 'Rua das Flores, 123 - Vila Nova', 'São Paulo', 'SP', 'community_school', 'eligible', 150, 200, 15.50, 'GCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 85, true, true, true),
('Centro Educacional Quilombola Palmares', '98765-432', 'Comunidade Quilombola Palmares, s/n', 'Salvador', 'BA', 'quilombola', 'eligible', 80, 180, 18.00, 'GDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXY', 70, false, false, true),
('Escola Indígena Guarani Mirim', '54321-098', 'Aldeia Guarani Mirim, Terra Indígena', 'Dourados', 'MS', 'indigenous', 'eligible', 45, 160, 20.00, 'GEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 60, false, false, false),
('Instituto Educacional Esperança', '11111-222', 'Av. Principal, 456 - Centro', 'Rio de Janeiro', 'RJ', 'community_school', 'ineligible', 200, 200, 15.50, 'GFXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 40, true, false, false),
('Escola Rural Santa Maria', '33333-444', 'Estrada Rural KM 15, s/n', 'Recife', 'PE', 'community_school', 'eligible', 120, 190, 15.50, 'GGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 75, false, true, true);

-- Insert mock teachers
INSERT INTO public.teachers (name, email, phone, institution_id, subject_areas, years_experience, training_hours, certification_level, is_active) VALUES
('Maria Silva Santos', 'maria.santos@email.com', '+5511999999999', (SELECT id FROM public.institutions WHERE name = 'Escola Comunitária São João'), ARRAY['Mathematics', 'Science'], 8, 120, 'Bachelor', true),
('João Pedro Oliveira', 'joao.oliveira@email.com', '+5511888888888', (SELECT id FROM public.institutions WHERE name = 'Escola Comunitária São João'), ARRAY['Portuguese', 'History'], 12, 200, 'Master', true),
('Ana Carolina Costa', 'ana.costa@email.com', '+5571777777777', (SELECT id FROM public.institutions WHERE name = 'Centro Educacional Quilombola Palmares'), ARRAY['Geography', 'Arts'], 5, 80, 'Bachelor', true),
('Carlos Eduardo Lima', 'carlos.lima@email.com', '+5567666666666', (SELECT id FROM public.institutions WHERE name = 'Escola Indígena Guarani Mirim'), ARRAY['Indigenous Culture', 'Portuguese'], 15, 300, 'Specialist', true),
('Fernanda Rocha', 'fernanda.rocha@email.com', '+5521555555555', (SELECT id FROM public.institutions WHERE name = 'Instituto Educacional Esperança'), ARRAY['Mathematics'], 3, 40, 'Bachelor', false);

-- Insert mock monthly metrics
INSERT INTO public.monthly_metrics (institution_id, month, year, attendance_rate, nutrition_program_participation, community_engagement_score, teacher_training_hours, eligibility_score, validation_status) VALUES
((SELECT id FROM public.institutions WHERE name = 'Escola Comunitária São João'), 3, 2024, 88.5, 95.0, 85, 40, 89.5, 'approved'),
((SELECT id FROM public.institutions WHERE name = 'Escola Comunitária São João'), 4, 2024, 90.2, 98.0, 90, 45, 92.7, 'approved'),
((SELECT id FROM public.institutions WHERE name = 'Centro Educacional Quilombola Palmares'), 3, 2024, 82.1, 89.0, 75, 30, 82.0, 'approved'),
((SELECT id FROM public.institutions WHERE name = 'Centro Educacional Quilombola Palmares'), 4, 2024, 85.6, 92.0, 80, 35, 85.9, 'pending'),
((SELECT id FROM public.institutions WHERE name = 'Escola Indígena Guarani Mirim'), 3, 2024, 78.9, 85.0, 70, 25, 78.0, 'approved'),
((SELECT id FROM public.institutions WHERE name = 'Instituto Educacional Esperança'), 3, 2024, 65.2, 60.0, 50, 15, 58.4, 'rejected');

-- Insert mock distributions
INSERT INTO public.distributions (institution_id, amount, installment_number, distribution_date, status, transaction_hash) VALUES
((SELECT id FROM public.institutions WHERE name = 'Escola Comunitária São João'), 58125.00, 1, '2024-03-15', 'completed', 'abc123def456'),
((SELECT id FROM public.institutions WHERE name = 'Escola Comunitária São João'), 58125.00, 2, '2024-04-15', 'completed', 'def456ghi789'),
((SELECT id FROM public.institutions WHERE name = 'Centro Educacional Quilombola Palmares'), 36000.00, 1, '2024-03-15', 'completed', 'ghi789jkl012'),
((SELECT id FROM public.institutions WHERE name = 'Centro Educacional Quilombola Palmares'), 36000.00, 2, '2024-04-15', 'processing', null),
((SELECT id FROM public.institutions WHERE name = 'Escola Indígena Guarani Mirim'), 22500.00, 1, '2024-03-15', 'completed', 'jkl012mno345'),
((SELECT id FROM public.institutions WHERE name = 'Escola Indígena Guarani Mirim'), 22500.00, 2, '2024-04-15', 'pending', null);