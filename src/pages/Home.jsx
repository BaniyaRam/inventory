import Footer from "../components/footer";

export default function Home() {
  return (
    <>
      <div className="w-full overflow-hidden border-b border-gray-700 shadow-lg">
        <img
          src="/images/shop.jpg"
          alt="shop"
          className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] object-cover"
        />
      </div>
      <Footer />
    </>
  );
}
