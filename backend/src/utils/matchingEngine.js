/**
 * Deterministic Mentor Matching Engine
 * Weights:
 * - Mentorship Topic Relevance: 40%
 * - Skill & Role Relevance: 25%
 * - Industry & Goal Relevance: 20%
 * - Mentor Availability: 15%
 */

export function calculateMatchScore(alumniProfile, criteria = {}) {
  const {
    requestType = '',
    skills = [],
    goal = '',
    industry = ''
  } = criteria;

  let topicScore = 0;
  let skillScore = 0;
  let industryScore = 0;
  let availabilityScore = 0;
  const matchReasons = [];

  // 1. Topic Match (Max 40 points)
  if (requestType && alumniProfile.mentorshipTopics && alumniProfile.mentorshipTopics.length > 0) {
    if (alumniProfile.mentorshipTopics.includes(requestType)) {
      topicScore = 40;
      const formattedTopic = requestType.replace(/_/g, ' ');
      matchReasons.push(`Directly mentors students in ${formattedTopic}`);
    } else {
      topicScore = 10; // Base topic capability
    }
  } else if (alumniProfile.mentorshipTopics && alumniProfile.mentorshipTopics.length > 0) {
    topicScore = 20; // Has general mentorship offerings
  }

  // 2. Skill Relevance (Max 25 points)
  const userSkills = Array.isArray(skills)
    ? skills.map((s) => s.toLowerCase().trim())
    : (skills ? [skills.toLowerCase().trim()] : []);

  if (userSkills.length > 0 && alumniProfile.skills && alumniProfile.skills.length > 0) {
    const mentorSkills = alumniProfile.skills.map((s) => s.toLowerCase().trim());
    const matchedSkills = alumniProfile.skills.filter((s) =>
      userSkills.some((us) => s.toLowerCase().includes(us) || us.includes(s.toLowerCase()))
    );

    if (matchedSkills.length > 0) {
      const ratio = Math.min(matchedSkills.length / Math.max(userSkills.length, 1), 1);
      skillScore = Math.round(ratio * 25);
      matchReasons.push(`Expertise in matching technologies: ${matchedSkills.slice(0, 3).join(', ')}`);
    }
  } else if (alumniProfile.skills && alumniProfile.skills.length > 0) {
    skillScore = 10;
  }

  // 3. Industry & Goal Match (Max 20 points)
  const targetIndustry = (industry || '').toLowerCase().trim();
  const mentorIndustry = (alumniProfile.industry || '').toLowerCase().trim();
  const goalLower = (goal || '').toLowerCase().trim();

  if (targetIndustry && mentorIndustry && (mentorIndustry.includes(targetIndustry) || targetIndustry.includes(mentorIndustry))) {
    industryScore += 15;
    matchReasons.push(`Active practitioner in target sector (${alumniProfile.industry})`);
  }

  if (goalLower && alumniProfile.currentRole && goalLower.includes(alumniProfile.currentRole.toLowerCase())) {
    industryScore += 5;
    matchReasons.push(`Currently holds target role: ${alumniProfile.currentRole}`);
  }

  industryScore = Math.min(industryScore, 20);

  // 4. Availability Score (Max 15 points)
  if (alumniProfile.availability === 'available') {
    availabilityScore = 15;
    matchReasons.push('Available and currently accepting mentorship sessions');
  } else if (alumniProfile.availability === 'busy') {
    availabilityScore = 7;
    matchReasons.push('Limited availability this term');
  } else {
    availabilityScore = 0;
  }

  const rawScore = topicScore + skillScore + industryScore + availabilityScore;
  const matchScore = Math.min(Math.max(rawScore, 10), 99); // Normalized between 10 and 99

  return {
    score: matchScore,
    reasons: matchReasons.length > 0 ? matchReasons : ['Active verified alumnus offering career insights']
  };
}
