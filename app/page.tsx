import Amenities from "./components/Amenities";
import Floorplan from "./components/Floorplan";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Highlights from "./components/Highlights";
import Location from "./components/Location";
import Navbar from "./components/Navbar";
import Overview from "./components/Overview";
import Price from "./components/Price";

export default function MainPage() {
  return (
    <main className="min-h-screen bg-[#070D1D]">
      <Navbar/>
      <Hero />
      <Overview/>
      <Highlights/>
      <Amenities/>
      <Price/>
      <Floorplan/>
      <Location/>
      <Footer/>
    </main>
  );
}