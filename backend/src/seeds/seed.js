import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { env } from '../config/env.js';
import { User } from '../models/User.js';
import { AlumniProfile } from '../models/AlumniProfile.js';
import { VerificationRequest } from '../models/VerificationRequest.js';
import { MentorshipRequest } from '../models/MentorshipRequest.js';

async function seed() {
  console.log('[SEED] Starting deterministic demo database seed...');
  await mongoose.connect(env.MONGODB_URI);

  // Clear existing demo data cleanly
  console.log('[SEED] Purging existing demo records...');
  await MentorshipRequest.deleteMany({ isDemoData: true });
  await VerificationRequest.deleteMany({ isDemoData: true });
  await AlumniProfile.deleteMany({ isDemoData: true });
  await User.deleteMany({ email: { $regex: /@northstar\.edu$/i } });

  const salt = await bcrypt.genSalt(10);
  const adminPassword = await bcrypt.hash('AdminDemo123!', salt);
  const studentPassword = await bcrypt.hash('StudentDemo123!', salt);
  const alumniPassword = await bcrypt.hash('AlumniDemo123!', salt);

  // 1. Create Administrator
  const admin = await User.create({
    name: 'Dean Alistair Vance (Admin)',
    email: 'admin@northstar.edu',
    passwordHash: adminPassword,
    role: 'admin',
    status: 'active'
  });
  console.log(`[SEED] Created Admin: ${admin.email}`);

  // 2. Create Students
  const student1 = await User.create({
    name: 'Alex Rivera',
    email: 'student1@northstar.edu',
    passwordHash: studentPassword,
    role: 'student',
    status: 'active'
  });

  const student2 = await User.create({
    name: 'Priya Sharma',
    email: 'student2@northstar.edu',
    passwordHash: studentPassword,
    role: 'student',
    status: 'active'
  });
  console.log(`[SEED] Created Students: ${student1.email}, ${student2.email}`);

  // 3. Create Alumni Users & Profiles
  const alumniData = [
    {
      user: {
        name: 'Marcus Vance',
        email: 'marcus.vance@northstar.edu',
        passwordHash: alumniPassword,
        role: 'alumni'
      },
      profile: {
        name: 'Marcus Vance',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
        department: 'Computer Science & Engineering',
        graduationYear: 2018,
        currentRole: 'Staff Distributed Systems Engineer',
        employer: 'Stripe',
        industry: 'Fintech & Cloud Systems',
        bio: 'Alumnus from the Class of 2018. Former distributed consensus researcher. Currently designing payment reconciliation infrastructure. Passionate about helping students break into low-latency systems and large-scale backend engineering.',
        skills: ['Distributed Systems', 'Go', 'Kubernetes', 'API Design', 'System Architecture', 'Kafka'],
        mentorshipTopics: ['technical_guidance', 'mock_interview', 'career_advice'],
        availability: 'available',
        collegeVerificationStatus: 'verified',
        employmentVerificationStatus: 'unverified',
        publicLinks: [
          { title: 'GitHub', url: 'https://github.com' },
          { title: 'Personal Blog', url: 'https://example.com' }
        ],
        isDemoData: true
      }
    },
    {
      user: {
        name: 'Dr. Elena Rostova',
        email: 'elena.rostova@northstar.edu',
        passwordHash: alumniPassword,
        role: 'alumni'
      },
      profile: {
        name: 'Dr. Elena Rostova',
        avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
        department: 'Mathematics & Computer Science',
        graduationYear: 2016,
        currentRole: 'Principal Research Scientist',
        employer: 'DeepMind',
        industry: 'Artificial Intelligence',
        bio: 'Doctorate in generative models. Published author on diffusion techniques and alignment theory. Mentoring undergraduates aiming for top graduate research programs and tier-1 AI laboratories.',
        skills: ['Machine Learning', 'PyTorch', 'Research Publishing', 'Diffusion Models', 'Python', 'Linear Algebra'],
        mentorshipTopics: ['higher_studies', 'technical_guidance', 'resume_review'],
        availability: 'available',
        collegeVerificationStatus: 'verified',
        employmentVerificationStatus: 'unverified',
        publicLinks: [{ title: 'Google Scholar', url: 'https://scholar.google.com' }],
        isDemoData: true
      }
    },
    {
      user: {
        name: 'Sarah Chen',
        email: 'sarah.chen@northstar.edu',
        passwordHash: alumniPassword,
        role: 'alumni'
      },
      profile: {
        name: 'Sarah Chen',
        avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80',
        department: 'Software Engineering',
        graduationYear: 2021,
        currentRole: 'Senior Design Systems Architect',
        employer: 'Linear',
        industry: 'Developer Tools',
        bio: 'Class of 2021 valedictorian. Obsessed with high-craft UI, web standards, and tactile interfaces. Available for portfolio critiques, frontend interview preparation, and design system discussions.',
        skills: ['Design Systems', 'React', 'TypeScript', 'Tailwind CSS', 'Web Performance', 'Figma'],
        mentorshipTopics: ['resume_review', 'mock_interview', 'technical_guidance'],
        availability: 'available',
        collegeVerificationStatus: 'pending',
        employmentVerificationStatus: 'unverified',
        isDemoData: true
      }
    },
    {
      user: {
        name: 'David Kalu',
        email: 'david.kalu@northstar.edu',
        passwordHash: alumniPassword,
        role: 'alumni'
      },
      profile: {
        name: 'David Kalu',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
        department: 'Electrical & Computer Engineering',
        graduationYear: 2019,
        currentRole: 'VP of Platform Engineering',
        employer: 'Vercel',
        industry: 'Cloud Infrastructure',
        bio: 'Scale-up engineering leader. Built teams from 5 to 60 engineers. Advising on startup founding, fundraising pitch readiness, and scaling engineering orgs.',
        skills: ['Engineering Leadership', 'Next.js', 'Cloud Architecture', 'Hiring', 'Startups'],
        mentorshipTopics: ['startup_advice', 'career_advice'],
        availability: 'busy',
        collegeVerificationStatus: 'needs_more_info',
        employmentVerificationStatus: 'unverified',
        isDemoData: true
      }
    },
    {
      user: {
        name: 'Anita Desai',
        email: 'anita.desai@northstar.edu',
        passwordHash: alumniPassword,
        role: 'alumni'
      },
      profile: {
        name: 'Anita Desai',
        avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80',
        department: 'Information Technology',
        graduationYear: 2023,
        currentRole: 'Associate Quantitative Developer',
        employer: 'Bloomberg LP',
        industry: 'Quantitative Finance',
        bio: 'Recent graduate who navigated the competitive campus hiring season. Ready to assist 3rd and 4th years with LeetCode/DSA prep and resume tune-ups.',
        skills: ['C++', 'Algorithms & Data Structures', 'Low-Latency Caching', 'Linux', 'SQL'],
        mentorshipTopics: ['mock_interview', 'resume_review'],
        availability: 'available',
        collegeVerificationStatus: 'unverified',
        employmentVerificationStatus: 'unverified',
        isDemoData: true
      }
    }
  ];

  const createdAlumniProfiles = [];

  for (const item of alumniData) {
    const user = await User.create(item.user);
    const profile = await AlumniProfile.create({
      ...item.profile,
      userId: user._id
    });
    createdAlumniProfiles.push({ user, profile });
    console.log(`[SEED] Created Alumni: ${user.name} (${profile.collegeVerificationStatus})`);
  }

  // 4. Seed Verification Requests for the Admin Queue
  // Sarah Chen: Pending Request
  const sarahEntry = createdAlumniProfiles.find((a) => a.user.email === 'sarah.chen@northstar.edu');
  if (sarahEntry) {
    await VerificationRequest.create({
      alumniProfileId: sarahEntry.profile._id,
      userId: sarahEntry.user._id,
      type: 'college_identity',
      status: 'pending',
      verificationMethod: 'college_record_match',
      evidenceRefs: [
        {
          type: 'enrollment_id',
          referenceId: 'NS-2017-CS-084',
          label: 'Institutional Registration Card',
          privateStoragePath: 'storage/verification_docs/demo_ns_2017_084.enc'
        }
      ],
      submittedAt: new Date(Date.now() - 36 * 3600 * 1000), // 36 hours ago
      isDemoData: true
    });
    console.log('[SEED] Created Pending Verification Request for Sarah Chen');
  }

  // David Kalu: Needs More Info Request
  const davidEntry = createdAlumniProfiles.find((a) => a.user.email === 'david.kalu@northstar.edu');
  if (davidEntry) {
    await VerificationRequest.create({
      alumniProfileId: davidEntry.profile._id,
      userId: davidEntry.user._id,
      type: 'college_identity',
      status: 'needs_more_info',
      verificationMethod: 'document_review',
      evidenceRefs: [
        {
          type: 'diploma_copy',
          referenceId: 'DIP-2019-EE-112',
          label: 'Scanned Degree Certificate',
          privateStoragePath: 'storage/verification_docs/demo_dip_2019_112.enc'
        }
      ],
      reviewedBy: admin._id,
      reviewedAt: new Date(Date.now() - 12 * 3600 * 1000),
      reviewNote: 'Please provide official final-semester transcript showing department seal.',
      submittedAt: new Date(Date.now() - 72 * 3600 * 1000),
      isDemoData: true
    });
    console.log('[SEED] Created Needs-More-Info Verification Request for David Kalu');
  }

  // 5. Seed Mentorship Requests
  const marcusEntry = createdAlumniProfiles.find((a) => a.user.email === 'marcus.vance@northstar.edu');
  if (marcusEntry) {
    await MentorshipRequest.create({
      studentId: student1._id,
      alumniId: marcusEntry.user._id,
      alumniProfileId: marcusEntry.profile._id,
      requestType: 'mock_interview',
      studentGoal: 'Preparing for distributed systems infrastructure interviews this autumn.',
      message: 'Hi Marcus! I loved your article on consensus protocols. I would value a 45-minute technical system design mock interview focused on Raft/Paxos fundamentals.',
      proposedSlots: ['Tuesday 4:00 PM EST', 'Thursday 2:00 PM EST'],
      status: 'pending',
      isDemoData: true
    });

    await MentorshipRequest.create({
      studentId: student2._id,
      alumniId: marcusEntry.user._id,
      alumniProfileId: marcusEntry.profile._id,
      requestType: 'technical_guidance',
      studentGoal: 'Architecting an asynchronous event-driven capstone project.',
      message: 'Hello Marcus, could you review our architecture diagram and Kafka consumer group layout?',
      proposedSlots: ['Friday 5:00 PM EST'],
      status: 'accepted',
      acceptedSlot: 'Friday 5:00 PM EST',
      responseMessage: 'Happy to review your capstone architecture! See you on Friday.',
      isDemoData: true
    });
    console.log('[SEED] Created Sample Mentorship Requests for Marcus Vance');
  }

  console.log('[SEED] Database seed completed successfully!');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('[SEED ERROR]', err);
  process.exit(1);
});
