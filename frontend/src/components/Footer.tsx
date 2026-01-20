const Footer = () => {
  return (
    <footer className="relative bg-white border-t border-gray-200">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid gap-12 md:grid-cols-4">

        {/* Brand */}
        <div>
          <h3 className="font-heading text-2xl font-bold text-heading">
            Property <span className="text-brand">Plus</span>
          </h3>
          <p className="mt-4 text-sm text-body leading-relaxed max-w-xs">
            India’s most trusted real estate platform to buy, rent,
            and invest in premium properties.
          </p>
        </div>

        {/* Company */}
        <div>
          <p className="font-semibold text-heading mb-5 tracking-wide">
            Company
          </p>
          <ul className="space-y-3 text-sm text-body">
            <li className="hover:text-brand transition cursor-pointer">About Us</li>
            <li className="hover:text-brand transition cursor-pointer">Careers</li>
            <li className="hover:text-brand transition cursor-pointer">Contact</li>
            <li className="hover:text-brand transition cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* Explore */}
        <div>
          <p className="font-semibold text-heading mb-5 tracking-wide">
            Explore
          </p>
          <ul className="space-y-3 text-sm text-body">
            <li className="hover:text-brand transition cursor-pointer">Mumbai Properties</li>
            <li className="hover:text-brand transition cursor-pointer">Delhi Properties</li>
            <li className="hover:text-brand transition cursor-pointer">Bangalore Properties</li>
            <li className="hover:text-brand transition cursor-pointer">New Projects</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <p className="font-semibold text-heading mb-5 tracking-wide">
            Stay Updated
          </p>

          <p className="text-sm text-body mb-4">
            Get the latest property updates and offers.
          </p>

          <div className="flex items-center bg-gray-50 rounded-xl border border-gray-200 overflow-hidden focus-within:ring-2 focus-within:ring-brand/30">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-transparent px-4 py-3 text-sm outline-none"
            />
            <button className="bg-brand text-white px-5 py-3 font-semibold hover:bg-brand-hover transition">
              →
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted">
          <p>
            © {new Date().getFullYear()} PropertyPlus. All rights reserved.
          </p>

          <div className="flex gap-6">
            <span className="hover:text-brand cursor-pointer transition">Terms</span>
            <span className="hover:text-brand cursor-pointer transition">Privacy</span>
            <span className="hover:text-brand cursor-pointer transition">Support</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
