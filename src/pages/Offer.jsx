import OfferOne from "../assets/offer1.jpg";
import OfferTwo from "../assets/offer2.jpg";

function Offer() {
  return (
    <>
      <div className="flex gap-10 justify-center mt-20">
        <div className="bg-raising-black flex  w-[500px] h-fit">
          <div className="p-4 w-48 mr-6">
            <img className="border-4 border-gold rounded-full" src={OfferOne} />
          </div>
          <div className="flex flex-col mt-10 gap-4 text-white font-bold text-lg">
            <div>burger</div>
            <div>this is burger</div>
            <div>
              {" "}
              <button className="border-2 border-yellow-500 px-4 py-1 text-white bg-gold font-bold rounded-3xl hover:bg-transparent hover:">
                Order now
              </button>
            </div>
          </div>
        </div>

        <div className="bg-raising-black flex w-[500px] h-fit">
          <div className="p-4 w-48 mr-6">
            <img className="border-4 border-gold rounded-full" src={OfferTwo} />
          </div>
          <div className="flex flex-col mt-10 gap-4 text-white font-bold text-lg">
            <div>pizza</div>
            <div>this is pizza</div>
            <div>
              {" "}
              <button className="border-2 border-yellow-500 px-4 py-1 text-white bg-gold font-bold rounded-3xl hover:bg-transparent hover:">
                Order now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Offer;
