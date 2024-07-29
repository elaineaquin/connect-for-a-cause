import { Skeleton } from "@/components/ui/skeleton";
import { ProfileIntro } from "@/server/definitions";
import { Building, Home, School } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

interface DisplayIntroProps {
  isPending: boolean;
}

const DisplayIntro = ({
  isPending,
  currentCity,
  hometown,
  facebook,
  instagram,
  linkedIn,
  higherEducation,
  lowerSecondaryEducation,
  primaryEducation,
  upperSecondaryEducation,
}: DisplayIntroProps & ProfileIntro) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      {isPending ? (
        <>
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </>
      ) : (
        <>
          {currentCity && (
            <div className="flex items-center space-x-2">
              <Building className="h-4 w-4" />
              <p>Currently lives at {currentCity}</p>
            </div>
          )}
          {hometown && (
            <div className="flex items-center space-x-2">
              <Home className="h-4 w-4" />
              <p>Is from {hometown}</p>
            </div>
          )}

          {primaryEducation && (
            <div className="flex items-center space-x-2">
              <School className="h-4 w-4" />
              <p>Studied at {primaryEducation}</p>
            </div>
          )}
          {lowerSecondaryEducation && (
            <div className="flex items-center space-x-2">
              <School className="h-4 w-4" />
              <p>Studied at {lowerSecondaryEducation}</p>
            </div>
          )}
          {upperSecondaryEducation && (
            <div className="flex items-center space-x-2">
              <School className="h-4 w-4" />
              <p>Studied at {upperSecondaryEducation}</p>
            </div>
          )}
          {higherEducation && (
            <div className="flex items-center space-x-2">
              <School className="h-4 w-4" />
              <p>Went to {higherEducation}</p>
            </div>
          )}
          {facebook && (
            <div className="flex items-center space-x-2">
              <FaFacebook className="h-4 w-4" />
              <a
                href={facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 hover:underline"
              >
                {facebook}
              </a>
            </div>
          )}
          {instagram && (
            <div className="flex items-center space-x-2">
              <FaInstagram className="h-4 w-4" />
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 hover:text-pink-800 hover:underline"
              >
                {instagram}
              </a>
            </div>
          )}
          {linkedIn && (
            <div className="flex items-center space-x-2">
              <FaLinkedin className="h-4 w-4" />
              <a
                href={linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-900 hover:underline"
              >
                {linkedIn}
              </a>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DisplayIntro;
