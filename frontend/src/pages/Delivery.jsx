function Delivery() {
  return (
    <>
      <div className="container mx-auto mt-10 bg-raising-black p-8 font-inter">
        <h1 className="mb-6 text-center text-3xl font-bold text-gold">
          Delivery Options at Sofi Restaurant
        </h1>

        <p className="mb-6 text-center text-lg text-white">
          Enjoy delicious meals delivered to your doorstep! At Sofi Restaurant,
          we offer reliable and affordable delivery options to ensure you enjoy
          our culinary delights in the comfort of your home.
        </p>

        <div className="flex flex-wrap items-center justify-around rounded-lg bg-gray-600 p-6 shadow-lg">
          {/* Delivery Zone 1 */}
          <div className="m-4 flex w-60 flex-col items-center rounded-lg bg-gray-400 p-4 shadow-md">
            <img
              src="https://via.placeholder.com/150"
              alt="Delivery Zone 1"
              className="mb-4 rounded-md"
            />
            <h2 className="text-xl font-semibold">0 - 5 KM</h2>
            <p className="text-lg text-gray-900">Delivery Fee: 50 Br</p>
          </div>

          {/* Delivery Zone 2 */}
          <div className="m-4 flex w-60 flex-col items-center rounded-lg bg-gray-400 p-4 shadow-md">
            <img
              src="https://via.placeholder.com/150"
              alt="Delivery Zone 2"
              className="mb-4 rounded-md"
            />
            <h2 className="text-xl font-semibold">5 - 10 KM</h2>
            <p className="text-lg text-gray-900">Delivery Fee: 75 Br</p>
          </div>

          {/* Delivery Zone 3 */}
          <div className="m-4 flex w-60 flex-col items-center rounded-lg bg-gray-400 p-4 shadow-md">
            <img
              src="https://via.placeholder.com/150"
              alt="Delivery Zone 3"
              className="mb-4 rounded-md"
            />
            <h2 className="text-xl font-semibold">10 - 15 KM</h2>
            <p className="text-lg text-gray-900">Delivery Fee: 100 Br</p>
          </div>
        </div>

        <p className="mt-10 text-center text-white">
          Delivery is available from 10:00 AM to 10:00 PM every day. For orders
          exceeding 300 Br, enjoy free delivery within a 5 KM radius! Call us
          now at <strong>+251-123-456-789</strong> to place your order.
        </p>
      </div>
    </>
  );
}

export default Delivery;
