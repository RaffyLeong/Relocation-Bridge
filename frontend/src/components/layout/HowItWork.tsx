
export function HowItWorks() {
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-10">
      <h2 className="text-3xl font-bold text-primary-500 mb-6">STORY</h2>
      <p className="text-gray-700 leading-relaxed mb-10">
        I built this tool based on my own experience relocating from Macau to London. 
        When I was planning my move, I had to search through dozens of websites for salary data, 
        cost of living comparisons, visa requirements, and cultural tips. It was overwhelming 
        and time-consuming. RelocationBridge brings everything together in one place - the tool 
        I wished I had back then.
      </p>

      <h2 className="text-3xl font-bold text-primary-500 mb-6">INTRO</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-primary-500 mb-2">Step 1: Your Profile</h3>
          <p className="text-gray-700">Select your current role, current city, and target UK city.</p>
        </div>
        
        <div>
          <h3 className="text-xl font-bold text-primary-500 mb-2">Step 2: Compare Cities</h3>
          <p className="text-gray-700">Compare salary, cost of living, and explore UK visa options.</p>
        </div>
        
        <div>
          <h3 className="text-xl font-bold text-primary-500 mb-2">Step 3: Your Summary</h3>
          <p className="text-gray-700">View personalized summary of differences and recommendations.</p>
        </div>
        
        <div>
          <h3 className="text-xl font-bold text-primary-500 mb-2">Step 4: Resources</h3>
          <p className="text-gray-700">Access job boards, visa guides, cultural tips and checklist.</p>
        </div>
      </div>
    </div>
  );
}