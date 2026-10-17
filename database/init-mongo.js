// MongoDB Initialization Script for AlumniConnect AI
// Database: alumniconnect_ai

db = db.getSiblingDB('alumniconnect_ai');

print('Initializing AlumniConnect AI database indexes and collections...');

// 1. Users Collection
db.createCollection('users');
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ role: 1 });
db.users.createIndex({ status: 1 });

// 2. Alumni Profiles Collection
db.createCollection('alumniprofiles');
db.alumniprofiles.createIndex({ userId: 1 }, { unique: true });
db.alumniprofiles.createIndex({ department: 1 });
db.alumniprofiles.createIndex({ graduationYear: -1 });
db.alumniprofiles.createIndex({ industry: 1 });
db.alumniprofiles.createIndex({ skills: 1 });
db.alumniprofiles.createIndex({ mentorshipTopics: 1 });
db.alumniprofiles.createIndex({ collegeVerificationStatus: 1 });
db.alumniprofiles.createIndex({ availability: 1 });

// Compound index for high-velocity search queries
db.alumniprofiles.createIndex({
  name: 'text',
  currentRole: 'text',
  employer: 'text',
  skills: 'text',
  industry: 'text',
  bio: 'text'
});

// 3. Verification Requests Collection
db.createCollection('verificationrequests');
db.verificationrequests.createIndex({ alumniProfileId: 1 });
db.verificationrequests.createIndex({ userId: 1 });
db.verificationrequests.createIndex({ status: 1 });
db.verificationrequests.createIndex({ submittedAt: -1 });

// 4. Mentorship Requests Collection
db.createCollection('mentorshiprequests');
db.mentorshiprequests.createIndex({ studentId: 1 });
db.mentorshiprequests.createIndex({ alumniId: 1 });
db.mentorshiprequests.createIndex({ alumniProfileId: 1 });
db.mentorshiprequests.createIndex({ status: 1 });
db.mentorshiprequests.createIndex({ createdAt: -1 });

print('AlumniConnect AI MongoDB collections and indexes initialized successfully.');
