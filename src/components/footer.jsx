import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="text-gray-400 bg-gray-800">
      <div className="px-6 py-6 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div>
            <h2 className="text-lg font-bold text-white">Your Company</h2>
            <p className="mt-2 text-sm">
              We deliver quality products and services to support your everyday needs.
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-white text-md">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/products" className="hover:text-white">Products</Link></li>
              <li><Link to="/home" className="hover:text-white">Services</Link></li>
              <li><Link to="/home" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-white text-md">Follow Us</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="" className="hover:text-white">Facebook</Link></li>
              <li><Link to="" className="hover:text-white">Twitter</Link></li>
              <li><Link to="" className="hover:text-white">Instagram</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-center pt-4 mt-8 text-sm border-t border-gray-700">
          <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
