import { Link, useLocation } from "react-router"
import { cn, getFirstWord } from "~/lib/utils"
import { ChipListComponent, ChipDirective, ChipsDirective} from '@syncfusion/ej2-react-buttons'

const TripCard = ({id, name, location, imageUrls, tags, estimatedPrice}: TripCardProps) => {
  const path = useLocation();
  
    return (
    <Link to={path.pathname === './' || path.pathname.startsWith('/travel') ? `/travel/${id}` : `/trips/${id}`} className="trip-card">
        <img src={imageUrls} alt={name}/>

        <article>
            <h2>{name}</h2>
            <figure>
                <img
                    src="assets/icons/location-mark.svg"
                    alt="location"
                    className="size-4"
                />
                <figcaption>{location}</figcaption>
            </figure>
        </article>

        <div className="mt-5 pl-[18px] pr-3.5 pb-5">
            <ChipListComponent id="travel-chip">
                <ChipsDirective>
                    {tags.map((tag, index) => (
                        <ChipDirective 
                            key={index}
                            text={getFirstWord(tag)}
                            cssClass={cn(index===1 ? '!bg-pink-50 !text-pink-500' : '!bg-success-50 !text-success-700' )}
                        />
                    ))}
                </ChipsDirective>
            </ChipListComponent>
        </div>
    </Link>
)
}

export default TripCard