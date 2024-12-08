import HeroImg from "../assets/hero.jpeg";
function Hero() {
  return (
    <div>
    <div
      className="w-full h-[calc(100vh-75px)] bg-cover bg-center"
      style={{
        backgroundImage: `url(${HeroImg})`,
      }}
    >
      <div className="flex flex-col items-center pt-20  text-white font-serif mx-auto">
        <div className=" font-bold text-3xl md:text-5xl">
          SOFI RESTAURANT
        </div>
        <div className="mt-4 px-6 sm:w-[500px] w-[400px]">
        Savor comfort food at its finest, made with love and the freshest local ingredients. Weekend brunch buffet featuring bottomless mimosas. 
        Early bird specials offering incredible value on your favorite dishes
        </div>
        <div className="mt-6">
            Mekelle, Ethiopia
        </div>
        <div className="mt-2">
            Opening 6 A.M. -- 6 P.M.
        </div>
        <div className="mt-10 flex gap-8">
            <button className="border-2 border-yellow-500 px-4 py-1 text-white bg-gold font-bold rounded-2xl hover:bg-transparent hover:">Order</button>
            <button className="border-2 border-gold px-4 py-1 text-white font-bold rounded-2xl hover:bg-gold">Book Table</button>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Hero;
