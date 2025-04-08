
export default function HomeSlider() {
  return (
    <>
      <div className="grid grid-cols-12 mb-7">
        <div className="col-span-8">
        <swiper-container  loop="true" autoplay="true" speed="500" >
            <swiper-slide>
            <img className="w-full " src="gallery00.jpg" alt="headphone" />
            </swiper-slide>
            <swiper-slide>
            <img className="w-full " src="gallery01.jpg" alt="headphone" />
            </swiper-slide>
            <swiper-slide>
            <img className="w-full " src="gallery03.jpg" alt="headphone" />
            </swiper-slide>
        </swiper-container>
        </div>
        <div className="col-span-4">
       <swiper-container loop="true">
        <swiper-slide>
        <div>
            <img className="w-full " src="gallery05.jpg" alt="green shoes" />
          </div>
        </swiper-slide>
        <swiper-slide>
        <div>
            <img className="w-full " src="gallery04.jpg" alt="green shoes" />
          </div>
        </swiper-slide>
       </swiper-container>
         <swiper-container loop="true">
            <swiper-slide>
            <div>
            <img className="w-full " src="gallery07.jpg" alt="sneakers" />
          </div>
            </swiper-slide>
            <swiper-slide>
            <div>
            <img className="w-full " src="gallery06.jpg" alt="sneakers" />
          </div>
            </swiper-slide>
         </swiper-container>
        </div>
      </div>
    </>
  );
}
