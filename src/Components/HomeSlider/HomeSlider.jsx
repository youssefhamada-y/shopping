import headphones from "../../assets/images/gallery00.jpg"
import camera from "../../assets/images/gallery01.jpg"
import mobile from "../../assets/images/gallery03.jpg"
import blueshoes from "../../assets/images/gallery04.jpg"
import pinkshoes from "../../assets/images/gallery05.jpg"
import whiteshoes from "../../assets/images/gallery06.jpg"
import greenshoes from "../../assets/images/gallery07.jpg"






export default function HomeSlider() {
  return (
    <>
      <div className="grid grid-cols-12 mb-7">
        <div className="col-span-8">
        <swiper-container  loop="true" autoplay="true" speed="500" >
            <swiper-slide>
            <img className="w-full " src={headphones} alt="headphone" />
            </swiper-slide>
            <swiper-slide>
            <img className="w-full " src={camera} alt="camera" />
            </swiper-slide>
            <swiper-slide>
            <img className="w-full " src={mobile} alt="mobile" />
            </swiper-slide>
        </swiper-container>
        </div>
        <div className="col-span-4">
       <swiper-container loop="true">
        <swiper-slide>
        <div>
            <img className="w-full " src={pinkshoes} alt="pink shoes" />
          </div>
        </swiper-slide>
        <swiper-slide>
        <div>
            <img className="w-full " src={whiteshoes} alt="white shoes" />
          </div>
        </swiper-slide>
       </swiper-container>
         <swiper-container loop="true">
            <swiper-slide>
            <div>
            <img className="w-full " src={greenshoes} alt="green shoes" />
          </div>
            </swiper-slide>
            <swiper-slide>
            <div>
            <img className="w-full " src={blueshoes} alt="blueshoes" />
          </div>
            </swiper-slide>
         </swiper-container>
        </div>
      </div>
    </>
  );
}
