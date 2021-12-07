import "./charItem.scss";

const CharItem = ({ char, onCharClick }) => {
    const { name, thumbnail } = char;

    let imgStyle = { objectFit: "cover" };
    if (
        thumbnail ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
    ) {
        imgStyle = { objectFit: "fill" };
    }

    return (
        <li className="char__item" onClick={onCharClick}>
            <img src={thumbnail} alt={name} style={imgStyle} />
            <div className="char__name">{name}</div>
        </li>
    );
};

export default CharItem;
