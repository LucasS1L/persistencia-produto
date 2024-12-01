import { Image, Slogan} from "./HomeStyle.ts";

import HomeImage from "../../../public/homeImage.png";

import PageContainer from "../../Components/PageContainer/PageConteiner.tsx";

export default function Home() {

    return (

            <PageContainer>
                <div style={{paddingTop:"8em"}}>
                    <Image src={HomeImage} alt="Home Image" />
                </div>
                <Slogan>Bem-Vindo</Slogan>
            </PageContainer>

    );
}