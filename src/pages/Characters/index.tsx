import { useCallback, useEffect, useState } from "react";
import api from "../../services/api";
import { Container, CardList, Card, ButtonMore } from "./styles"
import { FiChevronDown } from "react-icons/fi";

interface ResponseData {
    id: string;
    name: string;
    description: string;
    thumbnail: {
        path: string;
        extension: string;
    }
};

const Characters: React.FC = () => {
    // essa api espera como resposta um array
    const [characters, setCharacters] = useState<ResponseData[]>([]);

    useEffect(() => {
        api.get('/characters')
        .then(response => {
            setCharacters(response.data.data.results);
        })
        .catch(err => console.log('OPA! ALGO DEU ERRADO!', err))
    }, []);

    const handleMore = useCallback(async () => {
        try {
            const offset = characters.length;
            const response = await api.get('characters', {
                params: {
                    offset,
                },
            });
            setCharacters([...characters, ...response.data.data.results]);
        } catch (error) {
            console.log(error)
        }
    }, [characters]);
    

    return (
        <Container>
            <CardList>
                {characters.map(char => {
                    return (
                        <Card key={char.id}
                        thumbnail={char.thumbnail}>
                            <div id="img" />
                            <h2>{char.name}</h2>
                            <p>{char.description}</p>
                        </Card>
                    )
                })}
            </CardList>
            <ButtonMore onClick={handleMore}>
                <FiChevronDown size={20}/>
                    <span>Mais</span>
                <FiChevronDown size={20} />
            </ButtonMore>
        </Container>
    );
};

export default Characters;