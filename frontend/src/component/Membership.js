function Membership() {
  return (
    <>
      <section className="py-24 bg-linear-yellow relative overflow-hidden">
        <div className="animated inner-div">
          <div className="bg-blur-image "></div>
        </div>
        <div className="text-center">
          <div className="">
            <span className="text-4xl font-semibold font-sans ">
              Get 20% off membership for a limited time.
            </span>
          </div>
          <button className="text-center text-white font-semibold text-xl rounded-3xl mt-5 px-4 py-2 bg-violet-500 hover:bg-yellow-900 relative">
            Upgrade Now
          </button>
        </div>
      </section>
    </>
  );
}

export default Membership;
