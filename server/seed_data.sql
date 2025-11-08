-- ============================================
-- DevCollab.AI - Seed Data Script
-- 15 Realistic Users with Projects & Skills
-- ============================================

-- Clean existing data (optional - comment out if you want to keep existing data)
TRUNCATE TABLE matches CASCADE;
TRUNCATE TABLE project_team_members CASCADE;
TRUNCATE TABLE project_skills CASCADE;
TRUNCATE TABLE project_tags CASCADE;
TRUNCATE TABLE user_skills CASCADE;
TRUNCATE TABLE user_interests CASCADE;
TRUNCATE TABLE projects CASCADE;
TRUNCATE TABLE skills CASCADE;
TRUNCATE TABLE users CASCADE;

-- ============================================
-- SKILLS DATA
-- ============================================

INSERT INTO skills (name, category, description) VALUES
-- Frontend
('React', 'FRONTEND', 'JavaScript library for building user interfaces'),
('Vue.js', 'FRONTEND', 'Progressive JavaScript framework'),
('Angular', 'FRONTEND', 'TypeScript-based web application framework'),
('Next.js', 'FRONTEND', 'React framework with server-side rendering'),
('TypeScript', 'FRONTEND', 'Typed superset of JavaScript'),
('Tailwind CSS', 'FRONTEND', 'Utility-first CSS framework'),
('HTML/CSS', 'FRONTEND', 'Web markup and styling languages'),
('Redux', 'FRONTEND', 'State management library'),
('Svelte', 'FRONTEND', 'Compiler-based JavaScript framework'),

-- Backend
('Node.js', 'BACKEND', 'JavaScript runtime environment'),
('Express.js', 'BACKEND', 'Web framework for Node.js'),
('Python', 'BACKEND', 'High-level programming language'),
('Django', 'BACKEND', 'Python web framework'),
('Flask', 'BACKEND', 'Lightweight Python web framework'),
('Java', 'BACKEND', 'Object-oriented programming language'),
('Spring Boot', 'BACKEND', 'Java framework for microservices'),
('Ruby on Rails', 'BACKEND', 'Web application framework'),
('Go', 'BACKEND', 'Google''s programming language'),
('Rust', 'BACKEND', 'Systems programming language'),
('GraphQL', 'BACKEND', 'Query language for APIs'),
('REST API', 'BACKEND', 'Architectural style for APIs'),

-- Mobile
('React Native', 'MOBILE', 'Framework for building mobile apps'),
('Flutter', 'MOBILE', 'Google''s UI toolkit for mobile apps'),
('Swift', 'MOBILE', 'Programming language for iOS'),
('Kotlin', 'MOBILE', 'Programming language for Android'),
('iOS Development', 'MOBILE', 'Native iOS app development'),
('Android Development', 'MOBILE', 'Native Android app development'),

-- Database
('PostgreSQL', 'DATABASE', 'Advanced open-source relational database'),
('MongoDB', 'DATABASE', 'NoSQL document database'),
('MySQL', 'DATABASE', 'Open-source relational database'),
('Redis', 'DATABASE', 'In-memory data structure store'),
('Firebase', 'DATABASE', 'Google''s mobile and web application platform'),
('Prisma', 'DATABASE', 'Next-generation ORM for Node.js'),
('SQLite', 'DATABASE', 'Lightweight embedded database'),

-- DevOps
('Docker', 'DEVOPS', 'Containerization platform'),
('Kubernetes', 'DEVOPS', 'Container orchestration system'),
('AWS', 'DEVOPS', 'Amazon Web Services cloud platform'),
('Google Cloud', 'DEVOPS', 'Google''s cloud computing services'),
('CI/CD', 'DEVOPS', 'Continuous Integration/Deployment'),
('Terraform', 'DEVOPS', 'Infrastructure as code tool'),
('Jenkins', 'DEVOPS', 'Automation server'),
('Git', 'DEVOPS', 'Version control system'),

-- Design
('Figma', 'DESIGN', 'Collaborative design tool'),
('UI/UX Design', 'DESIGN', 'User interface and experience design'),
('Adobe XD', 'DESIGN', 'Design and prototyping tool'),
('Sketch', 'DESIGN', 'Digital design toolkit'),
('Prototyping', 'DESIGN', 'Creating interactive mockups'),

-- Data Science & ML
('Python Data Science', 'DATA_SCIENCE', 'Data analysis with Python'),
('TensorFlow', 'MACHINE_LEARNING', 'Machine learning framework'),
('PyTorch', 'MACHINE_LEARNING', 'Deep learning framework'),
('scikit-learn', 'MACHINE_LEARNING', 'Machine learning library'),
('Pandas', 'DATA_SCIENCE', 'Data manipulation library'),
('NumPy', 'DATA_SCIENCE', 'Numerical computing library'),
('Data Visualization', 'DATA_SCIENCE', 'Visual data representation'),
('NLP', 'MACHINE_LEARNING', 'Natural Language Processing'),
('Computer Vision', 'MACHINE_LEARNING', 'Image processing and analysis'),

-- Blockchain
('Solidity', 'BLOCKCHAIN', 'Smart contract programming language'),
('Ethereum', 'BLOCKCHAIN', 'Decentralized blockchain platform'),
('Web3.js', 'BLOCKCHAIN', 'Ethereum JavaScript API'),
('Smart Contracts', 'BLOCKCHAIN', 'Self-executing contracts'),

-- Other
('API Development', 'OTHER', 'Building application interfaces'),
('Agile', 'OTHER', 'Iterative development methodology'),
('Testing', 'OTHER', 'Software quality assurance'),
('Security', 'OTHER', 'Application security practices'),
('Technical Writing', 'OTHER', 'Documentation and communication')
ON CONFLICT (name) DO NOTHING;

-- ============================================
-- USERS DATA (15 Realistic Profiles)
-- ============================================

INSERT INTO users (email, password, full_name, bio, github_username, linkedin_url, provider, timezone, hours_per_week, experience_level, profile_picture, active, created_at, updated_at) VALUES

-- 1. Sarah Chen - Full Stack Developer (San Francisco)
('sarah.chen@email.com', '$2a$10$rF5Q8Z7KX4Y0D1E2F3G4H5I6J7K8L9M0N1O2P3Q4R5S6T7U8V9W0X', 
'Sarah Chen', 
'Full-stack developer passionate about fintech and building scalable web applications. 5+ years experience in React and Node.js. Looking to collaborate on innovative financial technology projects.',
'sarachen', 'https://linkedin.com/in/sarachen', 'local', 'America/Los_Angeles', 20, 'ADVANCED',
'https://i.pravatar.cc/150?img=5', true, NOW() - INTERVAL '6 months', NOW()),

-- 2. Marcus Johnson - Backend Engineer (New York)
('marcus.j@email.com', '$2a$10$rF5Q8Z7KX4Y0D1E2F3G4H5I6J7K8L9M0N1O2P3Q4R5S6T7U8V9W0X',
'Marcus Johnson',
'Backend engineer specializing in microservices and cloud architecture. AWS certified. Interested in e-commerce platforms and payment systems.',
'marcusjdev', 'https://linkedin.com/in/marcusjohnson', 'local', 'America/New_York', 25, 'EXPERT',
'https://i.pravatar.cc/150?img=12', true, NOW() - INTERVAL '8 months', NOW()),

-- 3. Priya Sharma - ML Engineer (Bangalore)
('priya.sharma@email.com', '$2a$10$rF5Q8Z7KX4Y0D1E2F3G4H5I6J7K8L9M0N1O2P3Q4R5S6T7U8V9W0X',
'Priya Sharma',
'Machine Learning Engineer with expertise in NLP and computer vision. PhD in AI. Passionate about healthcare tech and using ML to solve real-world problems.',
'priyasharma-ml', 'https://linkedin.com/in/priyasharma', 'google', 'Asia/Kolkata', 15, 'EXPERT',
'https://i.pravatar.cc/150?img=9', true, NOW() - INTERVAL '1 year', NOW()),

-- 4. Alex Rivera - Mobile Developer (Austin)
('alex.rivera@email.com', '$2a$10$rF5Q8Z7KX4Y0D1E2F3G4H5I6J7K8L9M0N1O2P3Q4R5S6T7U8V9W0X',
'Alex Rivera',
'Mobile developer focused on React Native and Flutter. Built 10+ apps with 1M+ downloads. Interested in edtech and gamification.',
'alexrivera', 'https://linkedin.com/in/alexrivera', 'github', 'America/Chicago', 30, 'ADVANCED',
'https://i.pravatar.cc/150?img=33', true, NOW() - INTERVAL '4 months', NOW()),

-- 5. Emma Wilson - UI/UX Designer (London)
('emma.wilson@email.com', '$2a$10$rF5Q8Z7KX4Y0D1E2F3G4H5I6J7K8L9M0N1O2P3Q4R5S6T7U8V9W0X',
'Emma Wilson',
'UI/UX designer with a passion for creating delightful user experiences. Experienced in design systems and accessibility. Love working on social media and community platforms.',
'emmawilson', 'https://linkedin.com/in/emmawilson', 'local', 'Europe/London', 20, 'INTERMEDIATE',
'https://i.pravatar.cc/150?img=24', true, NOW() - INTERVAL '3 months', NOW()),

-- 6. Kenji Tanaka - Blockchain Developer (Tokyo)
('kenji.tanaka@email.com', '$2a$10$rF5Q8Z7KX4Y0D1E2F3G4H5I6J7K8L9M0N1O2P3Q4R5S6T7U8V9W0X',
'Kenji Tanaka',
'Blockchain developer specializing in Solidity and DeFi protocols. Building the future of Web3. Active contributor to open-source blockchain projects.',
'kenjitanaka', 'https://linkedin.com/in/kenjitanaka', 'github', 'Asia/Tokyo', 35, 'ADVANCED',
'https://i.pravatar.cc/150?img=15', true, NOW() - INTERVAL '5 months', NOW()),

-- 7. Sofia Martinez - Data Scientist (Madrid)
('sofia.martinez@email.com', '$2a$10$rF5Q8Z7KX4Y0D1E2F3G4H5I6J7K8L9M0N1O2P3Q4R5S6T7U8V9W0X',
'Sofia Martinez',
'Data scientist with expertise in predictive analytics and data visualization. Previously worked at top tech companies. Interested in healthtech and biotech applications.',
'sofiamartinez', 'https://linkedin.com/in/sofiamartinez', 'local', 'Europe/Madrid', 18, 'ADVANCED',
'https://i.pravatar.cc/150?img=47', true, NOW() - INTERVAL '7 months', NOW()),

-- 8. David Kim - DevOps Engineer (Seoul)
('david.kim@email.com', '$2a$10$rF5Q8Z7KX4Y0D1E2F3G4H5I6J7K8L9M0N1O2P3Q4R5S6T7U8V9W0X',
'David Kim',
'DevOps engineer passionate about infrastructure automation and cloud-native applications. Kubernetes expert. Looking to work on scalable startup projects.',
'davidkim-ops', 'https://linkedin.com/in/davidkim', 'google', 'Asia/Seoul', 22, 'ADVANCED',
'https://i.pravatar.cc/150?img=51', true, NOW() - INTERVAL '2 months', NOW()),

-- 9. Olivia Brown - Frontend Developer (Toronto)
('olivia.brown@email.com', '$2a$10$rF5Q8Z7KX4Y0D1E2F3G4H5I6J7K8L9M0N1O2P3Q4R5S6T7U8V9W0X',
'Olivia Brown',
'Frontend developer who loves crafting beautiful and performant web applications. React and Next.js enthusiast. Passionate about open-source and developer tools.',
'oliviabrown', 'https://linkedin.com/in/oliviabrown', 'github', 'America/Toronto', 25, 'INTERMEDIATE',
'https://i.pravatar.cc/150?img=20', true, NOW() - INTERVAL '9 months', NOW()),

-- 10. Raj Patel - Full Stack Developer (Mumbai)
('raj.patel@email.com', '$2a$10$rF5Q8Z7KX4Y0D1E2F3G4H5I6J7K8L9M0N1O2P3Q4R5S6T7U8V9W0X',
'Raj Patel',
'Full-stack developer with experience in MERN stack. Built multiple SaaS products. Interested in edtech and tools that empower learning.',
'rajpatel', 'https://linkedin.com/in/rajpatel', 'local', 'Asia/Kolkata', 28, 'INTERMEDIATE',
'https://i.pravatar.cc/150?img=59', true, NOW() - INTERVAL '10 months', NOW()),

-- 11. Lisa Anderson - Game Developer (Los Angeles)
('lisa.anderson@email.com', '$2a$10$rF5Q8Z7KX4Y0D1E2F3G4H5I6J7K8L9M0N1O2P3Q4R5S6T7U8V9W0X',
'Lisa Anderson',
'Game developer with 8 years of experience in Unity and Unreal Engine. Love creating immersive gaming experiences. Also interested in VR/AR applications.',
'lisaanderson', 'https://linkedin.com/in/lisaanderson', 'local', 'America/Los_Angeles', 30, 'EXPERT',
'https://i.pravatar.cc/150?img=29', true, NOW() - INTERVAL '11 months', NOW()),

-- 12. Ahmed Hassan - Security Engineer (Dubai)
('ahmed.hassan@email.com', '$2a$10$rF5Q8Z7KX4Y0D1E2F3G4H5I6J7K8L9M0N1O2P3Q4R5S6T7U8V9W0X',
'Ahmed Hassan',
'Security engineer specializing in application security and penetration testing. CISSP certified. Passionate about building secure fintech and blockchain applications.',
'ahmedhassan', 'https://linkedin.com/in/ahmedhassan', 'github', 'Asia/Dubai', 20, 'EXPERT',
'https://i.pravatar.cc/150?img=14', true, NOW() - INTERVAL '5 months', NOW()),

-- 13. Nina Kowalski - Product Manager/Developer (Berlin)
('nina.kowalski@email.com', '$2a$10$rF5Q8Z7KX4Y0D1E2F3G4H5I6J7K8L9M0N1O2P3Q4R5S6T7U8V9W0X',
'Nina Kowalski',
'Technical product manager with strong development background. Previously led teams at startups. Looking to build impactful social and community-driven projects.',
'ninakowalski', 'https://linkedin.com/in/ninakowalski', 'local', 'Europe/Berlin', 15, 'INTERMEDIATE',
'https://i.pravatar.cc/150?img=48', true, NOW() - INTERVAL '3 months', NOW()),

-- 14. Carlos Santos - iOS Developer (São Paulo)
('carlos.santos@email.com', '$2a$10$rF5Q8Z7KX4Y0D1E2F3G4H5I6J7K8L9M0N1O2P3Q4R5S6T7U8V9W0X',
'Carlos Santos',
'iOS developer specializing in Swift and SwiftUI. Built apps for major Brazilian companies. Interested in healthtech and fitness applications.',
'carlossantos', 'https://linkedin.com/in/carlossantos', 'github', 'America/Sao_Paulo', 25, 'ADVANCED',
'https://i.pravatar.cc/150?img=52', true, NOW() - INTERVAL '6 months', NOW()),

-- 15. Maya Nguyen - Junior Developer (Sydney)
('maya.nguyen@email.com', '$2a$10$rF5Q8Z7KX4Y0D1E2F3G4H5I6J7K8L9M0N1O2P3Q4R5S6T7U8V9W0X',
'Maya Nguyen',
'Recent CS graduate eager to learn and contribute to meaningful projects. Strong foundation in Python and JavaScript. Interested in AI/ML and open-source contribution.',
'mayanguyen', 'https://linkedin.com/in/mayanguyen', 'local', 'Australia/Sydney', 40, 'BEGINNER',
'https://i.pravatar.cc/150?img=25', true, NOW() - INTERVAL '1 month', NOW());

-- ============================================
-- USER INTERESTS
-- ============================================

-- Sarah Chen - FinTech
INSERT INTO user_interests (user_id, interest) VALUES
((SELECT id FROM users WHERE email = 'sarah.chen@email.com'), 'FinTech'),
((SELECT id FROM users WHERE email = 'sarah.chen@email.com'), 'E-commerce'),
((SELECT id FROM users WHERE email = 'sarah.chen@email.com'), 'Open Source');

-- Marcus Johnson - E-commerce
INSERT INTO user_interests (user_id, interest) VALUES
((SELECT id FROM users WHERE email = 'marcus.j@email.com'), 'E-commerce'),
((SELECT id FROM users WHERE email = 'marcus.j@email.com'), 'FinTech'),
((SELECT id FROM users WHERE email = 'marcus.j@email.com'), 'Startup');

-- Priya Sharma - HealthTech
INSERT INTO user_interests (user_id, interest) VALUES
((SELECT id FROM users WHERE email = 'priya.sharma@email.com'), 'HealthTech'),
((SELECT id FROM users WHERE email = 'priya.sharma@email.com'), 'AI/ML Projects'),
((SELECT id FROM users WHERE email = 'priya.sharma@email.com'), 'Open Source');

-- Alex Rivera - EdTech
INSERT INTO user_interests (user_id, interest) VALUES
((SELECT id FROM users WHERE email = 'alex.rivera@email.com'), 'EdTech'),
((SELECT id FROM users WHERE email = 'alex.rivera@email.com'), 'Gaming'),
((SELECT id FROM users WHERE email = 'alex.rivera@email.com'), 'Social Media');

-- Emma Wilson - Social Media
INSERT INTO user_interests (user_id, interest) VALUES
((SELECT id FROM users WHERE email = 'emma.wilson@email.com'), 'Social Media'),
((SELECT id FROM users WHERE email = 'emma.wilson@email.com'), 'E-commerce'),
((SELECT id FROM users WHERE email = 'emma.wilson@email.com'), 'EdTech');

-- Kenji Tanaka - Web3/Blockchain
INSERT INTO user_interests (user_id, interest) VALUES
((SELECT id FROM users WHERE email = 'kenji.tanaka@email.com'), 'Web3/Blockchain'),
((SELECT id FROM users WHERE email = 'kenji.tanaka@email.com'), 'FinTech'),
((SELECT id FROM users WHERE email = 'kenji.tanaka@email.com'), 'Open Source');

-- Sofia Martinez - HealthTech
INSERT INTO user_interests (user_id, interest) VALUES
((SELECT id FROM users WHERE email = 'sofia.martinez@email.com'), 'HealthTech'),
((SELECT id FROM users WHERE email = 'sofia.martinez@email.com'), 'AI/ML Projects'),
((SELECT id FROM users WHERE email = 'sofia.martinez@email.com'), 'Data Science');

-- David Kim - Startup
INSERT INTO user_interests (user_id, interest) VALUES
((SELECT id FROM users WHERE email = 'david.kim@email.com'), 'Open Source'),
((SELECT id FROM users WHERE email = 'david.kim@email.com'), 'E-commerce'),
((SELECT id FROM users WHERE email = 'david.kim@email.com'), 'FinTech');

-- Olivia Brown - Open Source
INSERT INTO user_interests (user_id, interest) VALUES
((SELECT id FROM users WHERE email = 'olivia.brown@email.com'), 'Open Source'),
((SELECT id FROM users WHERE email = 'olivia.brown@email.com'), 'Developer Tools'),
((SELECT id FROM users WHERE email = 'olivia.brown@email.com'), 'EdTech');

-- Raj Patel - EdTech
INSERT INTO user_interests (user_id, interest) VALUES
((SELECT id FROM users WHERE email = 'raj.patel@email.com'), 'EdTech'),
((SELECT id FROM users WHERE email = 'raj.patel@email.com'), 'SaaS'),
((SELECT id FROM users WHERE email = 'raj.patel@email.com'), 'Open Source');

-- Lisa Anderson - Gaming
INSERT INTO user_interests (user_id, interest) VALUES
((SELECT id FROM users WHERE email = 'lisa.anderson@email.com'), 'Gaming'),
((SELECT id FROM users WHERE email = 'lisa.anderson@email.com'), 'VR/AR'),
((SELECT id FROM users WHERE email = 'lisa.anderson@email.com'), 'Entertainment');

-- Ahmed Hassan - FinTech Security
INSERT INTO user_interests (user_id, interest) VALUES
((SELECT id FROM users WHERE email = 'ahmed.hassan@email.com'), 'FinTech'),
((SELECT id FROM users WHERE email = 'ahmed.hassan@email.com'), 'Web3/Blockchain'),
((SELECT id FROM users WHERE email = 'ahmed.hassan@email.com'), 'Security');

-- Nina Kowalski - Social Impact
INSERT INTO user_interests (user_id, interest) VALUES
((SELECT id FROM users WHERE email = 'nina.kowalski@email.com'), 'Social Media'),
((SELECT id FROM users WHERE email = 'nina.kowalski@email.com'), 'Community'),
((SELECT id FROM users WHERE email = 'nina.kowalski@email.com'), 'EdTech');

-- Carlos Santos - HealthTech
INSERT INTO user_interests (user_id, interest) VALUES
((SELECT id FROM users WHERE email = 'carlos.santos@email.com'), 'HealthTech'),
((SELECT id FROM users WHERE email = 'carlos.santos@email.com'), 'Fitness'),
((SELECT id FROM users WHERE email = 'carlos.santos@email.com'), 'Mobile Apps');

-- Maya Nguyen - AI/ML
INSERT INTO user_interests (user_id, interest) VALUES
((SELECT id FROM users WHERE email = 'maya.nguyen@email.com'), 'AI/ML Projects'),
((SELECT id FROM users WHERE email = 'maya.nguyen@email.com'), 'Open Source'),
((SELECT id FROM users WHERE email = 'maya.nguyen@email.com'), 'Learning');

-- ============================================
-- USER SKILLS
-- ============================================

-- Sarah Chen - Full Stack
INSERT INTO user_skills (user_id, skill_id) VALUES
((SELECT id FROM users WHERE email = 'sarah.chen@email.com'), (SELECT id FROM skills WHERE name = 'React')),
((SELECT id FROM users WHERE email = 'sarah.chen@email.com'), (SELECT id FROM skills WHERE name = 'Node.js')),
((SELECT id FROM users WHERE email = 'sarah.chen@email.com'), (SELECT id FROM skills WHERE name = 'TypeScript')),
((SELECT id FROM users WHERE email = 'sarah.chen@email.com'), (SELECT id FROM skills WHERE name = 'PostgreSQL')),
((SELECT id FROM users WHERE email = 'sarah.chen@email.com'), (SELECT id FROM skills WHERE name = 'Express.js')),
((SELECT id FROM users WHERE email = 'sarah.chen@email.com'), (SELECT id FROM skills WHERE name = 'REST API')),
((SELECT id FROM users WHERE email = 'sarah.chen@email.com'), (SELECT id FROM skills WHERE name = 'Git'));

-- Marcus Johnson - Backend Expert
INSERT INTO user_skills (user_id, skill_id) VALUES
((SELECT id FROM users WHERE email = 'marcus.j@email.com'), (SELECT id FROM skills WHERE name = 'Java')),
((SELECT id FROM users WHERE email = 'marcus.j@email.com'), (SELECT id FROM skills WHERE name = 'Spring Boot')),
((SELECT id FROM users WHERE email = 'marcus.j@email.com'), (SELECT id FROM skills WHERE name = 'PostgreSQL')),
((SELECT id FROM users WHERE email = 'marcus.j@email.com'), (SELECT id FROM skills WHERE name = 'AWS')),
((SELECT id FROM users WHERE email = 'marcus.j@email.com'), (SELECT id FROM skills WHERE name = 'Docker')),
((SELECT id FROM users WHERE email = 'marcus.j@email.com'), (SELECT id FROM skills WHERE name = 'Kubernetes')),
((SELECT id FROM users WHERE email = 'marcus.j@email.com'), (SELECT id FROM skills WHERE name = 'GraphQL')),
((SELECT id FROM users WHERE email = 'marcus.j@email.com'), (SELECT id FROM skills WHERE name = 'Redis'));

-- Priya Sharma - ML Engineer
INSERT INTO user_skills (user_id, skill_id) VALUES
((SELECT id FROM users WHERE email = 'priya.sharma@email.com'), (SELECT id FROM skills WHERE name = 'Python')),
((SELECT id FROM users WHERE email = 'priya.sharma@email.com'), (SELECT id FROM skills WHERE name = 'TensorFlow')),
((SELECT id FROM users WHERE email = 'priya.sharma@email.com'), (SELECT id FROM skills WHERE name = 'PyTorch')),
((SELECT id FROM users WHERE email = 'priya.sharma@email.com'), (SELECT id FROM skills WHERE name = 'NLP')),
((SELECT id FROM users WHERE email = 'priya.sharma@email.com'), (SELECT id FROM skills WHERE name = 'Computer Vision')),
((SELECT id FROM users WHERE email = 'priya.sharma@email.com'), (SELECT id FROM skills WHERE name = 'Python Data Science')),
((SELECT id FROM users WHERE email = 'priya.sharma@email.com'), (SELECT id FROM skills WHERE name = 'Pandas')),
((SELECT id FROM users WHERE email = 'priya.sharma@email.com'), (SELECT id FROM skills WHERE name = 'NumPy'));

-- Alex Rivera - Mobile Developer
INSERT INTO user_skills (user_id, skill_id) VALUES
((SELECT id FROM users WHERE email = 'alex.rivera@email.com'), (SELECT id FROM skills WHERE name = 'React Native')),
((SELECT id FROM users WHERE email = 'alex.rivera@email.com'), (SELECT id FROM skills WHERE name = 'Flutter')),
((SELECT id FROM users WHERE email = 'alex.rivera@email.com'), (SELECT id FROM skills WHERE name = 'TypeScript')),
((SELECT id FROM users WHERE email = 'alex.rivera@email.com'), (SELECT id FROM skills WHERE name = 'Firebase')),
((SELECT id FROM users WHERE email = 'alex.rivera@email.com'), (SELECT id FROM skills WHERE name = 'iOS Development')),
((SELECT id FROM users WHERE email = 'alex.rivera@email.com'), (SELECT id FROM skills WHERE name = 'Android Development')),
((SELECT id FROM users WHERE email = 'alex.rivera@email.com'), (SELECT id FROM skills WHERE name = 'REST API'));

-- Emma Wilson - UI/UX Designer
INSERT INTO user_skills (user_id, skill_id) VALUES
((SELECT id FROM users WHERE email = 'emma.wilson@email.com'), (SELECT id FROM skills WHERE name = 'Figma')),
((SELECT id FROM users WHERE email = 'emma.wilson@email.com'), (SELECT id FROM skills WHERE name = 'UI/UX Design')),
((SELECT id FROM users WHERE email = 'emma.wilson@email.com'), (SELECT id FROM skills WHERE name = 'Prototyping')),
((SELECT id FROM users WHERE email = 'emma.wilson@email.com'), (SELECT id FROM skills WHERE name = 'HTML/CSS')),
((SELECT id FROM users WHERE email = 'emma.wilson@email.com'), (SELECT id FROM skills WHERE name = 'Tailwind CSS')),
((SELECT id FROM users WHERE email = 'emma.wilson@email.com'), (SELECT id FROM skills WHERE name = 'React'));

-- Kenji Tanaka - Blockchain Developer
INSERT INTO user_skills (user_id, skill_id) VALUES
((SELECT id FROM users WHERE email = 'kenji.tanaka@email.com'), (SELECT id FROM skills WHERE name = 'Solidity')),
((SELECT id FROM users WHERE email = 'kenji.tanaka@email.com'), (SELECT id FROM skills WHERE name = 'Ethereum')),
((SELECT id FROM users WHERE email = 'kenji.tanaka@email.com'), (SELECT id FROM skills WHERE name = 'Web3.js')),
((SELECT id FROM users WHERE email = 'kenji.tanaka@email.com'), (SELECT id FROM skills WHERE name = 'Smart Contracts')),
((SELECT id FROM users WHERE email = 'kenji.tanaka@email.com'), (SELECT id FROM skills WHERE name = 'Node.js')),
((SELECT id FROM users WHERE email = 'kenji.tanaka@email.com'), (SELECT id FROM skills WHERE name = 'React'));

-- Sofia Martinez - Data Scientist
INSERT INTO user_skills (user_id, skill_id) VALUES
((SELECT id FROM users WHERE email = 'sofia.martinez@email.com'), (SELECT id FROM skills WHERE name = 'Python')),
((SELECT id FROM users WHERE email = 'sofia.martinez@email.com'), (SELECT id FROM skills WHERE name = 'Python Data Science')),
((SELECT id FROM users WHERE email = 'sofia.martinez@email.com'), (SELECT id FROM skills WHERE name = 'Pandas')),
((SELECT id FROM users WHERE email = 'sofia.martinez@email.com'), (SELECT id FROM skills WHERE name = 'NumPy')),
((SELECT id FROM users WHERE email = 'sofia.martinez@email.com'), (SELECT id FROM skills WHERE name = 'Data Visualization')),
((SELECT id FROM users WHERE email = 'sofia.martinez@email.com'), (SELECT id FROM skills WHERE name = 'scikit-learn')),
((SELECT id FROM users WHERE email = 'sofia.martinez@email.com'), (SELECT id FROM skills WHERE name = 'PostgreSQL'));

-- David Kim - DevOps Engineer
INSERT INTO user_skills (user_id, skill_id) VALUES
((SELECT id FROM users WHERE email = 'david.kim@email.com'), (SELECT id FROM skills WHERE name = 'Docker')),
((SELECT id FROM users WHERE email = 'david.kim@email.com'), (SELECT id FROM skills WHERE name = 'Kubernetes')),
((SELECT id FROM users WHERE email = 'david.kim@email.com'), (SELECT id FROM skills WHERE name = 'AWS')),
((SELECT id FROM users WHERE email = 'david.kim@email.com'), (SELECT id FROM skills WHERE name = 'Terraform')),
((SELECT id FROM users WHERE email = 'david.kim@email.com'), (SELECT id FROM skills WHERE name = 'CI/CD')),
((SELECT id FROM users WHERE email = 'david.kim@email.com'), (SELECT id FROM skills WHERE name = 'Jenkins')),
((SELECT id FROM users WHERE email = 'david.kim@email.com'), (SELECT id FROM skills WHERE name = 'Git'));

-- Olivia Brown - Frontend Developer
INSERT INTO user_skills (user_id, skill_id) VALUES
((SELECT id FROM users WHERE email = 'olivia.brown@email.com'), (SELECT id FROM skills WHERE name = 'React')),
((SELECT id FROM users WHERE email = 'olivia.brown@email.com'), (SELECT id FROM skills WHERE name = 'Next.js')),
((SELECT id FROM users WHERE email = 'olivia.brown@email.com'), (SELECT id FROM skills WHERE name = 'TypeScript')),
((SELECT id FROM users WHERE email = 'olivia.brown@email.com'), (SELECT id FROM skills WHERE name = 'Tailwind CSS')),
((SELECT id FROM users WHERE email = 'olivia.brown@email.com'), (SELECT id FROM skills WHERE name = 'HTML/CSS')),
((SELECT id FROM users WHERE email = 'olivia.brown@email.com'), (SELECT id FROM skills WHERE name = 'Redux')),
((SELECT id FROM users WHERE email = 'olivia.brown@email.com'), (SELECT id FROM skills WHERE name = 'Git'));

-- Raj Patel - Full Stack (MERN)
INSERT INTO user_skills (user_id, skill_id) VALUES
((SELECT id FROM users WHERE email = 'raj.patel@email.com'), (SELECT id FROM skills WHERE name = 'React')),
((SELECT id FROM users WHERE email = 'raj.patel@email.com'), (SELECT id FROM skills WHERE name = 'Node.js')),
((SELECT id FROM users WHERE email = 'raj.patel@email.com'), (SELECT id FROM skills WHERE name = 'Express.js')),
((SELECT id FROM users WHERE email = 'raj.patel@email.com'), (SELECT id FROM skills WHERE name = 'MongoDB')),
((SELECT id FROM users WHERE email = 'raj.patel@email.com'), (SELECT id FROM skills WHERE name = 'TypeScript')),
((SELECT id FROM users WHERE email = 'raj.patel@email.com'), (SELECT id FROM skills WHERE name = 'REST API')),
((SELECT id FROM users WHERE email = 'raj.patel@email.com'), (SELECT id FROM skills WHERE name = 'Git'));

-- Lisa Anderson - Game Developer
INSERT INTO user_skills (user_id, skill_id) VALUES
((SELECT id FROM users WHERE email = 'lisa.anderson@email.com'), (SELECT id FROM skills WHERE name = 'TypeScript')),
((SELECT id FROM users WHERE email = 'lisa.anderson@email.com'), (SELECT id FROM skills WHERE name = 'Python')),
((SELECT id FROM users WHERE email = 'lisa.anderson@email.com'), (SELECT id FROM skills WHERE name = 'HTML/CSS')),
((SELECT id FROM users WHERE email = 'lisa.anderson@email.com'), (SELECT id FROM skills WHERE name = 'Git'));

-- Ahmed Hassan - Security Engineer
INSERT INTO user_skills (user_id, skill_id) VALUES
((SELECT id FROM users WHERE email = 'ahmed.hassan@email.com'), (SELECT id FROM skills WHERE name = 'Security')),
((SELECT id FROM users WHERE email = 'ahmed.hassan@email.com'), (SELECT id FROM skills WHERE name = 'Python')),
((SELECT id FROM users WHERE email = 'ahmed.hassan@email.com'), (SELECT id FROM skills WHERE name = 'Java')),
((SELECT id FROM users WHERE email = 'ahmed.hassan@email.com'), (SELECT id FROM skills WHERE name = 'Solidity')),
((SELECT id FROM users WHERE email = 'ahmed.hassan@email.com'), (SELECT id FROM skills WHERE name = 'PostgreSQL')),
((SELECT id FROM users WHERE email = 'ahmed.hassan@email.com'), (SELECT id FROM skills WHERE name = 'Docker')),
((SELECT id FROM users WHERE email = 'ahmed.hassan@email.com'), (SELECT id FROM skills WHERE name = 'Git'));

-- Nina Kowalski - PM/Developer
INSERT INTO user_skills (user_id, skill_id) VALUES
((SELECT id FROM users WHERE email = 'nina.kowalski@email.com'), (SELECT id FROM skills WHERE name = 'React')),
((SELECT id FROM users WHERE email = 'nina.kowalski@email.com'), (SELECT id FROM skills WHERE name = 'Python')),
((SELECT id FROM users WHERE email = 'nina.kowalski@email.com'), (SELECT id FROM skills WHERE name = 'Agile')),
((SELECT id FROM users WHERE email = 'nina.kowalski@email.com'), (SELECT id FROM skills WHERE name = 'UI/UX Design')),
((SELECT id FROM users WHERE email = 'nina.kowalski@email.com'), (SELECT id FROM skills WHERE name = 'Technical Writing')),
((SELECT id FROM users WHERE email = 'nina.kowalski@email.com'), (SELECT id FROM skills WHERE name = 'Git'));

-- Carlos Santos - iOS Developer
INSERT INTO user_skills (user_id, skill_id) VALUES
((SELECT id FROM users WHERE email = 'carlos.santos@email.com'), (SELECT id FROM skills WHERE name = 'Swift')),
((SELECT id FROM users WHERE email = 'carlos.santos@email.com'), (SELECT id FROM skills WHERE name = 'iOS Development')),
((SELECT id FROM users WHERE email = 'carlos.santos@email.com'), (SELECT id FROM skills WHERE name = 'REST API')),
((SELECT id FROM users WHERE email = 'carlos.santos@email.com'), (SELECT id FROM skills WHERE name = 'Firebase')),
((SELECT id FROM users WHERE email = 'carlos.santos@email.com'), (SELECT id FROM skills WHERE name = 'Git'));

-- Maya Nguyen - Junior Developer
INSERT INTO user_skills (user_id, skill_id) VALUES
((SELECT id FROM users WHERE email = 'maya.nguyen@email.com'), (SELECT id FROM skills WHERE name = 'Python')),
((SELECT id FROM users WHERE email = 'maya.nguyen@email.com'), (SELECT id FROM skills WHERE name = 'React')),
((SELECT id FROM users WHERE email = 'maya.nguyen@email.com'), (SELECT id FROM skills WHERE name = 'HTML/CSS')),
((SELECT id FROM users WHERE email = 'maya.nguyen@email.com'), (SELECT id FROM skills WHERE name = 'Git'));

-- ============================================
-- PROJECTS DATA
-- ============================================

-- Project 1: FinTech Payment Gateway (Sarah Chen)
INSERT INTO projects (title, description, creator_id, project_type, status, start_date, end_date, max_team_size, current_team_size, repository_url, is_open, created_at, updated_at)
VALUES (
  'SecurePay - Payment Gateway Platform',
  'Building a modern payment gateway for small businesses with fraud detection, multi-currency support, and easy integration. Looking for backend developers familiar with payment processing and security.',
  (SELECT id FROM users WHERE email = 'sarah.chen@email.com'), 'SIDE_PROJECT', 'IN_PROGRESS',
  '2024-09-01', '2025-03-01', 5, 2,
  'https://github.com/sarachen/securepay',
  true, NOW() - INTERVAL '2 months', NOW()
);

-- Project 2: E-commerce Microservices (Marcus Johnson)
INSERT INTO projects (title, description, creator_id, project_type, status, start_date, end_date, max_team_size, current_team_size, repository_url, is_open, created_at, updated_at)
VALUES (
  'ShopMaster - Microservices E-commerce Platform',
  'Enterprise-grade e-commerce platform built with microservices architecture. Features include inventory management, order processing, and analytics. Seeking frontend and DevOps engineers.',
  (SELECT id FROM users WHERE email = 'marcus.j@email.com'), 'STARTUP', 'IN_PROGRESS',
  '2024-07-01', '2025-06-01', 8, 3,
  'https://github.com/marcusjdev/shopmaster',
  true, NOW() - INTERVAL '4 months', NOW()
);

-- Project 3: Medical AI Diagnostics (Priya Sharma)
INSERT INTO projects (title, description, creator_id, project_type, status, start_date, end_date, max_team_size, current_team_size, repository_url, is_open, created_at, updated_at)
VALUES (
  'MedAI - AI-Powered Medical Image Analysis',
  'Developing deep learning models for medical image analysis to assist doctors in early disease detection. Using computer vision and NLP for patient record analysis.',
  (SELECT id FROM users WHERE email = 'priya.sharma@email.com'), 'RESEARCH', 'IN_PROGRESS',
  '2024-06-01', '2025-05-01', 4, 2,
  'https://github.com/priyasharma-ml/medai',
  true, NOW() - INTERVAL '5 months', NOW()
);

-- Project 4: EdTech Learning App (Alex Rivera)
INSERT INTO projects (title, description, creator_id, project_type, status, start_date, end_date, max_team_size, current_team_size, repository_url, is_open, created_at, updated_at)
VALUES (
  'LearnHub - Interactive Learning Platform',
  'Mobile-first learning platform with gamification, progress tracking, and AI-powered recommendations. Built with React Native. Looking for designers and backend developers.',
  (SELECT id FROM users WHERE email = 'alex.rivera@email.com'), 'SIDE_PROJECT', 'IN_PROGRESS',
  '2024-10-01', '2025-04-01', 5, 2,
  'https://github.com/alexrivera/learnhub',
  true, NOW() - INTERVAL '1 month', NOW()
);

-- Project 5: Social Media Dashboard (Emma Wilson)
INSERT INTO projects (title, description, creator_id, project_type, status, start_date, end_date, max_team_size, current_team_size, repository_url, is_open, created_at, updated_at)
VALUES (
  'SocialPulse - Analytics Dashboard',
  'Beautiful analytics dashboard for social media managers. Aggregates data from multiple platforms with real-time insights. Need full-stack developers familiar with data visualization.',
  (SELECT id FROM users WHERE email = 'emma.wilson@email.com'), 'PORTFOLIO', 'IN_PROGRESS',
  '2024-09-15', '2024-12-15', 3, 1,
  'https://github.com/emmawilson/socialpulse',
  true, NOW() - INTERVAL '1.5 months', NOW()
);

-- Project 6: DeFi Lending Platform (Kenji Tanaka)
INSERT INTO projects (title, description, creator_id, project_type, status, start_date, end_date, max_team_size, current_team_size, repository_url, is_open, created_at, updated_at)
VALUES (
  'DeFiLend - Decentralized Lending Protocol',
  'Building a decentralized lending and borrowing platform on Ethereum. Smart contracts for collateral management, interest calculation, and liquidation. Looking for Solidity and frontend developers.',
  (SELECT id FROM users WHERE email = 'kenji.tanaka@email.com'), 'OPEN_SOURCE', 'IN_PROGRESS',
  '2024-08-01', '2025-02-01', 6, 3,
  'https://github.com/kenjitanaka/defilend',
  true, NOW() - INTERVAL '3 months', NOW()
);

-- Project 7: Health Data Platform (Sofia Martinez)
INSERT INTO projects (title, description, creator_id, project_type, status, start_date, end_date, max_team_size, current_team_size, repository_url, is_open, created_at, updated_at)
VALUES (
  'HealthTrack - Personal Health Analytics',
  'Data platform for aggregating and analyzing personal health data from wearables and medical records. Privacy-focused with end-to-end encryption. Need backend and mobile developers.',
  (SELECT id FROM users WHERE email = 'sofia.martinez@email.com'), 'SIDE_PROJECT', 'PLANNING',
  '2024-12-01', '2025-06-01', 4, 1,
  'https://github.com/sofiamartinez/healthtrack',
  true, NOW() - INTERVAL '10 days', NOW()
);

-- Project 8: Cloud Infrastructure Tool (David Kim)
INSERT INTO projects (title, description, creator_id, project_type, status, start_date, end_date, max_team_size, current_team_size, repository_url, is_open, created_at, updated_at)
VALUES (
  'CloudOps - Infrastructure Management Tool',
  'Open-source tool for managing multi-cloud infrastructure with Terraform and Kubernetes. Includes cost optimization and security scanning. Looking for Go and Python developers.',
  (SELECT id FROM users WHERE email = 'david.kim@email.com'), 'OPEN_SOURCE', 'IN_PROGRESS',
  '2024-07-15', '2025-01-15', 5, 2,
  'https://github.com/davidkim-ops/cloudops',
  true, NOW() - INTERVAL '3.5 months', NOW()
);

-- Project 9: Developer Portfolio Builder (Olivia Brown)
INSERT INTO projects (title, description, creator_id, project_type, status, start_date, end_date, max_team_size, current_team_size, repository_url, is_open, created_at, updated_at)
VALUES (
  'PortfolioGen - Automated Portfolio Generator',
  'Tool that automatically generates beautiful developer portfolios from GitHub data. Built with Next.js and Tailwind. Open for contributions!',
  (SELECT id FROM users WHERE email = 'olivia.brown@email.com'), 'OPEN_SOURCE', 'IN_PROGRESS',
  '2024-09-01', '2024-12-31', 4, 2,
  'https://github.com/oliviabrown/portfoliogen',
  true, NOW() - INTERVAL '2 months', NOW()
);

-- Project 10: Online Tutoring Platform (Raj Patel)
INSERT INTO projects (title, description, creator_id, project_type, status, start_date, end_date, max_team_size, current_team_size, repository_url, is_open, created_at, updated_at)
VALUES (
  'TutorConnect - Video Tutoring Platform',
  'Platform connecting students with tutors for live video sessions. Features scheduling, payments, and recording. Built with MERN stack. Looking for WebRTC and payment integration help.',
  (SELECT id FROM users WHERE email = 'raj.patel@email.com'), 'STARTUP', 'IN_PROGRESS',
  '2024-08-15', '2025-03-15', 6, 2,
  'https://github.com/rajpatel/tutorconnect',
  true, NOW() - INTERVAL '2.5 months', NOW()
);

-- Project 11: VR Multiplayer Game (Lisa Anderson)
INSERT INTO projects (title, description, creator_id, project_type, status, start_date, end_date, max_team_size, current_team_size, repository_url, is_open, created_at, updated_at)
VALUES (
  'VRQuest - Multiplayer VR Adventure',
  'Immersive VR adventure game with multiplayer support. Focus on puzzle-solving and cooperative gameplay. Looking for 3D artists, game designers, and backend developers for networking.',
  (SELECT id FROM users WHERE email = 'lisa.anderson@email.com'), 'SIDE_PROJECT', 'IN_PROGRESS',
  '2024-06-01', '2025-04-01', 7, 3,
  'https://github.com/lisaanderson/vrquest',
  true, NOW() - INTERVAL '5 months', NOW()
);

-- Project 12: Blockchain Security Audit Tool (Ahmed Hassan)
INSERT INTO projects (title, description, creator_id, project_type, status, start_date, end_date, max_team_size, current_team_size, repository_url, is_open, created_at, updated_at)
VALUES (
  'SecureChain - Smart Contract Auditor',
  'Automated security audit tool for smart contracts. Uses static analysis and ML to detect vulnerabilities. Open-source project. Need Solidity experts and ML engineers.',
  (SELECT id FROM users WHERE email = 'ahmed.hassan@email.com'), 'OPEN_SOURCE', 'IN_PROGRESS',
  '2024-09-01', '2025-02-01', 5, 2,
  'https://github.com/ahmedhassan/securechain',
  true, NOW() - INTERVAL '2 months', NOW()
);

-- Project 13: Community Platform (Nina Kowalski)
INSERT INTO projects (title, description, creator_id, project_type, status, start_date, end_date, max_team_size, current_team_size, repository_url, is_open, created_at, updated_at)
VALUES (
  'LocalConnect - Community Building Platform',
  'Platform for local communities to organize events, share resources, and stay connected. Focus on privacy and meaningful connections. Need full-stack developers.',
  (SELECT id FROM users WHERE email = 'nina.kowalski@email.com'), 'SIDE_PROJECT', 'PLANNING',
  '2024-11-15', '2025-05-15', 4, 1,
  'https://github.com/ninakowalski/localconnect',
  true, NOW() - INTERVAL '15 days', NOW()
);

-- Project 14: Fitness Tracking App (Carlos Santos)
INSERT INTO projects (title, description, creator_id, project_type, status, start_date, end_date, max_team_size, current_team_size, repository_url, is_open, created_at, updated_at)
VALUES (
  'FitTrack Pro - AI Fitness Coach',
  'iOS app with AI-powered workout recommendations and form correction using computer vision. Integrates with Apple Health. Looking for ML engineers and backend developers.',
  (SELECT id FROM users WHERE email = 'carlos.santos@email.com'), 'PORTFOLIO', 'IN_PROGRESS',
  '2024-10-01', '2025-02-01', 3, 1,
  'https://github.com/carlossantos/fittrack',
  true, NOW() - INTERVAL '1 month', NOW()
);

-- Project 15: Open Source ML Library (Maya Nguyen)
INSERT INTO projects (title, description, creator_id, project_type, status, start_date, end_date, max_team_size, current_team_size, repository_url, is_open, created_at, updated_at)
VALUES (
  'EasyML - Beginner-Friendly ML Library',
  'Python library that makes machine learning accessible for beginners. Clear documentation and simple APIs. First open-source project - mentors welcome!',
  (SELECT id FROM users WHERE email = 'maya.nguyen@email.com'), 'OPEN_SOURCE', 'PLANNING',
  '2024-11-01', '2025-03-01', 5, 1,
  'https://github.com/mayanguyen/easyml',
  true, NOW() - INTERVAL '7 days', NOW()
);

-- Project 16: Hackathon - AI Climate Solutions (Multi-creator)
INSERT INTO projects (title, description, creator_id, project_type, status, start_date, end_date, max_team_size, current_team_size, repository_url, is_open, created_at, updated_at)
VALUES (
  'ClimateAI - Carbon Footprint Tracker',
  'Hackathon project for building an AI-powered carbon footprint tracker. 48-hour sprint. Need diverse skills: ML, mobile, backend, design.',
  (SELECT id FROM users WHERE email = 'priya.sharma@email.com'), 'HACKATHON', 'PLANNING',
  '2024-12-15', '2024-12-17', 6, 1,
  'https://github.com/hackathon/climateai',
  true, NOW() - INTERVAL '3 days', NOW()
);

-- Project 17: Crypto Wallet (Advanced)
INSERT INTO projects (title, description, creator_id, project_type, status, start_date, end_date, max_team_size, current_team_size, repository_url, is_open, created_at, updated_at)
VALUES (
  'MultiChain Wallet - Web3 Wallet',
  'Non-custodial wallet supporting multiple blockchains with built-in DEX aggregator. Focus on security and UX. Need blockchain and mobile developers.',
  (SELECT id FROM users WHERE email = 'kenji.tanaka@email.com'), 'STARTUP', 'IN_PROGRESS',
  '2024-08-01', '2025-08-01', 8, 4,
  'https://github.com/kenjitanaka/multichain-wallet',
  true, NOW() - INTERVAL '3 months', NOW()
);

-- Project 18: Real-time Collaboration Tool
INSERT INTO projects (title, description, creator_id, project_type, status, start_date, end_date, max_team_size, current_team_size, repository_url, is_open, created_at, updated_at)
VALUES (
  'CodeCollab - Real-time Code Editor',
  'Browser-based collaborative code editor with video chat. Like Google Docs for code. Built with WebRTC and operational transforms. Need React and Node.js developers.',
  (SELECT id FROM users WHERE email = 'olivia.brown@email.com'), 'SIDE_PROJECT', 'IN_PROGRESS',
  '2024-10-01', '2025-03-01', 5, 2,
  'https://github.com/oliviabrown/codecollab',
  true, NOW() - INTERVAL '1 month', NOW()
);

-- ============================================
-- PROJECT SKILLS
-- ============================================

-- Project 1: SecurePay
INSERT INTO project_skills (project_id, skill_id) VALUES
(1, (SELECT id FROM skills WHERE name = 'Node.js')),
(1, (SELECT id FROM skills WHERE name = 'TypeScript')),
(1, (SELECT id FROM skills WHERE name = 'PostgreSQL')),
(1, (SELECT id FROM skills WHERE name = 'Security')),
(1, (SELECT id FROM skills WHERE name = 'REST API'));

-- Project 2: ShopMaster
INSERT INTO project_skills (project_id, skill_id) VALUES
(2, (SELECT id FROM skills WHERE name = 'Java')),
(2, (SELECT id FROM skills WHERE name = 'Spring Boot')),
(2, (SELECT id FROM skills WHERE name = 'Docker')),
(2, (SELECT id FROM skills WHERE name = 'Kubernetes')),
(2, (SELECT id FROM skills WHERE name = 'React')),
(2, (SELECT id FROM skills WHERE name = 'PostgreSQL'));

-- Project 3: MedAI
INSERT INTO project_skills (project_id, skill_id) VALUES
(3, (SELECT id FROM skills WHERE name = 'Python')),
(3, (SELECT id FROM skills WHERE name = 'TensorFlow')),
(3, (SELECT id FROM skills WHERE name = 'PyTorch')),
(3, (SELECT id FROM skills WHERE name = 'Computer Vision')),
(3, (SELECT id FROM skills WHERE name = 'NLP'));

-- Project 4: LearnHub
INSERT INTO project_skills (project_id, skill_id) VALUES
(4, (SELECT id FROM skills WHERE name = 'React Native')),
(4, (SELECT id FROM skills WHERE name = 'Node.js')),
(4, (SELECT id FROM skills WHERE name = 'Firebase')),
(4, (SELECT id FROM skills WHERE name = 'UI/UX Design'));

-- Project 5: SocialPulse
INSERT INTO project_skills (project_id, skill_id) VALUES
(5, (SELECT id FROM skills WHERE name = 'React')),
(5, (SELECT id FROM skills WHERE name = 'Next.js')),
(5, (SELECT id FROM skills WHERE name = 'TypeScript')),
(5, (SELECT id FROM skills WHERE name = 'Data Visualization')),
(5, (SELECT id FROM skills WHERE name = 'Node.js'));

-- Project 6: DeFiLend
INSERT INTO project_skills (project_id, skill_id) VALUES
(6, (SELECT id FROM skills WHERE name = 'Solidity')),
(6, (SELECT id FROM skills WHERE name = 'Ethereum')),
(6, (SELECT id FROM skills WHERE name = 'Web3.js')),
(6, (SELECT id FROM skills WHERE name = 'React')),
(6, (SELECT id FROM skills WHERE name = 'Smart Contracts'));

-- Project 7: HealthTrack
INSERT INTO project_skills (project_id, skill_id) VALUES
(7, (SELECT id FROM skills WHERE name = 'Python')),
(7, (SELECT id FROM skills WHERE name = 'PostgreSQL')),
(7, (SELECT id FROM skills WHERE name = 'React Native')),
(7, (SELECT id FROM skills WHERE name = 'Security'));

-- Project 8: CloudOps
INSERT INTO project_skills (project_id, skill_id) VALUES
(8, (SELECT id FROM skills WHERE name = 'Go')),
(8, (SELECT id FROM skills WHERE name = 'Python')),
(8, (SELECT id FROM skills WHERE name = 'Docker')),
(8, (SELECT id FROM skills WHERE name = 'Kubernetes')),
(8, (SELECT id FROM skills WHERE name = 'Terraform'));

-- Project 9: PortfolioGen
INSERT INTO project_skills (project_id, skill_id) VALUES
(9, (SELECT id FROM skills WHERE name = 'Next.js')),
(9, (SELECT id FROM skills WHERE name = 'React')),
(9, (SELECT id FROM skills WHERE name = 'Tailwind CSS')),
(9, (SELECT id FROM skills WHERE name = 'TypeScript'));

-- Project 10: TutorConnect
INSERT INTO project_skills (project_id, skill_id) VALUES
(10, (SELECT id FROM skills WHERE name = 'React')),
(10, (SELECT id FROM skills WHERE name = 'Node.js')),
(10, (SELECT id FROM skills WHERE name = 'MongoDB')),
(10, (SELECT id FROM skills WHERE name = 'Express.js'));

-- Project 11: VRQuest
INSERT INTO project_skills (project_id, skill_id) VALUES
(11, (SELECT id FROM skills WHERE name = 'JavaScript')),
(11, (SELECT id FROM skills WHERE name = 'Node.js')),
(11, (SELECT id FROM skills WHERE name = 'UI/UX Design'));

-- Project 12: SecureChain
INSERT INTO project_skills (project_id, skill_id) VALUES
(12, (SELECT id FROM skills WHERE name = 'Solidity')),
(12, (SELECT id FROM skills WHERE name = 'Python')),
(12, (SELECT id FROM skills WHERE name = 'Machine Learning')),
(12, (SELECT id FROM skills WHERE name = 'Security'));

-- Project 13: LocalConnect
INSERT INTO project_skills (project_id, skill_id) VALUES
(13, (SELECT id FROM skills WHERE name = 'React')),
(13, (SELECT id FROM skills WHERE name = 'Node.js')),
(13, (SELECT id FROM skills WHERE name = 'PostgreSQL')),
(13, (SELECT id FROM skills WHERE name = 'UI/UX Design'));

-- Project 14: FitTrack Pro
INSERT INTO project_skills (project_id, skill_id) VALUES
(14, (SELECT id FROM skills WHERE name = 'Swift')),
(14, (SELECT id FROM skills WHERE name = 'iOS Development')),
(14, (SELECT id FROM skills WHERE name = 'Computer Vision')),
(14, (SELECT id FROM skills WHERE name = 'Python'));

-- Project 15: EasyML
INSERT INTO project_skills (project_id, skill_id) VALUES
(15, (SELECT id FROM skills WHERE name = 'Python')),
(15, (SELECT id FROM skills WHERE name = 'Machine Learning')),
(15, (SELECT id FROM skills WHERE name = 'scikit-learn'));

-- Project 16: ClimateAI
INSERT INTO project_skills (project_id, skill_id) VALUES
(16, (SELECT id FROM skills WHERE name = 'Python')),
(16, (SELECT id FROM skills WHERE name = 'Machine Learning')),
(16, (SELECT id FROM skills WHERE name = 'React Native')),
(16, (SELECT id FROM skills WHERE name = 'UI/UX Design'));

-- Project 17: MultiChain Wallet
INSERT INTO project_skills (project_id, skill_id) VALUES
(17, (SELECT id FROM skills WHERE name = 'Solidity')),
(17, (SELECT id FROM skills WHERE name = 'React Native')),
(17, (SELECT id FROM skills WHERE name = 'Web3.js')),
(17, (SELECT id FROM skills WHERE name = 'Security'));

-- Project 18: CodeCollab
INSERT INTO project_skills (project_id, skill_id) VALUES
(18, (SELECT id FROM skills WHERE name = 'React')),
(18, (SELECT id FROM skills WHERE name = 'Node.js')),
(18, (SELECT id FROM skills WHERE name = 'TypeScript')),
(18, (SELECT id FROM skills WHERE name = 'WebSockets'));

-- ============================================
-- PROJECT TAGS
-- ============================================

INSERT INTO project_tags (project_id, tag) VALUES
(1, 'fintech'), (1, 'payments'), (1, 'security'), (1, 'api'),
(2, 'e-commerce'), (2, 'microservices'), (2, 'scalability'), (2, 'cloud'),
(3, 'healthcare'), (3, 'ai'), (3, 'computer-vision'), (3, 'research'),
(4, 'edtech'), (4, 'mobile'), (4, 'gamification'), (4, 'learning'),
(5, 'social-media'), (5, 'analytics'), (5, 'dashboard'), (5, 'design'),
(6, 'blockchain'), (6, 'defi'), (6, 'web3'), (6, 'ethereum'),
(7, 'healthtech'), (7, 'privacy'), (7, 'data-analytics'), (7, 'wearables'),
(8, 'devops'), (8, 'infrastructure'), (8, 'cloud'), (8, 'open-source'),
(9, 'developer-tools'), (9, 'portfolio'), (9, 'automation'), (9, 'open-source'),
(10, 'edtech'), (10, 'video'), (10, 'tutoring'), (10, 'startup'),
(11, 'gaming'), (11, 'vr'), (11, 'multiplayer'), (11, 'entertainment'),
(12, 'blockchain'), (12, 'security'), (12, 'auditing'), (12, 'open-source'),
(13, 'social'), (13, 'community'), (13, 'events'), (13, 'privacy'),
(14, 'fitness'), (14, 'healthtech'), (14, 'ai'), (14, 'mobile'),
(15, 'machine-learning'), (15, 'education'), (15, 'library'), (15, 'open-source'),
(16, 'hackathon'), (16, 'climate'), (16, 'ai'), (16, 'sustainability'),
(17, 'crypto'), (17, 'wallet'), (17, 'web3'), (17, 'security'),
(18, 'collaboration'), (18, 'real-time'), (18, 'developer-tools'), (18, 'webrtc');

-- ============================================
-- PROJECT TEAM MEMBERS (Collaborations)
-- ============================================

-- Add team members to various projects
INSERT INTO project_team_members (project_id, user_id) VALUES
-- Project 1: SecurePay (Sarah's project + Marcus)
((SELECT id FROM projects WHERE title = 'SecurePay - Payment Gateway Platform'), (SELECT id FROM users WHERE email = 'marcus.j@email.com')),

-- Project 2: ShopMaster (Marcus's project + David, Sarah)
((SELECT id FROM projects WHERE title = 'ShopMaster - Microservices E-commerce Platform'), (SELECT id FROM users WHERE email = 'david.kim@email.com')),
((SELECT id FROM projects WHERE title = 'ShopMaster - Microservices E-commerce Platform'), (SELECT id FROM users WHERE email = 'sarah.chen@email.com')),

-- Project 3: MedAI (Priya's project + Sofia)
((SELECT id FROM projects WHERE title = 'MedAI - AI-Powered Medical Image Analysis'), (SELECT id FROM users WHERE email = 'sofia.martinez@email.com')),

-- Project 4: LearnHub (Alex's project + Emma)
((SELECT id FROM projects WHERE title = 'LearnHub - Interactive Learning Platform'), (SELECT id FROM users WHERE email = 'emma.wilson@email.com')),

-- Project 6: DeFiLend (Kenji's project + Ahmed, Olivia)
((SELECT id FROM projects WHERE title = 'DeFiLend - Decentralized Lending Protocol'), (SELECT id FROM users WHERE email = 'ahmed.hassan@email.com')),
((SELECT id FROM projects WHERE title = 'DeFiLend - Decentralized Lending Protocol'), (SELECT id FROM users WHERE email = 'olivia.brown@email.com')),

-- Project 8: CloudOps (David's project + Marcus)
((SELECT id FROM projects WHERE title = 'CloudOps - Infrastructure Management Tool'), (SELECT id FROM users WHERE email = 'marcus.j@email.com')),

-- Project 9: PortfolioGen (Olivia's project + Raj)
((SELECT id FROM projects WHERE title = 'PortfolioGen - Automated Portfolio Generator'), (SELECT id FROM users WHERE email = 'raj.patel@email.com')),

-- Project 10: TutorConnect (Raj's project + Alex)
((SELECT id FROM projects WHERE title = 'TutorConnect - Video Tutoring Platform'), (SELECT id FROM users WHERE email = 'alex.rivera@email.com')),

-- Project 11: VRQuest (Lisa's project + multiple)
((SELECT id FROM projects WHERE title = 'VRQuest - Multiplayer VR Adventure'), (SELECT id FROM users WHERE email = 'alex.rivera@email.com')),
((SELECT id FROM projects WHERE title = 'VRQuest - Multiplayer VR Adventure'), (SELECT id FROM users WHERE email = 'emma.wilson@email.com')),

-- Project 12: SecureChain (Ahmed's project + Kenji)
((SELECT id FROM projects WHERE title = 'SecureChain - Smart Contract Auditor'), (SELECT id FROM users WHERE email = 'kenji.tanaka@email.com')),

-- Project 17: MultiChain Wallet (Kenji's project + Ahmed, Carlos, Sarah)
((SELECT id FROM projects WHERE title = 'MultiChain Wallet - Web3 Wallet'), (SELECT id FROM users WHERE email = 'ahmed.hassan@email.com')),
((SELECT id FROM projects WHERE title = 'MultiChain Wallet - Web3 Wallet'), (SELECT id FROM users WHERE email = 'carlos.santos@email.com')),
((SELECT id FROM projects WHERE title = 'MultiChain Wallet - Web3 Wallet'), (SELECT id FROM users WHERE email = 'sarah.chen@email.com')),

-- Project 18: CodeCollab (Olivia's project + Raj)
((SELECT id FROM projects WHERE title = 'CodeCollab - Real-time Code Editor'), (SELECT id FROM users WHERE email = 'raj.patel@email.com'));

-- ============================================
-- SAMPLE MATCHES (Potential Collaborations)
-- ============================================

INSERT INTO matches (requester_id, recipient_id, project_id, match_score, match_explanation, status, message, created_at, updated_at)
VALUES
-- Sarah wants Marcus for SecurePay
((SELECT id FROM users WHERE email = 'sarah.chen@email.com'), (SELECT id FROM users WHERE email = 'marcus.j@email.com'), (SELECT id FROM projects WHERE title = 'SecurePay - Payment Gateway Platform'), 0.92, 
'Marcus has extensive backend experience with Java and Spring Boot, plus strong security background. His AWS expertise would be valuable for scaling the payment gateway.',
'ACCEPTED', 'I''d love to help with the payment processing backend. I have experience with payment APIs.',
NOW() - INTERVAL '1 month', NOW() - INTERVAL '1 month'),

-- Alex wants Emma for LearnHub
((SELECT id FROM users WHERE email = 'alex.rivera@email.com'), (SELECT id FROM users WHERE email = 'emma.wilson@email.com'), (SELECT id FROM projects WHERE title = 'LearnHub - Interactive Learning Platform'), 0.88,
'Emma''s UI/UX design skills would greatly enhance LearnHub''s user experience. Her work on social platforms aligns well with the community aspect.',
'ACCEPTED', 'This sounds like a great project! I can help design an engaging learning interface.',
NOW() - INTERVAL '20 days', NOW() - INTERVAL '20 days'),

-- Kenji wants Ahmed for DeFiLend
((SELECT id FROM users WHERE email = 'kenji.tanaka@email.com'), (SELECT id FROM users WHERE email = 'ahmed.hassan@email.com'), (SELECT id FROM projects WHERE title = 'DeFiLend - Decentralized Lending Protocol'), 0.95,
'Ahmed''s security expertise is crucial for a DeFi platform. His experience in smart contract auditing would help ensure the protocol is secure.',
'ACCEPTED', 'Security is critical for DeFi. I can review your smart contracts and implement security best practices.',
NOW() - INTERVAL '2 months', NOW() - INTERVAL '2 months'),

-- Priya wants Sofia for MedAI
((SELECT id FROM users WHERE email = 'priya.sharma@email.com'), (SELECT id FROM users WHERE email = 'sofia.martinez@email.com'), (SELECT id FROM projects WHERE title = 'MedAI - AI-Powered Medical Image Analysis'), 0.89,
'Sofia''s data science expertise complements the ML work perfectly. Her experience with predictive analytics would enhance the diagnostic models.',
'ACCEPTED', 'Healthcare AI is my passion. I can help with data preprocessing and model validation.',
NOW() - INTERVAL '3 months', NOW() - INTERVAL '3 months'),

-- Raj wants Alex for TutorConnect
((SELECT id FROM users WHERE email = 'raj.patel@email.com'), (SELECT id FROM users WHERE email = 'alex.rivera@email.com'), (SELECT id FROM projects WHERE title = 'TutorConnect - Video Tutoring Platform'), 0.85,
'Alex''s mobile development expertise would help create native apps for TutorConnect. His experience with educational apps is a perfect fit.',
'PENDING', 'I''m interested! I''ve built similar video chat features before. When can we discuss?',
NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days'),

-- Olivia wants Raj for PortfolioGen
((SELECT id FROM users WHERE email = 'olivia.brown@email.com'), (SELECT id FROM users WHERE email = 'raj.patel@email.com'), (SELECT id FROM projects WHERE title = 'PortfolioGen - Automated Portfolio Generator'), 0.87,
'Raj has strong full-stack MERN experience. His backend skills would help build a robust API for the portfolio generator.',
'ACCEPTED', 'Love this idea! I can help with the backend API and GitHub integration.',
NOW() - INTERVAL '1.5 months', NOW() - INTERVAL '1.5 months'),

-- David wants Marcus for CloudOps
((SELECT id FROM users WHERE email = 'david.kim@email.com'), (SELECT id FROM users WHERE email = 'marcus.j@email.com'), (SELECT id FROM projects WHERE title = 'CloudOps - Infrastructure Management Tool'), 0.91,
'Marcus''s experience with microservices and cloud architecture would be valuable for CloudOps. His Java expertise can help with the core tooling.',
'ACCEPTED', 'Infrastructure tools are interesting. I can contribute to the monitoring and cost optimization features.',
NOW() - INTERVAL '2.5 months', NOW() - INTERVAL '2.5 months'),

-- Maya wants Priya for mentorship
((SELECT id FROM users WHERE email = 'maya.nguyen@email.com'), (SELECT id FROM users WHERE email = 'priya.sharma@email.com'), NULL, 0.78,
'Priya''s ML expertise and research background would be invaluable mentorship for Maya''s open-source ML library project.',
'PENDING', 'I''m new to ML but eager to learn. Would you be open to mentoring me on my EasyML project?',
NOW() - INTERVAL '3 days', NOW()),

-- Carlos interested in Sofia's HealthTrack
((SELECT id FROM users WHERE email = 'carlos.santos@email.com'), (SELECT id FROM users WHERE email = 'sofia.martinez@email.com'), (SELECT id FROM projects WHERE title = 'HealthTrack - Personal Health Analytics'), 0.82,
'Carlos''s iOS development skills would be perfect for building the mobile app for HealthTrack. His fitness app experience is relevant.',
'PENDING', 'I''ve built health tracking apps before. Would love to contribute to the iOS version.',
NOW() - INTERVAL '2 days', NOW()),

-- Nina wants to join Emma's social project
((SELECT id FROM users WHERE email = 'nina.kowalski@email.com'), (SELECT id FROM users WHERE email = 'emma.wilson@email.com'), (SELECT id FROM projects WHERE title = 'SocialPulse - Analytics Dashboard'), 0.84,
'Nina''s product management and technical skills would help shape SocialPulse''s features and roadmap. Her React knowledge allows her to contribute code too.',
'PENDING', 'As a PM with dev background, I can help with both strategy and implementation.',
NOW() - INTERVAL '1 day', NOW());

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Count users
-- SELECT COUNT(*) as user_count FROM users;

-- Count projects
-- SELECT COUNT(*) as project_count FROM projects;

-- Count skills
-- SELECT COUNT(*) as skill_count FROM skills;

-- View users with their skills
-- SELECT u.full_name, u.experience_level, s.name as skill_name, s.category
-- FROM users u
-- JOIN user_skills us ON u.id = us.user_id
-- JOIN skills s ON us.skill_id = s.id
-- ORDER BY u.full_name, s.category;

-- View projects with required skills
-- SELECT p.title, p.project_type, p.status, s.name as required_skill
-- FROM projects p
-- JOIN project_skills ps ON p.id = ps.project_id
-- JOIN skills s ON ps.skill_id = s.id
-- ORDER BY p.title;

-- View active matches
-- SELECT 
--   u1.full_name as requester,
--   u2.full_name as recipient,
--   p.title as project,
--   m.match_score,
--   m.status
-- FROM matches m
-- JOIN users u1 ON m.requester_id = u1.id
-- JOIN users u2 ON m.recipient_id = u2.id
-- LEFT JOIN projects p ON m.project_id = p.id
-- ORDER BY m.created_at DESC;

-- ============================================
-- END OF SEED DATA
-- ============================================

-- Summary:
-- ✓ 15 diverse users across different timezones
-- ✓ 65+ skills across all categories
-- ✓ 18 projects of varying complexity and domains
-- ✓ User interests covering FinTech, EdTech, HealthTech, E-commerce, etc.
-- ✓ Project team collaborations
-- ✓ Sample matches showing potential collaborations
-- ✓ Realistic data with proper relationships

SELECT 'Seed data inserted successfully!' as status;
SELECT COUNT(*) as users FROM users;
SELECT COUNT(*) as projects FROM projects;
SELECT COUNT(*) as skills FROM skills;
SELECT COUNT(*) as matches FROM matches;
