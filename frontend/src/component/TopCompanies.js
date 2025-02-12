import React from "react";

function TopCompanies() {
  return (
    <>
      <section className="py-20 bg-black text-white">
        <div className="container text-center ">
          <h2 className=" text-5xl font-medium uppercase mb-5">
            Top Companies
          </h2>
          <p className="max-w-3xl mx-auto">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
            dolores officia earum, illo nisi voluptatibus, odio accusamus eius
            illum molestiae hic dignissimos? Iusto eveniet sit quo
            necessitatibus corporis soluta repudiandae!
          </p>
          <div className="flex md:flex-nowrap flex-wrap mt-10  gap-4">
            <div className="w-full sm:w-1/3 py-10 px-4 border border-dashed border-red-700">
              <h3 className="text-2xl font-medium mb-3">Company Name</h3>
              <p>Company Descrition</p>
            </div>
            <div className="w-full sm:w-1/3 py-10 px-4  border border-dashed border-red-700">
              <h3 className="text-2xl font-medium mb-3">Company Name</h3>
              <p>Company Descrition</p>
            </div>
            <div className="w-full sm:w-1/3 py-10 px-4  border border-dashed border-red-700">
              <h3 className="text-2xl font-medium mb-3">Company Name</h3>
              <p>Company Descrition</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default TopCompanies;
