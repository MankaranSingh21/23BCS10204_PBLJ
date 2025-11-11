// src/data/mockData.js

// --- Mock Data ---
export const MOCK_DEPARTMENTS = [
  "Public Works Department (PWD)",
  "Water Supply",
  "Electricity Board",
  "Sanitation & Waste Management",
  "Roads and Transport",
  "Health Department",
  "Parks and Recreation",
  "Urban Planning",
  "Police / Law Enforcement",
  "Other",
];

const MALE_NAMES = ["Rajesh", "Amit", "Sanjay", "Deepak", "Vikas", "Manoj", "Anil", "Sunil"];
const FEMALE_NAMES = ["Priya", "Sunita", "Anjali", "Pooja", "Kavita", "Meena", "Rani", "Geeta"];
const LAST_NAMES = ["Kumar", "Sharma", "Singh", "Patel", "Verma", "Gupta", "Yadav", "Jain"];
const LOCATIONS = ["Connaught Place", "Karol Bagh", "Chandni Chowk", "Saket", "Hauz Khas", "Nehru Place", "Lajpat Nagar", "Vasant Kunj"];
const PROBLEM_DESCRIPTIONS = [
  "Large pothole causing traffic jams.",
  "Streetlight not working for 3 days.",
  "Irregular water supply in the area.",
  "Garbage collection is not happening on time.",
  "Broken sewage drain cover.",
  "Fallen tree blocking the road.",
  "Stray dog menace in the park.",
];

// --- Helper Functions ---
const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomName = () => {
  const gender = Math.random() > 0.5 ? 'male' : 'female';
  const fName = gender === 'male' ? getRandomElement(MALE_NAMES) : getRandomElement(FEMALE_NAMES);
  return `${fName} ${getRandomElement(LAST_NAMES)}`;
};
export const getRandomPastDate = (startDays = 1, endDays = 60) => {
  const today = new Date();
  const randomDays = Math.floor(Math.random() * (endDays - startDays + 1)) + startDays;
  const pastDate = new Date(today.setDate(today.getDate() - randomDays));
  return pastDate;
};
const generateId = () => `GRV-${Math.floor(100000 + Math.random() * 900000)}`;

// --- Main Data Generators ---
export const generateMockComplaints = (count) => {
  const complaints = [];
  for (let i = 0; i < count; i++) {
    const statusOptions = ['Pending', 'In Progress', 'Resolved'];
    const status = getRandomElement(statusOptions);
    const dateOfComplaint = getRandomPastDate(1, 60);
    let dateOfResolution = null;
    if (status === 'Resolved') {
      const resolutionDate = new Date(dateOfComplaint);
      resolutionDate.setDate(resolutionDate.getDate() + Math.floor(Math.random() * 10) + 1);
      dateOfResolution = resolutionDate.toISOString().split('T')[0];
    }

    complaints.push({
      id: generateId(),
      name: getRandomName(),
      location: getRandomElement(LOCATIONS),
      department: getRandomElement(MOCK_DEPARTMENTS),
      description: getRandomElement(PROBLEM_DESCRIPTIONS),
      status: status,
      dateOfComplaint: dateOfComplaint.toISOString().split('T')[0],
      dateOfResolution: dateOfResolution,
      userId: (i % 3 === 0) ? 'user101' : `user${102 + i}`, // Assign some to our demo user
      files: Math.random() > 0.7 ? [{ name: 'IMG_20251101.jpg' }, { name: 'damage_report.pdf' }] : [],
    });
  }
  return complaints;
};

const INITIAL_COMPLAINTS = generateMockComplaints(15);
export const MAJOR_RESOLVED_COMPLAINTS = INITIAL_COMPLAINTS.filter(c => c.status === 'Resolved').slice(0, 5);
export const MOCK_COMPLAINTS_LIST = INITIAL_COMPLAINTS;

export let MOCK_USERS_DB = {
  "user@demo.com": { id: "user101", name: "Demo User", email: "user@demo.com", password: "password123" }
};
