export default function Footer() {
  return (
    <footer className="bg-primary-950 text-white">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">SEO Audit Pro</h3>
            <p className="text-gray-300">
              Agency-grade SEO audits without the agency price.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <a
              href="mailto:Mreoch82@hotmail.com"
              className="text-gray-300 hover:text-accent-400 transition-colors"
            >
              Mreoch82@hotmail.com
            </a>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Service</h4>
            <p className="text-gray-300 text-sm">
              Professional SEO audits delivered as detailed PDF reports. No dashboards, no subscriptions—just actionable insights.
            </p>
          </div>
        </div>
        <div className="border-t border-primary-800 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} SEO Audit Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

