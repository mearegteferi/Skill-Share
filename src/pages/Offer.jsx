import OfferOne from "../assets/offer1.jpg";
import OfferTwo from "../assets/offer2.jpg";

function Offer() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mx-5 sm:mx-20 justify-items-center mt-20">
        {/* Offer 1 */}
        <div className="bg-raising-black flex flex-col sm:flex-row w-full max-w-lg rounded-lg">
          <div className="p-4 w-full sm:w-48 flex justify-center items-center">
            <img className="border-4 border-gold rounded-full w-32 h-32 object-cover" src={OfferOne} />
          </div>
          <div className="flex flex-col flex-grow justify-center items-center sm:items-start text-white gap-4 px-4 text-center sm:text-left">
            <div className="text-xl sm:text-2xl font-bold">Burger</div>
            <div className="text-sm sm:text-base font-medium">
              This is a delicious burger, try it now!
            </div>
            <div>
              <button className="border-2 border-yellow-500 px-4 py-2 text-sm sm:text-base text-white bg-gold font-bold rounded-3xl hover:bg-transparent hover:text-gold transition duration-300">
                Order Now
              </button>
            </div>
          </div>
        </div>

        {/* Offer 2 */}
        <div className="bg-raising-black flex flex-col sm:flex-row w-full max-w-lg  rounded-lg">
          <div className="p-4 w-full sm:w-48 flex justify-center items-center">
            <img className="border-4 border-gold rounded-full w-32 h-32 object-cover" src={OfferTwo} />
          </div>
          <div className="flex flex-col flex-grow justify-center items-center sm:items-start text-white gap-4 px-4 text-center sm:text-left">
            <div className="text-xl sm:text-2xl font-bold">Pizza</div>
            <div className="text-sm sm:text-base font-medium">
              A delightful pizza to make your day!
            </div>
            <div>
              <button className="border-2 border-yellow-500 px-4 py-2 text-sm sm:text-base text-white bg-gold font-bold rounded-3xl hover:bg-transparent hover:text-gold transition duration-300">
                Order Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Offer;
