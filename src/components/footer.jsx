import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="px-6 py-10 text-white bg-white md:px-16 lg:px-28">
      <div className="grid gap-10 md:grid-cols-5">
        {/* Subscribe */}
        <div>
          <h1 className="mb-4 text-xl font-bold text-black">
            Subscribe for the latest updates
          </h1>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Email"
              className="w-full px-3 py-2 rounded-md text-ellipsis focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button className="px-4 py-2 text-sm font-medium text-white rounded-md bg-slate-600 hover:bg-slate-500">
              Subscribe
            </button>
          </div>
        </div>

        {/* Store Info */}
        <div>
          <h2 className="mb-4 text-xl font-bold text-black">Online Store</h2>
          <p className="text-black">
            Discover a wide range of products, enjoy secure shopping, and get
            them delivered right to your door.
          </p>
        </div>

        {/* Explore */}
        <div>
          <h1 className="mb-4 text-xl font-black text-black">Explore</h1>
          <p className="text-black">Web POS</p>
        </div>

        {/* Features */}
        <div>
          <h1 className="mb-4 text-xl font-black text-black">Features</h1>
          <ul className="space-y-2 text-black">
            <li>Secure & flexible payment options</li>
            <li>Fast & reliable delivery service</li>
            <li>Mobile-friendly & easy-to-use website</li>
            <li>Safe & secure shopping experience</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h1 className="mb-4 text-xl font-bold text-black">Contact</h1>
          <p className="mb-3 text-black">onlinestore@gmail.com</p>
          <ul className="flex gap-4 text-2xl text-black">
            <li>
              <a href="#" className="hover:text-blue-600">
                <FaFacebook />
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-pink-500">
                <FaInstagram />
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400">
                <FaTwitter />
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-600">
                <FaYoutube />
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom note */}
      <div className="pt-4 mt-10 text-center text-black border-t border-black/20">
        © {new Date().getFullYear()} Online Store. All rights reserved.
      </div>
    </footer>
  );
}
