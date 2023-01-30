import { useNavigate } from 'react-router-dom';

import { DirectoryItemContainer, DirectoryItemBody, BackgroundImage } from './directory-item.styles';

const DirectoryItem = ({category}) => {
    const { imageUrl, title, route } = category;
    const navigate = useNavigate();

    const onNavigateHandler = () => navigate(route);
    return (
        <DirectoryItemContainer onClick={onNavigateHandler}>
          <BackgroundImage imageUrl={imageUrl} />
          <DirectoryItemBody>
            <h2>{title}</h2>
            <p>SHOP NOW</p>
          </DirectoryItemBody>
        </DirectoryItemContainer>
    )
}

export default DirectoryItem