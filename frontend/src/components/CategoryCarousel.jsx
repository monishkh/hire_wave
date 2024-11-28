import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay'; // ensure autoplay CSS is included

// Import Swiper core and required modules
import { Navigation, Autoplay } from 'swiper/modules';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';


const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
]


function CategoryCarousel() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query))
        navigate('/browse')
    }

    return (
        <div>
            <Carousel className="w-full max-w-xl mx-auto my-20">
                <CarouselContent>
                    {
                        category.map((cat, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg-basis-1/3">
                                <Button onClick={() => searchJobHandler(cat)} variant="outline" className="rounded-full">{cat}</Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel