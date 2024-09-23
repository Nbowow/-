import A_0001 from "../assets/allergy-images/A_0001.png";
import A_0002 from "../assets/allergy-images/A_0002.png";
import A_0003 from "../assets/allergy-images/A_0003.png";
import A_0004 from "../assets/allergy-images/A_0004.png";
import A_0005 from "../assets/allergy-images/A_0005.png";
import A_0006 from "../assets/allergy-images/A_0006.png";
import A_0007 from "../assets/allergy-images/A_0007.png";
import A_0008 from "../assets/allergy-images/A_0008.png";
import A_0009 from "../assets/allergy-images/A_0009.png";
import A_0010 from "../assets/allergy-images/A_0010.png";
import A_0011 from "../assets/allergy-images/A_0011.png";
import A_0012 from "../assets/allergy-images/A_0012.png";
import A_0013 from "../assets/allergy-images/A_0013.png";
import A_0014 from "../assets/allergy-images/A_0014.png";
import A_0015 from "../assets/allergy-images/A_0015.png";
import A_0016 from "../assets/allergy-images/A_0016.png";
import A_0017 from "../assets/allergy-images/A_0017.png";
import A_0018 from "../assets/allergy-images/A_0018.png";
import A_0019 from "../assets/allergy-images/A_0019.png";
const allergyImages = {
    A_0001,
    A_0002,
    A_0003,
    A_0004,
    A_0005,
    A_0006,
    A_0007,
    A_0008,
    A_0009,
    A_0010,
    A_0011,
    A_0012,
    A_0013,
    A_0014,
    A_0015,
    A_0016,
    A_0017,
    A_0018,
    A_0019,
};

export function getAllergyImage(allergyId) {
    return allergyImages[allergyId] || null;
}
