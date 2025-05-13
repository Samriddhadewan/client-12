import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";


const images = [
    "https://media.istockphoto.com/id/1432207998/photo/army-doctor-examining-refugee-children-at-a-community-center.jpg?s=2048x2048&w=is&k=20&c=ZrmwTKcE0ufcbluAlHGvNJ41nAyoLOiz4jNp0gM6Nxw=",
    "https://media.istockphoto.com/id/1249762315/photo/in-transit-camp.jpg?s=2048x2048&w=is&k=20&c=hCwTumiDKjbO262AmHWaLYy34-JNybCfGqYFAo0weL4=",
    "https://media.istockphoto.com/id/1614146649/photo/indian-female-doctor-checking-young-adult-girl-patient-heartbeat-with-stethoscope-at-village.jpg?s=2048x2048&w=is&k=20&c=TZ68Zi3KqDr59VIlGl3LALISjuTJvs0vFao5GoQQ7rw=",
    "https://media.istockphoto.com/id/1614146226/photo/indian-female-doctor-holding-digital-thermometer-checking-young-adult-girl-patient-at-village.jpg?s=2048x2048&w=is&k=20&c=dF97WqvAlvHbjkqYDFSrtXkiBz-VVgbEiUgUSjK2Mzg=",
  ];

const Slider = () => {
  return (
    <Swiper
      className="mySwiper h-[80vh] w-full"
      spaceBetween={30}
      slidesPerView={1}
      loop={true} 
      autoplay={{ delay: 3000, disableOnInteraction: false }}  
      pagination={{ clickable: true }} 
      navigation={true} 
      modules={[Autoplay, Navigation, Pagination]}
    >
      {images.map((src, index) => (
        <SwiperSlide key={index}>
          <div className="h-full w-full">
          <img src={src} alt={`Slide ${index + 1}`} className="slider-img w-full h-full object-cover brightness-70 contrast-90" />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;