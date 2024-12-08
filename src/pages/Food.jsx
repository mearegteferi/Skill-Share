import FoodOne from "../assets/burger2.png";
import FoodTwo from "../assets/pizza6.png";
import FoodThree from "../assets/burger6.png";
function Food() {
  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-8 mt-20 mx-10 sm:mx-20 justify-items-center">

      <div className="bg-raising-black flex flex-col w-full max-w-sm">
          <div className="bg-gray-100 rounded-bl-[40px]">
            <img src={FoodOne} className="w-48 h-48  mx-auto py-4" />
          </div>
          <div className=" text-white p-4">
            <div className="font-bold text-xl font-roboto">Burger one</div>
            <div className="mt-4 font-inter">
              Veniam debitis quaerat officiis quasi cupiditate quo, quisquam
              velit, magnam voluptatem repellendus sed eaque
            </div>
            <div className="mt-3">400 Br.</div>
          </div>
        </div>


        <div className="bg-raising-black flex flex-col w-full max-w-sm">
          <div className="bg-gray-100 rounded-bl-[40px]">
            <img src={FoodTwo} className="w-48 h-48  mx-auto py-4" />
          </div>
          <div className=" text-white p-4">
            <div className="font-bold text-xl font-roboto">Burger one</div>
            <div className="mt-4 font-inter">
              Veniam debitis quaerat officiis quasi cupiditate quo, quisquam
              velit, magnam voluptatem repellendus sed eaque
            </div>
            <div className="mt-3">400 Br.</div>
          </div>
        </div>


        <div className="bg-raising-black flex flex-col w-full max-w-sm">
          <div className="bg-gray-100 rounded-bl-[40px]">
            <img src={FoodThree} className="w-48 h-48  mx-auto py-4" />
          </div>
          <div className=" text-white p-4">
            <div className="font-bold text-xl font-roboto">Burger one</div>
            <div className="mt-4 font-inter">
              Veniam debitis quaerat officiis quasi cupiditate quo, quisquam
              velit, magnam voluptatem repellendus sed eaque
            </div>
            <div className="mt-3">400 Br.</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Food;
