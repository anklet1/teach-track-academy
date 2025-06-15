
export const teacherSubmissions = [
  { id: 1, subject: 'Mathematics', class: 'JHS 1', week: 5, term: 1, status: 'Approved', uploadedOn: '2025-05-10' },
  { id: 2, subject: 'English Language', class: 'JHS 1', week: 5, term: 1, status: 'Approved', uploadedOn: '2025-05-09' },
  { id: 3, subject: 'Integrated Science', class: 'JHS 1', week: 5, term: 1, status: 'Needs Correction', uploadedOn: '2025-05-11' },
  { id: 4, subject: 'Social Studies', class: 'JHS 1', week: 6, term: 1, status: 'Pending', uploadedOn: '2025-06-14' },
];

export const allSubmissions = [
  { id: 1, teacher: 'Mr. John Doe', subject: 'Mathematics', class: 'JHS 1', week: 6, term: 1, status: 'Pending', uploadedOn: '2025-06-15' },
  { id: 2, teacher: 'Mrs. Jane Smith', subject: 'English Language', class: 'JHS 2', week: 6, term: 1, status: 'Approved', uploadedOn: '2025-06-14' },
  { id: 3, teacher: 'Mr. Alex Johnson', subject: 'Integrated Science', class: 'JHS 1', week: 5, term: 1, status: 'Rejected', uploadedOn: '2025-06-10' },
  { id: 4, teacher: 'Ms. Emily Davis', subject: 'Social Studies', class: 'JHS 3', week: 6, term: 1, status: 'Needs Correction', uploadedOn: '2025-06-15' },
  { id: 5, teacher: 'Mr. Peter Brown', subject: 'R.M.E', class: 'JHS 2', week: 6, term: 1, status: 'Approved', uploadedOn: '2025-06-13' },
];

export const stats = {
  totalSubmissions: 25,
  pendingReview: 5,
  correctionsRequested: 2,
  missingSubmissions: 3,
};
