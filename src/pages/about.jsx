export default function About() {
  return (
    <div className="min-h-screen text-gray-800 bg-stone-100">
      <div className="max-w-6xl px-6 py-12 mx-auto">
        {/* Heading */}
        <h1 className="mb-6 text-4xl font-extrabold text-center text-gray-900">
          About Us
        </h1>

        {/* Intro */}
        <p className="mb-10 text-[25px] text-center text-gray-700 ">
          Welcome to{" "}
          <span className="font-semibold text-blue-600">Online Store</span> –
          your go-to destination for high-quality, affordable, and stylish
          products. We’re more than just a store; we’re a community built on
          trust and passion.
        </p>

        {/* Our Story */}
        <div className="grid gap-10 md:grid-cols-2">
          {/* Text */}
          <div>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Our Story</h2>
            <p className="text-gray-700">
              We started{" "}
              <span className="font-semibold text-blue-600">Online Store</span>{" "}
              with a simple mission – to bring products that are not only
              beautiful but also practical and accessible. Every product we
              offer is carefully selected to ensure top quality, and we
              constantly evolve to meet your needs.
            </p>
          </div>

          {/* Image (optional) */}
          {/* <div className="flex items-center justify-center">
            <img
              src="https://via.placeholder.com/400x250"
              alt="Our story"
              className="shadow-lg rounded-2xl"
            />
          </div> */}
        </div>

        {/* Our Values */}
        <div className="mt-16">
          <h2 className="mb-6 text-2xl font-bold text-center text-gray-900">
            Our Values
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="p-6 text-center bg-white shadow rounded-2xl">
              <h3 className="mb-2 text-xl font-semibold text-blue-600">
                Quality
              </h3>
              <p className="text-gray-700">
                We believe in providing only the best products that last long
                and add value to your life.
              </p>
            </div>
            <div className="p-6 text-center bg-white shadow rounded-2xl">
              <h3 className="mb-2 text-xl font-semibold text-blue-600">
                Trust
              </h3>
              <p className="text-gray-700">
                Our customers are at the heart of everything we do, and your
                satisfaction is our top priority.
              </p>
            </div>
            <div className="p-6 text-center bg-white shadow rounded-2xl">
              <h3 className="mb-2 text-xl font-semibold text-blue-600">
                Innovation
              </h3>
              <p className="text-gray-700">
                We constantly seek new ideas and trends to keep our products
                fresh and exciting.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Join Our Journey
          </h2>
          <p className="mb-6 text-gray-700">
            Be part of our community and explore products that truly make a
            difference.
          </p>
          <a
            href="/shop"
            className="px-6 py-3 font-medium text-white transition bg-blue-600 shadow rounded-xl hover:bg-blue-700"
          >
            Shop Now
          </a>
        </div>
      </div>
    </div>
  );
}
