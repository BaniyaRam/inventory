export default function Contact() {
  return (
    <div className="min-h-screen text-gray-800 bg-neutral-100">
      <div className="max-w-6xl px-6 py-12 mx-auto">
        {/* Heading */}
        <h1 className="mb-6 text-4xl font-extrabold text-center text-gray-900">
          Contact Us
        </h1>

        {/* Intro */}
        <p className="mb-10 text-lg text-center text-gray-700">
          Have questions or need help? We’d love to hear from you. Our team is
          here to make your shopping experience smooth and enjoyable.
        </p>

        {/* Contact Info + Form */}
        <div className="grid gap-10 md:grid-cols-2">
          {/* Contact Info */}
          <div>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Get in Touch
            </h2>
            <p className="mb-4 text-gray-700">
              You can reach us via email, phone, or just fill out the form.
              We’ll get back to you as soon as possible!
            </p>
            <ul className="space-y-3">
              <li>
                <span className="font-semibold text-blue-600">📧 Email:</span>{" "}
                support@onlinestore.com
              </li>
              <li>
                <span className="font-semibold text-blue-600">📞 Phone:</span>{" "}
                +977 9846036757
              </li>
              <li>
                <span className="font-semibold text-blue-600">📍 Address:</span>{" "}
                123 Newroad, Pokhara-09, Nepal
              </li>
            </ul>
          </div>

          {/* Contact Form */}
          <div className="p-6 bg-white shadow rounded-2xl">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Send a Message
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 text-gray-800 border rounded-lg bg-neutral-50 border-neutral-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 text-gray-800 border rounded-lg bg-neutral-50 border-neutral-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  rows="4"
                  placeholder="Write your message..."
                  className="w-full px-4 py-2 text-gray-800 border rounded-lg bg-neutral-50 border-neutral-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 font-medium text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
