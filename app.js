/**
 * DentistPro - Professional Dental Management Application
 * Main JavaScript Application Logic
 */

// =========================================
// Application State
// =========================================
const AppState = {
    currentUser: null,
    cases: [],
    isRecording: false,
    recognition: null,
    currentSection: 'dashboard'
};

// =========================================
// Clinical Data (Procedures & Medications)
// =========================================
const PROCEDURES_DATA = [
    { id: 'exam', name: 'Dental Examination', category: 'diagnostic', description: 'Comprehensive oral examination including radiographs', details: 'Duration: 30-45 min | Insurance: Usually covered' },
    { id: 'cleaning', name: 'Professional Cleaning', category: 'preventive', description: 'Scaling and polishing to remove plaque and tartar', details: 'Duration: 45-60 min | Frequency: Every 6 months' },
    { id: 'filling', name: 'Dental Filling', category: 'restorative', description: 'Composite or amalgam restoration for cavities', details: 'Materials: Composite, Amalgam, Glass Ionomer' },
    { id: 'root-canal', name: 'Root Canal Treatment', category: 'endodontic', description: 'Removal of infected pulp and sealing of root canals', details: 'Sessions: 1-3 | Success Rate: 95%' },
    { id: 'extraction', name: 'Tooth Extraction', category: 'surgical', description: 'Simple or surgical removal of teeth', details: 'Healing Time: 1-2 weeks' },
    { id: 'crown', name: 'Dental Crown', category: 'prosthetic', description: 'Full coverage restoration for damaged teeth', details: 'Materials: Porcelain, Zirconia, Metal, PFM' },
    { id: 'bridge', name: 'Dental Bridge', category: 'prosthetic', description: 'Fixed replacement for missing teeth', details: 'Abutments Required: Minimum 2' },
    { id: 'implant', name: 'Dental Implant', category: 'surgical', description: 'Titanium post insertion for tooth replacement', details: 'Osseointegration: 3-6 months' },
    { id: 'whitening', name: 'Teeth Whitening', category: 'cosmetic', description: 'Professional bleaching for brighter smile', details: 'In-office: 1 hour | At-home: 2-4 weeks' },
    { id: 'veneer', name: 'Dental Veneers', category: 'cosmetic', description: 'Thin porcelain shells for aesthetic improvement', details: 'Thickness: 0.3-0.5mm | Lifespan: 10-15 years' },
    { id: 'orthodontics', name: 'Orthodontic Treatment', category: 'orthodontic', description: 'Braces or aligners for teeth straightening', details: 'Duration: 12-24 months' },
    { id: 'periodontal', name: 'Periodontal Treatment', category: 'periodontic', description: 'Deep cleaning and gum disease treatment', details: 'SRP, Flap Surgery, Bone Grafting' },
    { id: 'dentures', name: 'Dentures', category: 'prosthetic', description: 'Removable replacement for missing teeth', details: 'Types: Complete, Partial, Immediate' },
    { id: 'night-guard', name: 'Night Guard', category: 'preventive', description: 'Custom mouth guard for bruxism', details: 'Material: Hard or Soft Acrylic' },
    { id: 'sealants', name: 'Dental Sealants', category: 'preventive', description: 'Protective coating for posterior teeth', details: 'Primarily for Children | Duration: 5-10 years' },
    { id: 'fluoride', name: 'Fluoride Treatment', category: 'preventive', description: 'Topical fluoride application', details: 'Concentration: 1.23% or 2% NaF' }
];

const MEDICATIONS_DATA = [
    { id: 'amoxicillin', name: 'Amoxicillin', category: 'antibiotic', description: 'First-line antibiotic for dental infections', dosage: '500mg TID for 7 days', contraindications: 'Penicillin allergy' },
    { id: 'augmentin', name: 'Augmentin', category: 'antibiotic', description: 'Amoxicillin + Clavulanate for resistant infections', dosage: '625mg TID for 7 days', contraindications: 'Penicillin allergy, Liver disease' },
    { id: 'metronidazole', name: 'Metronidazole', category: 'antibiotic', description: 'Anti-anaerobic for periodontal infections', dosage: '400mg TID for 5-7 days', contraindications: 'Alcohol, First trimester pregnancy' },
    { id: 'azithromycin', name: 'Azithromycin', category: 'antibiotic', description: 'Alternative for penicillin-allergic patients', dosage: '500mg Day 1, 250mg Days 2-5', contraindications: 'QT prolongation, Liver disease' },
    { id: 'clindamycin', name: 'Clindamycin', category: 'antibiotic', description: 'For bone infections and penicillin allergy', dosage: '300mg QID for 7 days', contraindications: 'C. difficile history' },
    { id: 'ibuprofen', name: 'Ibuprofen', category: 'analgesic', description: 'NSAID for pain and inflammation', dosage: '400-600mg TID PRN', contraindications: 'GI ulcers, Renal disease, Aspirin allergy' },
    { id: 'paracetamol', name: 'Paracetamol', category: 'analgesic', description: 'Mild to moderate pain relief', dosage: '500-1000mg QID PRN (max 4g/day)', contraindications: 'Severe liver disease' },
    { id: 'diclofenac', name: 'Diclofenac', category: 'analgesic', description: 'Potent NSAID for post-surgical pain', dosage: '50mg TID for 3-5 days', contraindications: 'Cardiovascular disease, GI bleeding' },
    { id: 'tramadol', name: 'Tramadol', category: 'analgesic', description: 'Moderate to severe pain management', dosage: '50-100mg QID PRN', contraindications: 'Seizure disorder, MAO inhibitors' },
    { id: 'lidocaine', name: 'Lidocaine 2%', category: 'anesthetic', description: 'Local anesthetic with epinephrine', dosage: 'Max 7mg/kg with epi, 4.5mg/kg without', contraindications: 'Cardiac arrhythmias (with epi)' },
    { id: 'articaine', name: 'Articaine 4%', category: 'anesthetic', description: 'Superior diffusion local anesthetic', dosage: 'Max 7mg/kg', contraindications: 'Sulfonamide allergy' },
    { id: 'chlorhexidine', name: 'Chlorhexidine 0.12%', category: 'antiseptic', description: 'Antibacterial mouthwash', dosage: 'Rinse 15ml BID for 30 seconds', contraindications: 'None significant' },
    { id: 'nystatin', name: 'Nystatin', category: 'antifungal', description: 'For oral candidiasis', dosage: '100,000 units QID for 14 days', contraindications: 'None significant' },
    { id: 'prednisolone', name: 'Prednisolone', category: 'steroid', description: 'Anti-inflammatory for swelling', dosage: '40mg tapering over 5 days', contraindications: 'Active infection, Diabetes, Hypertension' },
    { id: 'dexamethasone', name: 'Dexamethasone', category: 'steroid', description: 'Potent steroid for severe inflammation', dosage: '4-8mg single dose or tapering', contraindications: 'Same as Prednisolone' },
    { id: 'vitamin-c', name: 'Vitamin C', category: 'supplement', description: 'For wound healing and gum health', dosage: '500-1000mg daily', contraindications: 'Kidney stones history' }
];

const CLINICAL_CATEGORIES = [
    { id: 'diseases', name: 'Dental Diseases', icon: 'alert-circle', description: 'Common dental conditions and pathologies', count: 45, className: 'diseases' },
    { id: 'treatments', name: 'Treatment Protocols', icon: 'clipboard', description: 'Step-by-step treatment guidelines', count: 32, className: 'treatments' },
    { id: 'medications', name: 'Drug References', icon: 'pill', description: 'Comprehensive medication database', count: 78, className: 'medications' },
    { id: 'guidelines', name: 'Clinical Guidelines', icon: 'book', description: 'Best practices and recommendations', count: 24, className: 'guidelines' }
];

// =========================================
// Utility Functions
// =========================================
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function getInitials(name) {
    if (!name) return 'DR';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
}

function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Failed to save to localStorage:', error);
        return false;
    }
}

function loadFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Failed to load from localStorage:', error);
        return null;
    }
}

function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    const toastMessage = toast.querySelector('.toast-message');
    const toastIcon = toast.querySelector('.toast-icon');

    const icons = {
        success: '✓',
        error: '✕',
        info: 'ℹ'
    };

    toast.className = `toast ${type}`;
    toastMessage.textContent = message;
    toastIcon.textContent = icons[type] || icons.info;

    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// =========================================
// DOM Elements
// =========================================
const elements = {
    // Login
    loginModal: document.getElementById('loginModal'),
    loginForm: document.getElementById('loginForm'),
    doctorNameInput: document.getElementById('doctorName'),
    passwordInput: document.getElementById('password'),

    // App Container
    app: document.getElementById('app'),

    // Sidebar
    sidebar: document.getElementById('sidebar'),
    menuToggle: document.getElementById('menuToggle'),
    navItems: document.querySelectorAll('.nav-item[data-section]'),
    logoutBtn: document.getElementById('logoutBtn'),

    // Header
    pageTitle: document.getElementById('pageTitle'),
    pageSubtitle: document.getElementById('pageSubtitle'),
    globalSearch: document.getElementById('globalSearch'),
    userAvatar: document.getElementById('userAvatar'),

    // Dashboard
    finishedPatients: document.getElementById('finishedPatients'),
    followUpPatients: document.getElementById('followUpPatients'),
    recentPatientsList: document.getElementById('recentPatientsList'),

    // Profile
    profileInitials: document.getElementById('profileInitials'),
    profileName: document.getElementById('profileName'),
    profilePatients: document.getElementById('profilePatients'),
    profileCases: document.getElementById('profileCases'),
    profileProcedures: document.getElementById('profileProcedures'),
    profileForm: document.getElementById('profileForm'),
    profileFullName: document.getElementById('profileFullName'),

    // Patients
    patientsList: document.getElementById('patientsList'),

    // New Case
    newCaseForm: document.getElementById('newCaseForm'),
    voiceRecordBtn: document.getElementById('voiceRecordBtn'),
    voiceStatus: document.getElementById('voiceStatus'),
    caseDescription: document.getElementById('caseDescription'),
    voiceInputSection: document.getElementById('voiceInputSection'),
    checklistSection: document.getElementById('checklistSection'),
    proceduresChecklist: document.getElementById('proceduresChecklist'),
    drugsChecklist: document.getElementById('drugsChecklist'),
    additionalNotes: document.getElementById('additionalNotes'),
    clearFormBtn: document.getElementById('clearFormBtn'),

    // Procedures
    proceduresGrid: document.getElementById('proceduresGrid'),
    procedureSearch: document.getElementById('procedureSearch'),

    // Drugs
    drugsGrid: document.getElementById('drugsGrid'),
    drugSearch: document.getElementById('drugSearch'),

    // Clinical
    clinicalCategories: document.getElementById('clinicalCategories'),

    // Modal
    caseModal: document.getElementById('caseModal'),
    caseModalBody: document.getElementById('caseModalBody'),
    closeCaseModal: document.getElementById('closeCaseModal')
};

// =========================================
// Section Titles
// =========================================
const sectionTitles = {
    dashboard: { title: 'Dashboard', subtitle: 'Welcome back, Doctor' },
    profile: { title: 'My Profile', subtitle: 'Manage your profile settings' },
    patients: { title: 'Patient Records', subtitle: 'View and manage patient cases' },
    newcase: { title: 'Patients & Cases', subtitle: 'View patients or create new cases' },
    procedures: { title: 'Dental Procedures', subtitle: 'Quick reference guide' },
    drugs: { title: 'Medications', subtitle: 'Drug reference and dosages' },
    clinical: { title: 'Clinical Data', subtitle: 'Comprehensive knowledge base' }
};

// =========================================
// Navigation & Section Management
// =========================================
function navigateToSection(sectionId) {
    // Update active nav item
    elements.navItems.forEach(item => {
        item.classList.remove('active');
        if (item.dataset.section === sectionId) {
            item.classList.add('active');
        }
    });

    // Hide all sections and show target
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    const targetSection = document.getElementById(`${sectionId}Section`);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // Update header
    const titleInfo = sectionTitles[sectionId] || { title: 'Dashboard', subtitle: '' };
    elements.pageTitle.textContent = titleInfo.title;

    if (sectionId === 'dashboard' && AppState.currentUser) {
        elements.pageSubtitle.textContent = `Welcome back, ${AppState.currentUser.name}`;
    } else {
        elements.pageSubtitle.textContent = titleInfo.subtitle;
    }

    // Close sidebar on mobile
    if (window.innerWidth <= 768) {
        elements.sidebar.classList.remove('open');
    }

    AppState.currentSection = sectionId;
}

// =========================================
// Authentication
// =========================================
function handleLogin(e) {
    e.preventDefault();

    const name = elements.doctorNameInput.value.trim();
    const password = elements.passwordInput.value;

    if (!name || !password) {
        showToast('Please fill in all fields', 'error');
        return;
    }

    // Simple client-side authentication (demo purposes)
    AppState.currentUser = {
        id: generateId(),
        name: name,
        initials: getInitials(name),
        loginTime: new Date().toISOString()
    };

    // Save to localStorage
    saveToLocalStorage('dentist_user', AppState.currentUser);

    // Hide login, show app
    elements.loginModal.classList.remove('active');
    elements.app.classList.remove('hidden');

    // Initialize app
    initializeApp();

    showToast(`Welcome, ${name}!`, 'success');
}

function handleLogout() {
    AppState.currentUser = null;
    localStorage.removeItem('dentist_user');

    // Reset form
    elements.loginForm.reset();

    // Show login, hide app
    elements.loginModal.classList.add('active');
    elements.app.classList.add('hidden');

    showToast('Logged out successfully', 'info');
}

function checkExistingSession() {
    const savedUser = loadFromLocalStorage('dentist_user');

    if (savedUser) {
        AppState.currentUser = savedUser;
        elements.loginModal.classList.remove('active');
        elements.app.classList.remove('hidden');
        initializeApp();
    }
}

// =========================================
// App Initialization
// =========================================
function initializeApp() {
    // Load saved cases
    const savedCases = loadFromLocalStorage('dentist_cases');
    if (savedCases) {
        AppState.cases = savedCases;
    }

    // Update UI with user info
    updateUserUI();

    // Render static content
    renderProcedures();
    renderDrugs();
    renderClinicalCategories();
    renderChecklists();

    // Update dynamic content
    updateDashboard();
    updatePatientsList();

    // Initialize speech recognition
    initSpeechRecognition();
}

function updateUserUI() {
    if (!AppState.currentUser) return;

    const initials = AppState.currentUser.initials;
    const name = AppState.currentUser.name;

    elements.userAvatar.querySelector('span').textContent = initials;
    elements.profileInitials.textContent = initials;
    elements.profileName.textContent = name;
    elements.profileFullName.value = name;

    elements.pageSubtitle.textContent = `Welcome back, ${name}`;
}

// =========================================
// Dashboard
// =========================================
function updateDashboard() {
    const cases = AppState.cases;
    const uniquePatients = new Set(cases.map(c => c.patientName.toLowerCase())).size;
    const totalProcedures = cases.reduce((sum, c) => sum + (c.procedures?.length || 0), 0);

    // For now: finished = 0, follow-up = all unique patients
    // Later you can add a status field to each case to track this properly
    const finishedPatients = 0;
    const followUpPatients = uniquePatients;

    // Animate counters
    animateCounter(elements.finishedPatients, finishedPatients);
    animateCounter(elements.followUpPatients, followUpPatients);

    // Update profile stats
    elements.profilePatients.textContent = uniquePatients;
    elements.profileCases.textContent = cases.length;
    elements.profileProcedures.textContent = totalProcedures;

    // Render recent patients
    renderRecentPatients();
}

function animateCounter(element, target) {
    const duration = 500;
    const start = parseInt(element.textContent) || 0;
    const increment = (target - start) / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= target) || (increment < 0 && current <= target)) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.round(current);
        }
    }, 16);
}

function renderRecentPatients() {
    const recentCases = AppState.cases.slice(-5).reverse();

    if (recentCases.length === 0) {
        elements.recentPatientsList.innerHTML = `
            <div class="empty-state">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <line x1="17" y1="11" x2="23" y2="11"/>
                </svg>
                <p>No patients yet</p>
                <span>Add your first patient case</span>
            </div>
        `;
        return;
    }

    elements.recentPatientsList.innerHTML = recentCases.map(caseData => `
        <div class="patient-card" onclick="openCaseModal('${caseData.id}')">
            <div class="patient-header">
                <div class="patient-avatar">${getInitials(caseData.patientName)}</div>
                <span class="patient-date">${formatDate(caseData.createdAt)}</span>
            </div>
            <h4 class="patient-name">${escapeHtml(caseData.patientName)}</h4>
            <p class="patient-info">${caseData.patientAge ? `${caseData.patientAge} years` : ''} ${caseData.patientGender ? `• ${capitalize(caseData.patientGender)}` : ''}</p>
            <div class="patient-tags">
                ${(caseData.procedures || []).slice(0, 2).map(p => `<span class="tag procedure">${escapeHtml(p)}</span>`).join('')}
                ${(caseData.medications || []).slice(0, 2).map(m => `<span class="tag medication">${escapeHtml(m)}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

// =========================================
// Patients List
// =========================================
function updatePatientsList() {
    if (AppState.cases.length === 0) {
        elements.patientsList.innerHTML = `
            <div class="empty-state-large">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                <h3>No Patients Yet</h3>
                <p>Start by adding a new patient case using voice or checklist input</p>
                <button class="btn-primary" data-section="newcase">Create First Case</button>
            </div>
        `;

        // Re-attach event listener
        const btn = elements.patientsList.querySelector('[data-section="newcase"]');
        if (btn) {
            btn.addEventListener('click', () => navigateToSection('newcase'));
        }
        return;
    }

    elements.patientsList.innerHTML = AppState.cases.map(caseData => `
        <div class="patient-card" onclick="openCaseModal('${caseData.id}')">
            <div class="patient-header">
                <div class="patient-avatar">${getInitials(caseData.patientName)}</div>
                <span class="patient-date">${formatDate(caseData.createdAt)}</span>
            </div>
            <h4 class="patient-name">${escapeHtml(caseData.patientName)}</h4>
            <p class="patient-info">
                ${caseData.patientAge ? `${caseData.patientAge} years` : ''}
                ${caseData.patientGender ? `• ${capitalize(caseData.patientGender)}` : ''}
                ${caseData.patientPhone ? `• ${caseData.patientPhone}` : ''}
            </p>
            <div class="patient-tags">
                ${(caseData.procedures || []).slice(0, 3).map(p => `<span class="tag procedure">${escapeHtml(p)}</span>`).join('')}
                ${(caseData.medications || []).slice(0, 2).map(m => `<span class="tag medication">${escapeHtml(m)}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

// =========================================
// Case Modal
// =========================================
function openCaseModal(caseId) {
    const caseData = AppState.cases.find(c => c.id === caseId);
    if (!caseData) return;

    elements.caseModalBody.innerHTML = `
        <div class="modal-patient-header">
            <div class="modal-avatar">${getInitials(caseData.patientName)}</div>
            <div class="modal-patient-info">
                <h2>${escapeHtml(caseData.patientName)}</h2>
                <p>${caseData.patientAge ? `${caseData.patientAge} years` : ''} ${caseData.patientGender ? `• ${capitalize(caseData.patientGender)}` : ''} ${caseData.patientPhone ? `• ${caseData.patientPhone}` : ''}</p>
            </div>
        </div>
        
        ${caseData.description ? `
        <div class="modal-section">
            <h4>Case Description</h4>
            <p>${escapeHtml(caseData.description)}</p>
        </div>
        ` : ''}
        
        ${caseData.procedures && caseData.procedures.length > 0 ? `
        <div class="modal-section">
            <h4>Procedures</h4>
            <div class="modal-tags">
                ${caseData.procedures.map(p => `<span class="tag procedure">${escapeHtml(p)}</span>`).join('')}
            </div>
        </div>
        ` : ''}
        
        ${caseData.medications && caseData.medications.length > 0 ? `
        <div class="modal-section">
            <h4>Medications</h4>
            <div class="modal-tags">
                ${caseData.medications.map(m => `<span class="tag medication">${escapeHtml(m)}</span>`).join('')}
            </div>
        </div>
        ` : ''}
        
        ${caseData.notes ? `
        <div class="modal-section">
            <h4>Additional Notes</h4>
            <p>${escapeHtml(caseData.notes)}</p>
        </div>
        ` : ''}
        
        <div class="modal-section">
            <h4>Case Information</h4>
            <p>Created: ${formatDate(caseData.createdAt)}</p>
        </div>
        
        <div class="modal-actions">
            <button class="btn-secondary" onclick="deleteCase('${caseData.id}')">
                Delete Case
            </button>
            <button class="btn-primary" onclick="closeCaseModalHandler()">
                Close
            </button>
        </div>
    `;

    elements.caseModal.classList.add('active');
}

function closeCaseModalHandler() {
    elements.caseModal.classList.remove('active');
}

function deleteCase(caseId) {
    if (!confirm('Are you sure you want to delete this case?')) return;

    AppState.cases = AppState.cases.filter(c => c.id !== caseId);
    saveToLocalStorage('dentist_cases', AppState.cases);

    closeCaseModalHandler();
    updateDashboard();
    updatePatientsList();

    showToast('Case deleted successfully', 'success');
}

// Make functions globally accessible
window.openCaseModal = openCaseModal;
window.closeCaseModalHandler = closeCaseModalHandler;
window.deleteCase = deleteCase;

// =========================================
// New Case Form
// =========================================
function handleNewCaseSubmit(e) {
    e.preventDefault();

    const patientName = document.getElementById('patientName').value.trim();

    if (!patientName) {
        showToast('Please enter patient name', 'error');
        return;
    }

    // Gather selected procedures and medications
    const selectedProcedures = [];
    const selectedMedications = [];

    document.querySelectorAll('#proceduresChecklist .checklist-item.checked').forEach(item => {
        selectedProcedures.push(item.dataset.name);
    });

    document.querySelectorAll('#drugsChecklist .checklist-item.checked').forEach(item => {
        selectedMedications.push(item.dataset.name);
    });

    const newCase = {
        id: generateId(),
        patientName: patientName,
        patientAge: document.getElementById('patientAge').value,
        patientGender: document.getElementById('patientGender').value,
        patientPhone: document.getElementById('patientPhone').value.trim(),
        description: elements.caseDescription.value.trim(),
        procedures: selectedProcedures,
        medications: selectedMedications,
        notes: elements.additionalNotes.value.trim(),
        createdAt: new Date().toISOString(),
        createdBy: AppState.currentUser?.id
    };

    AppState.cases.push(newCase);
    saveToLocalStorage('dentist_cases', AppState.cases);

    // Reset form
    elements.newCaseForm.reset();
    document.querySelectorAll('.checklist-item.checked').forEach(item => {
        item.classList.remove('checked');
    });

    updateDashboard();
    updatePatientsList();

    showToast('Case saved successfully!', 'success');

    // Navigate to patients
    navigateToSection('patients');
}

function clearForm() {
    elements.newCaseForm.reset();
    document.querySelectorAll('.checklist-item.checked').forEach(item => {
        item.classList.remove('checked');
    });
    showToast('Form cleared', 'info');
}

// =========================================
// Input Method Toggle
// =========================================
function setupInputMethodToggle() {
    const methodBtns = document.querySelectorAll('.method-btn');

    methodBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            methodBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const method = btn.dataset.method;

            if (method === 'voice') {
                elements.voiceInputSection.classList.remove('hidden');
                elements.checklistSection.classList.add('hidden');
            } else {
                elements.voiceInputSection.classList.add('hidden');
                elements.checklistSection.classList.remove('hidden');
            }
        });
    });
}

// =========================================
// Speech Recognition (Voice Input)
// =========================================
function initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        elements.voiceStatus.textContent = 'Voice input not supported in this browser';
        elements.voiceRecordBtn.disabled = true;
        elements.voiceRecordBtn.style.opacity = '0.5';
        return;
    }

    AppState.recognition = new SpeechRecognition();
    AppState.recognition.continuous = true;
    AppState.recognition.interimResults = true;
    AppState.recognition.lang = 'en-US';

    AppState.recognition.onstart = () => {
        AppState.isRecording = true;
        elements.voiceRecordBtn.classList.add('recording');
        elements.voiceStatus.textContent = 'Listening... Speak now';
    };

    AppState.recognition.onend = () => {
        AppState.isRecording = false;
        elements.voiceRecordBtn.classList.remove('recording');
        elements.voiceStatus.textContent = 'Click to start recording';
    };

    AppState.recognition.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                finalTranscript += transcript + ' ';
            } else {
                interimTranscript += transcript;
            }
        }

        if (finalTranscript) {
            elements.caseDescription.value += finalTranscript;
        }

        if (interimTranscript) {
            elements.voiceStatus.textContent = `Hearing: "${interimTranscript}"`;
        }
    };

    AppState.recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        AppState.isRecording = false;
        elements.voiceRecordBtn.classList.remove('recording');

        if (event.error === 'not-allowed') {
            elements.voiceStatus.textContent = 'Microphone access denied. Please allow microphone access.';
        } else {
            elements.voiceStatus.textContent = `Error: ${event.error}. Click to try again.`;
        }
    };
}

function toggleVoiceRecording() {
    if (!AppState.recognition) {
        showToast('Voice input not available', 'error');
        return;
    }

    if (AppState.isRecording) {
        AppState.recognition.stop();
    } else {
        try {
            AppState.recognition.start();
        } catch (error) {
            console.error('Failed to start recognition:', error);
            showToast('Failed to start voice recognition', 'error');
        }
    }
}

// =========================================
// Checklists
// =========================================
function renderChecklists() {
    // Procedures checklist
    elements.proceduresChecklist.innerHTML = PROCEDURES_DATA.map(proc => `
        <label class="checklist-item" data-id="${proc.id}" data-name="${proc.name}">
            <input type="checkbox">
            <span class="checkbox-custom">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                    <polyline points="20 6 9 17 4 12"/>
                </svg>
            </span>
            <span class="checklist-label">${proc.name}</span>
        </label>
    `).join('');

    // Medications checklist
    elements.drugsChecklist.innerHTML = MEDICATIONS_DATA.map(drug => `
        <label class="checklist-item" data-id="${drug.id}" data-name="${drug.name}">
            <input type="checkbox">
            <span class="checkbox-custom">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                    <polyline points="20 6 9 17 4 12"/>
                </svg>
            </span>
            <span class="checklist-label">${drug.name}</span>
        </label>
    `).join('');

    // Add click handlers
    document.querySelectorAll('.checklist-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            item.classList.toggle('checked');
        });
    });
}

// =========================================
// Procedures Grid
// =========================================
function renderProcedures(filter = '') {
    const filteredProcedures = PROCEDURES_DATA.filter(proc =>
        proc.name.toLowerCase().includes(filter.toLowerCase()) ||
        proc.category.toLowerCase().includes(filter.toLowerCase()) ||
        proc.description.toLowerCase().includes(filter.toLowerCase())
    );

    elements.proceduresGrid.innerHTML = filteredProcedures.map(proc => `
        <div class="procedure-card">
            <div class="procedure-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 11l3 3L22 4"/>
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                </svg>
            </div>
            <h3>${proc.name}</h3>
            <p>${proc.description}</p>
            <div class="procedure-details">
                <strong>Category:</strong> ${capitalize(proc.category)}<br>
                ${proc.details}
            </div>
        </div>
    `).join('');
}

// =========================================
// Drugs Grid
// =========================================
function renderDrugs(filter = '') {
    const filteredDrugs = MEDICATIONS_DATA.filter(drug =>
        drug.name.toLowerCase().includes(filter.toLowerCase()) ||
        drug.category.toLowerCase().includes(filter.toLowerCase()) ||
        drug.description.toLowerCase().includes(filter.toLowerCase())
    );

    elements.drugsGrid.innerHTML = filteredDrugs.map(drug => `
        <div class="drug-card">
            <div class="drug-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M10.5 20.5L3.5 13.5C1.5 11.5 1.5 8.5 3.5 6.5C5.5 4.5 8.5 4.5 10.5 6.5L17.5 13.5"/>
                    <path d="M13.5 3.5L20.5 10.5C22.5 12.5 22.5 15.5 20.5 17.5C18.5 19.5 15.5 19.5 13.5 17.5L6.5 10.5"/>
                </svg>
            </div>
            <h3>${drug.name}</h3>
            <p>${drug.description}</p>
            <div class="drug-details">
                <strong>Category:</strong> ${capitalize(drug.category)}<br>
                <strong>Dosage:</strong> ${drug.dosage}<br>
                <strong>Contraindications:</strong> ${drug.contraindications}
            </div>
        </div>
    `).join('');
}

// =========================================
// Clinical Categories
// =========================================
function renderClinicalCategories() {
    const icons = {
        'alert-circle': '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
        'clipboard': '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>',
        'pill': '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.5 20.5L3.5 13.5C1.5 11.5 1.5 8.5 3.5 6.5C5.5 4.5 8.5 4.5 10.5 6.5L17.5 13.5"/><path d="M13.5 3.5L20.5 10.5C22.5 12.5 22.5 15.5 20.5 17.5C18.5 19.5 15.5 19.5 13.5 17.5L6.5 10.5"/></svg>',
        'book': '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>'
    };

    elements.clinicalCategories.innerHTML = CLINICAL_CATEGORIES.map(cat => `
        <div class="clinical-card ${cat.className}">
            <span class="clinical-count">${cat.count} items</span>
            <div class="clinical-icon">
                ${icons[cat.icon]}
            </div>
            <h3>${cat.name}</h3>
            <p>${cat.description}</p>
        </div>
    `).join('');
}

// =========================================
// Helper Functions
// =========================================
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// =========================================
// Event Listeners
// =========================================
function setupEventListeners() {
    // Login form
    elements.loginForm.addEventListener('submit', handleLogin);

    // Logout
    elements.logoutBtn.addEventListener('click', handleLogout);

    // Navigation items
    elements.navItems.forEach(item => {
        item.addEventListener('click', () => {
            navigateToSection(item.dataset.section);
        });
    });

    // Quick action buttons
    document.querySelectorAll('[data-section]').forEach(btn => {
        if (!btn.classList.contains('nav-item')) {
            btn.addEventListener('click', () => {
                navigateToSection(btn.dataset.section);
            });
        }
    });

    // Menu toggle (mobile)
    elements.menuToggle.addEventListener('click', () => {
        elements.sidebar.classList.toggle('open');
    });

    // Close sidebar when clicking outside (mobile)
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 &&
            !elements.sidebar.contains(e.target) &&
            !elements.menuToggle.contains(e.target)) {
            elements.sidebar.classList.remove('open');
        }
    });

    // New case form
    elements.newCaseForm.addEventListener('submit', handleNewCaseSubmit);
    elements.clearFormBtn.addEventListener('click', clearForm);

    // Voice recording
    elements.voiceRecordBtn.addEventListener('click', toggleVoiceRecording);

    // Profile form
    elements.profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newName = elements.profileFullName.value.trim();
        if (newName && AppState.currentUser) {
            AppState.currentUser.name = newName;
            AppState.currentUser.initials = getInitials(newName);
            saveToLocalStorage('dentist_user', AppState.currentUser);
            updateUserUI();
            showToast('Profile updated successfully', 'success');
        }
    });

    // Search filters
    elements.procedureSearch.addEventListener('input', (e) => {
        renderProcedures(e.target.value);
    });

    elements.drugSearch.addEventListener('input', (e) => {
        renderDrugs(e.target.value);
    });

    // Global search
    elements.globalSearch.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = e.target.value.toLowerCase().trim();
            if (query) {
                // Search in cases
                const foundCase = AppState.cases.find(c =>
                    c.patientName.toLowerCase().includes(query)
                );
                if (foundCase) {
                    navigateToSection('patients');
                    setTimeout(() => openCaseModal(foundCase.id), 300);
                } else {
                    showToast('No matching patient found', 'info');
                }
            }
        }
    });

    // Case modal close
    elements.closeCaseModal.addEventListener('click', closeCaseModalHandler);
    elements.caseModal.addEventListener('click', (e) => {
        if (e.target === elements.caseModal) {
            closeCaseModalHandler();
        }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeCaseModalHandler();
        }
    });

    // User avatar click
    elements.userAvatar.addEventListener('click', () => {
        navigateToSection('profile');
    });

    // Case tabs switching
    const caseTabs = document.querySelectorAll('.case-tab');
    caseTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active from all tabs
            caseTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Show/hide tab content
            const tabName = tab.dataset.tab;
            const patientlistTab = document.getElementById('patientlistTab');
            const caseFormContainer = document.querySelector('.case-form-container');

            if (tabName === 'patientlist') {
                patientlistTab.classList.remove('hidden');
                caseFormContainer.classList.add('hidden');
                // Update the patient list when switching to it
                updatePatientsListInCase();
            } else {
                patientlistTab.classList.add('hidden');
                caseFormContainer.classList.remove('hidden');
            }
        });
    });
}

// =========================================
// Update Patients List in Case Section
// =========================================
function updatePatientsListInCase() {
    const patientsListInCase = document.getElementById('patientsListInCase');

    if (AppState.cases.length === 0) {
        patientsListInCase.innerHTML = `
            <div class="empty-state-large">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                <h3>No Patients Yet</h3>
                <p>Start by adding a new patient case using the form</p>
            </div>
        `;
        return;
    }

    patientsListInCase.innerHTML = AppState.cases.map(caseData => `
        <div class="patient-card" onclick="openCaseModal('${caseData.id}')">
            <div class="patient-header">
                <div class="patient-avatar">${getInitials(caseData.patientName)}</div>
                <span class="patient-date">${formatDate(caseData.createdAt)}</span>
            </div>
            <h4 class="patient-name">${escapeHtml(caseData.patientName)}</h4>
            <p class="patient-info">
                ${caseData.patientAge ? `${caseData.patientAge} years` : ''}
                ${caseData.patientGender ? `• ${capitalize(caseData.patientGender)}` : ''}
                ${caseData.patientPhone ? `• ${caseData.patientPhone}` : ''}
            </p>
            <div class="patient-tags">
                ${(caseData.procedures || []).slice(0, 3).map(p => `<span class="tag procedure">${escapeHtml(p)}</span>`).join('')}
                ${(caseData.medications || []).slice(0, 2).map(m => `<span class="tag medication">${escapeHtml(m)}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

// =========================================
// Initialize Application
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    setupInputMethodToggle();
    checkExistingSession();
});
