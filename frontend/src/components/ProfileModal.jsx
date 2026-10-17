import React, { useState } from 'react';
import { api } from '../services/api';

export default function ProfileModal({ alumni, currentUser, onClose, onRequestSuccess }) {
  const [requestType, setRequestType] = useState('mock_interview');
  const [studentGoal, setStudentGoal] = useState('');
  const [message, setMessage] = useState('');
  const [slot, setSlot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  if (!alumni) return null;

  const handleSubmitRequest = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    if (!currentUser) {
      setSubmitError('Please sign in as a student to send a mentorship request.');
      return;
    }

    if (currentUser.role !== 'student') {
      setSubmitError('Only student accounts can submit mentorship requests.');
      return;
    }

    if (!studentGoal.trim() || !message.trim()) {
      setSubmitError('Please describe your career goal and write a message for the mentor.');
      return;
    }

    if (studentGoal.trim().length < 8) {
      setSubmitError('Goal is too brief. Please enter at least 8 characters explaining your target focus.');
      return;
    }

    if (message.trim().length < 15) {
      setSubmitError('Context message is too brief. Please introduce yourself and specify your questions (min 15 characters).');
      return;
    }

    try {
      setIsSubmitting(true);
      await api.mentorship.create({
        alumniId: alumni.userId || alumni.id,
        alumniProfileId: alumni.id,
        requestType,
        studentGoal,
        message,
        proposedSlots: slot.trim() ? [slot.trim()] : []
      });

      setSubmitSuccess(true);
      if (onRequestSuccess) {
        onRequestSuccess();
      }
      setTimeout(() => {
        onClose();
      }, 1800);
    } catch (err) {
      setSubmitError(err.message || 'Failed to submit mentorship request');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/45 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-[#e4e2da] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
        
        {/* Modal Top Close Bar */}
        <div className="sticky top-0 bg-white/95 backdrop-blur px-6 py-4 border-b border-[#e4e2da] flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-secondary tracking-widest uppercase bg-secondary-fixed/30 px-2 py-0.5 rounded">
              Alumni Dossier
            </span>
            <span className="text-xs text-on-surface-variant font-mono">
              CLASS OF {alumni.graduationYear}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-[#f5f4f0] flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="p-6 flex flex-col gap-6">
          {/* Hero Profile Details */}
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <img
              src={alumni.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'}
              alt={alumni.name}
              className="w-20 h-20 rounded-xl object-cover border border-[#e4e2da]"
            />
            <div className="flex flex-col flex-1">
              <h2 className="font-serif text-2xl font-medium text-on-surface leading-tight">
                {alumni.name}
              </h2>
              <p className="text-sm text-primary font-semibold mt-0.5">
                {alumni.currentRole} {alumni.employer !== 'Not provided' && `@ ${alumni.employer}`}
              </p>
              <p className="text-xs text-on-surface-variant mt-1">
                {alumni.department} • Class of {alumni.graduationYear}
              </p>

              {/* Strict Verification Status Separation */}
              <div className="flex flex-wrap items-center gap-2 mt-3">
                {alumni.collegeVerificationStatus === 'verified' ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#b5efd2] text-[#002115] border border-primary/20">
                    <span className="material-symbols-outlined text-[13px]">verified</span>
                    COLLEGE IDENTITY VERIFIED
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#f0be78]/40 text-[#291800]">
                    <span className="material-symbols-outlined text-[13px]">schedule</span>
                    PENDING REGISTRAR AUDIT
                  </span>
                )}

                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#efeeea] text-on-surface-variant border border-[#e4e2da]">
                  EMPLOYMENT UNVERIFIED
                </span>

                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold text-secondary bg-secondary-fixed/20">
                  {alumni.industry}
                </span>
              </div>
            </div>
          </div>

          {/* Biography */}
          <div className="border-t border-[#e4e2da] pt-4">
            <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">
              Background & Research
            </h4>
            <p className="text-sm leading-relaxed text-on-surface font-sans">
              {alumni.bio || 'No public background description provided yet.'}
            </p>
          </div>

          {/* Skills & Offerings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-[#e4e2da] pt-4">
            <div>
              <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">
                Technical Expertise
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {alumni.skills && alumni.skills.length > 0 ? (
                  alumni.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-[#f5f4f0] text-on-surface px-2.5 py-1 rounded border border-[#e4e2da]"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-on-surface-variant italic">No skills listed</span>
                )}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">
                Mentorship Tracks
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {alumni.mentorshipTopics && alumni.mentorshipTopics.length > 0 ? (
                  alumni.mentorshipTopics.map((topic, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-[#245c46]/10 text-primary px-2.5 py-1 rounded border border-primary/20 font-medium"
                    >
                      {topic.replace(/_/g, ' ')}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-on-surface-variant italic">Open for general guidance</span>
                )}
              </div>
            </div>
          </div>

          {/* Structured Mentorship Request Form */}
          <div className="bg-[#faf9f5] border border-[#e4e2da] rounded-xl p-5 mt-2">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-serif text-lg font-medium text-on-surface">
                Request Mentorship Session
              </h3>
              <span className="text-xs font-semibold text-primary bg-primary-fixed/40 px-2 py-0.5 rounded">
                Direct Connection
              </span>
            </div>

            {/* Institutional Fair-Use & Accountability Notice */}
            <div className="bg-[#f2efe9] border border-[#e4e2da] rounded-xl p-3.5 mb-4 flex items-start gap-3">
              <span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">policy</span>
              <div className="flex flex-col text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-on-surface">IIIT Delhi Fair-Use & Anti-Abuse Protocol</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-secondary-fixed/40 text-secondary font-bold">MAX 2 PENDING</span>
                </div>
                <p className="text-[11px] text-on-surface-variant mt-0.5 leading-relaxed font-sans">
                  To protect alumni from spam, each student is allowed at most <strong>2 active pending requests</strong> simultaneously. All sessions operate under the IIIT Delhi Placement & Academic Ethics charter — unexcused no-shows are reported to TPO and incur strikes.
                </p>
              </div>
            </div>

            {submitSuccess ? (
              <div className="bg-[#b5efd2]/50 border border-primary/30 p-4 rounded-xl text-center">
                <span className="material-symbols-outlined text-primary text-[32px]">check_circle</span>
                <h4 className="font-serif text-lg text-primary font-medium mt-1">
                  Request Dispatched to {alumni.name}
                </h4>
                <p className="text-xs text-on-surface-variant mt-1">
                  The alumni will review your structured request and respond with scheduling details.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitRequest} className="flex flex-col gap-3.5">
                {submitError && (
                  <div className="bg-[#ffdad6] border border-[#ba1a1a]/30 text-[#ba1a1a] text-xs p-3 rounded-lg flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] shrink-0">error</span>
                    <span>{submitError}</span>
                  </div>
                )}

                {/* Request Type Selector */}
                <div>
                  <label className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block mb-1">
                    Select Mentorship Track
                  </label>
                  <select
                    value={requestType}
                    onChange={(e) => setRequestType(e.target.value)}
                    className="w-full bg-white border border-[#e4e2da] text-xs rounded-lg px-3 py-2 text-on-surface focus:outline-none focus:border-primary"
                  >
                    <option value="mock_interview">Technical Mock Interview (System Design / DSA)</option>
                    <option value="resume_review">Resume & Portfolio Review</option>
                    <option value="technical_guidance">Technical Capstone / Architecture Guidance</option>
                    <option value="career_advice">Industry Transition & Career Advice</option>
                    <option value="higher_studies">Graduate School & Research Applications</option>
                    <option value="startup_advice">Early-Stage Startup & Pitch Readiness</option>
                  </select>
                </div>

                {/* Student Goal */}
                <div>
                  <label className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block mb-1">
                    Your Concrete Goal
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Preparing for Distributed Systems role or AI Research application"
                    value={studentGoal}
                    onChange={(e) => setStudentGoal(e.target.value)}
                    className="w-full bg-white border border-[#e4e2da] text-xs rounded-lg px-3 py-2 text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block mb-1">
                    Introduction & Context
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Introduce your background and mention specific topics you would like to cover..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-white border border-[#e4e2da] text-xs rounded-lg px-3 py-2 text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary resize-none"
                  />
                </div>

                {/* Proposed Slot */}
                <div>
                  <label className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block mb-1">
                    Preferred Time Slot (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Tuesday 4:00 PM EST or Friday Afternoon"
                    value={slot}
                    onChange={(e) => setSlot(e.target.value)}
                    className="w-full bg-white border border-[#e4e2da] text-xs rounded-lg px-3 py-2 text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary"
                  />
                </div>

                {/* Pro Pass Token Utilization Card */}
                <div className="bg-[#f6f2e8] border border-[#dfd5c0] rounded-xl p-3 flex items-center justify-between text-xs font-sans">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#b88b4a] text-[18px]">toll</span>
                    <span className="text-on-surface">
                      Session Fee: <strong className="text-[#7d571b] font-mono">1 Token</strong> (₹99 effective value)
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-on-surface-variant font-mono bg-white px-2 py-0.5 rounded border border-[#e4e2da]">
                    Balance: 2 Remaining
                  </span>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-on-surface-variant hover:bg-[#efeeea]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-primary hover:bg-[#1b4434] text-white shadow-sm transition-all active:scale-[0.98] disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">toll</span>
                    <span>{isSubmitting ? 'Transmitting...' : 'Use 1 Token & Dispatch Request'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
