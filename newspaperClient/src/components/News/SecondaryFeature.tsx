
import { useNavigate } from 'react-router-dom';
import { formattedDate, getImageUrl } from '../../utils/helper';
const fallbackImage = "../../assets/download.png";
interface News {
    headline: string;
    details: string;
    image: string;
    createdAt: Date;
  }
  
  interface FeaturedNewsProps {
    news: News;  // Ensure news is of type News
  }
const SecondaryFeature = ({secondFeature,thirdFeature}:FeaturedNewsProps) => {
    const navigate = useNavigate(); 
    return (
        <div className="col-span-6 md:col-span-2 p-5 border-l-4 border-gray-300 cursor-pointer">
      {[secondFeature, thirdFeature].map((feature, index) => 
        feature && (
          <div key={feature.id}  onClick={()=>{navigate(`/news/${feature.id}`)}} className={`${index > 0 ? 'mt-6' : ''} pb-6 ${index === 0 ? 'border-b border-gray-200' : ''}`}>
            <img
              src={getImageUrl(feature.image) || fallbackImage}
              alt={feature.headline}
              className="w-full h-48 object-cover mb-4 rounded-md"
            />
            <h3 className="text-xl font-bold mb-2 font-serif">{feature.headline}</h3>
            <p className="text-gray-700 mb-2 line-clamp-3">{feature.details}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">{formattedDate(new Date(feature.createdAt).toString())}</span>
            
            </div>
          </div>
        )
      )}
    </div>
    );
};

export default SecondaryFeature;