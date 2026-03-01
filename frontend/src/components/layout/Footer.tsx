import { Github, BriefcaseBusiness, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary-500 mt-16 border-t border-secondary-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 ">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1 ">
            <div className="flex items-center space-x-2 mb-4">

              <span className="text-secondary-500 font-bold text-xl">RelocationBridge</span>
            </div>
            <p className="text-secondary-400 text-sm">
              Helping professionals bridge their careers from Asia to the UK with real data and personal insights.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-secondary-400  text-lg mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-secondary-400 hover:text-secondary-500 transition-colors">How it works</a></li>
              <li><a href="#" className="text-secondary-400 hover:text-secondary-500 transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-secondary-400  text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="https://www.gov.uk/guidance/visa-processing-times-applications-outside-the-uk" className="text-secondary-400 hover:text-secondary-500 transition-colors">Visa Guide</a></li>
              <li><a href="https://linkedin.com" className="text-secondary-400 hover:text-secondary-500 transition-colors">Salary Data</a></li>
              <li><a href="#" className="text-secondary-400 hover:text-secondary-500 transition-colors">Cost Calculator</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-secondary-400 font-semibold text-lg mb-4">Connect</h3>
            <div className="flex space-x-4 mb-4">
              <a href="https://raffyleong.github.io/Portfolio/#" className="text-secondary-400 hover:text-secondary-500 transition-colors">
                <BriefcaseBusiness className="w-5 h-5" />
              </a>
              <a href="https://github.com/RaffyLeong" className="text-secondary-400 hover:text-secondary-500 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/ka-fong-leong/" className="text-secondary-400 hover:text-secondary-500 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="raffy36249@gmail.com" className="text-secondary-400 hover:text-secondary-500 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <p className="mt-10 text-ivory-200 text-sm text-secondary-400">
              Built by Ka Fong Leong(Raffy)
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t text-secondary-400 border-secondary-400 mt-8 pt-8 text-center text-ivory-200 text-sm">
          <p>© 2026 RelocationBridge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}