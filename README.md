# Relocation Bridge

A React application that helps professionals compare role, relocation costs, salaries, and visa options when moving from Asia to the UK. Built with a 4-step workflow providing personalized financial insights based on real data.

[Live Demo](https://job-analyzer.netlify.app/) | [Video Demo](https://www.loom.com/share/f7a196256af94299a33eedfcec368549)

## 📸 Application Preview
<img width="1902" height="926" alt="Screenshot 2026-03-01 at 6 24 57 PM" src="https://github.com/user-attachments/assets/570e1a6e-06ea-48bc-b3b5-7aae7dac9834" />

### Step 1: Profile Selection
<img width="1796" height="929" alt="Screenshot 2026-03-01 at 6 36 55 PM" src="https://github.com/user-attachments/assets/4013dc19-2f22-43b0-aa8c-f9a9cad617d1" />

### Step 2: Compare Cities
<img width="1588" height="925" alt="Screenshot 2026-03-01 at 6 40 49 PM" src="https://github.com/user-attachments/assets/9ac9a9b6-790e-42d1-8dd3-40cbc273f21e" />

### Step 3: Financial Summary
<img width="1550" height="928" alt="Screenshot 2026-03-01 at 6 39 52 PM" src="https://github.com/user-attachments/assets/eaeb3b56-57ae-4f35-98f1-ccfb39979471" />

### Step 4: Resources
<img width="1749" height="928" alt="Screenshot 2026-03-01 at 6 41 31 PM" src="https://github.com/user-attachments/assets/5c867f13-fae9-46b4-be5e-c372a902c00f" />

### History Dropdown
<img width="1628" height="923" alt="Screenshot 2026-03-01 at 6 44 29 PM" src="https://github.com/user-attachments/assets/76b8dce7-2422-4ab6-9b56-96fba1a5f9c1" />

## 🎯 Key Features

### 1. 4-Step Relocation Workflow

- **Choose Profile** - Select your current role, target role, current city, and target UK city
- **Compare Cities** - Input salary, living costs (rent, transport, food) and visa for both locations
- **View Summary** - Get detailed financial breakdown including annual left, monthly disposable income, and visa impact
- **Access Resources** - Find curated links for jobs, visas, cultural tips, and relocation checklists

### 2. Smart Financial Calculations

- **Annual Left** - Salary minus living costs and visa fees
- **Monthly Disposable Income** - What you actually keep each month
- **Visa Impact Analysis** - Months to recover visa costs
- **Side-by-Side Comparison** - Current city vs UK target city

### 3. UK Visa Options

- **Skilled Worker Visa** - Complete with costs, timeline, and requirements
- **Global Talent Visa** - For leaders in digital technology
- **Health & Care Worker Visa** - For medical professionals
- **Graduate Visa** - For UK degree holders
- **Innovator Founder Visa** - For entrepreneurs
- **Settled Status** - Special option for EU citizens

### 4. History & Persistence

- **MongoDB Storage** - Save comparisons permanently
- **LocalStorage Fallback** - Works offline too
- **Load Previous** - Click history items to reload saved comparisons
- **Clear History** - One-click clear with confirmation

### 5. Professional UI/UX

- **Custom Color Palette** - Deep Green (#1B4D3E) and Warm Sand (#E6B17E)
- **Responsive Design** - Mobile to desktop
- **Progress Indicators** - Visual step tracking
- **Interactive Tabs** - Salary, Cost of Living, Visa Path

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **PDF Generation:** jsPDF
- **HTTP Client:** Fetch API

### Backend
- **Runtime:** Node.js + Express
- **Database:** MongoDB Atlas
- **Language:** TypeScript
- **API:** RESTful endpoints
- **Deployment:** Render

## 🚀 Running Locally

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or Atlas)

### **Step-by-Step Setup**
## 1. Clone repository
git clone https://github.com/yourusername/relocation-bridge.git
cd relocation-bridge

## 2. Install frontend dependencies
cd frontend
npm install

## 3. Start development server
npm run dev