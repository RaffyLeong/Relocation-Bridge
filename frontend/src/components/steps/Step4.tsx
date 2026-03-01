import { Briefcase, FileText, Users, CheckSquare, ExternalLink, ArrowLeft } from 'lucide-react';

interface Step4Props {
  onBack: () => void
  onSaveAndStartOver: () => void
  onHome: () => void
}

export function Step4({ onBack, onSaveAndStartOver, onHome }: Step4Props) {
  const resources = [
    {
      category: 'Find Jobs',
      icon: Briefcase,
      color: 'bg-primary-500 text-secondary-400',
      links: [
        { name: 'LinkedIn', url: 'https://linkedin.com' },
        { name: 'GlassDoor', url: 'https://www.glassdoor.com/' },
        { name: 'Indeed UK', url: 'https://indeed.co.uk' },
        { name: 'Reed', url: 'https://reed.co.uk' }
      ]
    },
    {
      category: 'Visa Help',
      icon: FileText,
      color: 'bg-primary-500 text-secondary-400',
      links: [
        { name: 'GOV.UK - Skilled Worker Visa', url: 'https://gov.uk/skilled-worker-visa' },
        { name: 'UK Visa Processing Times', url: 'https://gov.uk/visa-processing-times' },
      ]
    },
    {
      category: 'Cultural Tips',
      icon: Users,
      color: 'bg-primary-500 text-secondary-400',
      links: [
        { name: 'UK Work Culture Guide', url: 'https://learndrive.org/uk-workplace-culture/' },
        { name: 'British Etiquette at Work', url: 'https://www.youtube.com/watch?v=IxEiu2v_3lA' },
        { name: 'Communication Styles in UK', url: 'https://culturalatlas.sbs.com.au/british-culture/british-culture-communication' }
      ]
    },
    {
      category: 'Relocation Checklist',
      icon: CheckSquare,
      color: 'bg-primary-500 text-secondary-400',
      links: [
        { name: 'Open UK Bank Account', url: 'https://www.youtube.com/watch?v=-kxjh6abnEk' },
        { name: 'Get National Insurance Number', url: 'https://www.gov.uk/apply-national-insurance-number/how-to-apply' },
        { name: 'Register with a GP', url: 'https://www.nhs.uk/nhs-services/gps/how-to-register-with-a-gp-surgery/' },
        { name: 'Get UK SIM Card', url: 'https://www.lycamobile.co.uk/en/bundles/pay-as-you-go-sim-deals/#30-day-plans?utm_source=SEA&utm_medium=GOO&utm_campaign=UK_ENG_GEN_CON_PayG_SEA_EXA_INT&utm_agid=192764583336&utm_term=buy%20uk%20sim&device=c&placement=&utm_content=&s_kwcid=AL!14197!3!794754120389!e!!g!!buy%20uk%20sim&gad_source=1&gad_campaignid=23043297092&gbraid=0AAAAA-dLAe-nUAT3rxWf-3M5gRtFnITF1&gclid=Cj0KCQiAwYrNBhDcARIsAGo3u31CwaPOxghdOma8dTxYa2G2Kr8lHvFkRlcjbIGp3SSLujy_8amtn-gaAqrjEALw_wcB' }
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-secondary-400 mb-2">Relocation Resources</h2>
        <p className="text-secondary-400">Everything you need to make your move successful</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((section) => (
          <div key={section.category} className="bg-white rounded-xl shadow-sm border border-secondary-500 overflow-hidden">
            <div className={`${section.color} px-4 py-3 font-semibold flex items-center space-x-2`}>
              <section.icon className="w-5 h-5" />
              <span>{section.category}</span>
            </div>
            <div className="p-4">
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2 hover:bg-ivory-100 rounded-lg transition-colors group"
                    >
                      <span className="text-navy-500 group-hover:text-terracotta-500">{link.name}</span>
                      <ExternalLink className="w-4 h-4 text-navy-300 group-hover:text-terracotta-500" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Personal Note */}
      <div className="mt-8 bg-primary-600 border border-secondary-400/20 hover:border-secondary-400/40 rounded-xl p-6">
        <h3 className="font-semibold text-white mb-2">My Journey - 🇲🇴 From Macau to UK</h3>
        <p className="text-secondary-400/80 text-sm">
          I built this tool based on my own experience relocating from Macau to the UK. 
          The visa section reflects my journey with EU Settled Status, but I've included 
          the most common visa routes for professionals. Feel free to reach out if you 
          have questions about my experience!
        </p>
      </div>

      {/* Back, Home and Start Over button */}
      <div className="flex justify-between items-center mt-8">
        <button onClick={onBack} className="text-[18px] font-bold flex items-center space-x-2 text-secondary-500 hover:text-secondary-600">
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <button className="p-2 px-5 group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-full bg-secondary-400 text-dark font-medium">
          <span className="absolute h-0 w-0 rounded-full bg-secondary-500 transition-all duration-300 group-hover:h-56 group-hover:w-48"></span>
          <span onClick={onHome} className="relative font-bold hover:text-white ">Home</span>
        </button>
        <button className="p-2 px-5 group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-full bg-secondary-400 text-dark font-medium">
          <span className="absolute h-0 w-0 rounded-full bg-secondary-500 transition-all duration-300 group-hover:h-56 group-hover:w-48"></span>
          <span onClick={onSaveAndStartOver} className="relative font-bold hover:text-white ">Save and Start Over</span>
        </button>
      </div>
    </div>
  );
}