import { useEffect, useState } from "react";
import { Carousel, HomePageCard, CarouselCategory, CarouselProduct } from "./";

const HomePage = () => {
  const [cat, setCat] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((json) => setCat(json));
  }, []);

  return (
    <div className="bg-amazonclone-background">
      <div className=" m-auto">
        <Carousel />
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 -mt-80">
          {cat.map((item, index) => {
            return (
              <HomePageCard
                key={index}
                title={item}
                img={"../images/home_grid_1.jpg"}
                link={"See terms and conditions"}
              />
            );
          })}

          <HomePageCard
            title={"Watch The Rings of Power"}
            img={"../images/home_grid_2.jpg"}
            link={"Start streaming now"}
          />
          <HomePageCard
            title={"Watch The Rings of Power"}
            img={"../images/home_grid_2.jpg"}
            link={"Start streaming now"}
          />
          <HomePageCard
            title={"Unlimited Streaming"}
            img={"../images/home_grid_3.jpg"}
            link={"Find out more"}
          />
          <HomePageCard
            title={"More titles to explore"}
            img={"../images/home_grid_4.jpg"}
            link={"Browse Kindle Unlimited"}
          />

          <div className="m-3 pt-8">
            <img
              className="xl:hidden"
              src={"../images/banner_image_2.jpg"}
              alt="Banner 2"
            />
          </div>
        </div>
        <CarouselProduct />
        <CarouselCategory />
        <div className="h-[200px]">
          <img
            className="h-[100%] m-auto"
            src={"../images/banner_image.jpg"}
            alt="Banner 1"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
